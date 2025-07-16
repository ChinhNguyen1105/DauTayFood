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
import PayPage from './pages/PayPage/PayPage';
import Products from './Product';

function App() {
    // Add debugging log at the top of component
    console.log('this is from App', Products);
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
    const [avatarImage, setAvatarImage] = useState(null);
    const [profileData, setProfileData] = useState(initialData);
    const [product, setProduct] = useState(null);

    // Generate default avatar from initials
    const getInitialAvatar = () => {
        return profileData.loginName.charAt(0).toUpperCase();
    };
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const handleAvatarChange = (change) => {
        setAvatarImage(change);
    }
    const handleProfileData = (change) => {
        setProfileData(change);
    }
    return (
        <>
            <Header onSearch={handleSearch} avatarImage={avatarImage} getInitialAvatar={getInitialAvatar} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/regist" element={<RegistPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route
                    path='/menu'
                    element={
                        <MenuPage
                            Products={Products} // Add Products prop here
                            searchTerm={searchTerm}
                            onSearch={handleSearch}
                        />
                    }
                />
                <Route path='/profile' element={
                    <ProfilePage
                        avatarImage={avatarImage}
                        setAvatarImage={handleAvatarChange}
                        getInitialAvatar={getInitialAvatar}
                        profileData={profileData}
                        setProfileData={handleProfileData}
                        initialData={initialData}
                    />}
                />
                <Route path='/about-us' element={<AboutUsPage />}></Route>
                <Route path='/pay' element={<PayPage />}></Route>
            </Routes>
            <Footer />
        </>
    );
}

export default App;
