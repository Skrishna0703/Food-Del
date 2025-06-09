import foodModel from "../models/foodModel.js"; // include `.js` extension if using ES Modules
import fs from "fs";

// Add food item

const addFood = async (req, res) => {
 let img_filename=`${req.file.filename}`;

 const food = new foodModel({
   name: req.body.name,
   description: req.body.description,
  price: req.body.price,
  category: req.body.category,
  image: img_filename, // Store the filename image: img_filename, // Store the filename
  
  
  
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
//all food list
const listFood =async (req, res) => {
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
}

//remove food item
const removeFood = async (req, res) => {
  
  try {
    const food = await foodModel.findById(req.body.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({
      success: true,
      message: "Food item removed successfully",
    });
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
export { addFood, listFood , removeFood };
