import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  next();
};

export const attachRestaurant = async (req, _res, next) => {
  if (req.user.role === 'owner') {
    req.restaurant = await Restaurant.findOne({ owner: req.user._id });
  } else {
    req.restaurant = await Restaurant.findOne().sort({ createdAt: 1 });
  }
  next();
};

export const requireRestaurant = (req, res, next) => {
  if (!req.restaurant) {
    return res.status(404).json({ message: 'No restaurant configured yet' });
  }
  next();
};
