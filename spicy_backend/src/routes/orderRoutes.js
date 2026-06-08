import { Router } from 'express';
import * as orders from '../controllers/orderController.js';
import { protect, requireRole, attachRestaurant, requireRestaurant } from '../middleware/auth.js';

const router = Router();

router.use(protect, attachRestaurant, requireRestaurant);

router.get('/', orders.getOrders);
router.get('/stats', requireRole('owner'), orders.getOrderStats);
router.get('/active-clients', requireRole('owner'), orders.getActiveClients);
router.post('/', orders.createOrder);
router.patch('/:id/status', requireRole('owner'), orders.updateOrderStatus);
router.patch('/:id/pay', requireRole('owner'), orders.payOrder);
router.patch('/:id', requireRole('owner'), orders.updateOrderClient);
router.patch('/serve/:orderNo', requireRole('owner'), orders.serveByOrderNumber);
router.delete('/:id', orders.deleteOrder);

export default router;
