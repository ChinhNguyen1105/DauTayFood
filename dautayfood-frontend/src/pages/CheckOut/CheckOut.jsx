import React from 'react';
import './CheckOut.css';
import { useLocation } from 'react-router-dom';

const CheckoutSection = () => {
    const location = useLocation();
    const {
        selectedItems = [],
        customerName = '',
        phone = '',
        address = ''
    } = location.state || {};

    const totalAmount = selectedItems.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const shipFee = 10000;
    const finalTotal = totalAmount + shipFee;
    console.log('selectedItems in checkout: ', selectedItems);

    return (
        <div className="checkout-container">
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
                    <button className="order-button">Đặt hàng</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSection;
