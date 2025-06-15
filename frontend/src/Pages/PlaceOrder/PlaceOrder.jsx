import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount,token,food_list,cartItems,url } = useContext(StoreContext);
  const [data,setData]=useState({
    
  })

  const totalAmount = getTotalCartAmount();       // e.g. ₹500
  const deliveryCharge = totalAmount > 0 ? 20 : 0; // flat rate or conditional
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />
        <div className="multi-field">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-field">
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>

      <div className="place-order-right">
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
            <p>₹{finalAmount}</p>
          </div>

          <button
            className="cart-checkout"
            type="button"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
