import { Router } from 'express';
import * as tables from '../controllers/tableController.js';
import { protect, requireRole, attachRestaurant, requireRestaurant } from '../middleware/auth.js';

const router = Router();

router.use(protect, attachRestaurant, requireRestaurant);

router.get('/available', tables.getAvailableTables);
router.get('/', requireRole('owner'), tables.getOwnerTables);
router.patch('/:tableNo/toggle', requireRole('owner'), tables.toggleTableStatus);
router.post('/reservations', tables.createReservation);
router.get('/reservations', tables.getMyReservations);

export default router;
