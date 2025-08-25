import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import products from "./Products/Product";
// Layout
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import SideBar from "./components/ui/SideBar/SideBar";

// Pages
import Home from "./pages/Home/Home";
import RegistPage from "./pages/RegistPage/RegistPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import AboutUsPage from "./pages/AboutPage/AboutPage";
import CartPage from "./pages/CartPage/CardPage";
import CheckOut from "./pages/CheckOut/CheckOut";
import PayVietQRPage from "./pages/BankingQR/BankingQR";
import SettingsPage from "./pages/SettingPage/SettingPage";
import TermsPage from "./pages/TermsPage/TermsPage";

function App() {
    return (
        <>
            {/* Toaster */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 2000,
                    style: { background: "#363636", color: "#fff" },
                    success: { style: { background: "#00b09b" } },
                }}
            />

            {/* SideBar & Header */}
            <SideBar />
            <Header />

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/regist" element={<RegistPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/menu" element={<MenuPage Products={products} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckOut Products={products} />} />
                <Route path="/pay-vietqr" element={<PayVietQRPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/terms" element={<TermsPage />} />
            </Routes>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default App;
// localStorage.clear();