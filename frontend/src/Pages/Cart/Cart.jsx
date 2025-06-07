import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount();
  const deliveryCharge = 20;
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list.map((item) => {
          const quantity = cartItem[item._id] || 0;
          if (quantity === 0) return null;

          return (
            <div className="cart-items-title cart-items-item" key={item._id}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{quantity}</p>
              <p>₹{item.price * quantity}</p>
              <p onClick={() => removeFromCart(item._id)} className="cross">X</p>
            </div>
          );
        })}

        {/* Cart total and checkout section */}
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{totalAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>₹{deliveryCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>₹{getTotalCartAmount()===0?0:finalAmount}</p>
            </div>

            <button 
              onClick={() => navigate('/order')} 
              className="cart-checkout"
              disabled={totalAmount === 0}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
