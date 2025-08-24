import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import ThemeToggle from '../ThemeToggle.jsx';
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink } from 'react-router-hash-link';


export const Navbar = ({ setShowLogin }) => {
  const [Menu, setMenu] = useState("");
  const { getTotalCartAmount, token, setToken, cartItem } = useContext(StoreContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    navigate("/");
  };

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


     {/* Navbar links: ensure semantic hover/focus accessibility */}
<ul className="navbar-menu">
  <li>
    <HashLink smooth to='/' onClick={() => setMenu("Home")} className={Menu === "Home" ? "active" : ""}>Home</HashLink >
  </li>
  <li>
    <HashLink smooth to='/#explore-menu' onClick={() => setMenu("Menu")} className={Menu === "Menu" ? "active" : ""}>Menu</HashLink >
  </li>
  <li>
    <HashLink smooth to='/#app-download' onClick={() => setMenu("Mobile-App")} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</HashLink>
  </li>
  <li>
    <HashLink smooth to='/#customer-reviews' onClick={() => setMenu("Reviews")} className={Menu === "Reviews" ? "active" : ""}>Reviews</HashLink>
  </li>
  <li> 
    <a
    href="#footer"
    onClick={(e) => {
      e.preventDefault();
      document.getElementById("footer")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setMenu("Contact");
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

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="mobile-menu">
          <li>
            <HashLink smooth to='/' onClick={() => {setMenu("Home"); setMenuOpen(false)}} className={Menu === "Home" ? "active" : ""}>Home</HashLink >
          </li>
          <li>
            <HashLink smooth to='/#explore-menu' onClick={() => {setMenu("Menu"); setMenuOpen(false)}} className={Menu === "Menu" ? "active" : ""}>Menu</HashLink >
          </li>
          <li>
            <HashLink smooth to='/#app-download' onClick={() => {setMenu("Mobile-App"); setMenuOpen(false)}} className={Menu === "Mobile-App" ? "active" : ""}>Mobile-App</HashLink>
          </li>
          <li>
            <HashLink smooth to='/#customer-reviews' onClick={() => {setMenu("Reviews"); setMenuOpen(false)}} className={Menu === "Reviews" ? "active" : ""}>Reviews</HashLink>
          </li>
          <li>
            <a
              href="#footer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("footer")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });
                setMenu("Contact");
                setMenuOpen(false);
              }}
              className={Menu === "Contact" ? "active" : ""}
            >
              Contact
            </a>
          </li>
          <li>
            {!token ? (
              <button onClick={() => { setShowLogin(true); setMenuOpen(false); }}>Sign in</button>
            ) : (
              <p onClick={() => { handleLogout(); setMenuOpen(false); }}>LogOut</p>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
