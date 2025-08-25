import React, { useEffect, useState } from 'react';

const tabs = ["Tất cả", "Đang chuẩn bị", "Đang vận chuyển", "Hoàn thành", "Đã hủy"];

function OrderSection() {
    const [activeTab, setActiveTab] = useState("Tất cả");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const localOrders = JSON.parse(localStorage.getItem('orderList')) || [];
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
        localStorage.setItem('orderList', JSON.stringify(updated));
        alert('Hủy đơn thành công!');
    };

    const filteredOrders = activeTab === "Tất cả"
        ? orders
        : orders.filter(order => order.status === activeTab);

    return (
        <div className="box-border bg-white dark:bg-gray-900 dark:text-gray-100 p-5 md:p-10 w-full flex-1 min-h-screen">
            <div className="flex justify-between items-center overflow-x-auto whitespace-nowrap mb-5 border-b border-gray-300 dark:border-gray-700 pb-2">
                {tabs.map(tab => (
                    <div
                        key={tab}
                        className={`cursor-pointer px-3 py-2 text-sm md:text-base font-medium transition-colors duration-300 ease-in-out ${activeTab === tab
                            ? 'text-red-500 font-bold border-b-2 border-red-500'
                            : 'text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
                            }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <div
                            key={order.id}
                            className="relative flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-pink-500 w-full transition-colors"
                        >
                            <img
                                src={order.image}
                                alt={order.name}
                                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm md:text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                                    {order.name}
                                </h4>
                                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 break-words line-clamp-2">
                                    {order.note}
                                </p>
                                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 mt-1">
                                    SL: {order.quantity}
                                </p>
                                <p className="text-sm md:text-base font-bold text-red-500 mt-1">
                                    {order.price.toLocaleString()}đ
                                </p>
                            </div>
                            {order.status !== "Đã hủy" && (
                                <button
                                    className="absolute top-2 right-2 text-gray-400 dark:text-gray-500 text-lg transition-colors duration-200 hover:text-red-600 focus:outline-none"
                                    onClick={() => handleCancel(order.id)}
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="w-full text-center text-gray-500 dark:text-gray-400 italic mt-5">
                        Không có đơn hàng nào.
                    </p>
                )}
            </div>
        </div>
    );
}

export default OrderSection;
