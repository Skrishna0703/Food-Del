import express from "express"
import authMiddleware from '../middleware/auth.js'

import orderController from "../controllers/orderController.js"

const orderRouter =express.Router();

orderRouter.post("/place",authMiddleware,orderController.placeOrder);
orderRouter.get("/list",orderController.listOrders);
orderRouter.post("/update-status",orderController.updateOrderStatus);

export default orderRouter;