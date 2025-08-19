import { useState, useEffect } from "react";
import { FaUser, FaShoppingBag } from "react-icons/fa";
import ScrollToTop from "../../ScrollToTop";
import OrderSection from "../OrderPage/OrderPage";
import { useLocation } from "react-router-dom";

const ProfilePage = ({
    avatarImage,
    setAvatarImage,
    getInitialAvatar,
    profileData,
    setProfileData,
    initialData,
}) => {
    const [formData, setFormData] = useState(initialData);
    const [successMessage, setSuccessMessage] = useState("");
    const [avatarTemp, setAvatarTemp] = useState(null);
    const [activeTab, setActiveTab] = useState("profile");
    const location = useLocation();

    useEffect(() => {
        if (location.state?.tab === "orders") {
            setActiveTab("orders");
        }
    }, [location.state]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5000000) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarTemp(reader.result);
            reader.readAsDataURL(file);
        } else {
            alert("File quá lớn. Vui lòng chọn ảnh dưới 5MB");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCommit = (e) => {
        e.preventDefault();
        setProfileData({ ...formData });
        if (avatarTemp) setAvatarImage(avatarTemp);
        setSuccessMessage("Thông tin đã được cập nhật!");
        alert("Thông tin đã được cập nhật!");
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    return (
        <div className="flex flex-col sm:flex-row min-h-screen bg-gray-100 font-sans mt-[110px] mx-4 sm:mx-[70px]">
            <ScrollToTop />

            {/* Sidebar */}
            <div className="bg-gray-200 p-4 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-300 flex flex-col w-full sm:w-64">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-gray-700 overflow-hidden">
                        {avatarImage ? (
                            <img src={avatarImage} alt="User avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span>{getInitialAvatar()}</span>
                        )}
                    </div>
                </div>
                <div className="text-center text-sm text-gray-800 font-medium mb-2">{profileData.loginName}</div>
                <div className="text-center text-xs text-gray-500 mb-6">User ID: {profileData.userID}</div>

                <div className="flex flex-row sm:flex-col">
                    <div
                        className={`flex items-center py-3 border-b sm:border-b border-r sm:border-r-0 border-gray-300 text-sm cursor-pointer hover:bg-gray-100 px-2 flex-1 text-center ${activeTab === "profile" ? "bg-gray-100 font-medium" : ""
                            }`}
                        onClick={() => setActiveTab("profile")}
                    >
                        <FaUser size={16} className="mr-3 inline-block" />
                        <span>Hồ sơ</span>
                    </div>
                    <div
                        className={`flex items-center py-3 border-b sm:border-b-0 border-r sm:border-r border-gray-300 text-sm cursor-pointer hover:bg-gray-100 px-2 flex-1 text-center ${activeTab === "orders" ? "bg-gray-100 font-medium" : ""
                            }`}
                        onClick={() => setActiveTab("orders")}
                    >
                        <FaShoppingBag size={16} className="mr-3 inline-block" />
                        <span>Đơn mua</span>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="flex flex-col sm:flex-row flex-1 bg-white">
                {activeTab === "profile" && (
                    <>
                        {/* Info */}
                        <div className="w-full sm:w-[350px] p-6 sm:p-8 border-b sm:border-b-0 sm:border-r border-gray-300 bg-white">
                            <h2 className="text-xl text-gray-800 mb-8 text-center font-semibold">Quản lý tài khoản</h2>
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <div className="text-sm text-gray-500 mb-2">Tên đăng nhập</div>
                                <div className="text-base text-gray-800 font-medium">{profileData.loginName}</div>
                            </div>
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <div className="text-sm text-gray-500 mb-2">Email</div>
                                <div className="text-base text-gray-800 font-medium">{profileData.email}</div>
                            </div>
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <div className="text-sm text-gray-500 mb-2">Số điện thoại</div>
                                <div className="text-base text-gray-800 font-medium">+84 {profileData.phone}</div>
                            </div>
                            <div className="mb-6 pb-4 border-b border-gray-200">
                                <div className="text-sm text-gray-500 mb-2">Giới tính</div>
                                <div className="text-base text-gray-800 font-medium">{profileData.gender}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-2">Ngày sinh</div>
                                <div className="text-base text-gray-800 font-medium">
                                    {profileData.day}/{profileData.month}/{profileData.year}
                                </div>
                            </div>
                        </div>

                        {/* Edit */}
                        <div className="flex flex-col flex-1 p-6 sm:p-8 gap-6">
                            <h2 className="text-xl text-gray-800 mb-8 text-center font-medium">
                                Chỉnh sửa thông tin để bảo mật tốt nhất
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-8">
                                <div className="max-w-lg w-full">
                                    <div className="mb-5">
                                        <input
                                            type="text"
                                            name="loginName"
                                            className="w-full px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Tên đăng nhập"
                                            value={formData.loginName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-5">
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="w-full px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Số điện thoại"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-8 mb-6 text-black">
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nam"
                                                checked={formData.gender === "Nam"}
                                                onChange={handleInputChange}
                                            />{" "}
                                            Nam
                                        </label>
                                        <label>
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="Nữ"
                                                checked={formData.gender === "Nữ"}
                                                onChange={handleInputChange}
                                            />{" "}
                                            Nữ
                                        </label>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                        <input
                                            type="number"
                                            name="day"
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 text-center focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Ngày"
                                            value={formData.day}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            name="month"
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 text-center focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Tháng"
                                            value={formData.month}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            name="year"
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm bg-gray-100 text-center focus:outline-none focus:border-indigo-500 focus:bg-white"
                                            placeholder="Năm"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button
                                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium w-full sm:w-auto"
                                        onClick={handleCommit}
                                    >
                                        Lưu thay đổi
                                    </button>
                                </div>

                                {/* Avatar upload */}
                                <div className="flex flex-col items-center gap-6 w-full sm:w-40">
                                    <div className="w-28 h-28 bg-indigo-500 rounded-full flex items-center justify-center text-white text-3xl font-bold border-2 border-gray-700 overflow-hidden">
                                        {avatarTemp ? (
                                            <img src={avatarTemp} alt="Avatar preview" className="w-full h-full object-cover" />
                                        ) : avatarImage ? (
                                            <img src={avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{getInitialAvatar()}</span>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="avatarInput"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                    <label
                                        htmlFor="avatarInput"
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium cursor-pointer text-center w-full sm:w-auto"
                                    >
                                        Chọn ảnh
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === "orders" && (
                    <div className="w-full h-[900px]">
                        <OrderSection />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;

