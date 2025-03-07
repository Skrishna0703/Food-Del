import React from "react";
import "./FoodDisplay.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

 

  const { food_list } = context;

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => (
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

