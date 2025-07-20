import React, { useEffect, useState } from 'react';
import './CheckOut.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ListMenu from '../../components/ListMenu/ListMenu';
import ScrollToTop from '../../ScrollToTop';

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

    useEffect(() => {
        if (location.state && location.state.selectedItems) {
            setSelectedItems(location.state.selectedItems);
            setCustomerName(location.state.customerName || '');
            setPhone(location.state.phone || '');
            setAddress(location.state.address || '');
        } else {
            const savedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];
            setSelectedItems(savedItems);
            setCustomerName('Nguyễn Văn A');
            setPhone('0912345678');
            setAddress('123 Trần Hưng Đạo, Hà Nội');
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

        // Lấy đơn hàng cũ từ localStorage
        const oldOrders = JSON.parse(localStorage.getItem('orderList')) || [];

        // Tạo đơn hàng mới với trạng thái và ID
        const newOrders = selectedItems.map(item => ({
            ...item,
            id: Date.now() + Math.random(), // tạo id ngẫu nhiên
            status: "Đang chuẩn bị"
        }));

        // Gộp và lưu lại
        const updatedOrders = [...oldOrders, ...newOrders];
        localStorage.setItem('orderList', JSON.stringify(updatedOrders));

        alert("Đặt hàng thành công!");
        navigate('/profile', { state: { tab: 'orders' } });
        // hoặc điều hướng đến trang đơn hàng nếu bạn có
    };

    return (
        <div className="checkout-container">
            <ScrollToTop />
            <div className="checkout-header">
                <strong>Địa chỉ nhận hàng:</strong>
                <p>Khách hàng: {customerName} ({phone})</p>
                <p>Địa chỉ: <span>{address}</span> <span className="default-label">(mặc định)</span> <span className="change-address">Thay đổi</span></p>
            </div>

            <div className="checkout-table">
                <div className="checkout-row header">
                    <div>Sản phẩm</div>
                    <div>Đơn giá</div>
                    <div>Số Lượng</div>
                    <div>Thành tiền</div>
                </div>
                {selectedItems.map((item, index) => (
                    <div className="checkout-row" key={index}>
                        <div className="product-info">
                            <img src={item.image} alt={item.name} />
                            <div>
                                <p className="product-name">{item.name}</p>
                                <p className="product-note">Ghi chú: <span>{item.note}</span></p>
                            </div>
                        </div>
                        <div>{item.price.toLocaleString()}đ</div>
                        <div>{item.quantity}</div>
                        <div>{(item.price * item.quantity).toLocaleString()}đ</div>
                    </div>
                ))}
                <div className="checkout-total">
                    Tổng số tiền ({selectedItems.length} sản phẩm): <span>{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>

            <div className="checkout-footer">
                <div className="payment-methods">
                    <p>Chọn phương thức thanh toán</p>
                    <div className="payment-buttons">
                        <button>Thanh toán khi nhận hàng</button>
                        <button>Tài khoản ngân hàng</button>
                    </div>
                    <p className="terms">Ấn đặt hàng tức là đồng ý với <a className='term' href="#">  Điều khoản</a></p>
                </div>
                <div className="summary">
                    <p>Tổng tiền hàng: <span>{totalAmount.toLocaleString()}đ</span></p>
                    <p>Tiền ship: <span>{shipFee.toLocaleString()}đ</span></p>
                    <p className="total-final">Tổng tiền: <span>{finalTotal.toLocaleString()}đ</span></p>
                    <button className="order-button" onClick={handleOrder}>Đặt hàng</button>
                </div>
            </div>

            <div className='checkout-youcanlove'>
                <h4>Có thể bạn cũng thích!</h4>
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
