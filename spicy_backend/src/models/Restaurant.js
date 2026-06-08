import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true, trim: true },
  location: String,
  plotNumber: String,
  workingEmail: String,
  bankAccount: String,
  settings: {
    restaurantName: { type: String, default: 'Spicy' },
    currency: { type: String, default: 'USD ($)' },
    taxRate: { type: Number, default: 10 },
    serviceChargeRate: { type: Number, default: 5 },
    allowOrderCancel: { type: Boolean, default: true }
  }
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);
