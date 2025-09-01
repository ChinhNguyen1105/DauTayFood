// src/components/DeleteModal.jsx
import { Trash2, Image as ImageIcon } from "lucide-react";

const DeleteModal = ({
    showModal,
    modalMode, // có thể dùng nếu muốn check loại modal, ở đây mặc định là "delete"
    selectedProduct,
    onClose,
    onSubmit,
}) => {
    if (!showModal || modalMode !== "delete") return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full shadow-xl">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                            <Trash2 className="text-red-600 dark:text-red-400" size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Xóa sản phẩm
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Hành động này không thể hoàn tác
                            </p>
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                                {selectedProduct?.image ? (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon size={18} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {selectedProduct?.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {selectedProduct?.category}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Confirm message */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Bạn có chắc chắn muốn xóa sản phẩm{" "}
                        <strong>"{selectedProduct?.name}"</strong>? Tất cả dữ liệu liên quan
                        sẽ bị xóa vĩnh viễn.
                    </p>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={() => onSubmit(selectedProduct?.id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center space-x-2 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>Xóa sản phẩm</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
