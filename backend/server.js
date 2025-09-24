import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { apiRateLimit, securityHeaders, sanitizeInput } from "./middleware/security.js";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import newsletterRoutes from "./routes/newsletter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allowed origins
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [];

// Middleware
app.use(securityHeaders);
app.use(sanitizeInput);
app.use(apiRateLimit);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // Allow Postman, curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      console.warn("Blocked CORS request from:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use("/images", express.static("uploads"));

// Routes
app.get("/", (req, res) => res.send("Backend is running!"));
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsletterRoutes);
app.use("/auth", userRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.message || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB(); // Wait for DB connection
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log("✅ Allowed origins:", allowedOrigins);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
