import { useState } from "react";
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [passWord, setPassWord] = useState('');
    const [error, setError] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên.";
        if (!email.trim()) {
            newErrors.email = "Vui lòng nhập email.";
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            newErrors.email = "Email không hợp lệ.";
        }
        if (passWord.length < 6) newErrors.passWord = "Mật khẩu phải có ít nhất 6 ký tự.";

        setError(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            alert("Đăng nhập thành công!");
            console.log({ fullName, email, passWord });
            setFullName("");
            setEmail("");
            setPassWord("");
            setError({});
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-80 max-w-2xl lg:w-full bg-white/20 backdrop-blur-md rounded-xl shadow-2xl p-8 animate-slide-up"
        >
            <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">Đăng Nhập</h2>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="tên đăng nhập"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${error.fullName ? 'border-red-500 shadow-sm' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-300`}
                />
                {error.fullName && <div className="text-red-500 text-sm mt-1">{error.fullName}</div>}
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${error.email ? 'border-red-500 shadow-sm' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-300`}
                />
                {error.email && <div className="text-red-500 text-sm mt-1">{error.email}</div>}
            </div>

            <div className="mb-6">
                <input
                    type="password"
                    placeholder="mật khẩu"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    className={`w-full p-3 rounded-lg border ${error.passWord ? 'border-red-500 shadow-sm' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-red-300`}
                />
                {error.passWord && <div className="text-red-500 text-sm mt-1">{error.passWord}</div>}
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] text-white rounded-lg font-semibold uppercase tracking-wide hover:from-[#ff5252] hover:to-[#e53e3e] transition-all duration-300"
                >
                    đăng nhập
                </button>
            </div>

            <div className="mt-5 text-center">
                <p className="text-gray-500 inline">chưa có tài khoản </p>
                <Link to="/regist">
                    <span className="text-[#ff8686] font-semibold hover:text-[#ff2c2c] hover:underline cursor-pointer ml-1">
                        Đăng ký
                    </span>
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
