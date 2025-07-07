import { useState } from "react";
import './LoginForm.css';
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

        if (validate()) {//neu hop le
            alert("Đăng nhập thành công!");
            console.log({
                fullName,
                email,
                passWord
            });
            // Reset form (tùy chọn)
            setFullName("");
            setEmail("");
            setPassWord("");
            setError({});
        }
    };

    return (
        <form onSubmit={handleSubmit} className="LoginForm">
            <div className="login-form-title">
                <h2>Đăng Nhập</h2>
            </div>
            <div className="login-form-inputname">
                <input
                    type="text"
                    placeholder="tên đăng nhập"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
                {error.fullName && <div className="error">{error.fullName}</div>}
            </div>
            <div className="login-form-email">
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {error.email && <div className="error">{error.email}</div>}
            </div>
            <div className="login-form-password">
                <input
                    type="password"
                    placeholder="mật khẩu"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                />
                {error.passWord && <div className="error">{error.passWord}</div>}
            </div>
            <div className="login-form-confirm">
                <button type="submit">đăng nhập</button>
            </div>
            <div className="regist-form-registoption">
                <p className="registnoption">chưa có tài khoản </p><Link to='/regist' ><p className="registoption1">Đăng ký</p></Link>
            </div>
        </form>
    );
};
export default LoginForm;