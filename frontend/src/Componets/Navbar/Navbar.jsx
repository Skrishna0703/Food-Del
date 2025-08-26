import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ThemeToggle from '../ThemeToggle.jsx';
import { FaBars, FaTimes } from "react-icons/fa";
import AccountDropdown from '../AccountDropdown/AccountDropdown';

export const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("");
  const { getTotalCartAmount, token, cartItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalCartItems = Object.values(cartItem || {}).reduce((sum, qty) => sum + qty, 0);

  const handleScroll = (id, menuName) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenu(menuName);
    }
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="logo" className="logo" /></Link>

      {/* Navbar links */}
      <ul className="navbar-menu">
        <li>
          <Link to="/" onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link to="/#explore-menu" onClick={() => handleScroll("explore-menu", "Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</Link>
        </li>
        <li>
          <Link to="/#app-download" onClick={() => handleScroll("app-download", "Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</Link>
        </li>
        <li>
          <Link to="/#customer-reviews" onClick={() => handleScroll("customer-reviews", "Reviews")} className={Menu === "Reviews" ? "active" : ""}>Reviews</Link>
        </li>
        <li>
          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("footer", "Contact");
            }}
            className={Menu === "Contact" ? "active" : ""}
          >
            Contact
          </a>
        </li>
      </ul>

      <div className="navbar-right">
        <ThemeToggle />
        <Link to='/cart' className="cart-icon">
          <div className="cart-wrapper">
            <img src={assets.basket_icon} alt="cart" className="cart-img" />
            <span className="cart-text">Cart</span>
            {totalCartItems > 0 && (
              <div className='cart-badge'>{totalCartItems}</div>
            )}
          </div>
        </Link>

        {/* Sign in button or AccountDropdown */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <AccountDropdown />
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
