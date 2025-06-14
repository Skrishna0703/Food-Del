import express from 'express';

import cartController from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();
// Route to add an item to the cart
cartRouter.post('/cart/add',authMiddleware,cartController.addToCart);

// Route to get the cart items
cartRouter.post('/cart/get',authMiddleware,cartController.getCart);

// Route to remove an item from the cart
cartRouter.post('/cart/remove',authMiddleware,cartController.removeFromCart);




export default cartRouter;