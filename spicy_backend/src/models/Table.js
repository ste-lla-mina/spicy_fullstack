import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  tableNo: { type: String, required: true },
  capacity: { type: Number, default: 4 },
  location: { type: String, default: 'Center' },
  features: [{ type: String }],
  status: { type: String, enum: ['Occupied', 'Free'], default: 'Free' },
  client: { type: String, default: 'None' },
  orderNo: { type: String, default: '—' },
  orderStatus: { type: String, enum: ['Served', 'Pending', '—'], default: '—' },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });

tableSchema.index({ restaurant: 1, tableNo: 1 }, { unique: true });

export default mongoose.model('Table', tableSchema);
