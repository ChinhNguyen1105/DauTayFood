// src/pages/AdminDashboard.jsx
import { useState, useMemo } from "react";
import KPICards from "../components/DashBoard/KPIcards";
import OrderStatusChart from "../components/DashBoard/OrderStatusChart";
import RevenueChart from "../components/DashBoard/RevenueChart";
import TopProducts from "../components/DashBoard/TopProducts";

// Import contexts
import { useProducts } from "../contexts/ProductsContext";
import { useUsers } from "../contexts/UsersContext";
import { useOrders } from "../contexts/OrdersContext";

const AdminDashboard = () => {
    const [timeRange, setTimeRange] = useState('30days'); // 7days, 30days, 3months, 6months, 1year
    const [selectedMetric, setSelectedMetric] = useState('revenue'); // revenue, orders, users

    // Lấy dữ liệu từ các contexts
    const { analytics: productAnalytics, products } = useProducts();
    const { analytics: userAnalytics, users } = useUsers();
    const { analytics: orderAnalytics, orders, getOrdersByDateRange } = useOrders();

    // Tính toán dữ liệu theo thời gian được chọn
    const timeRangeData = useMemo(() => {
        const now = new Date();
        let startDate;

        switch (timeRange) {
            case '7days':
                startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case '30days':
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case '3months':
                startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            case '6months':
                startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
                break;
            case '1year':
                startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        }

        return getOrdersByDateRange(startDate, now);
    }, [timeRange, getOrdersByDateRange]);

    // Dữ liệu KPI Cards
    const kpiData = {
        totalRevenue: orderAnalytics.totalRevenue,
        totalOrders: orderAnalytics.totalOrders,
        totalUsers: userAnalytics.totalUsers,
        totalProducts: productAnalytics.totalProducts,

        // Growth data (so với kỳ trước)
        revenueGrowth: 12.5, // % tăng trưởng doanh thu
        ordersGrowth: 8.3,   // % tăng trưởng đơn hàng
        usersGrowth: 15.7,   // % tăng trưởng người dùng
        productsGrowth: 2.1, // % tăng trưởng sản phẩm

        // Additional metrics
        averageOrderValue: orderAnalytics.averageOrderValue,
        conversionRate: orderAnalytics.totalOrders / userAnalytics.totalUsers * 100,

        // Today's metrics
        todayRevenue: orderAnalytics.revenueToday,
        todayOrders: orderAnalytics.ordersToday,
        todayUsers: userAnalytics.newUsersToday,

        // Pending items that need attention
        pendingOrders: orderAnalytics.pendingOrders,
        lowStockProducts: productAnalytics.lowStockProducts.length,
        inactiveUsers: userAnalytics.inactiveUsers
    };

    // Dữ liệu cho Order Status Chart
    const orderStatusData = orderAnalytics.ordersByStatus.map(item => ({
        name: item.status,
        value: item.count,
        percentage: parseFloat(item.percentage),
        color: getStatusColor(item.status)
    }));

    // Dữ liệu cho Revenue Chart
    const revenueChartData = timeRangeData.map(item => ({
        date: item.date,
        revenue: item.revenue,
        orders: item.orders,
        // Format date for display
        displayDate: new Date(item.date).toLocaleDateString('vi-VN', {
            month: 'short',
            day: 'numeric'
        })
    }));

    // Dữ liệu cho Top Products
    const topProductsData = orderAnalytics.topProducts.map(item => ({
        id: item.productId,
        name: item.productName,
        sold: item.quantity,
        revenue: item.revenue,
        // Lấy thêm thông tin từ products context
        ...products.find(p => p.id === item.productId)
    }));

    // Helper function cho màu sắc status
    function getStatusColor(status) {
        const colors = {
            pending: '#FFA726',      // Orange
            confirmed: '#42A5F5',    // Blue
            processing: '#AB47BC',   // Purple
            shipping: '#26A69A',     // Teal
            delivered: '#66BB6A',    // Green
            cancelled: '#EF5350',    // Red
            refunded: '#FF7043'      // Deep Orange
        };
        return colors[status] || '#9E9E9E';
    }

    // Handler cho việc refresh data
    const handleRefresh = () => {
        // Có thể thêm logic refresh data từ API
        console.log('Refreshing dashboard data...');
    };

    // Handler cho việc thay đổi time range
    const handleTimeRangeChange = (newTimeRange) => {
        setTimeRange(newTimeRange);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Dashboard Admin
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Tổng quan hoạt động kinh doanh
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Time Range Selector */}
                            <select
                                value={timeRange}
                                onChange={(e) => handleTimeRangeChange(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="7days">7 ngày qua</option>
                                <option value="30days">30 ngày qua</option>
                                <option value="3months">3 tháng qua</option>
                                <option value="6months">6 tháng qua</option>
                                <option value="1year">1 năm qua</option>
                            </select>

                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Làm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* KPI Cards Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Chỉ số hiệu suất chính
                    </h2>
                    <KPICards data={kpiData} />
                </div>

                {/* Charts Grid */}


                {/* Revenue Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-10">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">
                                Biểu đồ doanh thu
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">
                                    {timeRange === '7days' ? '7 ngày' :
                                        timeRange === '30days' ? '30 ngày' :
                                            timeRange === '3months' ? '3 tháng' :
                                                timeRange === '6months' ? '6 tháng' : '1 năm'} qua
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <RevenueChart
                            data={revenueChartData}
                            timeRange={timeRange}
                        />
                    </div>
                </div>

                {/* Order Status Chart */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-10">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">
                            Trạng thái đơn hàng
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Tổng: {orderAnalytics.totalOrders} đơn hàng
                        </p>
                    </div>
                    <div className="p-6">
                        <OrderStatusChart
                            data={orderStatusData}
                            total={orderAnalytics.totalOrders}
                        />
                    </div>
                </div>


                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Top Products - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">
                                Sản phẩm bán chạy
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Top 10 sản phẩm theo số lượng bán
                            </p>
                        </div>
                        <div className="p-6">
                            <TopProducts
                                data={topProductsData}
                                showRevenue={true}
                            />
                        </div>
                    </div>

                    {/* Quick Actions & Alerts */}
                    <div className="space-y-6">

                        {/* Alerts Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Cảnh báo
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">

                                {/* Pending Orders Alert */}
                                {kpiData.pendingOrders > 0 && (
                                    <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-md">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-orange-800">
                                                {kpiData.pendingOrders} đơn hàng chờ xử lý
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Low Stock Alert */}
                                {kpiData.lowStockProducts > 0 && (
                                    <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-red-800">
                                                {kpiData.lowStockProducts} sản phẩm sắp hết hàng
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* No alerts */}
                                {kpiData.pendingOrders === 0 && kpiData.lowStockProducts === 0 && (
                                    <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                                        <div className="flex-shrink-0">
                                            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-green-800">
                                                Tất cả đều ổn!
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">
                                    Thống kê nhanh
                                </h3>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Tỷ lệ chuyển đổi</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {kpiData.conversionRate.toFixed(2)}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">AOV (Giá trị đơn trung bình)</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {kpiData.averageOrderValue.toLocaleString()}đ
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Đánh giá TB sản phẩm</span>
                                    <span className="text-sm font-medium text-gray-900">
                                        {productAnalytics.avgRate}/5 ⭐
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Đơn hàng hoàn thành</span>
                                    <span className="text-sm font-medium text-green-600">
                                        {orderAnalytics.completedOrders}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;