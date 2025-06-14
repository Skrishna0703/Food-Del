import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {

try {
    let userData =await userModel.findOne({_id:req.body.userId});
    let cartData =await userData.cartData;
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] =1;
        console.log("✅ cartController.js is loaded");

    } else {
        cartData[req.body.itemId] +=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Added to Cart"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}

}

const getCart = async (req, res) => {



}
const removeFromCart = async (req, res) => {    


}



export default { addToCart, getCart, removeFromCart };