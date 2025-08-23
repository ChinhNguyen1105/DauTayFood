import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';  // ✅ Gọi App tổng (nơi chứa Header + Route)
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import ThemeProvider from './context/ThemeProvider';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <CartProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </CartProvider>
    </StrictMode>
  </BrowserRouter>
);

