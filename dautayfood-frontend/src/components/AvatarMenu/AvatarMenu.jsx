import { useState, useRef, useEffect } from 'react';
import './AvatarMenu.css';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaSignInAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
// Sửa cách khai báo props bằng cách dùng object destructuring
function AvatarMenu({ avatarImage, getInitialAvatar }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="avatar-menu" ref={menuRef} onClick={() => setOpen(!open)}>
            <div
                className="avatar-trigger"

            >
                {avatarImage ? (
                    <img
                        src={avatarImage}
                        alt="User avatar"
                        className="avatar-img"
                    />
                ) : (
                    <span className="AvatarMenu-avatar-initial">
                        {getInitialAvatar()}
                    </span>
                )}
            </div>

            {open && (
                <div className="dropdown-menu">
                    <ul>
                        <Link to='/profile'><li><MdAccountCircle /> Tài khoản</li></Link>
                        <Link> <li><FaSignOutAlt /> Đăng xuất</li> </Link>
                        <Link to='/regist'><li>< FaUserPlus /> Đăng ký</li></Link>
                        <Link to='/login'><li>< FaSignInAlt /> Đăng nhập </li></Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AvatarMenu;
