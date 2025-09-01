// src/admin/components/Settings/SystemSettings/NotificationSettings.jsx
import React, { useState } from "react";
import { Bell, Mail, Smartphone } from "lucide-react";
import SaveButton from "../../common/SaveButton";

const NotificationSettings = ({ onSave, saveStatus }) => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: false,
    });

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Bell className="mr-2 text-purple-500" />
                Cài đặt thông báo
            </h3>

            <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <Mail className="text-red-500" />
                        <div>
                            <h4 className="font-semibold text-gray-800">Email</h4>
                            <p className="text-sm text-gray-500">Nhận thông báo qua email</p>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            setNotifications(prev => ({ ...prev, email: !prev.email }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.email ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications.email
                                ? "translate-x-6"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* Push Notification */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <Bell className="text-blue-500" />
                        <div>
                            <h4 className="font-semibold text-gray-800">Push Notification</h4>
                            <p className="text-sm text-gray-500">
                                Nhận thông báo đẩy trên trình duyệt
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            setNotifications(prev => ({ ...prev, push: !prev.push }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.push ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications.push
                                ? "translate-x-6"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>

                {/* SMS */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <Smartphone className="text-green-500" />
                        <div>
                            <h4 className="font-semibold text-gray-800">SMS</h4>
                            <p className="text-sm text-gray-500">
                                Nhận thông báo qua tin nhắn
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() =>
                            setNotifications(prev => ({ ...prev, sms: !prev.sms }))
                        }
                        className={`w-12 h-6 rounded-full transition-colors ${notifications.sms ? "bg-green-500" : "bg-gray-300"
                            }`}
                    >
                        <div
                            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifications.sms
                                ? "translate-x-6"
                                : "translate-x-0.5"
                                }`}
                        />
                    </button>
                </div>
            </div>

            <SaveButton
                onClick={() => onSave("thông báo")}
                saveStatus={saveStatus}
                className="mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
            >
                Lưu cài đặt
            </SaveButton>
        </div>
    );
};

export default NotificationSettings;
