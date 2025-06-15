import 'dotenv/config';
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

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
        userId: userId,
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

export default { placeOrder };
