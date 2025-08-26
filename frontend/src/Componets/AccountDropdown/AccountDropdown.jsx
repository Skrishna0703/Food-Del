import React, { useState, useRef, useEffect, useContext } from "react";
import './AccountDropdown.css';
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext.jsx';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="account-dropdown-wrapper" ref={dropdownRef}>
      <img
        src={assets.profile_icon}
        alt="Profile"
        className="profile-img"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => navigate('/orders')}>
            <img src={assets.bag_icon} alt="orders" /> Orders
          </li>
          <li onClick={handleLogout}>
            <img src={assets.logout_icon} alt="logout" /> Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default AccountDropdown;
