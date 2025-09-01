// src/components/Settings/RoleManager.jsx
import React, { useState } from "react";
import { Users, CheckCircle } from "lucide-react";

const RoleManager = ({ onSave, saveStatus }) => {
    const [roles, setRoles] = useState([
        {
            id: 1,
            name: "Quản trị viên",
            color: "red",
            users: 3,
            permissions: ["all"],
        },
        {
            id: 2,
            name: "Nhân viên",
            color: "blue",
            users: 8,
            permissions: ["read", "write"],
        },
        {
            id: 3,
            name: "Khách",
            color: "green",
            users: 15,
            permissions: ["read"],
        },
    ]);

    const handleAddRole = () => {
        const newRole = {
            id: roles.length + 1,
            name: "Vai trò mới",
            color: "purple",
            users: 0,
            permissions: ["read"],
        };
        setRoles([...roles, newRole]);
        if (onSave) onSave("addRole");
    };

    const handleEditRole = (roleId) => {
        if (onSave) onSave("editRole:" + roleId);
        // chỗ này bạn có thể mở modal chỉnh sửa chi tiết
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Users className="mr-2 text-blue-500" />
                Quản lý quyền & vai trò
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-gray-800">{role.name}</h4>
                            <span
                                className={`w-3 h-3 rounded-full`}
                                style={{ backgroundColor: role.color }}
                            ></span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{role.users} người dùng</p>
                        <div className="flex flex-wrap gap-1">
                            {role.permissions.map((perm) => (
                                <span
                                    key={perm}
                                    className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600"
                                >
                                    {perm === "all"
                                        ? "Tất cả"
                                        : perm === "read"
                                            ? "Xem"
                                            : perm === "write"
                                                ? "Sửa"
                                                : perm === "delete"
                                                    ? "Xóa"
                                                    : perm}
                                </span>
                            ))}
                        </div>
                        <button
                            onClick={() => handleEditRole(role.id)}
                            className="w-full mt-3 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded transition-colors"
                        >
                            Chỉnh sửa quyền
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAddRole}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
                <Users size={18} />
                <span>Thêm vai trò mới</span>
            </button>

            {saveStatus && (
                <div className="mt-4 flex items-center space-x-2 text-sm">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-green-600 font-medium">
                        {saveStatus === "addRole"
                            ? "Thêm vai trò thành công"
                            : saveStatus.startsWith("editRole")
                                ? "Cập nhật vai trò thành công"
                                : ""}
                    </span>
                </div>
            )}
        </div>
    );
};

export default RoleManager;
