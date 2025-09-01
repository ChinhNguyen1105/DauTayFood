// src/components/Settings/SessionManager.jsx
import React, { useState } from "react";
import { Monitor, LogOut } from "lucide-react";

const SessionManager = ({ onLogout }) => {
    // Mock dữ liệu session, sau này có thể fetch từ API
    const [activeSessions, setActiveSessions] = useState([
        {
            id: 1,
            device: "Chrome - Windows",
            location: "Hà Nội, Việt Nam",
            lastActive: "2 phút trước",
            current: true,
        },
        {
            id: 2,
            device: "Safari - iPhone",
            location: "TP.HCM, Việt Nam",
            lastActive: "1 giờ trước",
            current: false,
        },
    ]);

    const handleLogoutSession = (id) => {
        setActiveSessions((prev) => prev.filter((s) => s.id !== id));
        if (onLogout) onLogout(id);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Monitor className="mr-2 text-purple-500" />
                Thiết bị đang đăng nhập
            </h3>

            <div className="space-y-4">
                {activeSessions.map((session) => (
                    <div
                        key={session.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div
                                className={`p-2 rounded-lg ${session.current ? "bg-green-100" : "bg-gray-100"
                                    }`}
                            >
                                <Monitor
                                    className={`${session.current ? "text-green-500" : "text-gray-400"
                                        }`}
                                    size={20}
                                />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 flex items-center">
                                    {session.device}
                                    {session.current && (
                                        <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                                            Hiện tại
                                        </span>
                                    )}
                                </h4>
                                <p className="text-sm text-gray-500">{session.location}</p>
                                <p className="text-xs text-gray-400">
                                    Hoạt động lần cuối: {session.lastActive}
                                </p>
                            </div>
                        </div>

                        {!session.current && (
                            <button
                                onClick={() => handleLogoutSession(session.id)}
                                className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Đăng xuất</span>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionManager;
