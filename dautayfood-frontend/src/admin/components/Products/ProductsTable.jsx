// src/components/Products/ProductsTable.jsx
import React from "react";
import PropTypes from "prop-types";
import { Eye, Edit2, Trash2, Star, Image as ImageIcon } from "lucide-react";

const getStatusBadge = (stock) => {
    if (stock === 0) {
        return (
            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                Hết hàng
            </span>
        );
    } else if (stock < 5) {
        return (
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                Sắp hết
            </span>
        );
    }
    return (
        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
            Còn hàng
        </span>
    );
};

const ProductsTable = ({
    products,
    openOverlay,
    onView,
    onEdit,
    onDelete
}) => {
    const triggerOverlay = (type, product) => {

        openOverlay(type, product);
        return;

    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Kho
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đã bán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Đánh giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => {
                            const {
                                id,
                                name,
                                description,
                                image,
                                category,
                                price,
                                stock,
                                sold,
                                rate,
                            } = product;

                            return (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt={name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <ImageIcon
                                                            size={16}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {description}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                            {category}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {price?.toLocaleString?.()}đ
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {stock}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {sold}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-1">
                                            <Star
                                                size={14}
                                                className="text-yellow-400 fill-current"
                                            />
                                            <span className="text-sm text-gray-600">
                                                {rate}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(stock)}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() =>
                                                    triggerOverlay("detail", product)
                                                }
                                                className="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                                                title="Xem chi tiết"
                                            >
                                                <Eye size={16} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    triggerOverlay("edit", product)
                                                }
                                                className="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
                                                title="Chỉnh sửa"
                                            >
                                                <Edit2 size={16} />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    triggerOverlay("delete", product)
                                                }
                                                className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                                                title="Xóa"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    openOverlay: PropTypes.func,
    onView: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default ProductsTable;
