import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Context
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { SearchProvider } from "./context/SearchContext";
import "./index.css";   // 👈 nhớ import Tailwind ở đây
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <LanguageProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </LanguageProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
