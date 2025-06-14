import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

export const ExploreMenu = ({ category, setCategory }) => {
  const handleCategoryClick = (menuName) => {
    const normalizedCategory = category?.toLowerCase().trim();
    const normalizedMenuName = menuName.toLowerCase().trim();
    setCategory(normalizedCategory === normalizedMenuName ? "All" : menuName);
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose a category to filter food items or select "All" to view everything.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          const isActive =
            category?.toLowerCase().trim() === item.menu_name.toLowerCase().trim();

          return (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.menu_name)}
              className="explore-menu-list-item"
            >
              <img
                className={isActive ? "active" : ""}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
