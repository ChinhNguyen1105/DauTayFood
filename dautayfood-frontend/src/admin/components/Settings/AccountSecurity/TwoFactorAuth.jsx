// src/components/Settings/TwoFactorAuth.jsx
import React, { useState } from "react";
import { Shield, CheckCircle } from "lucide-react";

const TwoFactorAuth = ({ onSave, saveStatus }) => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleToggle = () => {
        setIs2FAEnabled((prev) => !prev);
        onSave("2FA");
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Shield className="mr-2 text-green-500" />
                Xác thực 2 yếu tố (2FA)
            </h3>

            {/* Block trạng thái Google Authenticator */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                <div className="flex items-center space-x-3">
                    <Shield
                        className={`${is2FAEnabled ? "text-green-500" : "text-gray-400"}`}
                    />
                    <div>
                        <h4 className="font-semibold text-gray-800">
                            Google Authenticator
                        </h4>
                        <p className="text-sm text-gray-500">
                            {is2FAEnabled
                                ? "Đã kích hoạt - Tài khoản được bảo mật"
                                : "Chưa kích hoạt - Khuyến nghị bật để bảo mật"}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleToggle}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${is2FAEnabled
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                >
                    {is2FAEnabled ? "Tắt 2FA" : "Bật 2FA"}
                </button>
            </div>

            {/* Khi đã bật 2FA */}
            {is2FAEnabled && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500" size={20} />
                        <p className="text-sm text-green-700 font-medium">
                            Xác thực 2 yếu tố đã được kích hoạt
                        </p>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                        Tài khoản của bạn được bảo mật với lớp bảo vệ bổ sung.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TwoFactorAuth;
