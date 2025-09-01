import React from 'react';
import PropTypes from 'prop-types';
import { X, Edit2, Trash2, Ban, CheckCircle } from 'lucide-react';

const UserDetailModal = ({ isOpen, user, onClose, onEdit, onDelete, onStatusUpdate }) => {
    if (!isOpen || !user) return null;

    // Status badge colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            case 'banned':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Role badge colors
    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-100 text-purple-800';
            case 'seller':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Chi tiết người dùng</h2>
                </div>

                {/* User Info */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Tên đăng nhập
                            </label>
                            <p className="text-gray-900">{user.username}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Email
                            </label>
                            <p className="text-gray-900">{user.email}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Họ tên
                            </label>
                            <p className="text-gray-900">{user.fullName}</p>
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Vai trò
                            </label>
                            <span className={`inline-flex px-2 py-1 text-sm rounded-full ${getRoleColor(user.role)}`}>
                                {user.role === 'admin' ? 'Quản trị viên' :
                                    user.role === 'seller' ? 'Người bán' : 'Người dùng'}
                            </span>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Trạng thái
                            </label>
                            <span className={`inline-flex px-2 py-1 text-sm rounded-full ${getStatusColor(user.status)}`}>
                                {user.status === 'active' ? 'Hoạt động' :
                                    user.status === 'inactive' ? 'Không hoạt động' : 'Đã cấm'}
                            </span>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Ngày tạo
                            </label>
                            <p className="text-gray-900">
                                {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between border-t pt-4">
                    <div className="flex space-x-2">
                        {user.status === 'banned' ? (
                            <button
                                onClick={() => onStatusUpdate(user.id, 'active')}
                                className="flex items-center px-3 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100"
                            >
                                <CheckCircle size={16} className="mr-2" />
                                Bỏ cấm
                            </button>
                        ) : (
                            <button
                                onClick={() => onStatusUpdate(user.id, 'banned')}
                                className="flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                            >
                                <Ban size={16} className="mr-2" />
                                Cấm
                            </button>
                        )}
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(user)}
                            className="flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100"
                        >
                            <Edit2 size={16} className="mr-2" />
                            Chỉnh sửa
                        </button>
                        <button
                            onClick={() => onDelete(user.id)}
                            className="flex items-center px-3 py-2 bg-red-50 text-red-700 rounded-md hover:bg-red-100"
                        >
                            <Trash2 size={16} className="mr-2" />
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
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
            PropTypes.instanceOf(Date)
        ]).isRequired
    }),
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onStatusUpdate: PropTypes.func.isRequired
};

export default UserDetailModal;
