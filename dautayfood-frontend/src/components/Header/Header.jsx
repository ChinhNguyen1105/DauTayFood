import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart, FaSearch, FaSignInAlt, FaBars, FaInfoCircle, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import SearchBox from "../SearchBox/SearchBox";

const Header = ({ onSearch, avatarImage, getInitialAvatar }) => {
    return (
        <header className="header_container">
            <div id='header'>
                <Link to='/' className='logobox'>
                    <img src={logo} alt="Logo" className='logo' />
                </Link>
                <ul className='nav'>
                    <li><Link to='/about-us'><FaInfoCircle /> Về chúng tôi</Link></li>
                    <li><Link to='/cart'>< FaShoppingCart /> Giỏ hàng</Link></li>
                    <li><Link to='/Menu'><FaBars /> Menu</Link></li>
                </ul>
                <div className="search_box">
                    <SearchBox onSearch={onSearch} setResetType={"tat-ca"} />
                </div>
                {/* Đăng nhập */}
                <div className="regist">
                    <span > <Link to='/regist'>< FaUserPlus /> Đăng ký</Link>  </span>
                    <div id='avatar'><AvatarMenu avatarImage={avatarImage} getInitialAvatar={getInitialAvatar} /> </div>
                </div>
            </div>
        </header >
    );
};

export default Header;

