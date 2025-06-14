import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "http://localhost:4000";

  // 🛒 Add to Cart
const addToCart = useCallback(async (itemId) => {
  if (!cartItem[itemId]) {
    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  } else {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  try {
    if (token) {
      const response = await axios.post(`${url}/api/carts/add`, { itemId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("✅ Item added to cart:", response.data);
    }
  } catch (err) {
    console.error("❌ Error adding to cart:", err?.response?.data || err.message || err);
  }
}, [token, cartItem]);



  // ❌ Remove from Cart
  const removeFromCart = useCallback(async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });

    try {
      if (token) {
        await axios.post(`${url}/api/carts/remove`, { itemId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (err) {
      console.error("❌ Error removing from cart:", err);
    }
  }, [token]);

  // 💰 Total Cart Amount
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

  // 🧮 Total Cart Count
  const getTotalCartCount = () => {
    return Object.values(cartItem).reduce((sum, qty) => sum + qty, 0);
  };

  // 🍽️ Fetch Food List
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

  // 🔄 Fetch Cart from Backend
  const fetchCartData = async () => {
    try {
      const response = await axios.post(`${url}/api/carts/get`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Failed to fetch cart data", error);
    }
  };



  // 📦 On First Load
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await fetchCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);

  // 🔐 Fetch Cart whenever token updates
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      fetchCartData();
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
