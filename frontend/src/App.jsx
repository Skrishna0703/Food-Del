import React, { useState } from 'react';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footer/Footer';
import LoginPopup from './Componets/LoginPopup/LoginPopup';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';

import { Routes, Route } from 'react-router-dom';

// ✅ Toastify Imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>

        {/* ✅ Add ToastContainer here */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>

      <Footer />
    </>
  );
};

export default App;
