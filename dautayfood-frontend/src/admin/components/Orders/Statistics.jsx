// src/components/Orders/StatsOverview.jsx
import React from "react";
import {
    ShoppingCart,
    CheckCircle,
    Clock,
    XCircle,
    DollarSign,
} from "lucide-react";

const formatCurrency = (value) =>
    new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(value);

const StatsOverview = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Tổng đơn hàng */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <ShoppingCart className="h-6 w-6 text-gray-400" />
                        <div className="ml-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Tổng đơn hàng
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {stats.totalOrders}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hoàn thành */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <div className="ml-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Hoàn thành
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {stats.completedOrders}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Đang xử lý */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <Clock className="h-6 w-6 text-yellow-400" />
                        <div className="ml-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Đang xử lý
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {stats.pendingOrders}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Đã hủy */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <XCircle className="h-6 w-6 text-red-400" />
                        <div className="ml-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Đã hủy
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {stats.cancelledOrders}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Doanh thu */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                    <div className="flex items-center">
                        <DollarSign className="h-6 w-6 text-blue-400" />
                        <div className="ml-5">
                            <dt className="text-sm font-medium text-gray-500 truncate">
                                Doanh thu
                            </dt>
                            <dd className="text-lg font-medium text-gray-900">
                                {formatCurrency(stats.totalRevenue)}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
