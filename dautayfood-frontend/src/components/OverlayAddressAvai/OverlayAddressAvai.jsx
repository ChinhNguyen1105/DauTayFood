import React, { useState, useEffect } from 'react';
import './OverlayAddressAvai.css';
import OverlayAddress from '../OverlayAddress/OverlayAddress';
import { FaTrash, FaEdit } from 'react-icons/fa';

const OverlayAddressList = ({ onSelect, onClose }) => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [editAddressData, setEditAddressData] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);

    // Load địa chỉ đã lưu từ localStorage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        setSavedAddresses(stored);
    }, [showAddressModal]);

    // Lưu vào localStorage khi cập nhật danh sách
    const updateLocalStorage = (list) => {
        localStorage.setItem('savedAddresses', JSON.stringify(list));
    };

    const handleSelect = (address) => {
        onSelect(address);
        onClose();
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?');
        if (!confirmDelete) return;

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
            className="OverlayAddressList-overlay"
            onClick={(e) => e.target.className === 'OverlayAddressList-overlay' && onClose()}
        >
            <div className="OverlayAddressList-modal">
                <button className="OverlayAddressList-close-btn" onClick={onClose}>
                    &times;
                </button>

                <h2 className="OverlayAddressList-title">Chọn địa chỉ giao hàng</h2>

                <div className="OverlayAddressList-list">
                    {savedAddresses.length === 0 ? (
                        <p className="OverlayAddressList-empty">Chưa có địa chỉ nào.</p>
                    ) : (
                        savedAddresses.map((address, index) => (
                            <div key={index} className="OverlayAddressList-item">
                                <div className="OverlayAddressList-info" onClick={() => handleSelect(address)}>
                                    <p>
                                        <strong>{address.fullName}</strong> ({address.phoneNumber})
                                    </p>
                                    <p>{address.detailAddress}, {address.cityDistrict}</p>
                                    <p className="OverlayAddressList-type">
                                        Loại: {address.addressType === 'home' ? 'Nhà riêng' : 'Văn phòng'}
                                    </p>
                                </div>
                                <div className="OverlayAddressList-actions">
                                    <span className="icon edit" title="Chỉnh sửa" onClick={() => handleEdit(index)}><FaEdit /> sửa</span>
                                    <span className="icon delete" title="Xóa" onClick={() => handleDelete(index)}><FaTrash /> xóa</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="OverlayAddressList-addNewAddress">
                    <button className="OverlayAddress-addNewAddress-btn" onClick={() => {
                        setEditAddressData(null);
                        setShowAddressModal(true);
                    }}>
                        Thêm địa chỉ
                    </button>
                </div>

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
