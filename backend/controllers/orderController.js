import "dotenv/config";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place new order
const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.user._id;

    // Save order in DB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      paymentStatus: "pending",
    });

    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay requires paise
      currency: "INR",
      receipt: `receipt_order_${newOrder._id}`,
      notes: {
        userId: userId.toString(),
        orderId: newOrder._id.toString(),
      },
    });

    return res.status(200).json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("PlaceOrder Error:", error);
    return res.status(500).json({
      success: false,
      message: "Order placement failed",
    });
  }
};

// List orders with search + pagination
const listOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = {};
    if (search) {
      if (mongoose.Types.ObjectId.isValid(search)) {
        query._id = search;
      } else {
        const users = await userModel
          .find({
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          })
          .select("_id");

        query.userId = { $in: users.map((u) => u._id) };
      }
    }

    const [orders, total] = await Promise.all([
      orderModel
        .find(query)
        .populate("userId", "name email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(Number(limit)),
      orderModel.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      orders,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("ListOrders Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    return res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("UpdateOrderStatus Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default { placeOrder, listOrders, updateOrderStatus };
