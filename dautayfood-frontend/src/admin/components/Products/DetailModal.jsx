// src/components/modals/DetailModal.jsx
import React from "react";
import { X, Image, Star } from "lucide-react";

const DetailModal = ({ showModal, selectedProduct, onClose }) => {
    if (!showModal || !selectedProduct) return null;

    const getStatusBadge = (stock) => {
        if (stock === 0) {
            return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Hết hàng</span>;
        } else if (stock < 10) {
            return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Sắp hết</span>;
        }
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Còn hàng</span>;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-lg font-semibold">Chi tiết sản phẩm</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image */}
                        <div>
                            <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                                {selectedProduct.image ? (
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Image size={48} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                                <p className="text-lg font-semibold">{selectedProduct.name}</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <p className="text-gray-600">{selectedProduct.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                                    <p className="text-lg font-semibold text-green-600">{selectedProduct.price.toLocaleString()}đ</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                                    <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">{selectedProduct.category}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tồn kho</label>
                                    <p className="text-lg font-semibold">{selectedProduct.stock}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Đã bán</label>
                                    <p className="text-lg font-semibold">{selectedProduct.sold || 0}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá</label>
                                    <div className="flex items-center space-x-1">
                                        <Star size={16} className="text-yellow-400 fill-current" />
                                        <span>{selectedProduct.rate || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                                {getStatusBadge(selectedProduct.stock)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
