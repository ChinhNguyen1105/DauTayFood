import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ListMenu from '../../components/ListMenu/ListMenu';
import ScrollToTop from '../../ScrollToTop';
import OverlayAddressList from '../../components/OverlayAddressAvai/OverlayAddressAvai';
import useTheme from '../../hooks/useTheme'; // ✅ thêm theme hook

const CheckoutSection = ({ Products, handleOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { darkMode } = useTheme(); // ✅ dark mode state

    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [PaymentMethod, setPaymentMethod] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    useEffect(() => {
        if (location.state?.selectedItems) {
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
        if (!PaymentMethod) {
            alert('Bạn chưa chọn phương thức thanh toán!');
            return;
        }

        const oldOrders = JSON.parse(localStorage.getItem('orderList')) || [];
        const newOrders = selectedItems.map(item => ({
            ...item,
            id: Date.now() + Math.random(),
            status: "Đang chuẩn bị"
        }));
        localStorage.setItem('orderList', JSON.stringify([...oldOrders, ...newOrders]));

        if (PaymentMethod === 'cod') {
            alert("Đặt hàng thành công!");
            navigate('/profile', { state: { tab: 'orders' } });
        } else if (PaymentMethod === 'vietqr') {
            navigate('/pay-vietqr', {
                state: { selectedItems, customerName, phone, address, amount: finalTotal }
            });
        }
    };

    return (
        <div className={`px-6 py-8 font-sans max-w-6xl mx-auto mt-16 mb-12 
            ${darkMode ? "bg-[#f5b7b1] dark:bg-gray-900" : "bg-[#f5b7b1]"}`}>
            <ScrollToTop />

            {/* Địa chỉ - Update background color */}
            <div className="bg-[#a8e6a3] dark:bg-gray-800 p-4 mb-8 rounded text-gray-800 dark:text-gray-200">
                <strong>Địa chỉ nhận hàng:</strong>
                <p>Khách hàng: {customerName} ({phone})</p>
                <p>
                    Địa chỉ: <span>{address}</span>
                    <span className="text-red-500 dark:text-red-400 text-sm ml-2">(mặc định)</span>
                    <span
                        className="text-blue-600 dark:text-blue-400 font-semibold ml-3 cursor-pointer"
                        onClick={() => setShowAddressModal(true)}
                    >
                        Thay đổi
                    </span>
                </p>
            </div>

            {/* Bảng sản phẩm - Update background color */}
            <div className="bg-[#a8e6a3] dark:bg-gray-800 p-4 rounded text-gray-800 dark:text-gray-200">
                {/* Header Desktop */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4 font-semibold border-b-2 border-slate-500 pb-2">
                    <div className="text-left pl-24">Sản phẩm</div>
                    <div>Giá</div>
                    <div>Số lượng</div>
                    <div>Tổng</div>
                </div>
                {/* Header Mobile */}
                <div className="md:hidden grid grid-cols-4 text-sm font-semibold border-b border-slate-500 pb-1 items-center justify-items-center">
                    <div>Sản phẩm</div>
                    <div>Giá</div>
                    <div>Số lượng</div>
                    <div className="text-right">Tổng</div>
                </div>

                {selectedItems.map((item, index) => (
                    <div key={index} className="py-4 border-b border-gray-400 dark:border-gray-600">
                        {/* Desktop view */}
                        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4">
                            <div className="flex items-center gap-4 justify-start">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                <div className="text-left min-w-0">
                                    <p className="font-semibold truncate">{item.name}</p>
                                    <p className="text-red-500 text-sm break-words"> Ghi chú: {item.note} </p>
                                </div>
                            </div>
                            <div>{item.price.toLocaleString()}đ</div>
                            <div>{item.quantity}</div>
                            <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                        </div>
                        {/* Mobile view */}
                        <div className="block md:hidden">
                            <div className="grid grid-cols-4 items-center justify-items-center">
                                <div className="flex items-center gap-4">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
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

                <div className="text-right font-semibold text-red-600 dark:text-red-400 p-4">
                    Tổng số tiền ({selectedItems.length} sản phẩm):{" "}
                    <span>{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>

            {/* Footer - Update background and button colors */}
            <div className="flex flex-col md:flex-row justify-between mt-8 bg-[#a8e6a3] dark:bg-gray-800 p-4 rounded gap-6 text-gray-800 dark:text-gray-200">
                {/* Payment */}
                <div className="flex-1">
                    <p className="mb-2">Chọn phương thức thanh toán</p>
                    <div className="flex gap-4">
                        <button
                            className={`bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm md:text-lg px-4 py-2 rounded 
                                ${PaymentMethod === 'cod' ? 'ring-2 ring-green-500' : ''}`}
                            onClick={() => setPaymentMethod('cod')}
                        >
                            Thanh toán khi nhận hàng
                        </button>
                        <button
                            className={`bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-sm md:text-lg px-4 py-2 rounded 
                                ${PaymentMethod === 'vietqr' ? 'ring-2 ring-green-500' : ''}`}
                            onClick={() => setPaymentMethod('vietqr')}
                        >
                            Thanh toán qua VietQR
                        </button>
                    </div>

                    <p className="text-sm mt-3">
                        Ấn đặt hàng tức là đồng ý với
                        <a href="#" className="text-blue-600 dark:text-blue-400 ml-1">Điều khoản</a>
                    </p>
                </div>

                {/* Summary */}
                <div className="text-right flex-1">
                    <p>Tổng tiền hàng: <span>{totalAmount.toLocaleString()}đ</span></p>
                    <p>Tiền ship: <span>{shipFee.toLocaleString()}đ</span></p>
                    <p className="font-bold text-red-600 dark:text-red-400">
                        Tổng tiền: <span>{finalTotal.toLocaleString()}đ</span>
                    </p>
                    <button
                        className="mt-4 bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-2 rounded-lg text-lg"
                        onClick={handleOrder}
                    >
                        Đặt hàng
                    </button>
                </div>
            </div>

            {/* Recommend section */}
            <div className="mt-12">
                <h4 className="flex justify-center font-bold text-2xl text-gray-800 dark:text-gray-200 mb-6">
                    Có thể bạn cũng thích!
                </h4>
                <ListMenu
                    Products={Products}
                    handleAddToCart={(p) => {
                        const cart = JSON.parse(localStorage.getItem("cart")) || [];
                        localStorage.setItem("cart", JSON.stringify([...cart, { ...p, quantity: 1 }]));
                        alert("Đã thêm vào giỏ hàng!");
                    }}
                    handleOpen={handleOpen}
                />
            </div>
        </div>
    );
};

export default CheckoutSection;
