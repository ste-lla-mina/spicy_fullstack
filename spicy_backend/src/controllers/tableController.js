import Table from '../models/Table.js';
import Reservation from '../models/Reservation.js';

const formatOwnerTable = (table) => ({
  _id: table._id,
  tableNo: table.tableNo,
  status: table.status,
  client: table.client,
  orderNo: table.orderNo,
  orderStatus: table.orderStatus
});

const formatClientTable = (table, reservations = []) => {
  const reserved = reservations.some((r) => String(r.table) === String(table._id));
  return {
    id: table._id,
    _id: table._id,
    tableNo: table.tableNo,
    capacity: table.capacity,
    location: table.location,
    features: table.features,
    available: table.status === 'Free' && !reserved,
    reserved
  };
};

export const getOwnerTables = async (req, res) => {
  const { status } = req.query;
  const query = { restaurant: req.restaurant._id };
  if (status && status !== 'All') query.status = status;

  const tables = await Table.find(query).sort({ tableNo: 1 });
  res.json(tables.map(formatOwnerTable));
};

export const toggleTableStatus = async (req, res) => {
  const table = await Table.findOne({
    restaurant: req.restaurant._id,
    tableNo: req.params.tableNo
  });
  if (!table) return res.status(404).json({ message: 'Table not found' });

  if (table.status === 'Occupied') {
    table.status = 'Free';
    table.client = 'None';
    table.orderNo = '—';
    table.orderStatus = '—';
    table.currentOrder = null;
  } else {
    table.status = 'Occupied';
    table.client = 'Walk-in Guest';
    table.orderNo = String(Math.floor(Math.random() * 9000) + 1000);
    table.orderStatus = 'Pending';
  }

  await table.save();
  res.json(formatOwnerTable(table));
};

export const getAvailableTables = async (req, res) => {
  const { partySize, amenities } = req.query;
  const tables = await Table.find({ restaurant: req.restaurant._id, status: 'Free' });
  const reservations = await Reservation.find({ restaurant: req.restaurant._id });
  const amenityList = amenities ? amenities.split(',').map((a) => a.trim().toLowerCase()) : [];

  const filtered = tables.filter((table) => {
    const capacityOk = !partySize || table.capacity >= Number(partySize);
    const amenityOk = amenityList.length === 0 || amenityList.some((a) =>
      table.features.some((f) => f.toLowerCase().includes(a))
    );
    return capacityOk && amenityOk;
  });

  res.json(filtered.map((t) => formatClientTable(t, reservations)));
};

export const createReservation = async (req, res) => {
  const { tableId, date, time, partySize, notes } = req.body;
  const table = await Table.findOne({ _id: tableId, restaurant: req.restaurant._id });
  if (!table) return res.status(404).json({ message: 'Table not found' });

  const reservation = await Reservation.create({
    restaurant: req.restaurant._id,
    client: req.user._id,
    table: table._id,
    date,
    time,
    partySize,
    notes: notes || '',
    tableName: `Table #${table.tableNo}`,
    capacity: table.capacity,
    location: table.location
  });

  res.status(201).json(reservation);
};

export const getMyReservations = async (req, res) => {
  const reservations = await Reservation.find({
    restaurant: req.restaurant._id,
    client: req.user._id
  }).sort({ createdAt: -1 });

  res.json(reservations);
};
