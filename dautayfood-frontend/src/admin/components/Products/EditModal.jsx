import React, { useState, useEffect } from "react";
import { X, Save, Upload } from "lucide-react";

const EditModal = ({
    showModal,
    modalMode = "edit", // "add" | "edit"
    selectedProduct = null, // thống nhất prop API
    categories,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        image: null,
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!showModal) return;

        if (modalMode === "add") {
            setFormData({
                name: "",
                description: "",
                category: categories[0] || "",
                price: 0,
                stock: 0,
                image: null,
            });
        } else if (modalMode === "edit" && selectedProduct) {
            setFormData({
                name: selectedProduct.name || "",
                description: selectedProduct.description || "",
                category: selectedProduct.category || categories[0] || "",
                price: selectedProduct.price || 0,
                stock: selectedProduct.stock || 0,
                image: selectedProduct.image || null,
            });
        }

        setErrors({});
        setIsSubmitting(false);
    }, [showModal]);


    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Tên sản phẩm là bắt buộc";
        if (!formData.category) newErrors.category = "Danh mục là bắt buộc";
        if (formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0";
        if (formData.stock < 0) newErrors.stock = "Tồn kho không được âm";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const submitData = {
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock),
            };
            await onSave(submitData, modalMode);
            onClose();
        } catch (error) {
            console.error("❌ Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors((prev) => ({ ...prev, image: "File quá lớn (tối đa 5MB)" }));
                return;
            }
            if (!file.type.startsWith("image/")) {
                setErrors((prev) => ({ ...prev, image: "File phải là hình ảnh" }));
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => handleInputChange("image", ev.target.result);
            reader.readAsDataURL(file);
            if (errors.image) {
                setErrors((prev) => ({ ...prev, image: undefined }));
            }
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h3 className="text-lg font-semibold">
                        {modalMode === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isSubmitting}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left */}
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tên sản phẩm <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Nhập tên sản phẩm"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                <textarea
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange("description", e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mô tả sản phẩm"
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Danh mục <span className="text-red-500">*</span>
                                </label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => handleInputChange("category", e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.category ? "border-red-500" : "border-gray-300"
                                        }`}
                                    disabled={isSubmitting}
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                                )}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="space-y-4">
                            {/* Price & Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Giá (VNĐ) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.price}
                                        onChange={(e) =>
                                            handleInputChange("price", parseInt(e.target.value) || 0)
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="0"
                                        disabled={isSubmitting}
                                    />
                                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tồn kho <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={(e) =>
                                            handleInputChange("stock", parseInt(e.target.value) || 0)
                                        }
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.stock ? "border-red-500" : "border-gray-300"
                                            }`}
                                        placeholder="0"
                                        disabled={isSubmitting}
                                    />
                                    {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                                </div>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-4 text-center hover:border-gray-400 ${errors.image ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="image-upload"
                                        disabled={isSubmitting}
                                    />
                                    <label htmlFor="image-upload" className="cursor-pointer">
                                        {formData.image ? (
                                            <div className="space-y-2">
                                                <img
                                                    src={formData.image}
                                                    alt="Preview"
                                                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                                                />
                                                <p className="text-sm text-gray-600">Click để thay đổi</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Upload className="mx-auto text-gray-400" size={24} />
                                                <p className="text-sm text-gray-600">Click để tải ảnh</p>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center space-x-2 disabled:opacity-50"
                            disabled={isSubmitting}
                        >
                            <Save size={18} />
                            <span>
                                {isSubmitting
                                    ? "Đang xử lý..."
                                    : modalMode === "add"
                                        ? "Thêm"
                                        : "Cập nhật"}
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
