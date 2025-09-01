// src/components/Orders/HeaderOrders.jsx
import React, { useState } from "react";
import { Download, Upload, Filter, Search } from "lucide-react";

const HeaderOrders = ({
    onExport,
    onImport,
    onSearch,
    onFilterChange,
    totalOrders,
    stats = {},
}) => {
    const [showFilters, setShowFilters] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        payment: "",
        date: "",
    });

    // --- Tìm kiếm
    const handleSearchChange = (term) => {
        setSearchTerm(term);
        onSearch?.(term);
    };

    // --- Bộ lọc
    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            {/* Title Section */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
                    <p className="text-gray-600 mt-1">
                        Quản lý tất cả đơn hàng của khách
                        {totalOrders > 0 && (
                            <span className="ml-2 text-sm">({totalOrders} đơn hàng)</span>
                        )}
                    </p>
                </div>

                {/* Main Actions */}
                <div className="flex items-center space-x-3">
                    <button
                        onClick={onExport}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Download size={18} />
                        <span className="hidden sm:inline">Xuất dữ liệu</span>
                    </button>

                    <button
                        onClick={onImport}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                        <Upload size={18} />
                        <span className="hidden sm:inline">Nhập dữ liệu</span>
                    </button>
                </div>
            </div>

            {/* Search + Filter Toggle */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${showFilters
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                        }`}
                >
                    <Filter size={18} />
                    <span>Bộ lọc</span>
                </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                            {totalOrders}
                        </div>
                        <div className="text-sm text-gray-500">Tổng đơn hàng</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                            {stats.completed || 0}
                        </div>
                        <div className="text-sm text-gray-500">Hoàn thành</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-yellow-600">
                            {stats.pending || 0}
                        </div>
                        <div className="text-sm text-gray-500">Chờ xử lý</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-semibold text-red-600">
                            {stats.cancelled || 0}
                        </div>
                        <div className="text-sm text-gray-500">Đã hủy</div>
                    </div>
                </div>
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Bộ lọc đơn hàng
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Trạng thái
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => handleFilterChange("status", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Tất cả trạng thái</option>
                                <option value="completed">Hoàn thành</option>
                                <option value="pending">Chờ xử lý</option>
                                <option value="cancelled">Đã hủy</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Thanh toán
                            </label>
                            <select
                                value={filters.payment}
                                onChange={(e) => handleFilterChange("payment", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Tất cả</option>
                                <option value="paid">Đã thanh toán</option>
                                <option value="unpaid">Chưa thanh toán</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ngày đặt
                            </label>
                            <select
                                value={filters.date}
                                onChange={(e) => handleFilterChange("date", e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                                <option value="">Tất cả</option>
                                <option value="today">Hôm nay</option>
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderOrders;
