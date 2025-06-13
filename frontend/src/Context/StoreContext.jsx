import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { food_list } from "../assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  // ✅ Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  // ✅ Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] > 1 ? prev[itemId] - 1 : 0,
    }));
  };

  // ✅ Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const foodItem = food_list.find((food) => food._id === item);
        if (foodItem) {
          totalAmount += foodItem.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  // ✅ Fetch food list from server
const fetchFoodList = async () => {
  try {
    const response = await axios.get(`${url}/api/foods/list`);
    if (Array.isArray(response.data.foods)) {
      setFoodList(response.data.foods); // ✅ correct extraction
    } else {
      console.error("Expected 'foods' to be an array, got:", response.data);
      setFoodList([]);
    }
  } catch (error) {
    console.error("Failed to fetch food list", error);
    setFoodList([]);
  }
};


  // ✅ Load data on mount
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      // Get token from localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
