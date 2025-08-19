import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistPage from './pages/RegistPage/RegistPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MenuPage from './pages/MenuPage/MenuPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import AboutUsPage from './pages/AboutPage/AboutPage';
import CardPage from './pages/CartPage/CardPage';
import Products from './Products/Product';
import CheckOut from './pages/CheckOut/CheckOut';
import OrderPage from './pages/OrderPage/OrderPage';
import SideBar from './components/DropDownMenu/DropDownMenu';

function App() {

    // quản lý sản phẩm đang hiển thị chi tiết
    const [selectedProduct, setSelectedProduct] = useState(null);
    const handleOpen = (product) => setSelectedProduct(product);
    const handleClose = () => setSelectedProduct(null);

    // quản lý giỏ hàng
    const [cartItems, setCartItems] = useState([]);
    const handleAddToCart = (product, quantity = 1, note = "") => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity, note }
                        : item
                );
            } else {
                return [...prev, { ...product, quantity, note }];
            }
        });
    };

    // thông tin người dùng
    const initialData = {
        userID: '123456789',
        loginName: 'ChinhNguyen1152k5',
        email: 'Chinhnguyen115@gmail.com',
        phone: '123456789',
        gender: 'Nam',
        day: '11',
        month: '05',
        year: '2005'
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [profileData, setProfileData] = useState(initialData);
    const [avatarImage, setAvatarImage] = useState(null);
    const getInitialAvatar = () => {
        return profileData.loginName.charAt(0).toUpperCase();
    };

    const handleSearch = (term) => setSearchTerm(term);
    const handleAvatarChange = (change) => setAvatarImage(change);
    const handleProfileData = (change) => setProfileData(change);

    return (
        <>
            <SideBar/>
            <Header
                onSearch={handleSearch}
                avatarImage={avatarImage}
                getInitialAvatar={getInitialAvatar}
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            selectedProduct={selectedProduct}
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                            handleAddToCart={handleAddToCart}
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
                            handleAddToCart={handleAddToCart}
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
                            setAvatarImage={handleAvatarChange}
                            getInitialAvatar={getInitialAvatar}
                            profileData={profileData}
                            setProfileData={handleProfileData}
                            initialData={initialData}
                        />
                    }
                />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route
                    path="/cart"
                    element={
                        <CardPage
                            cartItems={cartItems}
                            setCartItems={setCartItems}
                        />
                    }
                />
                <Route path="/checkout" element={
                    <CheckOut
                        Products={Products}
                        searchTerm={searchTerm}
                        onSearch={handleSearch}
                        handleAddToCart={handleAddToCart}
                        selectedProduct={selectedProduct}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />} />

            </Routes>
            <Footer />
        </>
    );
}
localStorage.clear();
export default App;

