import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import RegistPage from './pages/RegistPage/RegistPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MenuPage from './pages/MenuPage/MenuPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/regist" element={<RegistPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/menu' element={<MenuPage />} />
        </Routes>
    );
}