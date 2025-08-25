import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
import newsletterRoutes from "./routes/newsletter.js";

dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors({
    origin: [
        "http://localhost:5173",             // Local frontend (Vite dev server)
        "https://tomato-frontend.onrender.com" // Deployed frontend (replace with your real Render frontend URL)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});
app.get("/newsletter", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/newsletter.html"));
});

// Connect to database
connectDB();

// API endpoints
app.use("/api/foods", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/newsletter", newsletterRoutes);

// Start server — bind to 0.0.0.0 for Render
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
// End of server.js
