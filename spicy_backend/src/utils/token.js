import jwt from 'jsonwebtoken';

export const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
