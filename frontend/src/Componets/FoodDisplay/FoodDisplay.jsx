import React, { useContext,useState,useEffect } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  if (!context) {
    console.error("StoreContext is null. Ensure StoreContextProvider wraps the component tree.");
    return <div>Error: Store context unavailable.</div>;
  }

  const { food_list } = context;

  // Defensive check to make sure food_list is an array
  if (!Array.isArray(food_list)) {
    console.warn("food_list is not an array. Got:", food_list);
    return <div>Loading food items...</div>;
  }

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

    const toggleFavorite = (id) => {
    const updatedFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id) // remove
      : [...favorites, id]; // add

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };


  const filteredFoodList = food_list.filter(
    (item) =>
      category === "All" ||
      item.category?.toLowerCase().trim() === category.toLowerCase().trim()
  );

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFoodList.length === 0 ? (
          <p>No food items found.</p>
        ) : (
          filteredFoodList.map((item) => (
            <FoodItem 
              key={item._id} 
              id={item._id} 
              name={item.name} 
              description={item.description} 
              price={item.price} 
              image={item.image} 
              isFavorite={favorites.includes(item._id)}
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
