import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const LoginPopup = ({ setShowLogin }) => {
  const {url}=useContext(StoreContext);
  const [current, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",   
    email: "",
    password: ""

  });
  const onChangehandler =(event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData({...data, [name]: value});
  }
  
const onLogin = async (event) => {
  event.preventDefault();


  }

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
          {current === "Login" ? null : (
            <input type="text" name='name' onChange={onChangehandler} value={data.name} placeholder="Enter your name" required />
          )}
          <input type="email" name='email' onChange={onChangehandler} value={data.email} placeholder="Enter your email" required />
          <input type="password" name='password' onChange={onChangehandler} value={data.password} placeholder="Enter your password" required />
        </div>

        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>
            I agree to the Terms & Conditions and{" "}
            Privacy Policy
          </p>
        </div>

        {current === "Login" ? (
          <p>
            Create New Account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
