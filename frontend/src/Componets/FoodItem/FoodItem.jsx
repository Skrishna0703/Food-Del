import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ id, name, price, description, image, isFavorite, toggleFavorite }) => {
  const { cartItem, addToCart, removeFromCart, url } = useContext(StoreContext);

  // ✅ New state for Read More / Read Less
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
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
          onClick={() => toggleFavorite(id)}
        >
          {isFavorite ? '★' : '☆'}
        </button>

        {/* ✅ Add / Remove buttons */}
        {!cartItem[id] ? (
          <img 
            onClick={() => addToCart(id)} 
            src={assets.add_icon_white} 
            alt="add" 
            className="add" 
          />
        ) : (
          <div className="food-item-count">
            <img 
              onClick={() => removeFromCart(id)} 
              src={assets.remove_icon_red} 
              alt="remove" 
            />
            <p>{cartItem[id]}</p>
            <img 
              onClick={() => addToCart(id)} 
              src={assets.add_icon_green} 
              alt="add" 
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        {/* ✅ Updated description with smooth expand/collapse */}
        <p className={`food-item-desc ${expanded ? 'expanded' : ''}`}>
          {expanded ? description : `${description.substring(0, 60)}...`}
          {description.length > 60 && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="read-more-btn"
            >
              {expanded ? ' Read Less' : ' Read More'}
            </button>
          )}
        </p>

        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
