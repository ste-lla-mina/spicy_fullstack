import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import routes from './src/routes/index.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';
import { seedIfEmpty } from './src/seed/seed.js';

dotenv.config();
await connectDB();
await seedIfEmpty();

const uploadsPath = path.resolve('./uploads');
if (!fs.existsSync(uploadsPath)) fs.mkdirSync(uploadsPath, { recursive: true });

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadsPath));

app.get('/', (_req, res) => {
  res.json({ message: 'Spicy Restaurant API is running', version: '2.0.0' });
});

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Spicy API listening on http://localhost:${PORT}`);
});
