import React, { useState } from 'react';
import './PayPage.css';
const CheckoutPage = () => {
    const [quantities, setQuantities] = useState({
        item1: 1,
        item2: 1,
        item3: 1
    });

    const itemPrice = 45000;

    const updateQuantity = (itemId, change) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, prev[itemId] + change)
        }));
    };

    const getTotalPrice = () => {
        return Object.values(quantities).reduce((total, qty) => total + (qty * itemPrice), 0);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    return (
        <div className="checkout-container">
            <header className="header">
                <div className="logo">
                    <span className="logo-icon">🍳</span>
                    <span className="logo-text">dâu tây food</span>
                    <span className="cart-text">Giỏ hàng</span>
                </div>
            </header>

            <nav className="nav-tabs">
                <div className="nav-item active">sản phẩm</div>
                <div className="nav-item">đơn giá</div>
                <div className="nav-item">số lượng</div>
                <div className="nav-item">thành tiền</div>
            </nav>

            <div className="items-container">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="item-row">
                        <div className="item-info">
                            <button className="delete-btn">xóa</button>
                            <img
                                src={`/api/placeholder/80/80`}
                                alt="Bánh lăn trứng muối"
                                className="item-image"
                            />
                            <div className="item-details">
                                <h3>bánh lăn trứng muối</h3>
                                <p>hộp 45k</p>
                            </div>
                        </div>

                        <div className="item-price">
                            {formatPrice(itemPrice)}
                        </div>

                        <div className="quantity-controls">
                            <button
                                className="qty-btn minus"
                                onClick={() => updateQuantity(`item${num}`, -1)}
                            >
                                -
                            </button>
                            <span className="quantity">{quantities[`item${num}`]}</span>
                            <button
                                className="qty-btn plus"
                                onClick={() => updateQuantity(`item${num}`, 1)}
                            >
                                +
                            </button>
                        </div>

                        <div className="item-total">
                            {formatPrice(quantities[`item${num}`] * itemPrice)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="checkout-footer">
                <div className="footer-left">
                    <label className="select-all">
                        <input type="checkbox" />
                        <span>Chọn tất cả</span>
                    </label>
                </div>

                <div className="footer-right">
                    <div className="total-amount">
                        Tổng cộng: <span className="total-price">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <button className="checkout-btn">Thanh toán</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;