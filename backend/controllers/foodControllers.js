import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
const addFood = async (req, res) => {
  try {
    const img_filename = req.file?.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: img_filename,
    });

    await food.save();

    return res.status(201).json({
      success: true,
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    console.error("AddFood Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add food item",
      error: error.message,
    });
  }
};

// Get all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    return res.status(200).json({
      success: true,
      message: "Food items retrieved successfully",
      foods,
    });
  } catch (error) {
    console.error("ListFood Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve food items",
      error: error.message,
    });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body;
    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Remove file safely
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.warn("File delete warning:", err.message);
    });

    await foodModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Food item removed successfully",
    });
  } catch (error) {
    console.error("RemoveFood Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove food item",
      error: error.message,
    });
  }
};

export { addFood, listFood, removeFood };
