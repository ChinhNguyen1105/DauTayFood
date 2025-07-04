import { useState, useRef, useEffect } from 'react';
import './AvatarMenu.css';

function AvatarMenu() {
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
            <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="avatar-img"
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Tài khoản</li>
                        <li>Cài đặt</li>
                        <li>Đăng xuất</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AvatarMenu;
