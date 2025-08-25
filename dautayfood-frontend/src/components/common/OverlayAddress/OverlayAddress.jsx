import React, { useState, useEffect } from "react";

const OverlayAddress = ({ onClose, onAddAddress, initialData = null }) => {
    const [addressType, setAddressType] = useState("home");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [cityDistrict, setCityDistrict] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.fullName || "");
            setPhoneNumber(initialData.phoneNumber || "");
            setCityDistrict(initialData.cityDistrict || "");
            setDetailAddress(initialData.detailAddress || "");
            setAddressType(initialData.addressType || "home");
            setEditIndex(initialData.index ?? null);
        }
    }, [initialData]);

    const handleSave = () => {
        if (!fullName || !phoneNumber || !cityDistrict || !detailAddress) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert("Số điện thoại không hợp lệ");
            return;
        }

        const addressData = {
            fullName,
            phoneNumber,
            cityDistrict,
            detailAddress,
            addressType,
        };

        let updated = [];
        const existing = JSON.parse(localStorage.getItem("savedAddresses")) || [];

        if (editIndex !== null) {
            updated = [...existing];
            updated[editIndex] = addressData;
        } else {
            updated = [...existing, addressData];
        }

        localStorage.setItem("savedAddresses", JSON.stringify(updated));
        alert("Đã lưu địa chỉ thành công!");

        if (onAddAddress) {
            onAddAddress(addressData);
        }

        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
            onClick={(e) => e.target.classList.contains("fixed") && onClose()}
        >
            <div
                className="
          bg-white dark:bg-gray-900 w-full max-w-md md:max-w-2xl lg:max-w-3xl
          h-auto max-h-[90vh] md:max-h-[85vh]
          rounded-lg shadow-xl flex flex-col relative
          text-gray-800 dark:text-gray-200
        "
            >
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Header */}
                <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg md:text-xl font-semibold">
                        {editIndex !== null ? "Chỉnh sửa địa chỉ" : "Địa chỉ mới"}
                    </h2>
                </div>

                {/* Body */}
                <div className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <form className="flex flex-col gap-3 md:gap-4 text-sm md:text-base">
                        <div className="flex flex-col md:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Họ và tên"
                                className="w-full px-3 py-2 md:px-4 md:py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Số điện thoại"
                                className="w-full px-3 py-2 md:px-4 md:py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                            className="w-full px-3 py-2 md:px-4 md:py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                            value={cityDistrict}
                            onChange={(e) => setCityDistrict(e.target.value)}
                        />

                        <textarea
                            placeholder="Địa chỉ cụ thể"
                            className="w-full px-3 py-2 md:px-4 md:py-3 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[70px] md:min-h-[100px] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />

                        {/* Map section */}
                        <div className="h-[100px] md:h-[150px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500"
                                onClick={() => alert("Tính năng đang phát triển")}
                            >
                                Thêm vị trí
                            </button>
                        </div>

                        {/* Address type */}
                        <div>
                            <span className="block mb-1 font-medium">
                                Loại địa chỉ:
                            </span>
                            <div className="flex flex-wrap gap-2">
                                {["home", "office", "other"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        className={`flex-1 min-w-[90px] px-3 py-2 border rounded-md text-sm md:text-base ${addressType === type
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-500"
                                            }`}
                                        onClick={() => setAddressType(type)}
                                    >
                                        {type === "home"
                                            ? "Nhà riêng"
                                            : type === "office"
                                                ? "Văn phòng"
                                                : "Khác"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-sm md:text-base"
                        onClick={onClose}
                    >
                        Trở lại
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm md:text-base"
                        onClick={handleSave}
                    >
                        Hoàn tất
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverlayAddress;
