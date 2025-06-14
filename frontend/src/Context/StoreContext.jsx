import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const foodItem = food_list.find((food) => food._id === item);
        if (foodItem && typeof foodItem.price === "number") {
          totalAmount += foodItem.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartCount = () => {
    return Object.values(cartItem).reduce((sum, qty) => sum + qty, 0);
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/foods/list`);
      if (Array.isArray(response.data.foods)) {
        setFoodList(response.data.foods);
      } else {
        console.error("Expected 'foods' to be an array:", response.data);
        setFoodList([]);
      }
    } catch (error) {
      console.error("Failed to fetch food list", error);
      setFoodList([]);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  const contextValue = {
    food_list,
    cartItem,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartCount,
    url,
    token,
    setToken,
    fetchFoodList,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
