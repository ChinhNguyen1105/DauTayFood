import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
    FaShoppingCart,
    FaSearch,
    FaSignInAlt,
    FaBars,
    FaInfoCircle,
    FaUserPlus,
    FaCog,
    FaTimes
} from 'react-icons/fa';
import './DropDownMenu.css';
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
const Sidebar = () => {
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);
    const toggleRef = useRef(null);
    const navigate = useNavigate();

    // Đóng sidebar khi click bên ngoài (trừ icon toggle)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const menuItems = [
        { icon: FaInfoCircle, text: 'Về chúng tôi', path: '/about-us' },
        { icon: FaShoppingCart, text: 'Giỏ hàng', path: '/cart' },
        { icon: FaBars, text: 'Menu', path: '/menu' },
        { icon: FaCog, text: 'Cài đặt', path: '/settings' }
    ];

    const handleMenuClick = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <>
            {/* Overlay */}
            {open && <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>}

            {/* Toggle Button */}
            <div
                ref={toggleRef}
                className="sidebar-toggle"
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes /> : <FaBars />}
            </div>

            {/* Sidebar */}
            <div className={`sidebar ${open ? 'sidebar-open' : ''}`} ref={sidebarRef}>
                <div className="sidebar-header">
                    <Link to='/' className='logobox'>
                        <img src={logo} alt="Logo" className='logo' />
                    </Link>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleMenuClick(item.path)}
                                    className="sidebar-link"
                                >
                                    <item.icon className="sidebar-icon" />
                                    <span>{item.text}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <p>© 2025 Your App</p>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
