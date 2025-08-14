import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

export const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null);

  const handleCategoryClick = (menuName) => {
    const normalizedCategory = category?.toLowerCase().trim();
    const normalizedMenuName = menuName.toLowerCase().trim();
    setCategory(normalizedCategory === normalizedMenuName ? "All" : menuName);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose a category to filter food items or select "All" to view everything.
      </p>
      
      <div className="menu-container">
        <button className="scroll-btn left-btn" onClick={scrollLeft}>
          &#8249;
        </button>
        
        <div className="explore-menu-list" ref={scrollRef}>
          {menu_list.map((item, index) => {
            const isActive =
              category?.toLowerCase().trim() === item.menu_name.toLowerCase().trim();

            return (
              <div
                key={index}
                onClick={() => handleCategoryClick(item.menu_name)}
                className={`explore-menu-list-item ${isActive ? "active" : ""}`} 
              >
                <img
                  src={item.menu_image}
                  alt={item.menu_name}
                />
                <p>{item.menu_name}</p>
              </div>
            );
          })}
        </div>
        
        <button className="scroll-btn right-btn" onClick={scrollRight}>
          &#8250;
        </button>
      </div>

      <hr />
    </div>
  );
};

export default ExploreMenu;