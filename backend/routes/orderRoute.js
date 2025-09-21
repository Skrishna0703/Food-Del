import express from "express"
import authMiddleware from '../middleware/auth.js'
import { validateOrderPlacement, validateOrderStatusUpdate } from '../middleware/validation.js'

import orderController from "../controllers/orderController.js"

const orderRouter =express.Router();

orderRouter.post("/place", authMiddleware, validateOrderPlacement, orderController.placeOrder);
orderRouter.get("/list", authMiddleware, orderController.listOrders);
orderRouter.post("/update-status", authMiddleware, validateOrderStatusUpdate, orderController.updateOrderStatus);

export default orderRouter;