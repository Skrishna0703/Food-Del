import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';
import { validateLogin, validateRegistration } from '../middleware/validation.js';
import { authRateLimit } from '../middleware/security.js';

const userRouter = express.Router();

// Authentication routes with validation and rate limiting
userRouter.post('/login', authRateLimit, validateLogin, userController.loginuser);
userRouter.post('/register', authRateLimit, validateRegistration, userController.registerUser);
userRouter.get("/me", authMiddleware, userController.getMe);

// Google OAuth
userRouter.get("/google", userController.googleAuth); // start OAuth flow
userRouter.get("/google/callback", userController.googleAuthCallback); // handle callback

export default userRouter;
 