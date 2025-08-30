import React, { useContext, useState, useEffect } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image, isFavorite, toggleFavorite }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

  // ✅ New state for Read More / Read Less
  const [expanded, setExpanded] = useState(false);

  // Track viewed items for recommendations
  useEffect(() => {
    // Get current view history from localStorage
    const viewHistory = JSON.parse(localStorage.getItem('viewHistory')) || [];
    
    // Add current item to history if not already at the top
    if (viewHistory[0] !== id) {
      // Remove this item if it exists elsewhere in the history
      const filteredHistory = viewHistory.filter(itemId => itemId !== id);
      
      // Add to the beginning and limit to 10 items
      const updatedHistory = [id, ...filteredHistory].slice(0, 10);
      
      // Save back to localStorage
      localStorage.setItem('viewHistory', JSON.stringify(updatedHistory));
    }
  }, [id]);

  return (
    <div className={`food-item`}>
      <div className={`food-item-img-container`} >
        {/* ✅ Correct image path */}
        <img 
          className='food-item-image' 
          src={`${url}/images/${image}`} 
          alt={name} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = assets.image_not_found; // fallback
          }}
        />
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation(); // Prevent event bubbling
            toggleFavorite(id);
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        {/* ✅ Add / Remove buttons */}
        {!cartItem[id] ? (
          <img 
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              addToCart(id);
            }} 
            src={assets.add_icon_white} 
            alt="add" 
            className="add" 
          />
        ) : (
          <div className="food-item-count">
            <img 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                removeFromCart(id);
              }} 
              src={assets.remove_icon_red} 
              alt="remove" 
            />
            <p>{cartItem[id]}</p>
            <img 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                addToCart(id);
              }} 
              src={assets.add_icon_green} 
              alt="add" 
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p className="food-title"><p>{name}</p></p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        {/* ✅ Updated description with smooth expand/collapse */}
        <p className={`food-item-desc ${expanded ? 'expanded' : ''}`}>
          {expanded ? description : `${description.substring(0, 60)}...`}
          {description.length > 60 && (
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                setExpanded(!expanded);
              }} 
              className={`read-more-btn`}
            >
              {expanded ? ' Read Less' : ' Read More'}
            </button>
          )}
        </p>

        <p className={`food-item-price`}>₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
