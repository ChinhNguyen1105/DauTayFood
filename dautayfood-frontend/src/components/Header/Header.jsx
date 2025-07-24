import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { FaShoppingCart, FaSearch, FaSignInAlt, FaBars, FaInfoCircle, FaUserPlus } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import SearchBox from "../SearchBox/SearchBox";
import { useEffect, useState } from 'react';
import SideBar from '../DropDownMenu/DropDownMenu';
import { Sidebar } from 'lucide-react';

const Header = ({ onSearch, avatarImage, getInitialAvatar }) => {
    const [hideHeader, setHideHeader] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > prevScrollPos && currentScrollPos > 100) {
                setHideHeader(true); // Scroll xuống → ẩn
            } else {
                setHideHeader(false); // Scroll lên → hiện
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <header className={`header_container ${hideHeader ? 'hidden' : ''}`}>
            <div id='header'>
                <div className='header-left-components'>
                    <div className='header-sidebar'><SideBar /></div>
                    <Link to='/' className='logobox'>
                        <img src={logo} alt="Logo" className='logo' />
                    </Link>
                </div>

                <div className="search_box">
                    <SearchBox onSearch={onSearch} setResetType={"tat-ca"} />
                </div>
                {/* Đăng nhập */}
                <div className="regist">
                    <div id='avatar'><AvatarMenu avatarImage={avatarImage} getInitialAvatar={getInitialAvatar} /> </div>
                </div>
            </div>
        </header >
    );
};

export default Header;

