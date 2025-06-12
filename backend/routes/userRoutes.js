import express from 'express';
import userController from '../controllers/userController.js'; // ✅ Default import

const userRouter = express.Router();

// ✅ Access the functions via userController object
userRouter.post('/login', userController.loginuser);
userRouter.post('/register', userController.registerUser);

export default userRouter;
 