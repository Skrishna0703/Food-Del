import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_URI =
  "mongodb+srv://tomatofood:food_delivery_app@tomatocluster.dsgwbdo.mongodb.net/food-del";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || DEFAULT_URI, {
      dbName: process.env.DB_NAME || "food-del",
      retryWrites: true,
      w: "majority",
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};
