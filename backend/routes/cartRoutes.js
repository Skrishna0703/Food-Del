// routes/cartRoutes.js
import express from 'express';
import cartController from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// ✅ No need to prefix with /carts again
cartRouter.post('/add',authMiddleware,  cartController.addToCart);
cartRouter.post('/get',authMiddleware,  cartController.getCart);
cartRouter.post('/remove', authMiddleware, cartController.removeFromCart);

export default cartRouter;
