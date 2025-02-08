import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  if (!context) {
    console.error("StoreContext is null. Ensure StoreContextProvider wraps the component tree.");
    return null;
  }

  const { food_list } = context;

  const filteredFoodList = food_list.filter(
    (item) => category === "All" || category === item.category
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFoodList.map((item, index) => (
          <FoodItem 
            key={index} 
            id={item._id} 
            name={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
