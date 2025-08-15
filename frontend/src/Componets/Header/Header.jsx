import React from "react";
import "./Header.css";
import { useState } from "react";

export const Header = () => {
  const [Menu, setMenu] = useState("Menu");
  return (
   <header className="header">
      <div className="header-contents">
        <h1>Order Your Favourite Food!</h1>
        <p>
          Craving something delicious? Discover a wide variety of freshly prepared meals delivered straight to your doorstep. Fast, tasty, and just a click away!
        </p>
        <button className="cta-btn" onClick={() => setMenu("Menu")}>
          View Menu
        </button>
      </div>
    </header>
  );
};

export default Header;
