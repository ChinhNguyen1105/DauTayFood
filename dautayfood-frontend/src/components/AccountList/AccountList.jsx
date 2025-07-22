import React, { useState, useEffect } from 'react';
import './AccountList.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import PayByBanking from '../PayByBanking/PayByBanking';
import mbbank from '../../assets/mbbank.jpg';
import Techcombank from '../../assets/techcombank.webp';
import Tpbank from '../../assets/tpbank.png';

const logoMap = {
    Vietcombank: mbbank,
    TPBank: Tpbank,
    Techcombank: Techcombank,
    MBBank: mbbank,
    BIDV: mbbank,
    Agribank: mbbank,
    VietinBank: mbbank,
    ACB: mbbank,
    Sacombank: mbbank,
};

const SavedBankAccounts = ({ onSelect, onEdit, onClose }) => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showBankingForm, setShowBankingForm] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState(null);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('bankAccounts')) || [];
        setAccounts(stored);
        setIsLoading(false);
    }, []);

    const handleDelete = (index, event) => {
        event.stopPropagation();
        if (!window.confirm('Bạn có chắc muốn xóa tài khoản này?')) return;

        const updated = [...accounts];
        updated.splice(index, 1);
        setAccounts(updated);
        localStorage.setItem('bankAccounts', JSON.stringify(updated));

        if (selectedAccountIndex === index) {
            setSelectedAccountIndex(null);
        } else if (selectedAccountIndex > index) {
            setSelectedAccountIndex(selectedAccountIndex - 1);
        }
    };

    const handleEdit = (index, event) => {
        event.stopPropagation();
        const editingAccount = { ...accounts[index], index };
        setAccountToEdit(editingAccount);
        setShowBankingForm(true);
    };

    const handleSelect = (index) => {
        setSelectedAccountIndex(index);
    };

    // ✅ Không auto đóng overlay khi click ngoài
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            // Không gọi onClose ở đây nữa
            // Nếu cần có nút "Đóng", đã có nút X riêng
        }
    };

    const handleConfirmSelection = () => {
        if (selectedAccountIndex !== null && onSelect) {
            onSelect(accounts[selectedAccountIndex]);
        }
        if (onClose) onClose();
    };

    return (
        <div className="SavedAccount-overlay" onClick={handleOverlayClick}>
            <div className="SavedAccount-container">
                {onClose && (
                    <button className="SavedAccount-close" onClick={onClose}>
                        ×
                    </button>
                )}

                <h5>Chọn tài khoản ngân hàng đã lưu</h5>

                {isLoading ? (
                    <div className="SavedAccount-loading">Đang tải...</div>
                ) : accounts.length === 0 ? (
                    <p>Chưa có tài khoản nào được lưu.</p>
                ) : (
                    <div className="SavedAccount-list">
                        {accounts.map((acc, index) => (
                            <label
                                key={index}
                                className="SavedAccount-item"
                                onClick={() => handleSelect(index)}
                            >
                                <input
                                    type="radio"
                                    name="bankAccount"
                                    checked={selectedAccountIndex === index}
                                    onChange={() => handleSelect(index)}
                                />
                                <img
                                    src={logoMap[acc.bank] || mbbank}
                                    alt={acc.bank}
                                    className="SavedAccount-bank-logo"
                                    onError={(e) => {
                                        e.target.src = mbbank;
                                    }}
                                />
                                <div className="SavedAccount-info">
                                    <p><strong>{acc.accountName}</strong></p>
                                    <p>{acc.bank} - ****{acc.accountNumber.slice(-4)}</p>
                                </div>
                                <div className="SavedAccount-actions">
                                    <FaEdit
                                        onClick={(e) => handleEdit(index, e)}
                                        title="Chỉnh sửa"
                                        tabIndex={0}
                                    />
                                    <FaTrash
                                        onClick={(e) => handleDelete(index, e)}
                                        title="Xóa"
                                        tabIndex={0}
                                    />
                                </div>
                            </label>
                        ))}
                    </div>
                )}

                <div className="SavedAccount-bottom-actions">
                    <button
                        className="SavedAccount-add-btn"
                        onClick={() => {
                            setAccountToEdit(null);
                            setShowBankingForm(true);
                        }}
                    >
                        + Thêm tài khoản mới
                    </button>

                    <button
                        className="SavedAccount-confirm-btn"
                        disabled={selectedAccountIndex === null}
                        onClick={handleConfirmSelection}
                    >
                        Xác nhận
                    </button>
                </div>

                {showBankingForm && (
                    <PayByBanking
                        initialData={accountToEdit}
                        onBankingInfoChange={(info) => {
                            const updated = [...accounts];
                            if (accountToEdit && accountToEdit.index !== undefined) {
                                updated[accountToEdit.index] = info;
                            } else {
                                updated.push(info);
                            }
                            setAccounts(updated);
                            localStorage.setItem('bankAccounts', JSON.stringify(updated));
                            setShowBankingForm(false);
                            setAccountToEdit(null);
                        }}
                        onClose={() => {
                            setShowBankingForm(false);
                            setAccountToEdit(null);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SavedBankAccounts;
