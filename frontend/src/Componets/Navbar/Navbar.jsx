// Navbar.jsx
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';

export const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("Menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
        <a href='#customer-reviews' onClick={() => setMenu("Reviews")} className={Menu === "Reviews" ? "active" : ""}>Reviews</a>
        <a href='#footer' onClick={() => setMenu("Contact")} className={Menu === "Contact" ? "active" : ""}>Contact</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="search" />
        <Link to='/cart' className="cart-icon-wrapper">
          <img src={assets.basket_icon} alt="cart" />
          {getTotalCartAmount() !== 0 && <span className="cart-dot"></span>}
        </Link>

        <div className="navbar-search-icon">
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}

          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="profile" />
              <ul className="nav-profile-dropdown">
                <li><img src={assets.bag_icon} alt="orders" /><p>Orders</p></li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="logout" /><p>LogOut</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
