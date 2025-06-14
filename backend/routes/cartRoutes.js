import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';


const cartRouter = express.Router();
// Route to add an item to the cart
cartRouter.post('/add', addToCart);
// Route to get the cart items
cartRouter.post('/get', getCart);

// Route to remove an item from the cart
cartRouter.post('/remove', removeFromCart);




export default cartRouter;