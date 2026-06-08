import User from '../models/User.js';

export const updateProfile = async (req, res) => {
  const { name, email, phone } = req.body;
  const user = await User.findById(req.user._id);

  if (email && email !== user.email) {
    const taken = await User.findOne({ email });
    if (taken) return res.status(400).json({ message: 'Email already in use' });
    user.email = email;
    user.isVerified = false;
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  await user.save();

  res.json({
    message: 'Profile updated',
    name: user.name,
    email: user.email,
    phone: user.phone
  });
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!(await user.matchPassword(currentPassword))) {
    return res.status(400).json({ message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();
  res.json({ message: 'Password updated' });
};

export const updateNotifications = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { orderStatus, discounts, tableReady } = req.body;

  if (orderStatus !== undefined) user.notifications.orderStatus = orderStatus;
  if (discounts !== undefined) user.notifications.discounts = discounts;
  if (tableReady !== undefined) user.notifications.tableReady = tableReady;

  await user.save();
  res.json({ message: 'Notification preferences saved', notifications: user.notifications });
};
