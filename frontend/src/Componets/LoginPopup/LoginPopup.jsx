import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ only toast

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [current, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl = current === "Login"
      ? `${url}/api/users/login`
      : `${url}/api/users/register`;

    const payload = current === "Login"
      ? { email: data.email, password: data.password }
      : { name: data.name, email: data.email, password: data.password };

    try {
      const response = await axios.post(newUrl, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(`${current} successful!`);
        setShowLogin(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("❌ Login/Register failed:", err);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{current}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          {current === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms & Conditions and Privacy Policy</p>
        </div>

        <p>
          {current === "Login" ? (
            <>Create New Account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></>
          ) : (
            <>Already have an account? <span onClick={() => setCurrentState("Login")}>Click here</span></>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
