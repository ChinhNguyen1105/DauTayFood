import React, { useEffect, useState } from 'react';
import './OrderPage.css';

const tabs = ["Tất cả", "Đang chuẩn bị", "Đang vận chuyển", "Hoàn thành", "Đã hủy"];

function OrderSection() {
    const [activeTab, setActiveTab] = useState("Tất cả");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const localOrders = JSON.parse(localStorage.getItem('orderList')) || [];

        // Gán trạng thái mặc định là "Đang chuẩn bị" nếu chưa có
        const normalizedOrders = localOrders.map(order => ({
            ...order,
            status: order.status || "Đang chuẩn bị"
        }));

        setOrders(normalizedOrders);
    }, []);

    const handleCancel = (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?");
        if (!confirmed) return;
        const updated = orders.map(order =>
            order.id === id ? { ...order, status: "Đã hủy" } : order
        );
        setOrders(updated);
        localStorage.setItem('orderList', JSON.stringify(updated)); // Cập nhật localStorage
        alert('hủy đơn thành công!');
    };

    const filteredOrders = activeTab === "Tất cả"
        ? orders
        : orders.filter(order => order.status === activeTab);

    return (
        <div className="order-container">
            <div className="order-tabs">
                {tabs.map(tab => (
                    <div
                        key={tab}
                        className={`order-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="order-list">
                {filteredOrders.map(order => (
                    <div key={order.id} className="order-card">
                        <img src={order.image} alt={order.name} className="order-image" />
                        <div className="order-info">
                            <h4>{order.name}</h4>
                            <p className="note">{order.note}</p>
                            <p>SL: {order.quantity}</p>
                            <p>{order.price.toLocaleString()}đ</p>
                        </div>
                        {order.status !== "Đã hủy" && (
                            <button className="cancel-button" onClick={() => handleCancel(order.id)}>✕</button>
                        )}
                    </div>
                ))}
                {filteredOrders.length === 0 && (
                    <p className="no-orders">Không có đơn hàng nào.</p>
                )}
            </div>
        </div>
    );
}

export default OrderSection;
