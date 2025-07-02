import React from 'react';
import './Header.css';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png';
const Header = () => {
    return (
        <header className="header">
            {/* Logo + tên thương hiệu */}
            <div className="header-left">
                <img src={logo} alt="Logo" className='logo' />
            </div>

            {/* Menu */}
            <nav className="nav-links">
                <a href="#">Về chúng tôi</a>
                <a href="#">Giỏ hàng <FaShoppingCart /></a>
                <a href="#">Menu</a>
            </nav>

            {/* Tìm kiếm */}
            <div className="search-box">
                <input type="text" placeholder="Vietnamese stir fried morning glory...." />
                <button><FaSearch /></button>
            </div>

            {/* Đăng nhập */}
            <div className="auth">
                <span>Đăng ký - Đăng nhập</span>
                <FaUserCircle size={20} />
            </div>
        </header>
    );
};

export default Header;

