import { useState } from "react";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import './ProfilePage.css';
import ScrollToTop from '../../ScrollToTop';
import OrderSection from "../OrderPage/OrderPage";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProfilePage = ({
    avatarImage,
    setAvatarImage,
    getInitialAvatar,
    profileData,
    setProfileData,
    initialData
}) => {
    const [formData, setFormData] = useState(initialData);
    const [successMessage, setSuccessMessage] = useState('');
    const [avatarTemp, setAvatarTemp] = useState(null);
    const [activeTab, setActiveTab] = useState("profile"); // NEW
    const location = useLocation();

    useEffect(() => {
        if (location.state?.tab === 'orders') {
            setActiveTab('orders');
        }
    }, [location.state]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5000000) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarTemp(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert('File quá lớn. Vui lòng chọn ảnh dưới 5MB');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCommit = (e) => {
        e.preventDefault();
        setProfileData({ ...formData });
        if (avatarTemp) setAvatarImage(avatarTemp);
        setSuccessMessage("Thông tin đã được cập nhật!");
        alert("Thông tin đã được cập nhật!");
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <div className="profile-container">
            <ScrollToTop />
            <div className="profile-sidebar">
                <div className="profile-avatar">
                    <div className="avatar-circle">
                        {avatarImage ? (
                            <img src={avatarImage} alt="User avatar" className="avatar-image" />
                        ) : (
                            <span className="avatar-initial">{getInitialAvatar()}</span>
                        )}
                    </div>
                </div>
                <div className="profile-username">{profileData.loginName}</div>
                <div className="profile-edit-text">User ID: {profileData.userID}</div>

                <div className="profile-menu">
                    <div className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}
                        onClick={() => setActiveTab('profile')}>
                        <FaUser size={16} />
                        <span>Hồ sơ</span>
                    </div>
                    <div className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}>
                        <FaShoppingBag size={16} />
                        <span>Đơn mua</span>
                    </div>
                </div>
            </div>

            <div className="profile-main">
                {activeTab === 'profile' && (
                    <>
                        <div className="profile-info">
                            <h2 className="info-title">Quản lý tài khoản</h2>
                            <div className="info-item"><div className="info-label">Tên đăng nhập</div><div className="info-value">{profileData.loginName}</div></div>
                            <div className="info-item"><div className="info-label">Email</div><div className="info-value">{profileData.email}</div></div>
                            <div className="info-item"><div className="info-label">Số điện thoại</div><div className="info-value">+84 {profileData.phone}</div></div>
                            <div className="info-item"><div className="info-label">Giới tính</div><div className="info-value">{profileData.gender}</div></div>
                            <div className="info-item"><div className="info-label">Ngày sinh</div><div className="info-value">{profileData.day}/{profileData.month}/{profileData.year}</div></div>
                        </div>

                        <div className="profile-edit">
                            <h2 className="edit-title">Chỉnh sửa thông tin để bảo mật tốt nhất</h2>
                            <div className="edit-section">
                                <div className="edit-form">
                                    <div className="form-group">
                                        <input type="text" name="loginName" className="form-input" placeholder="Tên đăng nhập" value={formData.loginName} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="email" name="email" className="form-input" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="form-group">
                                        <input type="tel" name="phone" className="form-input" placeholder="Số điện thoại" value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="gender-group">
                                        <label><input type="radio" name="gender" value="Nam" checked={formData.gender === 'Nam'} onChange={handleInputChange} /> Nam</label>
                                        <label><input type="radio" name="gender" value="Nữ" checked={formData.gender === 'Nữ'} onChange={handleInputChange} /> Nữ</label>
                                    </div>
                                    <div className="date-group">
                                        <input type="number" name="day" className="date-input" placeholder="Ngày" value={formData.day} onChange={handleInputChange} />
                                        <input type="number" name="month" className="date-input" placeholder="Tháng" value={formData.month} onChange={handleInputChange} />
                                        <input type="number" name="year" className="date-input" placeholder="Năm" value={formData.year} onChange={handleInputChange} />
                                    </div>
                                    <button className="submit-button" onClick={handleCommit}>Lưu thay đổi</button>
                                </div>

                                <div className="avatar-section">
                                    <div className="avatar-preview">
                                        {avatarTemp ? (
                                            <img src={avatarTemp} alt="Avatar preview" className="avatar-preview-image" />
                                        ) : avatarImage ? (
                                            <img src={avatarImage} alt="Avatar" className="avatar-preview-image" />
                                        ) : (
                                            <span className="avatar-preview-initial">{getInitialAvatar()}</span>
                                        )}
                                    </div>
                                    <input type="file" accept="image/*" id="avatarInput" style={{ display: 'none' }} onChange={handleAvatarChange} />
                                    <label htmlFor="avatarInput" className="avatar-button">Chọn ảnh</label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'orders' && (
                    <div className="order-section">
                        {/* Thay bằng danh sách đơn hàng thật nếu có */}
                        <OrderSection />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
