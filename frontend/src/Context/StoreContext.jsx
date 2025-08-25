// frontend/src/Context/StoreContext.jsx
import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "https://tomato-backend-8sua.onrender.com";

  // ✅ Load cart from localStorage (guest users)
  useEffect(() => {
    const localCart = localStorage.getItem("cartItem");
    if (localCart && !token) {
      setCartItems(JSON.parse(localCart));
    }

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Loaded token:", storedToken); // debug
      setToken(storedToken);
    }
  }, []);

  // ✅ Save cart to localStorage when not logged in
  useEffect(() => {
    if (!token) {
      localStorage.setItem("cartItem", JSON.stringify(cartItem));
    }
  }, [cartItem, token]);

  // Add to Cart
  const addToCart = useCallback(
    async (itemId) => {
      if (!cartItem[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }

      try {
        if (token) {
          const response = await axios.post(
            `${url}/api/carts/add`,
            { itemId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          toast.success("Item added to cart");
          console.log("Item added:", response.data);
        } else {
          toast.warn("Please login to add items to cart");
        }
      } catch (err) {
        console.error("Error adding to cart:", err);
        toast.error("❌ Failed to add item");
      }
    },
    [token, cartItem]
  );

  // Remove from Cart
  const removeFromCart = useCallback(
    async (itemId) => {
      const itemExists = cartItem[itemId];

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
        if (token && itemExists) {
          await axios.post(
            `${url}/api/carts/remove`,
            { itemId },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          toast.info("Item removed from cart");
        } else if (!token) {
          toast.warn("Please login to remove items");
        }
      } catch (err) {
        console.error("Error removing from cart:", err);
        toast.error("❌ Failed to remove item");
      }
    },
    [token, cartItem]
  );

  // Total Amount
  const getTotalCartAmount = () => {
    let total = 0;
    for (const id in cartItem) {
      const food = food_list.find((f) => f._id === id);
      if (food && typeof food.price === "number") {
        total += food.price * cartItem[id];
      }
    }
    return total;
  };

  // Total Count
  const getTotalCartCount = () => {
    return Object.values(cartItem).reduce((a, b) => a + b, 0);
  };

  // Fetch Foods
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/foods/list`);
      if (Array.isArray(res.data.foods)) {
        setFoodList(res.data.foods);
        toast.success("Welcome to Tomato");
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      console.error("Failed to fetch food list:", err);
      setFoodList([]);
      toast.error("❌ Failed to fetch food items");
    }
  };

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();

      if (token) {
        try {
          const res = await axios.post(
            `${url}/api/carts/get`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (res.data.success) {
            setCartItems(res.data.cartData || {});
            toast.success("🛒 Cart loaded");
          } else {
            toast.warn("⚠️ Failed to load cart");
          }
        } catch (err) {
          console.error("Cart fetch error:", err);
          toast.error("❌ Error loading cart");
        }
      }
    };
    loadData();
  }, [token]);

  // Save token when updated
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
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
