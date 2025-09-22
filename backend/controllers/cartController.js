import userModel from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    console.log("✅ addToCart called");
    return res
      .status(200)
      .json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.error("AddToCart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// Get user cart
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    return res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error("GetCart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = { ...userData.cartData };

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // cleanup
      }

      await userModel.findByIdAndUpdate(userId, { cartData });

      console.log("✅ removeFromCart called");
      return res
        .status(200)
        .json({ success: true, message: "Item removed from cart" });
    }

    return res
      .status(400)
      .json({ success: false, message: "Item not in cart" });
  } catch (error) {
    console.error("RemoveFromCart Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

export default { addToCart, getCart, removeFromCart };
