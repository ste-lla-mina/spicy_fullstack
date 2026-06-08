import { Router } from 'express';
import * as auth from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/signup', auth.signup);
router.post('/signup-owner', auth.signupOwner);
router.post('/verify', auth.verify);
router.post('/resend-verification', auth.resendVerification);
router.post('/login', auth.login);
router.post('/forgot-password', auth.forgotPassword);
router.post('/verify-reset-code', auth.verifyResetCode);
router.post('/reset-password', auth.resetPassword);
router.get('/me', protect, auth.getMe);

export default router;
