import path from 'path';
import multer from 'multer';
import { Router } from 'express';
import * as menu from '../controllers/menuController.js';
import { protect, requireRole, attachRestaurant, requireRestaurant } from '../middleware/auth.js';

const upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve('./uploads'),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    }
  })
});

const router = Router();

router.use(protect, attachRestaurant, requireRestaurant);

router.get('/items', menu.getMenuItems);
router.get('/top-rated', menu.getTopRated);
router.get('/specials', menu.getSpecials);
router.post('/items', requireRole('owner'), upload.single('image'), menu.createMenuItem);
router.patch('/items/:id', requireRole('owner'), upload.single('image'), menu.updateMenuItem);
router.patch('/items/:id/toggle', requireRole('owner'), menu.toggleMenuStatus);
router.delete('/items/:id', requireRole('owner'), menu.deleteMenuItem);

export default router;
