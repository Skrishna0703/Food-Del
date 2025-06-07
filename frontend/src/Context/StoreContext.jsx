import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext({ food_list });

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const addToCart = (itemId) => {
    if (!cartItem[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
 const getTotalCartAmount=(itemId)=>{

  let totalAmount=0;
  for (const item in cartItem) {
       if (cartItem[item] > 0) {
        const foodItem = food_list.find((food) => food._id === item);
        if (foodItem) {
          totalAmount += foodItem.price * cartItem[item];
        }
      }
    }
    return totalAmount;
 }

  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
