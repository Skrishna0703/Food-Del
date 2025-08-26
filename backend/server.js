import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import newsletterRoutes from "./routes/newsletter.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.log("Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Connect to DB
connectDB();

// Routes
app.get("/", (req, res) => res.send("Backend is running!"));
app.use("/api/foods", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsletterRoutes);

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("✅ Allowed origins:", allowedOrigins);
});
