import { ProductsProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { SearchProvider } from "./context/SearchContext";

export default function UserAppProviders({ children }) {
  return (
    <ProductsProvider>
      <ThemeProvider>
        <UserProvider>
          <CartProvider>
            <LanguageProvider>
              <SearchProvider>{children}</SearchProvider>
            </LanguageProvider>
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </ProductsProvider>
  );
}
