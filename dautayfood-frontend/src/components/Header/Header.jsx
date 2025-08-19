import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AvatarMenu from '../../components/AvatarMenu/AvatarMenu';
import SearchBox from '../SearchBox/SearchBox';

const Header = ({ onSearch, avatarImage, getInitialAvatar }) => {
    const [hideHeader, setHideHeader] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setHideHeader(currentScrollPos > prevScrollPos && currentScrollPos > 100);
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[1000] bg-gradient-to-b from-[#FF8282] to-[#ff8282a2] shadow-md transition-transform duration-300 ease-in-out ${hideHeader ? '-translate-y-full' : 'translate-y-0'
                }`}
        >
            <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-3 gap-3 w-full">

                {/* Mobile: Logo + Avatar cùng hàng */}
                <div className="relative flex sm:hidden w-full">
                    <Link to="/">
                        <img src={logo} alt="Logo"
                            className="h-10 w-auto brightness-0 saturate-100 absolute left-1/2 transform -translate-x-1/2" />
                    </Link>
                    <div className='ml-auto'><AvatarMenu avatarImage={avatarImage} getInitialAvatar={getInitialAvatar} /></div>

                </div>

                {/* Mobile: SearchBox nằm dưới */}
                <div className="block sm:hidden w-full">
                    <SearchBox onSearch={onSearch} />
                </div>

                {/* Desktop: Logo bên trái */}
                <div className="hidden sm:flex sm:items-center sm:justify-start sm:gap-4 sm:w-1/3 sm:ml-20">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 w-auto brightness-0 saturate-100" />
                    </Link>
                </div>

                {/* Desktop: SearchBox + Avatar bên phải */}
                <div className="hidden sm:flex sm:items-center sm:justify-end gap-4 sm:w-2/3">
                    <div className="flex-1">
                        <SearchBox onSearch={onSearch} />
                    </div>
                    <div className="flex-shrink-0">
                        <AvatarMenu avatarImage={avatarImage} getInitialAvatar={getInitialAvatar} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

