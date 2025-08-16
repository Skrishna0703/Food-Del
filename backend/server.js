import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

// App config
const app = express();
const PORT = process.env.PORT || 4000; // Render provides PORT automatically

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
});

// Connect to database
connectDB();

// API endpoints
app.use('/api/foods', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/order', orderRouter);

// Start server — bind to 0.0.0.0 for Render
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
});
// End of server.js