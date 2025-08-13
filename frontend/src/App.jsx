import React, { useState, useRef } from 'react';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footer/Footer';
import LoginPopup from './Componets/LoginPopup/LoginPopup';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Review from './Pages/Review/Review';
import { Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeToggle from "./Componets/ThemeToggle";


import About from './Pages/About/About';


// ✅ Inline arrow styles
const arrowStyle = {
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  background: '#ea6208ff',
  color: '#fff',
  padding: '10px 12px',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: '18px',
  zIndex: 1000,
  boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  border: 'none',
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const footerRef = useRef(null);

  const handleArrowClick = () => {
    if (atFooter) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setAtFooter(false);
    } else {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
      setAtFooter(true);
    }
  };

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />

      <div style={{ position: "absolute", top: "30px", right: "60px", zIndex: 1000 }}>
  <ThemeToggle />
</div>

        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about" element={<About/>} />
          

        </Routes>

        <ToastContainer position="top-right" autoClose={3000} />

        {/* ✅ Scroll Arrow Button */}
        <button onClick={handleArrowClick} style={arrowStyle}>
          {atFooter ? '↑' : '↓'}
        </button>
      </div>

      {/* ✅ Footer with ref */}
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default App;
