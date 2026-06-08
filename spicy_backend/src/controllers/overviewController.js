import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import Table from '../models/Table.js';
import User from '../models/User.js';

export const getOverview = async (req, res) => {
  const restaurantId = req.restaurant._id;

  const [menuCount, clientCount, revenueAgg, tablesTaken, orders, topMenu] = await Promise.all([
    MenuItem.countDocuments({ restaurant: restaurantId, status: 'Active' }),
    User.countDocuments({ role: 'client', isVerified: true }),
    Order.aggregate([
      { $match: { restaurant: restaurantId, paymentStatus: 'Paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]),
    Table.countDocuments({ restaurant: restaurantId, status: 'Occupied' }),
    Order.find({ restaurant: restaurantId }).populate('client', 'name email'),
    MenuItem.find({ restaurant: restaurantId }).sort({ orderCount: -1 }).limit(5)
  ]);

  const revenue = revenueAgg[0]?.total || 0;

  const foodRevenue = await Order.aggregate([
    { $match: { restaurant: restaurantId, paymentStatus: 'Paid' } },
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'menuitems',
        localField: 'items.menuItem',
        foreignField: '_id',
        as: 'menu'
      }
    },
    { $unwind: { path: '$menu', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: {
          $cond: [{ $in: ['$menu.category', ['drinks']] }, 'drinks', 'food']
        },
        total: { $sum: '$items.price' }
      }
    }
  ]);

  const foodTotal = foodRevenue.find((r) => r._id === 'food')?.total || 0;
  const drinksTotal = foodRevenue.find((r) => r._id === 'drinks')?.total || 0;
  const salesTotal = foodTotal + drinksTotal || 1;
  const foodPct = Math.round((foodTotal / salesTotal) * 100);
  const drinksPct = 100 - foodPct;

  const clientOrderMap = {};
  orders.forEach((order) => {
    const key = order.customerName;
    clientOrderMap[key] = (clientOrderMap[key] || 0) + 1;
  });

  const topClients = Object.entries(clientOrderMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, count]) => ({
      name,
      orders: `${count} orders total`
    }));

  res.json({
    stats: [
      { label: 'Menu', value: String(menuCount) },
      { label: 'Clients', value: String(clientCount) },
      { label: 'Revenue', value: `$ ${Math.round(revenue)}` },
      { label: 'Tables Taken', value: String(tablesTaken) }
    ],
    salesBreakdown: { food: foodPct, drinks: drinksPct },
    topClients,
    topMenuItems: topMenu.map((item) => ({
      name: item.name,
      image: item.imageUrl
    }))
  });
};
