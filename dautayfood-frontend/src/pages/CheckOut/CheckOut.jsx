// src/pages/Checkout/CheckoutSection.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import ListMenu from "../../components/layout/ListMenu/ListMenu";
import ScrollToTop from "../../ScrollToTop";
import OverlayAddressList from "../../components/common/OverlayAddressAvai/OverlayAddressAvai";

import useTheme from "../../hooks/useTheme";
import useUser from "../../hooks/useAuth";
import useLanguage from "../../hooks/useLanguage";
import useSelectedProduct from "../../hooks/useSelectedProduct";
import useProducts from "../../hooks/useProducts";
const CheckoutSection = ({ Products }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { profileData } = useUser();
    const { language } = useLanguage();
    const { selectedProduct, handleOpen, handleClose } = useSelectedProduct();
    const { products } = useProducts();

    const [selectedItems, setSelectedItems] = useState([]);
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [PaymentMethod, setPaymentMethod] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);

    // Load items + địa chỉ mặc định
    useEffect(() => {
        if (location.state?.selectedItems) {
            setSelectedItems(location.state.selectedItems);
            setCustomerName(location.state.customerName || "");
            setPhone(location.state.phone || "");
            setAddress(location.state.address || "");
        } else {
            const savedItems =
                JSON.parse(localStorage.getItem("selectedItems")) || [];
            setSelectedItems(savedItems);
        }

        const savedAddresses =
            JSON.parse(localStorage.getItem("savedAddresses")) || [];
        if (savedAddresses.length === 0) {
            setShowAddressModal(true);
        } else {
            const defaultAddr = savedAddresses[0];
            setCustomerName(defaultAddr.fullName);
            setPhone(defaultAddr.phoneNumber);
            setAddress(`${defaultAddr.detailAddress}, ${defaultAddr.cityDistrict}`);
        }
    }, [location.state]);

    // Đồng bộ với profile user
    useEffect(() => {
        if (profileData && !customerName) {
            setCustomerName(profileData.loginName);
            setPhone(profileData.phone);
        }
    }, [profileData]);

    const totalAmount = selectedItems.reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
    );
    const shipFee = 10000;
    const finalTotal = totalAmount + shipFee;

    // Xử lý đặt hàng
    const handleOrder = () => {
        if (!profileData) {
            alert("Vui lòng đăng nhập để đặt hàng!");
            navigate("/login");
            return;
        }
        if (selectedItems.length === 0) {
            alert("Không có sản phẩm nào để đặt hàng.");
            return;
        }
        if (!address) {
            alert("Bạn chưa thêm địa chỉ giao hàng!");
            return;
        }
        if (!PaymentMethod) {
            alert("Bạn chưa chọn phương thức thanh toán!");
            return;
        }

        const oldOrders = JSON.parse(localStorage.getItem("orderList")) || [];
        const newOrders = selectedItems.map((item) => ({
            ...item,
            id: Date.now() + Math.random(),
            status: "Đang chuẩn bị",
            customerName: profileData.loginName,
            phone: profileData.phone,
            orderDate: new Date().toISOString(),
        }));
        localStorage.setItem("orderList", JSON.stringify([...oldOrders, ...newOrders]));

        if (PaymentMethod === "cod") {
            alert("Đặt hàng thành công!");
            navigate("/profile", { state: { tab: "orders" } });
        } else if (PaymentMethod === "vietqr") {
            navigate("/pay-vietqr", {
                state: { selectedItems, customerName, phone, address, amount: finalTotal },
            });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-700 min-h-screen">
            <div
                className="px-6 py-8 font-sans max-w-6xl mx-auto pt-24
        bg-[#f5b7b1] dark:bg-gray-900 text-gray-900 dark:text-gray-100 
        transition-colors duration-300"
            >
                <ScrollToTop />

                {/* Address Section */}
                <div
                    className="p-4 mb-8 rounded bg-[#a8e6a3] dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                    <strong>Địa chỉ nhận hàng:</strong>
                    <p>
                        Khách hàng: {customerName} ({phone})
                    </p>
                    <p className="flex items-center flex-wrap gap-2">
                        Địa chỉ: <span>{address}</span>
                        <span className="text-sm text-red-500 dark:text-red-400">(mặc định)</span>
                        <span
                            onClick={() => setShowAddressModal(true)}
                            className="font-semibold cursor-pointer text-blue-600 hover:text-blue-700 
              dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        >
                            Thay đổi
                        </span>
                    </p>
                </div>

                {/* Products Table */}
                <div
                    className="p-4 rounded bg-[#a8e6a3] dark:bg-gray-800 
          text-gray-900 dark:text-gray-100 transition-colors duration-300"
                >
                    {/* Headers */}
                    <div
                        className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4 
            font-semibold pb-2 border-b-2 border-gray-400 dark:border-gray-600"
                    >
                        <div className="text-left pl-24">Sản phẩm</div>
                        <div>Giá</div>
                        <div>Số lượng</div>
                        <div>Tổng</div>
                    </div>

                    {/* Items */}
                    {selectedItems.map((item, index) => (
                        <div
                            key={index}
                            className="py-4 border-b border-gray-400 dark:border-gray-700 
              transition-colors duration-300"
                        >
                            {/* Desktop */}
                            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] items-center text-center gap-4">
                                <div className="flex items-center gap-4 justify-start">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="text-left min-w-0">
                                        <p className="font-semibold truncate">{item.name}</p>
                                        <p className="text-sm break-words text-red-500 dark:text-red-400">
                                            Ghi chú: {item.note}
                                        </p>
                                    </div>
                                </div>
                                <div>{item.price.toLocaleString()}đ</div>
                                <div>{item.quantity}</div>
                                <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                            </div>

                            {/* Mobile */}
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
                                    <p className="text-sm break-words text-red-500 dark:text-red-400">
                                        Ghi chú: {item.note}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Tổng */}
                    <div className="text-right font-semibold p-4 text-red-600 dark:text-red-400">
                        Tổng số tiền ({selectedItems.length} sản phẩm):{" "}
                        <span>{totalAmount.toLocaleString()}đ</span>
                    </div>
                </div>

                {/* Footer */}
                <div
                    className="flex flex-col md:flex-row justify-between mt-8 p-4 rounded gap-6 
          bg-[#a8e6a3] dark:bg-gray-800 text-gray-900 dark:text-gray-100 
          transition-colors duration-300"
                >
                    {/* Thanh toán */}
                    <div className="flex-1">
                        <p className="mb-2">Chọn phương thức thanh toán</p>
                        <div className="flex flex-wrap gap-4">
                            {["cod", "vietqr"].map((method) => (
                                <button
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    className={`text-white text-sm md:text-lg px-4 py-2 rounded 
                    bg-[#ff6b6b] hover:bg-[#ff5252] dark:bg-red-500 dark:hover:bg-red-600 
                    transition-all duration-300
                    ${PaymentMethod === method ? "ring-2 ring-green-500" : ""}`}
                                >
                                    {method === "cod"
                                        ? "Thanh toán khi nhận hàng"
                                        : "Thanh toán qua VietQR"}
                                </button>
                            ))}
                        </div>

                        <p className="text-sm mt-3">
                            Ấn đặt hàng tức là đồng ý với
                            <a
                                href="#"
                                className="ml-1 text-blue-600 hover:text-blue-700 
                dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                            >
                                Điều khoản
                            </a>
                        </p>
                    </div>

                    {/* Tổng kết */}
                    <div className="text-right flex-1">
                        <p>Tổng tiền hàng: <span>{totalAmount.toLocaleString()}đ</span></p>
                        <p>Tiền ship: <span>{shipFee.toLocaleString()}đ</span></p>
                        <p className="font-bold text-red-600 dark:text-red-400">
                            Tổng tiền: <span>{finalTotal.toLocaleString()}đ</span>
                        </p>
                        <button
                            onClick={handleOrder}
                            className="mt-4 px-6 py-2 rounded-lg text-lg text-white 
              bg-[#ff6b6b] hover:bg-[#ff5252] dark:bg-red-500 dark:hover:bg-red-600 
              transition-colors duration-300"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </div>

                {/* Gợi ý */}
                <div className="mt-12">
                    <h4
                        className="flex justify-center font-bold text-2xl mb-6 
            text-gray-800 dark:text-gray-100 transition-colors"
                    >
                        {language === "en" ? "You may also like!" : "Có thể bạn cũng thích!"}
                    </h4>
                    <ListMenu
                        Products={products}
                        selectedProduct={selectedProduct}
                        handleOpen={handleOpen}
                        handleClose={handleClose}
                    />
                </div>

                {/* Modal địa chỉ */}
                {showAddressModal && (
                    <OverlayAddressList
                        onClose={() => setShowAddressModal(false)}
                        onSelect={(addr) => {
                            setCustomerName(addr.fullName || profileData?.loginName);
                            setPhone(addr.phoneNumber || profileData?.phone);
                            setAddress(`${addr.detailAddress}, ${addr.cityDistrict}`);
                            setShowAddressModal(false);
                        }}
                        profileData={profileData}
                    />
                )}
            </div>
        </div>
    );
};

CheckoutSection.propTypes = {
    Products: PropTypes.array.isRequired,
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func,
};

export default CheckoutSection;
