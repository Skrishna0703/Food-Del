import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now },
  payment: { type: Boolean, default: false },
  paymentStatus: { type: String, default: "pending" },
});

// ✅ Correct way to create or reuse model
const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
