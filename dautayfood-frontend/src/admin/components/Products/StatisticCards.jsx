// src/components/StatisticCard.jsx
import React from "react";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";

const StatisticCard = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Tổng sản phẩm */}
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <Package className="text-blue-500" size={24} />
                </div>
            </div>

            {/* Sắp hết hàng */}
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Sắp hết hàng</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                    </div>
                    <AlertTriangle className="text-yellow-500" size={24} />
                </div>
            </div>

            {/* Hết hàng */}
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Hết hàng</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
                    </div>
                    <Package className="text-red-500" size={24} />
                </div>
            </div>

            {/* Giá trị tồn kho */}
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">Giá trị tồn kho</p>
                        <p className="text-2xl font-bold text-gray-900">
                            {stats.totalValue.toLocaleString()}đ
                        </p>
                    </div>
                    <TrendingUp className="text-green-500" size={24} />
                </div>
            </div>
        </div>
    );
};

export default StatisticCard;
