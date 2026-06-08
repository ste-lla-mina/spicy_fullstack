import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  partySize: { type: Number, required: true },
  notes: { type: String, default: '' },
  tableName: String,
  capacity: Number,
  location: String
}, { timestamps: true });

export default mongoose.model('Reservation', reservationSchema);
