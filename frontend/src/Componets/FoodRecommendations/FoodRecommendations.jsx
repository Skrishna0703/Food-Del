import React, { useState, useEffect, useContext, useCallback } from 'react';
import './FoodRecommendations.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import { motion } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';

const FoodRecommendations = ({ category }) => {
  const { food_list, cartItem, favorites, toggleFavorite, viewHistory, trackViewedItem } = useContext(StoreContext);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationTitle, setRecommendationTitle] = useState('Recommended For You');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Generate recommendations based on different factors
  const generateRecommendations = useCallback(() => {
    if (!Array.isArray(food_list) || food_list.length === 0) return;
    
    setIsRefreshing(true);
    
    // Create a copy of the food list to work with
    const allFoods = [...food_list];
    
    // Shuffle the array for randomness when needed
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    
    // Get food items by IDs
    const getFoodsByIds = (ids) => {
      return ids.map(id => allFoods.find(food => food._id === id)).filter(Boolean);
    };
    
    // Get foods by category
    const getFoodsByCategory = (categoryName) => {
      return allFoods.filter(food => 
        food.category?.toLowerCase().trim() === categoryName.toLowerCase().trim()
      );
    };
    
    // Recommendation strategies
    const strategies = [
      // 1. Based on favorites
      () => {
        if (favorites.length > 0) {
          // Get categories of favorite items
          const favoriteFoods = getFoodsByIds(favorites);
          const favoriteCategories = [...new Set(favoriteFoods.map(food => food.category))];
          
          // Get items from the same categories but not in favorites
          const recommendedFromFavorites = allFoods.filter(food => 
            favoriteCategories.includes(food.category) && !favorites.includes(food._id)
          );
          
          if (recommendedFromFavorites.length >= 4) {
            setRecommendationTitle('Based on Your Favorites');
            return shuffleArray(recommendedFromFavorites).slice(0, 4);
          }
        }
        return null;
      },
      
      // 2. Based on cart contents
      () => {
        const cartIds = Object.keys(cartItem);
        if (cartIds.length > 0) {
          // Get categories of cart items
          const cartFoods = getFoodsByIds(cartIds);
          const cartCategories = [...new Set(cartFoods.map(food => food.category))];
          
          // Get items from the same categories but not in cart
          const recommendedFromCart = allFoods.filter(food => 
            cartCategories.includes(food.category) && !cartIds.includes(food._id)
          );
          
          if (recommendedFromCart.length >= 4) {
            setRecommendationTitle('Based on Your Cart');
            return shuffleArray(recommendedFromCart).slice(0, 4);
          }
        }
        return null;
      },
      
      // 3. Based on browsing/view history
      () => {
        if (viewHistory.length > 0) {
          // Get categories of recently viewed items
          const viewedFoods = getFoodsByIds(viewHistory);
          const viewedCategories = [...new Set(viewedFoods.map(food => food.category))];
          
          // Get items from the same categories but not recently viewed
          const recommendedFromHistory = allFoods.filter(food => 
            viewedCategories.includes(food.category) && !viewHistory.includes(food._id)
          );
          
          if (recommendedFromHistory.length >= 4) {
            setRecommendationTitle('Based on Your Recent Views');
            return shuffleArray(recommendedFromHistory).slice(0, 4);
          }
        }
        return null;
      },
      
      // 4. Based on selected category
      () => {
        if (category && category !== 'All') {
          const categoryFoods = getFoodsByCategory(category);
          
          if (categoryFoods.length >= 4) {
            setRecommendationTitle(`More ${category} Options`);
            return shuffleArray(categoryFoods).slice(0, 4);
          }
        }
        return null;
      },
      
      // 5. Fallback: Popular/random items
      () => {
        setRecommendationTitle('Popular Items');
        return shuffleArray(allFoods).slice(0, 4);
      }
    ];
    
    // Try each strategy in order until we get recommendations
    let recommendedItems = null;
    for (const strategy of strategies) {
      recommendedItems = strategy();
      if (recommendedItems) break;
    }
    
    setRecommendations(recommendedItems || []);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  }, [food_list, favorites, cartItem, viewHistory, category]);
  
  // Generate recommendations on initial load and when dependencies change
  useEffect(() => {
    generateRecommendations();
    
    // Auto-refresh recommendations every 2 minutes
    const refreshInterval = setInterval(() => {
      generateRecommendations();
    }, 120000); // 2 minutes
    
    return () => clearInterval(refreshInterval);
  }, [generateRecommendations]);
  
  // Handle manual refresh
  const handleRefresh = () => {
    generateRecommendations();
  };
  
  // Handle food item click to track view history
  const handleFoodItemClick = (id) => {
    trackViewedItem(id);
  };
  
  return (
    <div className="food-recommendations">
      <div className="recommendations-header">
        <h2>{recommendationTitle}</h2>
        <motion.button 
          className="refresh-button"
          onClick={handleRefresh}
          whileTap={{ scale: 0.95 }}
          animate={isRefreshing ? { rotate: 360 } : { rotate: 0 }}
          transition={isRefreshing ? { duration: 0.5 } : { duration: 0 }}
        >
          <FiRefreshCw />
        </motion.button>
      </div>
      
      <div className="recommendations-container">
        {recommendations.length === 0 ? (
          <p>Loading recommendations...</p>
        ) : (
          <motion.div 
            className="recommendations-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {recommendations.map((item) => (
              <div key={item._id} onClick={() => handleFoodItemClick(item._id)}>
                <FoodItem 
                  id={item._id} 
                  name={item.name} 
                  description={item.description} 
                  price={item.price} 
                  image={item.image} 
                  isFavorite={favorites.includes(item._id)}
                  toggleFavorite={toggleFavorite}
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FoodRecommendations;