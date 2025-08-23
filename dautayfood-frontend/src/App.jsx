import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import useTheme from "./hooks/useTheme";

// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SideBar from "./components/DropDownMenu/DropDownMenu";

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

// Products
import Products from "./Products/Product";

function App() {
    const { theme, toggleTheme } = useTheme();

    // Language
    const [language, setLanguage] = useState("vi");

    // Selected product for detail modal
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleOpen = (product) => setSelectedProduct(product);
    const handleClose = () => setSelectedProduct(null);

    // User info
    const initialData = {
        userID: "123456789",
        loginName: "ChinhNguyen1152k5",
        email: "Chinhnguyen115@gmail.com",
        phone: "123456789",
        gender: "Nam",
        day: "11",
        month: "05",
        year: "2005",
    };
    const [profileData, setProfileData] = useState(initialData);
    const [avatarImage, setAvatarImage] = useState(null);
    const getInitialAvatar = () => profileData.loginName.charAt(0).toUpperCase();

    // Search term
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (term) => setSearchTerm(term);

    return (
        <>
            <CartProvider>
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
                <Header
                    onSearch={handleSearch}
                    avatarImage={avatarImage}
                    getInitialAvatar={getInitialAvatar}
                />

                {/* Routes */}
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                selectedProduct={selectedProduct}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                            />
                        }
                    />
                    <Route path="/regist" element={<RegistPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/menu"
                        element={
                            <MenuPage
                                Products={Products}
                                searchTerm={searchTerm}
                                onSearch={handleSearch}
                                selectedProduct={selectedProduct}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                            />
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProfilePage
                                avatarImage={avatarImage}
                                setAvatarImage={setAvatarImage}
                                getInitialAvatar={getInitialAvatar}
                                profileData={profileData}
                                setProfileData={setProfileData}
                                initialData={initialData}
                            />
                        }
                    />
                    <Route path="/about-us" element={<AboutUsPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={
                        <CheckOut
                            Products={Products}
                            selectedProduct={selectedProduct}
                            handleOpen={handleOpen}
                            handleClose={handleClose} />} />
                    <Route path="/pay-vietqr" element={<PayVietQRPage />} />
                    <Route
                        path="/settings"
                        element={
                            <SettingsPage
                                profileData={profileData}
                                setProfileData={setProfileData}
                                language={language}
                                setLanguage={setLanguage}
                            />
                        }
                    />
                </Routes>

                {/* Footer */}
                <Footer />
            </CartProvider>
        </>
    );
}

export default App;