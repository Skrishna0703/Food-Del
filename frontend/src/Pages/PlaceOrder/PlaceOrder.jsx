// PlaceOrder.jsx
import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const PlaceOrder = () => {
  const navigate = useNavigate();
  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    // ✅ Create order items list based on cart
    const orderItems = [];
    food_list.forEach((item) => {
      const id = String(item._id || item.id); // Ensure key is string
      if (id && cartItem?.[id] > 0) {
        orderItems.push({
          _id: id,
          name: item.name,
          price: item.price,
          quantity: cartItem[id],
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };

    try {
      const res = await axios.post(`${url}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const success = await loadRazorpayScript();
      if (!success) {
        alert("Failed to load Razorpay SDK");
        return;
      }

      const { order_id, amount, key_id } = res.data;

      const options = {
        key: key_id,
        amount: amount,
        currency: "INR",
        name: "MyFoodApp",
        description: "Food Order Payment",
        image: "/logo.png",
        order_id: order_id,
        handler: function (response) {
          alert("Payment successful!");
          console.log("Razorpay response:", response);
          navigate("/order-success");
        },
        prefill: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          contact: data.phone
        },
        notes: {
          address: `${data.street}, ${data.city}, ${data.state}`
        },
        theme: {
          color: "#3399cc"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Order error", err?.response?.data || err.message);
      alert("Something went wrong while placing the order.");
    }
  };

  const totalAmount = getTotalCartAmount();
  const deliveryCharge = totalAmount > 0 ? 20 : 0;
  const finalAmount = totalAmount + deliveryCharge;

  return (
    <form onSubmit={handlePlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-field">
          <input type="text" placeholder="First Name" name="firstName" onChange={onChangeHandler} value={data.firstName} />
          <input type="text" placeholder="Last Name" name="lastName" onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input type="email" placeholder="Email Address" name="email" onChange={onChangeHandler} value={data.email} />
        <input type="text" placeholder="Street" name="street" onChange={onChangeHandler} value={data.street} />
        <div className="multi-field">
          <input type="text" placeholder="City" name="city" onChange={onChangeHandler} value={data.city} />
          <input type="text" placeholder="State" name="state" onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-field">
          <input type="text" placeholder="Zip Code" name="zipCode" onChange={onChangeHandler} value={data.zipCode} />
          <input type="text" placeholder="Country" name="country" onChange={onChangeHandler} value={data.country} />
        </div>
        <input type="text" placeholder="Phone" name="phone" onChange={onChangeHandler} value={data.phone} />
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
          <button className="cart-checkout" type="submit">
            Proceed To Checkout
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
