import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PayByVietQRPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { selectedItems = [], customerName, phone, address, amount = 1500000 } = location.state || {};
    const totalItems = selectedItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [qrUrl, setQrUrl] = useState('');
    const [orderCode, setOrderCode] = useState('');

    const [otpSent, setOtpSent] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [enteredOtp, setEnteredOtp] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [countdown, setCountdown] = useState(3); // Thêm state đếm ngược

    useEffect(() => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        setOrderCode(`DH${randomCode}`);
    }, []);

    useEffect(() => {
        if (bank && accountNumber && orderCode) {
            const info = `Thanh toán cho mã đơn hàng ${orderCode}`;
            const url = `https://img.vietqr.io/image/${bank}-${accountNumber}-qr_only.png?amount=${amount}&addInfo=${encodeURIComponent(info)}`;
            setQrUrl(url);
        }
    }, [bank, accountNumber, amount, orderCode]);

    const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

    const handleSendOtp = () => {
        if (!bank || !accountNumber || !accountName) {
            alert('Vui lòng nhập đủ thông tin trước khi nhận OTP!');
            return;
        }
        const otp = generateOtp();
        setGeneratedOtp(otp);
        setOtpSent(true);
        setEnteredOtp('');
        setOtpVerified(false);
        alert(`OTP của bạn là: ${otp}`); // Demo
    };

    useEffect(() => {
        if (otpSent && enteredOtp.length === 6) {
            if (enteredOtp === generatedOtp) {
                setOtpVerified(true);
                setToastMessage('Tự động chuyển hướng sau ');
                setShowToast(true);

                const timer = setInterval(() => {
                    setCountdown(prevCount => prevCount - 1);
                }, 1000);

                const redirectTimer = setTimeout(() => {
                    clearInterval(timer); // Xóa bộ đếm
                    const oldOrders = JSON.parse(localStorage.getItem('orderList')) || [];
                    const newOrders = selectedItems.map(item => ({
                        ...item,
                        id: Date.now() + Math.random(),
                        status: "Đang chuẩn bị"
                    }));
                    localStorage.setItem('orderList', JSON.stringify([...oldOrders, ...newOrders]));
                    setShowToast(false);
                    navigate('/profile', { state: { tab: 'orders' } });
                }, 3000);

                return () => {
                    clearTimeout(redirectTimer);
                    clearInterval(timer);
                };
            } else {
                alert('❌ Sai OTP, vui lòng thử lại!');
            }
        }
    }, [enteredOtp, generatedOtp, otpSent, navigate, selectedItems]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-8 px-4 justify-center items-center my-24">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Thanh toán qua VietQR</h2>

                {/* Thông tin người nhận */}
                <div className="mb-6 border-b pb-4">
                    <p><strong>Người nhận:</strong> {customerName} ({phone})</p>
                    <p><strong>Địa chỉ:</strong> {address}</p>
                    <p><strong>Số sản phẩm:</strong> {totalItems}</p>
                    <p><strong>Tổng tiền:</strong> <span className="text-red-600 font-semibold">{amount.toLocaleString()}đ</span></p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Nhập thông tin ngân hàng */}
                    <div className="flex-1 bg-gray-50 p-4 rounded-xl shadow-inner">
                        <div className="mb-4">
                            <label htmlFor="bank" className="block mb-2 font-medium text-gray-700">Ngân hàng:</label>
                            <select
                                id="bank"
                                value={bank}
                                onChange={(e) => setBank(e.target.value)}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                                <option value="">-- Chọn ngân hàng --</option>
                                <option value="VCB">Vietcombank</option>
                                <option value="TPB">TPBank</option>
                                <option value="TCB">Techcombank</option>
                                <option value="MB">MB Bank</option>
                                <option value="BIDV">BIDV</option>
                                <option value="AGRIBANK">Agribank</option>
                                <option value="CTG">VietinBank</option>
                                <option value="ACB">ACB</option>
                                <option value="STB">Sacombank</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="accountNumber" className="block mb-2 font-medium text-gray-700">Số tài khoản:</label>
                            <input
                                type="text"
                                id="accountNumber"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                placeholder="Ví dụ: 0123456789"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="accountName" className="block mb-2 font-medium text-gray-700">Chủ tài khoản:</label>
                            <input
                                type="text"
                                id="accountName"
                                value={accountName}
                                onChange={(e) => setAccountName(e.target.value)}
                                placeholder="Tên chủ tài khoản"
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        </div>

                        {/* OTP */}
                        {!otpVerified ? (
                            <div className="mt-4">
                                {!otpSent ? (
                                    <button
                                        onClick={handleSendOtp}
                                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Nhận OTP
                                    </button>
                                ) : (
                                    <div>
                                        <input
                                            type="text"
                                            value={enteredOtp}
                                            onChange={(e) => setEnteredOtp(e.target.value)}
                                            placeholder="Nhập OTP gồm 6 số"
                                            maxLength={6}
                                            className="w-full border rounded-lg px-3 py-2 mb-2"
                                        />
                                        <button
                                            onClick={handleSendOtp}
                                            className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition"
                                        >
                                            Gửi lại OTP
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="text-green-600 font-semibold mt-2 text-center">Giao dịch thành công!</p>
                        )}
                    </div>

                    {/* QR Code */}
                    <div className="flex-1 flex flex-col items-center justify-center border border-gray-200 rounded-xl p-4 bg-gray-50">
                        <h5 className="text-gray-700 font-bold text-base mb-3 text-center">Hoặc quét mã VietQR để thanh toán</h5>
                        {qrUrl ? (
                            <>
                                <img src={qrUrl} alt="VietQR" className="w-48 h-48 mb-3 border-blue-800 border-2 p-0.5" />
                                <p className="text-sm text-gray-600 text-center">
                                    Số tiền: <span className="font-semibold text-red-600">{amount.toLocaleString()}đ</span>
                                </p>
                                <p className="text-sm text-gray-600 text-center">
                                    Nội dung: <span className="font-semibold">{`Thanh toán cho mã đơn hàng ${orderCode}`}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1 text-center">* Vui lòng kiểm tra thông tin trước khi thanh toán</p>
                            </>
                        ) : (
                            <p className="text-gray-500 text-sm text-center">Vui lòng nhập ngân hàng & số tài khoản để tạo QR</p>
                        )}
                    </div>
                </div>

                {/* Toast */}
                {showToast && (
                    <div className="fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500 z-50">
                        {toastMessage} <span className="font-bold">{countdown}s</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PayByVietQRPage;