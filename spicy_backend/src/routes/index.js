import { Router } from 'express';
import authRoutes from './authRoutes.js';
import menuRoutes from './menuRoutes.js';
import orderRoutes from './orderRoutes.js';
import tableRoutes from './tableRoutes.js';
import overviewRoutes from './overviewRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', orderRoutes);
router.use('/tables', tableRoutes);
router.use('/overview', overviewRoutes);
router.use('/settings', settingsRoutes);
router.use('/users', userRoutes);

export default router;
