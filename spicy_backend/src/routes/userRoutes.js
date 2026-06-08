import { Router } from 'express';
import * as user from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.patch('/profile', protect, user.updateProfile);
router.patch('/password', protect, user.updatePassword);
router.patch('/notifications', protect, user.updateNotifications);

export default router;
