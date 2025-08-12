import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const getInitial = () => {
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
    return false;
  };

  const [darkMode, setDarkMode] = useState(getInitial);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
