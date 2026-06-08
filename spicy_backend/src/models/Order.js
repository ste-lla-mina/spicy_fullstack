import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  price: { type: Number, required: true },
  modifiers: String,
  specialInstructions: String,
  notesForKitchen: String,
  sendTo: String,
  timing: String
}, { _id: false });

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  tableNo: { type: String, default: '' },
  guestCount: { type: Number, default: 1 },
  orderType: { type: String, default: 'Dine In' },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, default: 0 },
  serviceCharge: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Served'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' }
}, { timestamps: true });

orderSchema.index({ restaurant: 1, orderNumber: 1 }, { unique: true });

export default mongoose.model('Order', orderSchema);
