import express from 'express';
import userController from '../controllers/userController.js'; // ✅ Default import
import cartController from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// ✅ Access the functions via userController object
userRouter.post('/login', userController.loginuser);
userRouter.post('/register', userController.registerUser);
userRouter.post('/cart/add',cartController.addToCart);

export default userRouter;
 