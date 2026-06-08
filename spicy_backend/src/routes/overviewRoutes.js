import { Router } from 'express';
import { getOverview } from '../controllers/overviewController.js';
import { protect, requireRole, attachRestaurant, requireRestaurant } from '../middleware/auth.js';

const router = Router();

router.get('/', protect, requireRole('owner'), attachRestaurant, requireRestaurant, getOverview);

export default router;
