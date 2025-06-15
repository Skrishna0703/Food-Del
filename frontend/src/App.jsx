import React, { useState } from 'react';
import Navbar from './Componets/Navbar/Navbar';
import Footer from './Componets/Footer/Footer';
import LoginPopup from './Componets/LoginPopup/LoginPopup';
import Home from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'; // ✅ FIXED: default import

import { Routes, Route } from 'react-router-dom';

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
      </div>
      
      <Footer />
    </>
  );
};

export default App;
