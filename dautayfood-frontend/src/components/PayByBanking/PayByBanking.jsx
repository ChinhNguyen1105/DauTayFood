import React, { useState, useEffect } from 'react';
import './PayByBanking.css';

const PayByBanking = ({ onBankingInfoChange, onClose, initialData }) => {
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');

    useEffect(() => {
        if (initialData) {
            setBank(initialData.bank || '');
            setAccountNumber(initialData.accountNumber || '');
            setAccountName(initialData.accountName || '');
        }
    }, [initialData]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

    const handleConfirm = () => {
        if (!bank || !accountNumber || !accountName) {
            alert('Vui lòng nhập đầy đủ thông tin thanh toán.');
            return;
        }

        const newAccount = { bank, accountNumber, accountName };

        // ✅ Giữ lại index nếu đang chỉnh sửa
        if (initialData && initialData.index !== undefined) {
            newAccount.index = initialData.index;
        }

        let storedAccounts = JSON.parse(localStorage.getItem('bankAccounts')) || [];

        if (initialData && initialData.index !== undefined) {
            // Cập nhật tài khoản đã có
            storedAccounts[initialData.index] = newAccount;
        } else {
            // Thêm mới
            storedAccounts.push(newAccount);
        }

        localStorage.setItem('bankAccounts', JSON.stringify(storedAccounts));

        if (onBankingInfoChange) {
            onBankingInfoChange(newAccount);
        }

        alert(initialData ? 'Đã cập nhật tài khoản ngân hàng!' : 'Đã thêm tài khoản ngân hàng!');
        onClose && onClose();
    };

    return (
        <div className="bank-info-overlay" onClick={handleOverlayClick}>
            <div className="bank-info">
                <div className='bank-infor-x'>
                    <span>Thông tin thanh toán ngân hàng</span>
                    {onClose && (
                        <button className="bank-close" onClick={onClose}>×</button>
                    )}
                </div>

                <div className='bank-left-right-container'>
                    <div className='bank-left'>
                        <div className="bank-info-row">
                            <label htmlFor="bank">Ngân hàng:</label>
                            <select
                                id="bank"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                            >
                                <option value="">-- Chọn ngân hàng --</option>
                                <option value="Vietcombank">Vietcombank</option>
                                <option value="TPBank">TPBank</option>
                                <option value="Techcombank">Techcombank</option>
                                <option value="MBBank">MB Bank</option>
                                <option value="BIDV">BIDV</option>
                                <option value="Agribank">Agribank</option>
                                <option value="VietinBank">VietinBank</option>
                                <option value="ACB">ACB</option>
                                <option value="Sacombank">Sacombank</option>
                            </select>
                        </div>

                        <div className="bank-info-row">
                            <label htmlFor="accountNumber">Số tài khoản:</label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Nhập số tài khoản của bạn"
                            />
                        </div>

                        <div className="bank-info-row">
                            <label htmlFor="accountName">Chủ tài khoản:</label>
                            <input
                                type="text"
                                id="accountName"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                placeholder="Tên chủ tài khoản"
                            />
                        </div>
                        <div className="bank-info-actions">
                            <button
                                className="bank-info-confirm-btn"
                                onClick={handleConfirm}
                            >
                                {initialData ? 'Cập nhật' : 'Xác nhận'}
                            </button>
                        </div>
                    </div>
                    <div className='bank-right'>
                        <div className="bank-info-row transfer-simulation">
                            <h5>Thông tin chuyển khoản</h5>
                            <p><strong>Ngân hàng nhận:</strong> {bank || '---'}</p>
                            <p><strong>Số tài khoản nhận:</strong> 0123456789</p>
                            <p><strong>Chủ tài khoản:</strong> CÔNG TY TNHH ABC</p>
                            <p><strong>Số tiền:</strong> 1,500,000 VNĐ</p>
                            <p><strong>Nội dung:</strong> Thanh toán đơn hàng #{Date.now().toString().slice(-6)}</p>
                            <p><strong>Phí giao dịch:</strong> Miễn phí</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayByBanking;
