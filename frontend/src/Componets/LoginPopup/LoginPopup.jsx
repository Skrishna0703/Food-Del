import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import "./LoginPopup.css";
import { StoreContext } from "../../Context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const [current, setCurrent] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { setToken } = useContext(StoreContext);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API call here...
  };

  const handleGoogleLogin = () => {
    // Google OAuth URL
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="login-popup" onClick={() => setShowLogin(false)}>
      <motion.div
        className="login-popup-container"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="login-popup-title">
          <span>{current}</span>
          <img
            src="https://img.icons8.com/ios-filled/50/000000/macos-close.png"
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <form className="login-popup-inputs" onSubmit={handleSubmit}>
          {current === "Register" && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{current}</button>
        </form>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <p>
          {current === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={() => setCurrent(current === "Login" ? "Register" : "Login")}>
            {current === "Login" ? "Register" : "Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPopup;
