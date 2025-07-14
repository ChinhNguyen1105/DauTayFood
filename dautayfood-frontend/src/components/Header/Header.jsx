import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart, FaSearch, FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import SearchBox from "../SearchBox/SearchBox";

const Header = ({ onSearch }) => {
    return (
        <header className="header_container">
            <div id='header'>
                <Link to='/' className='logobox'>
                    <img src={logo} alt="Logo" className='logo' />
                </Link>
                <ul className='nav'>
                    <li> <a href="#">Về chúng tôi</a></li>
                    <li><a href="#">Giỏ hàng</a></li>
                    <li><Link to='/Menu'>Menu</Link></li>
                </ul>
                <div className="search_box">
                    <SearchBox onSearch={onSearch} />
                </div>
                {/* Đăng nhập */}
                <div className="regist">
                    <span > <Link to='/regist'>Đăng ký - Đăng nhập</Link>  </span>
                    <div id='avatar'><AvatarMenu /> </div>
                </div>
            </div>
        </header >
    );
};

export default Header;

