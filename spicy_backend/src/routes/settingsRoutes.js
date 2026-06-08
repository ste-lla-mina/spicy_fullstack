import { Router } from 'express';
import * as settings from '../controllers/settingsController.js';
import { protect, requireRole, attachRestaurant, requireRestaurant } from '../middleware/auth.js';

const router = Router();

router.get('/restaurant', protect, requireRole('owner'), attachRestaurant, requireRestaurant, settings.getRestaurantSettings);
router.put('/restaurant', protect, requireRole('owner'), attachRestaurant, requireRestaurant, settings.updateRestaurantSettings);

export default router;
