import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Table from '../models/Table.js';
import { signToken } from '../utils/token.js';

const DEFAULT_VERIFICATION_CODE = '123456';

const userPayload = (user, token) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  isVerified: user.isVerified,
  token
});

const setVerification = (user) => {
  user.verificationCode = DEFAULT_VERIFICATION_CODE;
  user.verificationExpires = new Date(Date.now() + 15 * 60 * 1000);
};

const createDefaultTables = async (restaurantId) => {
  const tables = [
    { tableNo: '1', capacity: 2, location: 'Window', features: ['WiFi', 'Quiet'] },
    { tableNo: '2', capacity: 4, location: 'Near Bar', features: ['WiFi', 'Heating'] },
    { tableNo: '3', capacity: 4, location: 'Center', features: ['WiFi', 'AC', 'Quiet'] },
    { tableNo: '4', capacity: 6, location: 'Corner', features: ['Heating', 'WiFi'] },
    { tableNo: '5', capacity: 2, location: 'Bar Side', features: ['WiFi', 'Bar View'] },
    { tableNo: '6', capacity: 8, location: 'Private Area', features: ['WiFi', 'Quiet', 'Heating'] },
    { tableNo: '7', capacity: 2, location: 'Window', features: ['WiFi', 'AC'] },
    { tableNo: '8', capacity: 4, location: 'Center', features: ['WiFi', 'Quiet', 'Bar View'] },
    { tableNo: '11', capacity: 6, location: 'Near Window', features: ['WiFi', 'Heating', 'Bar View'] },
    { tableNo: '18', capacity: 4, location: 'Center Stage', features: ['WiFi', 'Quiet'] },
    { tableNo: '24', capacity: 4, location: 'Corner', features: ['WiFi', 'Heating'] }
  ];

  await Table.insertMany(tables.map((t) => ({ ...t, restaurant: restaurantId })));
};

export const signup = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role === 'owner' ? 'owner' : 'client'
  });

  setVerification(user);
  await user.save();

  res.status(201).json({
    message: `Account created. Use ${DEFAULT_VERIFICATION_CODE} to verify your email.`,
    email: user.email,
    role: user.role
  });
};

export const signupOwner = async (req, res) => {
  const { name, email, phone, password, restaurantName, location, plotNumber, workingEmail, bankAccount } = req.body;
  if (!name || !email || !phone || !password || !restaurantName) {
    return res.status(400).json({ message: 'Owner and restaurant details are required' });
  }

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, phone, password, role: 'owner' });
  const restaurant = await Restaurant.create({
    owner: user._id,
    name: restaurantName,
    location,
    plotNumber,
    workingEmail: workingEmail || email,
    bankAccount,
    settings: { restaurantName }
  });

  await createDefaultTables(restaurant._id);
  // Auto-verify owner accounts (skip email verification)
  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationExpires = undefined;
  await user.save();

  res.status(201).json({
    message: 'Owner account created and verified. You can now log in.',
    email: user.email,
    role: 'owner'
  });
};

export const verify = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.isVerified) {
    return res.json({ message: 'Already verified', ...userPayload(user, signToken(user._id)) });
  }

  if (user.verificationCode !== code) return res.status(400).json({ message: 'Invalid code' });
  if (user.verificationExpires < new Date()) return res.status(400).json({ message: 'Code expired' });

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationExpires = undefined;
  await user.save();

  res.json({ message: 'Email verified', ...userPayload(user, signToken(user._id)) });
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

  setVerification(user);
  await user.save();

  res.json({ message: `Verification code reset. Use ${DEFAULT_VERIFICATION_CODE}.` });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  if (!user.isVerified) {
    return res.status(403).json({ message: 'Please verify your email first' });
  }

  res.json(userPayload(user, signToken(user._id)));
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'No account with that email' });

  user.resetCode = generateCode();
  user.resetExpires = new Date(Date.now() + 15 * 60 * 1000);
  await user.save();
  await sendCodeEmail(user.email, user.resetCode, 'reset');

  res.json({ message: 'Recovery code sent to your email' });
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.resetCode !== code) return res.status(400).json({ message: 'Invalid code' });
  if (user.resetExpires < new Date()) return res.status(400).json({ message: 'Code expired' });

  res.json({ message: 'Code verified. Set your new password.' });
};

export const resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.resetCode !== code) return res.status(400).json({ message: 'Invalid code' });
  if (user.resetExpires < new Date()) return res.status(400).json({ message: 'Code expired' });

  user.password = newPassword;
  user.resetCode = undefined;
  user.resetExpires = undefined;
  await user.save();

  res.json({ message: 'Password updated successfully' });
};

export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};
