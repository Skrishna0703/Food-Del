import userModel from '../models/userModel.js';

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if user exists
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update cartData
    let cartData = userData.cartData || {};
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    console.log("✅ addToCart called");
    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("❌ addToCart error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    // Check if user exists
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("❌ getCart error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    // Check if user exists
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // optional cleanup
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      console.log("✅ removeFromCart called");
      res.status(200).json({ success: true, message: "Item removed from cart" });
    } else {
      res.status(400).json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.error("❌ removeFromCart error:", error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export default { addToCart, getCart, removeFromCart };
