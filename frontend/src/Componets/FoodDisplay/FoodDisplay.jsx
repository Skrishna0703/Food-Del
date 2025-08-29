import React, { useContext, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  if (!context) {
    console.error("StoreContext is null. Ensure StoreContextProvider wraps the component tree.");
    return <div>Error: Store context unavailable.</div>;
  }

  const { food_list, favorites, toggleFavorite } = context;

  // Defensive check to make sure food_list is an array
  if (!Array.isArray(food_list)) {
    console.warn("food_list is not an array. Got:", food_list);
    return <div>Loading food items...</div>;
  }

  const [sortOption, setSortOption] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);

  let filteredFoodList = food_list.filter(
    (item) =>
      category === "All" ||
      item.category?.toLowerCase().trim() === category.toLowerCase().trim()
  );
  
  if (showFavorites) {
    filteredFoodList = filteredFoodList.filter((item) => favorites.includes(item._id));
  }

  if (sortOption === "alpha-asc") {
    filteredFoodList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === "alpha-desc") {
    filteredFoodList.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortOption === "price-asc") {
    filteredFoodList.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredFoodList.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="cont">
        <div className="sort-container">
          <label htmlFor="sort">Sort by: </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="alpha-asc">Alphabet (A → Z)</option>
            <option value="alpha-desc">Alphabet (Z → A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>
        </div>
        <div className="fav-filter">
          <label htmlFor="showFavourites" className="custom-checkbox">
            <input 
              type="checkbox" 
              id="showFavourites" 
              checked={showFavorites} 
              onChange={(e) => setShowFavorites(e.target.checked)} 
            />
            <span className="checkmark"></span>
            Show Favorites
          </label>
        </div>
      </div>

      <div className="food-display-list">
        {filteredFoodList.length === 0 ? (
          showFavorites ? (
            <p>No favorites yet. ⭐ Add some dishes to your favorites!</p>
          ) : (
            <p>No food items found.</p>
          )
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
