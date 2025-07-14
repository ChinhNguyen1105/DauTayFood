import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistPage from './pages/RegistPage/RegistPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MenuPage from './pages/MenuPage/MenuPage';

function App() {
    const [searchTerm, setSearchTerm] = useState("");
    return (
        <>
            <Header onSearch={setSearchTerm} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/regist" element={<RegistPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/menu' element={<MenuPage searchTerm={searchTerm} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
