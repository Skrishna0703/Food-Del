// PlaceOrder.jsx
import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    const orderItems = [];
    food_list.forEach((item) => {
      const id = String(item._id || item.id);
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
      toast.warn("Your cart is empty!");
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
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      const { order_id, amount, key_id } = res.data;

      const options = {
        key: key_id,
        amount: amount,
        currency: "INR",
        name: "Tomato Food ",
        description: "Food Order Payment",
        image: "/logo.png",
        order_id: order_id,
        handler: function (response) {
          toast.success("Payment successful!");
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
          color: "Tomato"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Order error", err?.response?.data || err.message);

      // Handle expired / invalid token
      if (err.response?.status === 401) {
        toast.error(err.response?.data?.message || "Session expired, please log in.");
        localStorage.removeItem("token"); 
        navigate("/login"); 
        return;
      }

      toast.error("Something went wrong while placing the order.");
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
