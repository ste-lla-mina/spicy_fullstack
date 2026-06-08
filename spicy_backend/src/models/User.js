import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true, trim: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'owner'], default: 'client' },
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationExpires: Date,
  resetCode: String,
  resetExpires: Date,
  notifications: {
    orderStatus: { type: Boolean, default: true },
    discounts: { type: Boolean, default: false },
    tableReady: { type: Boolean, default: true }
  }
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.username && this.email) {
    const baseUsername = this.email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');
    let candidate = baseUsername;
    let counter = 1;

    while (await this.constructor.exists({ username: candidate })) {
      candidate = `${baseUsername}${counter}`;
      counter += 1;
    }

    this.username = candidate;
  }

  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

export default mongoose.model('User', userSchema);
