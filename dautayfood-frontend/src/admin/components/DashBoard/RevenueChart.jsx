import React, { useState, useMemo } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useOrders } from '../../contexts/OrdersContext';

const RevenueChart = () => {
    const [filter, setFilter] = useState('day');
    const { orders } = useOrders();

    // Process data based on filter
    const { chartData, totalRevenue, avgRevenue } = useMemo(() => {
        const groupedData = {};
        let total = 0;

        orders.forEach(order => {
            if (order.status === 'cancelled') return;

            const date = new Date(order.createdAt);
            let key;

            switch (filter) {
                case 'month':
                    key = `${date.getFullYear()}-${date.getMonth() + 1}`;
                    break;
                case 'year':
                    key = `${date.getFullYear()}`;
                    break;
                default: // day
                    key = date.toISOString().split('T')[0];
            }

            if (!groupedData[key]) {
                groupedData[key] = {
                    date: key,
                    revenue: 0,
                    orders: 0
                };
            }

            groupedData[key].revenue += order.total;
            groupedData[key].orders += 1;
            total += order.total;
        });

        const sortedData = Object.values(groupedData).sort((a, b) =>
            new Date(a.date) - new Date(b.date)
        );

        return {
            chartData: sortedData,
            totalRevenue: total,
            avgRevenue: total / (sortedData.length || 1)
        };
    }, [orders, filter]);

    const formatDate = (date) => {
        switch (filter) {
            case 'month':
                const [year, month] = date.split('-');
                return `${month}/${year}`;
            case 'year':
                return date;
            default:
                return new Date(date).toLocaleDateString('vi-VN');
        }
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border rounded shadow-lg">
                    <p className="font-medium">
                        {formatDate(label)}
                    </p>
                    <p className="text-green-600">
                        Doanh thu: {payload[0].value.toLocaleString()}đ
                    </p>
                    <p className="text-blue-600">
                        Số đơn: {payload[1].value}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">
                        Xu hướng doanh thu & đơn hàng
                    </h3>
                    <p className="text-gray-600">
                        Theo dõi hiệu suất kinh doanh theo {
                            filter === 'day' ? 'ngày' :
                                filter === 'month' ? 'tháng' : 'năm'
                        }
                    </p>
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-white 
                        shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="day">Theo ngày</option>
                    <option value="month">Theo tháng</option>
                    <option value="year">Theo năm</option>
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {avgRevenue.toLocaleString()}đ
                    </p>
                    <p className="text-sm text-gray-500">Doanh thu TB</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                        {chartData.reduce((sum, item) => sum + item.orders, 0)}
                    </p>
                    <p className="text-sm text-gray-500">Tổng đơn hàng</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                        {totalRevenue.toLocaleString()}đ
                    </p>
                    <p className="text-sm text-gray-500">Tổng doanh thu</p>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        tickFormatter={formatDate}
                        stroke="#666"
                        fontSize={12}
                    />
                    <YAxis
                        yAxisId="revenue"
                        orientation="left"
                        stroke="#10B981"
                        fontSize={12}
                    />
                    <YAxis
                        yAxisId="orders"
                        orientation="right"
                        stroke="#3B82F6"
                        fontSize={12}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                        yAxisId="revenue"
                        type="monotone"
                        dataKey="revenue"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2, fill: '#fff' }}
                        name="Doanh thu ($)"
                    />
                    <Line
                        yAxisId="orders"
                        type="monotone"
                        dataKey="orders"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, stroke: '#3B82F6', strokeWidth: 2, fill: '#fff' }}
                        name="Số đơn hàng"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;