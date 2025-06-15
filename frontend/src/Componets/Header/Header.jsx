import React from "react";
import "./Header.css";

export const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-contents">
          <h2>Order Your Favourite Food!</h2>
          <p>
            Craving something delicious? Discover a wide variety of freshly prepared meals delivered straight to your doorstep. Fast, tasty, and just a click away!
          </p>
          <button>View Menu</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
