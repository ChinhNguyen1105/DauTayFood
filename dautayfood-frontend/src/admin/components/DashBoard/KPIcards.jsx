import React from 'react';
import { useOrders } from '../../contexts/OrdersContext';
import { useProducts } from '../../contexts/ProductsContext';
import { useUsers } from '../../contexts/UsersContext';

const KPICards = () => {
    const { orders } = useOrders();
    const { products } = useProducts();
    const { users } = useUsers();

    // Calculate KPI metrics
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Orders metrics
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= today;
    });

    const revenueToday = todayOrders.reduce((sum, order) =>
        sum + (order.status !== 'cancelled' ? order.total : 0), 0);

    // Calculate month revenue
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= firstDayOfMonth && order.status !== 'cancelled';
    });
    const revenueMonth = monthOrders.reduce((sum, order) => sum + order.total, 0);

    // Calculate revenue growth
    const yesterdayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return orderDate.getDate() === yesterday.getDate() &&
            orderDate.getMonth() === yesterday.getMonth() &&
            orderDate.getFullYear() === yesterday.getFullYear() &&
            order.status !== 'cancelled';
    });
    const revenueYesterday = yesterdayOrders.reduce((sum, order) => sum + order.total, 0);
    const growth = revenueYesterday ? ((revenueToday - revenueYesterday) / revenueYesterday * 100).toFixed(1) : 0;

    // Products metrics
    const lowStockThreshold = 10;
    const lowStockProducts = products.filter(product => product.stock <= lowStockThreshold).length;

    // Users metrics
    const newUsers = users.filter(user => {
        const userCreatedDate = new Date(user.createdAt);
        return userCreatedDate >= today;
    }).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-sm opacity-90">Đơn hôm nay</h3>
                <p className="text-3xl font-bold">{todayOrders.length}</p>
                <p className="text-xs opacity-80">đơn hàng</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-sm opacity-90">Doanh thu hôm nay</h3>
                <p className="text-3xl font-bold">{revenueToday.toLocaleString()}đ</p>
                <p className="text-xs opacity-80">
                    {growth > 0 ? '↗' : growth < 0 ? '↘' : '→'} {Math.abs(growth)}%
                </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-sm opacity-90">Doanh thu tháng</h3>
                <p className="text-3xl font-bold">{revenueMonth.toLocaleString()}đ</p>
                <p className="text-xs opacity-80">tháng này</p>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-sm opacity-90">SP sắp hết</h3>
                <p className="text-3xl font-bold">{lowStockProducts}</p>
                <p className="text-xs opacity-80">cần nhập thêm</p>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-sm opacity-90">Người dùng mới</h3>
                <p className="text-3xl font-bold">{newUsers}</p>
                <p className="text-xs opacity-80">hôm nay</p>
            </div>
        </div>
    );
};

export default KPICards;