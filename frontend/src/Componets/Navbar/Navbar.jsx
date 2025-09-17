import { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ThemeToggle from '../ThemeToggle.jsx';
import { FaBars, FaTimes } from "react-icons/fa";
import AccountDropdown from '../AccountDropdown/AccountDropdown';

export const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("");
  const { cartItem, token } = useContext(StoreContext);
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
          <a
            href="#explore-menu"
            onClick={(e) => { e.preventDefault(); handleScroll("explore-menu", "Menu"); }}
            className={Menu === "Menu" ? "active" : ""}
          >
            Menu
          </a>
        </li>
        <li>
          <a
            href="#app-download"
            onClick={(e) => { e.preventDefault(); handleScroll("app-download", "Mobile-App"); }}
            className={Menu === "Mobile-App" ? "active" : ""}
          >
            Mobile-App
          </a>
        </li>
        <li>
          <a
            href="#customer-reviews"
            onClick={(e) => { e.preventDefault(); handleScroll("customer-reviews", "Reviews"); }}
            className={Menu === "Reviews" ? "active" : ""}
          >
            Reviews
          </a>
        </li>
        <li>
          <a
            href="#footer"
            onClick={(e) => { e.preventDefault(); handleScroll("footer", "Contact"); }}
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

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li>
            <Link to="/" onClick={() => { setMenu("Home"); setMenuOpen(false); }} className={Menu === "Home" ? "active" : ""}>Home</Link>
          </li>
          <li>
            <button onClick={() => handleScroll("explore-menu", "Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</button>
          </li>
          <li>
            <button onClick={() => handleScroll("app-download", "Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</button>
          </li>
          <li>
            <button onClick={() => handleScroll("customer-reviews", "Reviews")} className={Menu === "Reviews" ? "active" : ""}>Reviews</button>
          </li>
          <li>
            <button onClick={() => handleScroll("footer", "Contact")} className={Menu === "Contact" ? "active" : ""}>Contact</button>
          </li>

          {/* Cart link */}
          <li>
            <Link to='/cart' onClick={() => setMenuOpen(false)} className="cart-link">Cart {totalCartItems > 0 && `(${totalCartItems})`}</Link>
          </li>

          {/* Sign in or account */}
          <li>
            {!token ? (
              <button onClick={() => { setShowLogin(true); setMenuOpen(false); }}>Sign in</button>
            ) : (
              <AccountDropdown />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
