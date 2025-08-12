import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme; // applies class to <html>
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      className="theme-toggle-btn"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
