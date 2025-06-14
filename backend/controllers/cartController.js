import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    console.log("✅ addToCart called");
    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);

    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // optional: remove item if quantity is 0
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      console.log("✅ removeFromCart called");
      res.json({ success: true, message: "Item removed from cart" });
    } else {
      res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.error("❌ removeFromCart error:", error);
    res.json({ success: false, message: "Something went wrong" });
  }
};

export default { addToCart, getCart, removeFromCart };
