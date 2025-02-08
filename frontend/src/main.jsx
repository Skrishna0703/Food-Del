import { BrowserRouter } from "react-router-dom";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import  StoreContextProvider  from "./Context/StoreContext.jsx";

import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
);
