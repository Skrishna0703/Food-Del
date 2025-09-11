import 'dotenv/config';
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

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
      paymentStatus: "pending", // optional field for tracking
    });

    await newOrder.save();

    // Clear user cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `receipt_order_${newOrder._id}`,
      notes: {
        userId: userId.toString(),
        orderId: newOrder._id.toString(),
      },
    });

    // Send Razorpay order details to frontend
    res.status(200).json({
      success: true,
      order_id: razorpayOrder.id,       // Required by frontend
      amount: razorpayOrder.amount,     // Required by frontend
      currency: razorpayOrder.currency, // Optional
      key_id: process.env.RAZORPAY_KEY_ID, // Required for Razorpay checkout.js
      orderId: newOrder._id,            // Optional: For internal tracking
    });

  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      message: "Order placement failed",
    });
  }
};

const listOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (search) {
      // Check if search is an order ID
      if (mongoose.Types.ObjectId.isValid(search)) {
        query._id = search;
      } else {
        // Find users matching search
        const users = await userModel.find({
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } }
          ]
        }).select('_id');
        const userIds = users.map(u => u._id);
        query.userId = { $in: userIds };
      }
    }

    const orders = await orderModel.find(query)
      .populate('userId', 'name email')
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await orderModel.countDocuments(query);

    res.json({
      success: true,
      orders,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export default { placeOrder, listOrders, updateOrderStatus };
