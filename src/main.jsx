import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "../context/UserContext.jsx";
import { FoodProvider } from "../context/FoodContext.jsx";
import { CartProvider } from "../context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <FoodProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FoodProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
