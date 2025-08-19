import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListMenu from '../../components/ListMenu/ListMenu';
import ScrollToTop from '../../ScrollToTop';
import OverlayAddressList from '../../components/OverlayAddressAvai/OverlayAddressAvai';
import AccountList from '../../components/AccountList/AccountList';

const CheckoutSection = ({
    Products = [],
    selectedType = "tat-ca",
    searchTerm = "",
    selectedProduct,
    handleAddToCart,
    handleOpen,
    handleClose,
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [PaymentMethod, setPaymentMethod] = useState(null);

    const [showAddressModal, setShowAddressModal] = useState(false);
    const [showSavedAccounts, setShowSavedAccounts] = useState(false);
    const [selectedBankAccount, setSelectedBankAccount] = useState(null);

    useEffect(() => {
        if (location.state && location.state.selectedItems) {
            setSelectedItems(location.state.selectedItems);
            setCustomerName(location.state.customerName || '');
            setPhone(location.state.phone || '');
            setAddress(location.state.address || '');
        } else {
            const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            setSelectedItems(savedItems);
        }

        const savedAddresses = JSON.parse(localStorage.getItem('savedAddresses')) || [];
        if (savedAddresses.length === 0) {
            setShowAddressModal(true);
        } else {
            const defaultAddr = savedAddresses[0];
            setCustomerName(defaultAddr.fullName);
            setPhone(defaultAddr.phoneNumber);
            setAddress(`${defaultAddr.detailAddress}, ${defaultAddr.cityDistrict}`);
        }
    }, [location.state]);

    const totalAmount = selectedItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const shipFee = 10000;
    const finalTotal = totalAmount + shipFee;

    const handleOrder = () => {
        if (selectedItems.length === 0) {
            alert("Không có sản phẩm nào để đặt hàng.");
            return;
        }
        if (!address) {
            alert('Bạn chưa thêm địa chỉ giao hàng!');
            return;
        }
        if (!PaymentMethod && !selectedBankAccount) {
            alert('Bạn chưa chọn phương thức thanh toán!');
            return;
        }
        const oldOrders = JSON.parse(localStorage.getItem('orderList')) || [];

        const newOrders = selectedItems.map(item => ({
            ...item,
            id: Date.now() + Math.random(),
            status: "Đang chuẩn bị"
        }));

        const updatedOrders = [...oldOrders, ...newOrders];
        localStorage.setItem('orderList', JSON.stringify(updatedOrders));

        alert("Đặt hàng thành công!");
        navigate('/profile', { state: { tab: 'orders' } });
    };

    return (
        <div className="px-6 py-8 bg-white font-sans max-w-6xl mx-auto mt-24 mb-12 text-black">
            <ScrollToTop />

            {/* Header */}
            <div className="bg-gray-200 p-4 mb-8 rounded">
                <strong>Địa chỉ nhận hàng:</strong>
                <p>Khách hàng: {customerName} ({phone})</p>
                <p>
                    Địa chỉ: <span>{address}</span>
                    <span className="text-red-500 text-sm ml-2">(mặc định)</span>
                    <span
                        className="text-blue-600 font-semibold ml-3 cursor-pointer"
                        onClick={() => setShowAddressModal(true)}
                    >
                        Thay đổi
                    </span>
                </p>
            </div>

            {showAddressModal && (
                <OverlayAddressList
                    onClose={() => setShowAddressModal(false)}
                    onSelect={(data) => {
                        setCustomerName(data.fullName);
                        setPhone(data.phoneNumber);
                        setAddress(`${data.detailAddress}, ${data.cityDistrict}`);
                        setShowAddressModal(false);
                    }}
                />
            )}

            {/* Table */}
            <div className="bg-gray-200 p-4 rounded">
                {/* Header */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4 font-semibold border-b-2 border-slate-500 pb-2">
                    <div className="text-left pl-24">Sản phẩm</div>
                    <div>Giá</div>
                    <div>Số lượng</div>
                    <div>Tổng</div>
                </div>
                {/* Header mobile */}
                <div className="md:hidden grid grid-cols-4 text-sm font-semibold text-black-600 border-b border-slate-500 pb-1 items-center justify-items-center ">
                    <div>Sản phẩm</div>
                    <div>Giá</div>
                    <div>Số lượng</div>
                    <div className="text-right">Tổng</div>
                </div>

                {selectedItems.map((item, index) => (
                    <div key={index} className="py-4 border-b border-gray-400">

                        {/* Desktop view */}
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4">
                            {/* Cột sản phẩm */}
                            <div className="flex items-center gap-4 justify-start">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="text-left min-w-0">
                                    <p className="font-semibold truncate">{item.name}</p>
                                    <p className="text-red-500 text-sm break-words">
                                        Ghi chú: {item.note}
                                    </p>
                                </div>
                            </div>

                            {/* Cột giá */}
                            <div>{item.price.toLocaleString()}đ</div>

                            {/* Cột số lượng */}
                            <div>{item.quantity}</div>

                            {/* Cột tổng */}
                            <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                        </div>

                        {/* Mobile view (giữ nguyên code cũ) */}
                        <div className="block md:hidden">
                            <div className="grid grid-cols-4 items-center justify-items-center">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </div>
                                <div>{item.price.toLocaleString()}đ</div>
                                <div>{item.quantity}</div>
                                <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                            </div>
                            <div className="mt-2">
                                <p className="font-semibold text-sm mb-2">{item.name}</p>
                                <p className="text-red-500 text-sm break-words">
                                    Ghi chú: <span>{item.note}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="text-right font-semibold text-red-500 p-4">
                    Tổng số tiền ({selectedItems.length} sản phẩm):{" "}
                    <span>{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col md:flex-row justify-between mt-8 bg-gray-200 p-4 rounded gap-6">
                {/* Payment */}
                <div className="flex-1">
                    <p className="mb-2">Chọn phương thức thanh toán</p>
                    <div className="flex gap-4">
                        <button
                            className="bg-indigo-400 text-white text-sm md:text-lg px-4 py-2 rounded hover:bg-indigo-500"
                            onClick={() => setPaymentMethod('cod')}
                        >
                            Thanh toán khi nhận hàng
                        </button>
                        <button
                            className="bg-indigo-400 text-white px-4 text-sm md:text-lg py-2 rounded hover:bg-indigo-500"
                            onClick={() => {
                                setShowSavedAccounts(true);
                                setPaymentMethod('bank');
                            }}
                        >
                            Tài khoản ngân hàng
                        </button>
                    </div>

                    {showSavedAccounts && (
                        <AccountList
                            onSelect={(account) => {
                                setSelectedBankAccount(account);
                                setShowSavedAccounts(false);
                            }}
                            onEdit={(index) => {
                                console.log('Edit:', index);
                            }}
                            onClose={() => setShowSavedAccounts(false)}
                        />
                    )}

                    {selectedBankAccount && (
                        <div className="bg-indigo-50 p-3 mt-2 border-l-4 border-blue-500 rounded text-sm text-gray-800">
                            <p>{selectedBankAccount.accountName} - {selectedBankAccount.bank}</p>
                            <p>Số tài khoản: ****{selectedBankAccount.accountNumber.slice(-4)}</p>
                        </div>
                    )}

                    <p className="text-sm mt-3">
                        Ấn đặt hàng tức là đồng ý với
                        <a href="#" className="text-blue-600 ml-1">Điều khoản</a>
                    </p>
                </div>

                {/* Summary */}
                <div className="text-right flex-1">
                    <p>Tổng tiền hàng: <span>{totalAmount.toLocaleString()}đ</span></p>
                    <p>Tiền ship: <span>{shipFee.toLocaleString()}đ</span></p>
                    <p className="font-bold text-red-500">
                        Tổng tiền: <span>{finalTotal.toLocaleString()}đ</span>
                    </p>
                    <button
                        className="mt-4 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-lg text-lg"
                        onClick={handleOrder}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>

            {/* Recommend */}
            <div className="mt-12">
                <h4 className="flex justify-center font-bold text-2xl text-gray-700 mb-6">Có thể bạn cũng thích!</h4>
                <ListMenu
                    Products={Products}
                    selectedType={selectedType}
                    searchTerm={searchTerm}
                    selectedProduct={selectedProduct}
                    handleAddToCart={handleAddToCart}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
};

export default CheckoutSection;
