import mongoose from 'mongoose';
import { MENU_CATEGORIES } from '../utils/categories.js';

const menuItemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, enum: MENU_CATEGORIES, default: 'main' },
  price: { type: Number, required: true, min: 0 },
  cost: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  imageUrl: { type: String, default: '' },
  isTopRated: { type: Boolean, default: false },
  isSpecial: { type: Boolean, default: false },
  specialTag: { type: String, default: '' },
  tags: [{ type: String }],
  orderCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
