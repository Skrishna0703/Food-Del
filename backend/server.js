import express from 'express';
import cors from 'cors';
import  {connectDB}  from './config/db.js';
import foodRouter from './routes/foodRoutes.js';
import userRouter from './routes/userRoutes.js';
import dotenv from 'dotenv';  
dotenv.config();              
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';

//app config
const app = express();
const PORT = https://tomato-backend-8sua.onrender.com || 4000;

//middleware
app.use(cors());    
app.use(express.json());
//routes.

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
}
);
 
//import db connection


//connect to database
connectDB();

//api endpoints
app.use('/api/foods', foodRouter);
app.use("/images", express.static("uploads"));
app.use('/api/users', userRouter);
app.use('/api/carts', cartRouter);
app.use('/api/order',orderRouter)


//start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
//mongodb+srv://tomatofood:<db_password>@tomatocluster.dsgwbdo.mongodb.net/?
