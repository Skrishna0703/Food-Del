import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js'; // ✅ Default import

const userRouter = express.Router();

// ✅ Access the functions via userController object
userRouter.post('/login', userController.loginuser);
userRouter.post('/register', userController.registerUser);
userRouter.get("/me", authMiddleware, userController.getMe);

// Google OAuth
userRouter.get("/google", userController.googleAuth); // start OAuth flow
userRouter.get("/google/callback", userController.googleAuthCallback); // handle callback

export default userRouter;
 