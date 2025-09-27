import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MAX_RETRIES = 5; // Maximum number of retries
const RETRY_DELAY = 2000; // Delay between retries in ms

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  const dbName = process.env.DB_NAME || "food-del";

  if (!mongoUri) {
    console.error("❌ MONGO_URI environment variable is required");
    process.exit(1);
  }

  let retries = 0;

  const connectWithRetry = async () => {
    try {
      await mongoose.connect(mongoUri, {
        dbName,
        retryWrites: true,
        w: "majority",
      });
      console.log("✅ MongoDB connected successfully");
    } catch (err) {
      retries += 1;
      console.error(`❌ MongoDB connection error (attempt ${retries}):`, err.message);

      // Check if maximum retries reached
      if (retries >= MAX_RETRIES) {
        console.error("❌ Maximum retries reached. Could not connect to MongoDB.");
        process.exit(1);
      }

      console.log(`🔄 Retrying in ${RETRY_DELAY / 1000} seconds...`);
      setTimeout(connectWithRetry, RETRY_DELAY);
    }
  };

  await connectWithRetry();

  // Optional: handle disconnect events
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected. Trying to reconnect...");
    connectWithRetry();
  });

  mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err);
  });
};
