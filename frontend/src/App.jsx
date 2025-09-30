import React, { useState, useRef,useEffect } from 'react';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footer/Footer';
import LoginPopup from './Componets/LoginPopup/LoginPopup';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';
import Review from './Pages/Review/Review';
import Privacy from './Pages/Privacy/Privacy';
import CartSummaryBar from "./Componets/CartSummaryBar/CartSummaryBar";
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './Componets/ScrollToTop';

import { ToastContainer } from 'react-toastify';
import Chatbot from './Componets/Chatbot';
import 'react-toastify/dist/ReactToastify.css';

import ThemeToggle from "./Componets/ThemeToggle";


import About from './Pages/About/About';


// ✅ Inline arrow styles
const arrowStyle = {
  position: 'fixed',
  bottom: '60px',
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

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);

    // Clean the URL
    window.history.replaceState({}, document.title, "/");

    // Fetch user info
    fetchUser(token);
  }
}, []);

const fetchUser = async (token) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  } catch (err) {
    console.error("Failed to fetch user:", err);
  }
};

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className="app">
        <ScrollToTop/>
        <Navbar setShowLogin={setShowLogin} />

        <div style={{ position: "absolute", top: "30px", right: "60px", zIndex: 1000 }}>
          {/* <ThemeToggle />  */}
        </div>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/review" element={<Review />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />


        </Routes>
        <CartSummaryBar />
        <ToastContainer position="top-right" autoClose={3000} />
      </div >
      <Chatbot/>
      {/* ✅ Footer with ref */}
      < div ref={footerRef} id='footer' >
        <Footer />
      </div >
    </>
  );
};

export default App;
