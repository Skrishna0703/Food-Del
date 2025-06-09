
import  Mongoose  from "mongoose";

export const connectDB = async () => {
await Mongoose.connect('mongodb+srv://tomatofood:food_delivery_app@tomatocluster.dsgwbdo.mongodb.net/food-del').then(() => console.log('MongoDB connected successfully'))
}