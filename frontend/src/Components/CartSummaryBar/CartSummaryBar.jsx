import React, { useContext } from 'react';
import './CartSummaryBar.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate, useLocation } from 'react-router-dom'; 

const CartSummaryBar = () => {
  const { cartItem, getTotalCartAmount } = useContext(StoreContext);
  console.log("🛒 cartItems:", cartItem); 
  const navigate = useNavigate();
  const location = useLocation(); 

  const safeCartItems = cartItem || {};
  const totalItems = Object.values(safeCartItems).reduce((sum, item) => sum + item, 0);
  const totalAmount = getTotalCartAmount()? getTotalCartAmount() : 0;

  // Don't show if cart is empty or if you're already on the cart page
  if (totalItems === 0 || location.pathname === '/cart') return null;

  return (
    <div className="cart-summary-bar">
      <div className="cart-summary-info">
        🛒 {totalItems} item{totalItems > 1 ? 's' : ''} | 💵 ₹{totalAmount}
      </div>
      <button className="view-cart-btn" onClick={() => navigate('/cart')}>
        VIEW CART
      </button>
    </div>
  );
};

export default CartSummaryBar;

