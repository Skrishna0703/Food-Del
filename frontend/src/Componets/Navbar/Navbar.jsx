import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ThemeToggle from '../ThemeToggle.jsx';
import { FaBars, FaTimes } from "react-icons/fa";


export const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>


     {/* Navbar links: ensure semantic hover/focus accessibility */}
<ul className="navbar-menu">
  <li>
    <Link to='/' onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</Link>
  </li>
  <li>
    <a href='#explore-menu' onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</a>
  </li>
  <li>
    <a href='#app-download' onClick={() => setMenu("Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</a>
  </li>
  <li>
    <a href='#customer-reviews' onClick={() => setMenu("Reviews")} className={Menu === "Reviews" ? "active" : ""}>Reviews</a>
  </li>
  <li>
    <a href='#footer' onClick={() => setMenu("Contact")} className={Menu === "Contact" ? "active" : ""}>Contact</a>
  </li>
</ul>



      <div className="navbar-right">
        <ThemeToggle />
        <Link to='/cart' className="cart-icon">
          <div className="cart-wrapper">
            <img src={assets.basket_icon} alt="cart" className="cart-img" />
            <span className="cart-text">Cart</span>
            {getTotalCartAmount() !== 0 && <span className="cart-dot"></span>}
          </div>
        </Link>


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
      {/* Mobile Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  );
};

export default Navbar;
