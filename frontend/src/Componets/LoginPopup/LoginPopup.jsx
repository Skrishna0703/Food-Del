import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [current, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showChecklist, setShowChecklist] = useState(false);

  // ✅ password rules
  const rules = {
    length: data.password.length >= 8,
    lowercase: /[a-z]/.test(data.password),
    uppercase: /[A-Z]/.test(data.password),
    number: /\d/.test(data.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(data.password),
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();


    let newUrl =
      current === "Login"
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
        toast.success("Account created successfully!");
        setShowLogin(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("❌ Login/Register failed:", err);
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  // ✅ fixed template literal
  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
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
						onChange={(e) => {
							onChangeHandler(e);
							setShowChecklist(true); // show while typing
						}}
						onBlur={() => setShowChecklist(false)} // hide when finished
						placeholder="Enter your password"
						required
					/>

        {/* Normal login button */}
        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* ✅ Google login button placed right below */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={googleLogin}
          className="google-login-btn"
        >
          <FcGoogle size={22} />
          <span>Continue with Google</span>
        </motion.button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms & Conditions and Privacy Policy</p>
        </div>

					{/* ✅ Password Checklist (only for Sign Up) */}
					{current === "Sign Up" &&
						showChecklist &&
						data.password.length > 0 && (
							<ul className="password-checklist">
								<li className={rules.uppercase ? "valid" : "invalid"}>
									• Contains uppercase
								</li>
								<li className={rules.lowercase ? "valid" : "invalid"}>
									• Contains lowercase
								</li>
								<li className={rules.number ? "valid" : "invalid"}>
									• Contains number
								</li>
								<li className={rules.specialChar ? "valid" : "invalid"}>
									• Contains special character
								</li>
								<li className={rules.length ? "valid" : "invalid"}>
									• Minimum 8 characters
								</li>
							</ul>
						)}
				</div>

                {/* Normal login button */}
                <button type="submit">
                    {current === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {/* Google login button */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={googleLogin}
                    className="google-login-btn"
                >
                    <FcGoogle size={22} />
                    <span>Continue with Google</span>
                </motion.button>

                {current === "Sign Up" && (
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>I agree to the Terms & Conditions and Privacy Policy</p>
                    </div>
                )}

                <p>
                    {current === "Login" ? (
                        <>
                            Create New Account?{" "}
                            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span onClick={() => setCurrentState("Login")}>Click here</span>
                        </>
                    )}
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPopup;
