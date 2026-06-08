import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import Table from '../models/Table.js';

const formatDate = (date) =>
  date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).replace(',', ',');

const formatOrder = (order) => ({
  _id: order._id,
  id: order.orderNumber,
  orderNumber: order.orderNumber,
  customer: order.customerName,
  customerName: order.customerName,
  date: formatDate(order.createdAt),
  status: order.status,
  paymentStatus: order.paymentStatus,
  items: order.items.map((i) => ({
    name: i.name,
    qty: i.qty,
    price: i.price,
    unitPrice: i.unitPrice,
    modifiers: i.modifiers,
    specialInstructions: i.specialInstructions
  })),
  subtotal: order.subtotal,
  tax: order.tax,
  serviceCharge: order.serviceCharge,
  total: order.total,
  tableNo: order.tableNo,
  guestCount: order.guestCount,
  orderType: order.orderType
});

const nextOrderNumber = async (restaurantId) => {
  const count = await Order.countDocuments({ restaurant: restaurantId });
  return String(count + 1).padStart(4, '0');
};

const syncTableFromOrder = async (order, tableNo) => {
  if (!tableNo) return;
  const table = await Table.findOne({ restaurant: order.restaurant, tableNo: String(tableNo).replace('#', '') });
  if (!table) return;

  if (order.status === 'Served' && order.paymentStatus === 'Paid') {
    table.status = 'Free';
    table.client = 'None';
    table.orderNo = '—';
    table.orderStatus = '—';
    table.currentOrder = null;
  } else {
    table.status = 'Occupied';
    table.client = order.customerName;
    table.orderNo = order.orderNumber;
    table.orderStatus = order.status;
    table.currentOrder = order._id;
  }
  await table.save();
};

export const getOrders = async (req, res) => {
  const query = { restaurant: req.restaurant._id };
  if (req.user.role === 'client') query.client = req.user._id;

  const orders = await Order.find(query).sort({ createdAt: -1 });
  res.json(orders.map(formatOrder));
};

export const getOrderStats = async (req, res) => {
  const base = { restaurant: req.restaurant._id };
  const [total, paid, unpaid, served, pending] = await Promise.all([
    Order.countDocuments(base),
    Order.countDocuments({ ...base, paymentStatus: 'Paid' }),
    Order.countDocuments({ ...base, paymentStatus: 'Unpaid' }),
    Order.countDocuments({ ...base, status: 'Served' }),
    Order.countDocuments({ ...base, status: 'Pending' })
  ]);

  res.json({ total, paid, unpaid, served, pending });
};

export const getActiveClients = async (req, res) => {
  const orders = await Order.find({
    restaurant: req.restaurant._id,
    status: { $in: ['Pending', 'Served'] }
  }).sort({ createdAt: -1 });

  res.json(orders.map((o) => ({
    name: o.customerName,
    tableNo: o.tableNo || '—',
    orderNo: o.orderNumber,
    status: o.status,
    _id: o._id
  })));
};

export const createOrder = async (req, res) => {
  const settings = req.restaurant.settings;
  const {
    items = [],
    tableNo,
    guestCount,
    orderType,
    customerName,
    item,
    quantity,
    unitPrice,
    specialInstructions,
    modifiers,
    notesForKitchen,
    sendTo,
    timing
  } = req.body;

  let orderItems = [];
  let subtotal = 0;

  if (items.length > 0) {
    for (const line of items) {
      let menuItem = null;
      if (line.menuItemId || line.id) {
        menuItem = await MenuItem.findById(line.menuItemId || line.id);
      }
      const qty = line.qty || line.quantity || 1;
      const unit = menuItem ? menuItem.price : (line.price || line.unitPrice || 0);
      const lineTotal = unit * qty;
      subtotal += lineTotal;

      orderItems.push({
        menuItem: menuItem?._id,
        name: menuItem?.name || line.name,
        qty,
        unitPrice: unit,
        price: lineTotal,
        modifiers: line.modifiers,
        specialInstructions: line.specialInstructions
      });

      if (menuItem) {
        menuItem.orderCount += qty;
        await menuItem.save();
      }
    }
  } else if (item && unitPrice) {
    const qty = quantity || 1;
    const lineTotal = Number(unitPrice) * qty;
    subtotal = lineTotal;
    orderItems = [{
      name: item,
      qty,
      unitPrice: Number(unitPrice),
      price: lineTotal,
      modifiers,
      specialInstructions,
      notesForKitchen,
      sendTo,
      timing
    }];
  } else {
    return res.status(400).json({ message: 'Order items are required' });
  }

  const tax = subtotal * ((settings.taxRate || 10) / 100);
  const serviceCharge = subtotal * ((settings.serviceChargeRate || 5) / 100);
  const total = subtotal + tax + serviceCharge;

  const order = await Order.create({
    restaurant: req.restaurant._id,
    client: req.user.role === 'client' ? req.user._id : undefined,
    orderNumber: await nextOrderNumber(req.restaurant._id),
    customerName: customerName || req.user.name,
    tableNo: String(tableNo || '').replace('#', ''),
    guestCount: guestCount || 1,
    orderType: orderType || 'Dine In',
    items: orderItems,
    subtotal,
    tax,
    serviceCharge,
    total,
    status: 'Pending',
    paymentStatus: 'Unpaid'
  });

  await syncTableFromOrder(order, order.tableNo);
  res.status(201).json(formatOrder(order));
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.body.status) order.status = req.body.status;
  await order.save();
  await syncTableFromOrder(order, order.tableNo);

  res.json(formatOrder(order));
};

export const payOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.paymentStatus = 'Paid';
  order.status = 'Served';
  await order.save();
  await syncTableFromOrder(order, order.tableNo);

  res.json(formatOrder(order));
};

export const updateOrderClient = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.body.name) order.customerName = req.body.name;
  if (req.body.tableNo) order.tableNo = String(req.body.tableNo).replace('#', '');
  await order.save();
  await syncTableFromOrder(order, order.tableNo);

  res.json(formatOrder(order));
};

export const serveByOrderNumber = async (req, res) => {
  const order = await Order.findOne({
    restaurant: req.restaurant._id,
    orderNumber: req.params.orderNo
  });
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = 'Served';
  await order.save();
  await syncTableFromOrder(order, order.tableNo);

  res.json(formatOrder(order));
};

export const deleteOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, restaurant: req.restaurant._id });
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (!req.restaurant.settings.allowOrderCancel && order.status === 'Pending') {
    return res.status(403).json({ message: 'Order cancellations are disabled' });
  }

  if (order.tableNo) {
    const table = await Table.findOne({ restaurant: req.restaurant._id, tableNo: order.tableNo });
    if (table) {
      table.status = 'Free';
      table.client = 'None';
      table.orderNo = '—';
      table.orderStatus = '—';
      table.currentOrder = null;
      await table.save();
    }
  }

  await order.deleteOne();
  res.json({ message: 'Order removed' });
};
