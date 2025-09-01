// src/components/Orders/OrderTable.jsx
import React from "react";
import PropTypes from "prop-types";
import { Eye, Edit2, Trash2, User } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatCurrency, formatDate } from "../../../utils/formatters";

const OrderTable = ({
    orders,
    currentPage,
    itemsPerPage,
    setSelectedOrder,
    setShowOrderModal,
    setCurrentPage,
}) => {
    // Tính toán phân trang
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = orders.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã đơn hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Khách hàng
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sản phẩm
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tổng tiền
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày tạo
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Thao tác
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-mono text-gray-900">
                                    {order.id}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 text-gray-400 mr-2" />
                                    <div className="text-sm text-gray-900">{order.userName}</div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                    {order.items.length} sản phẩm
                                </div>
                                <div className="text-xs text-gray-500">
                                    {order.items.slice(0, 2).map((item) => item.name).join(", ")}
                                    {order.items.length > 2 && "..."}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    {formatCurrency(order.total)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <StatusBadge status={order.status} />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {formatDate(order.createdAt)}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setShowOrderModal(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-900"
                                        title="Xem chi tiết"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="text-green-600 hover:text-green-900"
                                        title="Chỉnh sửa"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-900"
                                        title="Xóa"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    setSelectedOrder: PropTypes.func.isRequired,
    setShowOrderModal: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
};

export default OrderTable;
