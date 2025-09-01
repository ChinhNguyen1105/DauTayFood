// src/components/Orders/OrdersHeader.jsx
import React from "react";
import { Download, RefreshCw } from "lucide-react";

const OrdersHeader = ({ onExport, onRefresh }) => {
    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    {/* Title + Subtitle */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Quản lý đơn hàng
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Quản lý và theo dõi tất cả đơn hàng
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3">
                        <button
                            onClick={onExport}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 flex items-center"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Xuất Excel
                        </button>
                        <button
                            onClick={onRefresh}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Làm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersHeader;
