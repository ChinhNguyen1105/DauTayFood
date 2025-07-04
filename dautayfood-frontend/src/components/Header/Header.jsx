import React from 'react';
import './Header.css';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import SearchBox from "../SearchBox/SearchBox";

const Header = () => {
    return (
        <header className="header_container">
            <div id='header'>
                <a href="#" rel='home' title='logo' className='logobox'>
                    <img src={logo} alt="Logo" className='logo' />
                </a>
                <ul className='nav'>
                    <li>
                        <a href="#">Về chúng tôi</a>
                    </li>
                    <li>
                        <a href="#">Giỏ hàng</a>
                    </li>
                    <li>
                        <a href="#">Menu</a>
                    </li>
                </ul>
                <div className="search_box">
                    <SearchBox />
                </div>
                {/* Đăng nhập */}
                <div className="regist">
                    <span>Đăng ký - Đăng nhập </span>
                    <div id='avatar'><AvatarMenu /> </div>
                </div>
            </div>
        </header >
    );
};

export default Header;

