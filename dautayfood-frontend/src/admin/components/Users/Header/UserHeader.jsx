import React from 'react';
import { UserPlus, Download, Upload } from 'lucide-react';
import PropTypes from 'prop-types';

const UserHeader = ({ onAddUser, onExport, onImport }) => {
    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Title Section */}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Quản lý người dùng</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Quản lý tất cả tài khoản người dùng trong hệ thống
                        </p>
                    </div>

                    {/* Actions Section */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onExport}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 
                                rounded-md shadow-sm text-sm font-medium text-gray-700 
                                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Xuất Excel
                        </button>

                        <button
                            onClick={onImport}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 
                                rounded-md shadow-sm text-sm font-medium text-gray-700 
                                bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                                focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Nhập Excel
                        </button>

                        <button
                            onClick={onAddUser}
                            className="inline-flex items-center px-4 py-2 border border-transparent 
                                rounded-md shadow-sm text-sm font-medium text-white 
                                bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                                focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Thêm người dùng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserHeader.propTypes = {
    onAddUser: PropTypes.func.isRequired,
    onExport: PropTypes.func.isRequired,
    onImport: PropTypes.func.isRequired
};

UserHeader.defaultProps = {
    onExport: () => console.log('Export functionality not implemented'),
    onImport: () => console.log('Import functionality not implemented')
};

export default UserHeader;