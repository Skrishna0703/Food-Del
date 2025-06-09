import foodModel from "../models/foodModel.js"; // include `.js` extension if using ES Modules
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  let img_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: img_filename, // Store the filename
  });

  try {
    await food.save();
    res.status(201).json({
      success: true,
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    console.error("Error saving food item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add food item",
      error: error.message,
    });
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(200).json({
      success: true,
      message: "Food items retrieved successfully",
      foods,
    });
  } catch (error) {
    console.error("Error retrieving food items:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve food items",
      error: error.message,
    });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  const foodId = req.params.id;  // Get food ID from request params
  try {
    const food = await foodModel.findById(foodId); // Find food by ID
    if (food) {
      fs.unlink(`uploads/${food.image}`, () => {}); // Remove the image from the filesystem
      await foodModel.findByIdAndDelete(foodId); // Delete the food item
      res.status(200).json({
        success: true,
        message: "Food item removed successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }
  } catch (error) {
    console.error("Error removing food item:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove food item",
      error: error.message,
    });
  }
};

// Named export
export { addFood, listFood, removeFood };
