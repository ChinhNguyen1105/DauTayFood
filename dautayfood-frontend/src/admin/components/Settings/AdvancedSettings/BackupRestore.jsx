// src/components/Settings/BackupRestore.jsx
import React, { useState } from "react";
import { Database, Upload, Download, CheckCircle } from "lucide-react";

const BackupRestore = ({ onSave, saveStatus }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleBackup = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onSave) onSave("backup");
            setIsLoading(false);
        }, 1000);
    };

    const handleRestore = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (onSave) onSave("restore");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Database className="mr-2 text-blue-500" />
                Sao lưu & Khôi phục
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                        <Upload className="text-blue-500" size={20} />
                        <div>
                            <h4 className="font-semibold text-gray-800">Sao lưu dữ liệu</h4>
                            <p className="text-sm text-gray-500">
                                Tạo bản sao lưu toàn bộ cài đặt & dữ liệu tài khoản
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleBackup}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Đang xử lý..." : "Sao lưu"}
                    </button>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-3">
                        <Download className="text-green-500" size={20} />
                        <div>
                            <h4 className="font-semibold text-gray-800">Khôi phục dữ liệu</h4>
                            <p className="text-sm text-gray-500">
                                Khôi phục dữ liệu từ bản sao lưu trước đó
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleRestore}
                        disabled={isLoading}
                        className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors disabled:opacity-50"
                    >
                        {isLoading ? "Đang xử lý..." : "Khôi phục"}
                    </button>
                </div>
            </div>

            {saveStatus && (
                <div className="mt-4 flex items-center space-x-2 text-sm">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-green-600 font-medium">
                        {saveStatus === "backup"
                            ? "Sao lưu thành công"
                            : saveStatus === "restore"
                                ? "Khôi phục thành công"
                                : ""}
                    </span>
                </div>
            )}
        </div>
    );
};

export default BackupRestore;
