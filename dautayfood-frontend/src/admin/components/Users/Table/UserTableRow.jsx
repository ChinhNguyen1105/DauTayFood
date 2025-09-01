// src/components/Users/UserTableRow.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from './StatusBadge';
import RoleBadge from './RoleBadge';

const UserTableRow = ({ user, onView, onEdit, onDelete }) => {
    return (
        <tr className="hover:bg-gray-50">
            {/* Avatar + Name */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                        <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                                user.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.fullName
                                )}&background=random`
                            }
                            alt={user.fullName}
                            onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.fullName
                                )}&background=random`;
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                            {user.fullName}
                        </div>
                        <div className="text-sm text-gray-500">@{user.username}</div>
                    </div>
                </div>
            </td>

            {/* Email */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a href={`mailto:${user.email}`} className="hover:text-indigo-600">
                    {user.email}
                </a>
            </td>

            {/* Role */}
            <td className="px-6 py-4 whitespace-nowrap">
                <RoleBadge role={user.role} />
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={user.status} />
            </td>

            {/* CreatedAt */}
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </td>

            {/* Actions */}
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => onView(user)}
                        className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                        title="Xem chi tiết"
                    >
                        <Eye className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => onEdit(user)}
                        className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200"
                        title="Chỉnh sửa"
                    >
                        <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
                                onDelete(user.id);
                            }
                        }}
                        className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        title="Xóa"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

UserTableRow.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        createdAt: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
        ]).isRequired,
        avatar: PropTypes.string,
    }).isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default UserTableRow;
