import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import  StoreContextProvider  from "./Context/StoreContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
