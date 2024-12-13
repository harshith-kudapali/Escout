import express from 'express';
import { 
  getShopItems, 
  createShopItem, 
  updateShopItem, 
  deleteShopItem 
} from '../controllers/shop.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getShopItems);
router.post('/create', protectRoute, createShopItem);
router.put('/:id', protectRoute, updateShopItem);
router.delete('/:id', protectRoute, deleteShopItem);

export default router;