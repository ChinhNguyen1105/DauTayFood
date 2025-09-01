import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useOrders } from '../../contexts/OrdersContext';

const COLORS = ['#4CAF50', '#FFC107', '#F44336', '#2196F3'];

const OrderStatusChart = () => {
    const { orders } = useOrders();

    // Process orders data for chart
    const processOrderStatusData = () => {
        const statusCounts = orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        }, {});

        return [
            {
                name: 'Hoàn thành',
                value: statusCounts['completed'] || 0
            },
            {
                name: 'Đang xử lý',
                value: statusCounts['processing'] || 0
            },
            {
                name: 'Đã hủy',
                value: statusCounts['cancelled'] || 0
            },
            {
                name: 'Đang giao',
                value: statusCounts['delivering'] || 0
            }
        ];
    };

    const orderStatusData = processOrderStatusData();

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Tỉ lệ trạng thái đơn hàng</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={orderStatusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        paddingAngle={5}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {orderStatusData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => [`${value} đơn`, '']}
                    />
                    <Legend
                        formatter={(value) => <span className="text-sm">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderStatusChart;