import { useState } from "react";
import './RegistForm.css' // Có thể style theo ý bạn

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData, 
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra đơn giản trước khi gửi
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không trùng khớp!");
            return;
        }

        if (!formData.username || !formData.email || !formData.password) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        setError("");

        // Giả lập gửi dữ liệu
        alert("dang ky thanh cong:", formData);

        // TODO: Gọi API gửi dữ liệu đăng ký tại đây
    };

    return (
        <div className="register-form-container">
            <h2>Đăng ký tài khoản</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Tên người dùng"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default RegisterForm;
