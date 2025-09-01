// src/components/Orders/OrderFilters.jsx
import React from "react";
import PropTypes from "prop-types";
import { Search, Filter } from "lucide-react";

const OrderFilters = ({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    setCurrentPage,
}) => {
    return (
        <div className="bg-white shadow rounded-lg mb-8">
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Mã đơn hàng hoặc tên khách hàng"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="pending">Đang xử lý</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian
                        </label>
                        <select
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Tất cả thời gian</option>
                            <option value="today">Hôm nay</option>
                            <option value="week">7 ngày qua</option>
                            <option value="month">30 ngày qua</option>
                        </select>
                    </div>

                    {/* Reset */}
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchTerm("");
                                setStatusFilter("all");
                                setDateFilter("all");
                                setCurrentPage(1);
                            }}
                            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center"
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Xóa bộ lọc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

OrderFilters.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
    statusFilter: PropTypes.string.isRequired,
    setStatusFilter: PropTypes.func.isRequired,
    dateFilter: PropTypes.string.isRequired,
    setDateFilter: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default OrderFilters;
