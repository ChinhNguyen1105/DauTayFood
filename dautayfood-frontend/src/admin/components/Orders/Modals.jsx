// src/components/Orders/OrderDetailModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { XCircle } from "lucide-react";
import StatusBadge from "../Orders/StatusBadge"; // import component hiện trạng thái
import { formatCurrency, formatDate } from "../../../utils/formatters"; // hàm format tiền & ngày

const OrderDetailModal = ({ order, onClose, onStatusUpdate }) => {
    if (!order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full m-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <XCircle className="w-6 h-6" />
                    </button>
                </div>

                {/* Order info */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mã đơn hàng</label>
                            <p className="mt-1 text-sm text-gray-900 font-mono">{order.id}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                            <div className="mt-1 flex items-center space-x-2">
                                <StatusBadge status={order.status} />
                                {/* Nút cập nhật trạng thái mẫu */}
                                <button
                                    onClick={() => onStatusUpdate(order.id, "completed")}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Đánh dấu hoàn tất
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Khách hàng</label>
                            <p className="mt-1 text-sm text-gray-900">{order.userName}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tổng tiền</label>
                            <p className="mt-1 text-sm font-bold text-gray-900">
                                {formatCurrency(order.total)}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ngày tạo</label>
                            <p className="mt-1 text-sm text-gray-900">{formatDate(order.createdAt)}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Cập nhật lần cuối</label>
                            <p className="mt-1 text-sm text-gray-900">{formatDate(order.updatedAt)}</p>
                        </div>
                    </div>
                </div>

                {/* Danh sách sản phẩm */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Sản phẩm</h3>
                    <ul className="divide-y divide-gray-200">
                        {order.items.map((item, idx) => (
                            <li key={idx} className="py-2 flex justify-between text-sm">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatCurrency(item.price * item.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

OrderDetailModal.propTypes = {
    order: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    onStatusUpdate: PropTypes.func.isRequired,
};

export default OrderDetailModal;
