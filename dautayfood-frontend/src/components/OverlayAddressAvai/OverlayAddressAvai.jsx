import React, { useState, useEffect } from "react";
import OverlayAddress from "../OverlayAddress/OverlayAddress";
import { FaTrash, FaEdit } from "react-icons/fa";

const OverlayAddressList = ({ onSelect, onClose }) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editAddressData, setEditAddressData] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("savedAddresses")) || [];
        setSavedAddresses(stored);
    }, [showAddressModal]);

    const updateLocalStorage = (list) => {
        localStorage.setItem("savedAddresses", JSON.stringify(list));
    };

    const handleSelect = (address) => {
        onSelect(address);
        onClose();
    };

    const handleDelete = (index) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) return;
        const updated = [...savedAddresses];
        updated.splice(index, 1);
        setSavedAddresses(updated);
        updateLocalStorage(updated);
    };

    const handleEdit = (index) => {
        setEditAddressData({ ...savedAddresses[index], index });
        setShowAddressModal(true);
    };

    const handleSaveAddress = (data, index = null) => {
        let updated;
        if (index !== null) {
            updated = [...savedAddresses];
            updated[index] = data;
        } else {
            updated = [...savedAddresses, data];
        }
        setSavedAddresses(updated);
        updateLocalStorage(updated);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]"
            onClick={(e) =>
                e.target.classList.contains("overlay-bg") && onClose()
            }
        >
            <div className="overlay-bg w-[95%] sm:w-[90%] md:w-[642px] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col relative">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                    onClick={onClose}
                >
                    &times;
                </button>

                {/* Title */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 px-6 py-4 border-b">
                    Chọn địa chỉ giao hàng
                </h2>

                {/* Address list */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
                    {savedAddresses.length === 0 ? (
                        <p className="text-center text-gray-500 text-base py-8">
                            Chưa có địa chỉ nào.
                        </p>
                    ) : (
                        savedAddresses.map((address, index) => (
                            <div
                                key={index}
                                className="p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-blue-500 hover:bg-blue-50 transition transform hover:-translate-y-1 hover:shadow-md cursor-pointer"
                            >
                                <div onClick={() => handleSelect(address)}>
                                    <p className="text-base font-medium text-gray-800">
                                        <strong>{address.fullName}</strong> ({address.phoneNumber})
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {address.detailAddress}, {address.cityDistrict}
                                    </p>
                                    <p className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        Loại:{" "}
                                        {address.addressType === "home" ? "Nhà riêng" : "Văn phòng"}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-row gap-6 text-gray-700 mt-3">
                                    <span
                                        className="flex items-center gap-1 text-sm cursor-pointer hover:text-blue-600"
                                        onClick={() => handleEdit(index)}
                                    >
                                        <FaEdit /> Sửa
                                    </span>
                                    <span
                                        className="flex items-center gap-1 text-sm cursor-pointer hover:text-red-600"
                                        onClick={() => handleDelete(index)}
                                    >
                                        <FaTrash /> Xóa
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add new address button */}
                <div className="px-4 sm:px-6 py-4 border-t bg-white rounded-b-lg">
                    <button
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium shadow transition"
                        onClick={() => {
                            setEditAddressData(null);
                            setShowAddressModal(true);
                        }}
                    >
                        Thêm địa chỉ
                    </button>
                </div>

                {/* Address modal */}
                {showAddressModal && (
                    <OverlayAddress
                        initialData={editAddressData}
                        onClose={() => setShowAddressModal(false)}
                        onAddAddress={(newData) => {
                            handleSaveAddress(newData, editAddressData?.index);
                            setShowAddressModal(false);
                            setEditAddressData(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default OverlayAddressList;
