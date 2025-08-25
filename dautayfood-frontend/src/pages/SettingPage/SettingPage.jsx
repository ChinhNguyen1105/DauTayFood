import React, { useState } from "react";
import ScrollToTop from "../../ScrollToTop";
import useTheme from "../../hooks/useTheme";

const SettingsPage = ({ language, setLanguage }) => {
    const { theme, toggleTheme } = useTheme();
    const darkMode = theme === "dark";

    const [notifications, setNotifications] = useState({
        sound: true,
        vibration: false,
        popup: true,
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSavePassword = () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Mật khẩu mới không khớp!");
            return;
        }
        alert("Đổi mật khẩu thành công!");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="bg-white dark:bg-gray-700 w-[100%] h-auto ">
            <div className="min-h-screen pt-20 transition-colors duration-300 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 mx-40">
                <ScrollToTop />

                <div className="max-w-4xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-8 text-[#ff8c96]">Cài đặt tài khoản</h1>

                    {/* Account Settings */}
                    <div className="rounded-2xl shadow-lg mb-6 p-6 transition-colors bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 text-[#ff8c96]">Đổi mật khẩu</h2>
                        <div className="space-y-4">
                            {["currentPassword", "newPassword", "confirmPassword"].map((field) => (
                                <input
                                    key={field}
                                    type="password"
                                    name={field}
                                    value={passwordData[field]}
                                    onChange={handlePasswordChange}
                                    placeholder={
                                        field === "currentPassword"
                                            ? "Mật khẩu hiện tại"
                                            : field === "newPassword"
                                                ? "Mật khẩu mới"
                                                : "Xác nhận mật khẩu mới"
                                    }
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff8c96] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                            ))}
                            <button
                                onClick={handleSavePassword}
                                className="w-full bg-[#ff8c96] hover:bg-[#ff6c7d] text-white font-medium py-3 rounded-lg transition-colors"
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>

                    {/* Display Settings */}
                    <div className="rounded-2xl shadow-lg mb-6 p-6 transition-colors bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 text-[#ff8c96]">Giao diện</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-700 dark:text-gray-300">Chế độ tối</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={toggleTheme}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ff8c96] 
                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                                    after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white">
                                    </div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-gray-700 dark:text-gray-300">Ngôn ngữ</span>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ff8c96] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Settings */}
                    <div className="rounded-2xl shadow-lg mb-6 p-6 transition-colors bg-white dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 text-[#ff8c96]">Thông báo</h2>
                        <div className="space-y-4">
                            {Object.entries(notifications).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                                        {key === "sound" ? "Âm thanh" : key === "vibration" ? "Rung" : "Popup"}
                                    </span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) =>
                                                setNotifications((prev) => ({ ...prev, [key]: e.target.checked }))
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-[#ff8c96] 
                                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                        after:bg-white after:border-gray-300 after:border after:rounded-full 
                                        after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white">
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SettingsPage;
