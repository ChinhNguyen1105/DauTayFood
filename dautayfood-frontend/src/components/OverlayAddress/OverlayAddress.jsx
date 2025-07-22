import React, { useState, useEffect } from 'react';
import './OverlayAddress.css';

const OverlayAddress = ({ onClose, onAddAddress, initialData = null }) => {
    const [addressType, setAddressType] = useState('home');
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cityDistrict, setCityDistrict] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (initialData) {
            setFullName(initialData.fullName || '');
            setPhoneNumber(initialData.phoneNumber || '');
            setCityDistrict(initialData.cityDistrict || '');
            setDetailAddress(initialData.detailAddress || '');
            setAddressType(initialData.addressType || 'home');
            setEditIndex(initialData.index ?? null);
        }
    }, [initialData]);

    const handleSave = () => {
        if (!fullName || !phoneNumber || !cityDistrict || !detailAddress) {
            alert('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Số điện thoại không hợp lệ');
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
        const existing = JSON.parse(localStorage.getItem('savedAddresses')) || [];

        if (editIndex !== null) {
            updated = [...existing];
            updated[editIndex] = addressData;
        } else {
            updated = [...existing, addressData];
        }

        localStorage.setItem('savedAddresses', JSON.stringify(updated));
        alert('Đã lưu địa chỉ thành công!');

        if (onAddAddress) {
            onAddAddress(addressData);
        }

        onClose();
    };

    return (
        <div className="OverlayAddress-overlay" onClick={(e) => e.target.className === 'OverlayAddress-overlay' && onClose()}>
            <div className="OverlayAddress-modal">
                <button className="OverlayAddress-close-btn" onClick={onClose}>&times;</button>

                <div className="OverlayAddress-header">
                    <div className="OverlayAddress-breadcrumb">
                        <a href="#" onClick={onClose}>thay đổi địa chỉ</a>
                    </div>
                    <h2 className="OverlayAddress-title">{editIndex !== null ? 'Chỉnh sửa địa chỉ' : 'Địa chỉ mới'}</h2>
                </div>

                <div className="OverlayAddress-body">
                    <form className="OverlayAddress-form">
                        <div className="OverlayAddress-row">
                            <input
                                type="text"
                                className="OverlayAddress-input"
                                placeholder="Họ và tên"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="tel"
                                className="OverlayAddress-input"
                                placeholder="Số điện thoại"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <input
                            type="text"
                            className="OverlayAddress-input"
                            placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"
                            value={cityDistrict}
                            onChange={(e) => setCityDistrict(e.target.value)}
                        />
                        <textarea
                            className="OverlayAddress-input OverlayAddress-textarea"
                            placeholder="Địa chỉ cụ thể"
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                        />

                        <div className="OverlayAddress-map">
                            <button
                                type="button"
                                className="OverlayAddress-map-btn"
                                onClick={() => alert('Tính năng đang phát triển')}
                            >
                                Thêm vị trí
                            </button>
                        </div>

                        <div className="OverlayAddress-type-section">
                            <div className="OverlayAddress-label">Loại địa chỉ:
                                <div className="OverlayAddress-type-buttons">
                                    <button
                                        type="button"
                                        className={`OverlayAddress-type-btn ${addressType === 'home' ? 'active' : ''}`}
                                        onClick={() => setAddressType('home')}
                                    >
                                        Nhà Riêng
                                    </button>
                                    <button
                                        type="button"
                                        className={`OverlayAddress-type-btn ${addressType === 'office' ? 'active' : ''}`}
                                        onClick={() => setAddressType('office')}
                                    >
                                        Văn Phòng
                                    </button>
                                </div>
                            </div>

                        </div>
                    </form>
                </div>

                <div className="OverlayAddress-footer">
                    <button type="button" className="OverlayAddress-btn OverlayAddress-btn-secondary" onClick={onClose}>
                        Trở lại
                    </button>
                    <button type="button" className="OverlayAddress-btn OverlayAddress-btn-primary" onClick={handleSave}>
                        Hoàn tất
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverlayAddress;
