// src/components/Settings/AccountSecurity/PasswordChange.jsx
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Lock, Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import InputField from "../../common/InputField";
import SaveButton from "../../common/SaveButton";

const PasswordChange = ({ onSave, saveStatus }) => {
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: "",
    });

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState({
        minLength: false,
        hasUpper: false,
        hasLower: false,
        hasNumber: false,
        hasSpecial: false,
    });

    // Kiểm tra độ mạnh mật khẩu
    useEffect(() => {
        const newPass = passwordData.new;
        setPasswordStrength({
            minLength: newPass.length >= 8,
            hasUpper: /[A-Z]/.test(newPass),
            hasLower: /[a-z]/.test(newPass),
            hasNumber: /[0-9]/.test(newPass),
            hasSpecial: /[^A-Za-z0-9]/.test(newPass),
        });
    }, [passwordData.new]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Lock className="mr-2 text-red-500" />
                Đổi mật khẩu
            </h3>

            <div className="grid grid-cols-1 gap-6 max-w-md">
                {/* Mật khẩu hiện tại */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Mật khẩu hiện tại
                    </label>
                    <div className="relative">
                        <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordData.current}
                            onChange={(e) =>
                                setPasswordData((prev) => ({ ...prev, current: e.target.value }))
                            }
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500"
                        >
                            {showCurrentPassword ? (
                                <EyeOff size={20} className="text-gray-400" />
                            ) : (
                                <Eye size={20} className="text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mật khẩu mới */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Mật khẩu mới
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordData.new}
                            onChange={(e) =>
                                setPasswordData((prev) => ({ ...prev, new: e.target.value }))
                            }
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập mật khẩu mới"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-500"
                        >
                            {showNewPassword ? (
                                <EyeOff size={20} className="text-gray-400" />
                            ) : (
                                <Eye size={20} className="text-gray-400" />
                            )}
                        </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {passwordData.new && (
                        <div className="space-y-2 mt-3 p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-700">
                                Độ mạnh mật khẩu:
                            </div>
                            <div className="space-y-1">
                                {[
                                    { check: passwordStrength.minLength, text: "Ít nhất 8 ký tự" },
                                    { check: passwordStrength.hasUpper, text: "Có chữ hoa" },
                                    { check: passwordStrength.hasLower, text: "Có chữ thường" },
                                    { check: passwordStrength.hasNumber, text: "Có số" },
                                    { check: passwordStrength.hasSpecial, text: "Có ký tự đặc biệt" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-2 text-xs"
                                    >
                                        {item.check ? (
                                            <CheckCircle size={14} className="text-green-500" />
                                        ) : (
                                            <XCircle size={14} className="text-red-500" />
                                        )}
                                        <span
                                            className={item.check ? "text-green-700" : "text-red-600"}
                                        >
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Xác nhận mật khẩu mới */}
                <InputField
                    label="Xác nhận mật khẩu mới"
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) =>
                        setPasswordData((prev) => ({ ...prev, confirm: e.target.value }))
                    }
                    placeholder="Nhập lại mật khẩu mới"
                    error={
                        passwordData.confirm && passwordData.new !== passwordData.confirm
                            ? "Mật khẩu không khớp"
                            : ""
                    }
                />
            </div>

            <SaveButton
                onClick={() => onSave("mật khẩu")}
                saveStatus={saveStatus}
                className="mt-6 bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
            >
                Cập nhật mật khẩu
            </SaveButton>
        </div>
    );
};

PasswordChange.propTypes = {
    onSave: PropTypes.func.isRequired,
    saveStatus: PropTypes.string,
};

export default PasswordChange;
