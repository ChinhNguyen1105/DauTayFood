import { useState, useRef, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import {
    FaShoppingCart,
    FaBars,
    FaInfoCircle,
    FaCog,
    FaTimes
} from 'react-icons/fa'
import { Link } from "react-router-dom"
import logo from '../../assets/logo.png'

const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef(null)
    const toggleRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target) &&
                toggleRef.current &&
                !toggleRef.current.contains(e.target)
            ) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const menuItems = [
        { icon: FaInfoCircle, text: 'Về chúng tôi', path: '/about-us' },
        { icon: FaShoppingCart, text: 'Giỏ hàng', path: '/cart' },
        { icon: FaBars, text: 'Menu', path: '/menu' },
        { icon: FaCog, text: 'Cài đặt', path: '/settings' }
    ]

    const handleMenuClick = (path) => {
        navigate(path)
        setOpen(false)
    }
    console.log(menuItems);
    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/50 z-[2000] animate-fadeIn" onClick={() => setOpen(false)}></div>
            )}

            <div
                ref={toggleRef}
                className="fixed top-4 lg:left-6 border-2 border-white left-6 w-10 h-10 z-[2002] bg-red-500 text-white flex items-center justify-center rounded-full shadow-md hover:bg-red-400 transition-transform cursor-pointer "
                onClick={() => setOpen(!open)}
            >
                {open ? <FaTimes /> : <FaBars />}
            </div>

            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-80 max-w-full bg-gradient-to-br from-[#FF8282] to-[#FFAFAF] z-[2001] transform transition-transform duration-300 ease-in-out shadow-xl flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex justify-center items-center py-2 px-6 border-b border-white/20 bg-white/10 backdrop-blur-md">
                    <Link to='/' className='flex items-center justify-center'>
                        <img src={logo} alt="Logo" className="h-[50px] w-auto brightness-0 saturate-100 block ml-10"></img>
                    </Link>
                </div>

                <nav className="flex-1 px-2 py-4 bg-[#FFAFAF] z-[2003]">
                    <ul className="space-y-2">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleMenuClick(item.path)}
                                    className="flex items-center w-full text-black/75 px-5 py-3 rounded-md transition hover:bg-white/10 border-l-4 border-transparent hover:border-white gap-3"
                                >
                                    <item.icon className="text-lg" />
                                    <span className="font-medium">{item.text}</span>
                                </button>
                            </li>

                        ))}
                    </ul>
                </nav>

                <div className="py-4 px-6 border-t border-white/20 text-center text-sm text-white/70 bg-white/5 bg-[#FFAFAF]">
                    © 2025 Your App
                </div>
            </div>
        </>
    )
}

export default Sidebar
