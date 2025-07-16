import { useState, useRef, useEffect } from 'react';
import './AvatarMenu.css';
import { Link } from 'react-router-dom';

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
        <div className="avatar-menu" ref={menuRef}>
            <div
                className="avatar-trigger"
                onClick={() => setOpen(!open)}
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
                        <Link to='/profile'><li>Tài khoản</li></Link>
                        <li>Cài đặt</li>
                        <li>Đăng xuất</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AvatarMenu;
