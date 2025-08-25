import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaUserPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import { MdAccountCircle } from 'react-icons/md';
import useAuth from '../../../hooks/useAuth';   // 👈 dùng hook trực tiếp

function AvatarMenu() {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)

    const { avatarImage, getInitialAvatar } = useAuth()  // 👈 lấy từ context

    // Click ra ngoài sẽ đóng menu
    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger */}
            <div
                className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold border-2 border-white cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                {avatarImage ? (
                    <img src={avatarImage} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                    <span>{getInitialAvatar()}</span>
                )}
            </div>

            {/* Dropdown */}
            <div
                className={`absolute top-[52px] right-0 min-w-[160px] bg-white rounded-lg shadow-lg py-2 z-50
          transition-all duration-300 ease-out transform
          ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
            >
                <div className="absolute top-[-10px] right-4 w-0 h-0 border-x-8 border-x-transparent border-b-[12px] border-b-white drop-shadow-sm"></div>
                <ul className="list-none m-0 p-0 text-sm">
                    <li className="px-4 py-2 hover:bg-pink-100 hover:text-pink-600 cursor-pointer flex items-center gap-2 font-bold" >
                        <MdAccountCircle /> <Link to="/profile">Tài khoản</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-100 hover:text-pink-600 cursor-pointer flex items-center gap-2 font-bold">
                        <FaSignOutAlt /> <Link to="/">Đăng xuất</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-100 hover:text-pink-600 cursor-pointer flex items-center gap-2 font-bold">
                        <FaUserPlus /> <Link to="/regist">Đăng ký</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-pink-100 hover:text-pink-600 cursor-pointer flex items-center gap-2 font-bold">
                        <FaSignInAlt /> <Link to="/login">Đăng nhập</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AvatarMenu
