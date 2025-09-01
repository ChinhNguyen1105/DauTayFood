// src/context/OrdersContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { orders as initialOrders } from "../../data/orders";

// ====== Context ======
const OrdersContext = createContext();

// Trạng thái đơn hàng
export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPING: 'shipping',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded'
};

// Phương thức thanh toán
export const PAYMENT_METHODS = {
    COD: 'cod',
    BANK_TRANSFER: 'bank_transfer',
    CREDIT_CARD: 'credit_card',
    E_WALLET: 'e_wallet',
    PAYPAL: 'paypal'
};

// Trạng thái thanh toán
export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded'
};

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState(initialOrders);

    // ====== Phân tích dữ liệu cho admin ======
    const analytics = useMemo(() => {
        if (!orders.length) {
            return {
                totalOrders: 0,
                totalRevenue: 0,
                averageOrderValue: 0,
                ordersToday: 0,
                ordersThisWeek: 0,
                ordersThisMonth: 0,
                revenueToday: 0,
                revenueThisWeek: 0,
                revenueThisMonth: 0,
                ordersByStatus: [],
                ordersByPaymentMethod: [],
                ordersByPaymentStatus: [],
                pendingOrders: 0,
                completedOrders: 0,
                cancelledOrders: 0,
                refundedOrders: 0,
                topProducts: [],
                recentOrders: []
            };
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Thống kê cơ bản
        const totalOrders = orders.length;
        const totalRevenue = orders
            .filter(o => o.status !== ORDER_STATUS.CANCELLED && o.status !== ORDER_STATUS.REFUNDED)
            .reduce((sum, o) => sum + (o.total || 0), 0);
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

        // Đơn hàng theo thời gian
        const ordersToday = orders.filter(o => {
            const orderDate = new Date(o.createdAt || o.orderDate);
            return orderDate >= today;
        }).length;

        const ordersThisWeek = orders.filter(o => {
            const orderDate = new Date(o.createdAt || o.orderDate);
            return orderDate >= weekAgo;
        }).length;

        const ordersThisMonth = orders.filter(o => {
            const orderDate = new Date(o.createdAt || o.orderDate);
            return orderDate >= monthAgo;
        }).length;

        // Doanh thu theo thời gian
        const revenueToday = orders
            .filter(o => {
                const orderDate = new Date(o.createdAt || o.orderDate);
                return orderDate >= today && o.status !== ORDER_STATUS.CANCELLED && o.status !== ORDER_STATUS.REFUNDED;
            })
            .reduce((sum, o) => sum + (o.total || 0), 0);

        const revenueThisWeek = orders
            .filter(o => {
                const orderDate = new Date(o.createdAt || o.orderDate);
                return orderDate >= weekAgo && o.status !== ORDER_STATUS.CANCELLED && o.status !== ORDER_STATUS.REFUNDED;
            })
            .reduce((sum, o) => sum + (o.total || 0), 0);

        const revenueThisMonth = orders
            .filter(o => {
                const orderDate = new Date(o.createdAt || o.orderDate);
                return orderDate >= monthAgo && o.status !== ORDER_STATUS.CANCELLED && o.status !== ORDER_STATUS.REFUNDED;
            })
            .reduce((sum, o) => sum + (o.total || 0), 0);

        // Thống kê theo trạng thái đơn hàng
        const statusStats = {};
        orders.forEach(order => {
            const status = order.status || ORDER_STATUS.PENDING;
            statusStats[status] = (statusStats[status] || 0) + 1;
        });
        const ordersByStatus = Object.entries(statusStats).map(([status, count]) => ({
            status,
            count,
            percentage: ((count / totalOrders) * 100).toFixed(1)
        }));

        // Thống kê theo phương thức thanh toán
        const paymentMethodStats = {};
        orders.forEach(order => {
            const method = order.paymentMethod || PAYMENT_METHODS.COD;
            paymentMethodStats[method] = (paymentMethodStats[method] || 0) + 1;
        });
        const ordersByPaymentMethod = Object.entries(paymentMethodStats).map(([method, count]) => ({
            method,
            count,
            percentage: ((count / totalOrders) * 100).toFixed(1)
        }));

        // Thống kê theo trạng thái thanh toán
        const paymentStatusStats = {};
        orders.forEach(order => {
            const status = order.paymentStatus || PAYMENT_STATUS.PENDING;
            paymentStatusStats[status] = (paymentStatusStats[status] || 0) + 1;
        });
        const ordersByPaymentStatus = Object.entries(paymentStatusStats).map(([status, count]) => ({
            status,
            count,
            percentage: ((count / totalOrders) * 100).toFixed(1)
        }));

        // Đơn hàng theo trạng thái cụ thể
        const pendingOrders = orders.filter(o => o.status === ORDER_STATUS.PENDING).length;
        const completedOrders = orders.filter(o => o.status === ORDER_STATUS.DELIVERED).length;
        const cancelledOrders = orders.filter(o => o.status === ORDER_STATUS.CANCELLED).length;
        const refundedOrders = orders.filter(o => o.status === ORDER_STATUS.REFUNDED).length;

        // Top sản phẩm bán chạy
        const productStats = {};
        orders.forEach(order => {
            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const productId = item.productId || item.id;
                    const productName = item.productName || item.name;
                    const quantity = item.quantity || 1;

                    if (productStats[productId]) {
                        productStats[productId].quantity += quantity;
                        productStats[productId].revenue += (item.price || 0) * quantity;
                    } else {
                        productStats[productId] = {
                            productId,
                            productName,
                            quantity,
                            revenue: (item.price || 0) * quantity
                        };
                    }
                });
            }
        });

        const topProducts = Object.values(productStats)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);

        // Đơn hàng gần đây
        const recentOrders = [...orders]
            .sort((a, b) => new Date(b.createdAt || b.orderDate) - new Date(a.createdAt || a.orderDate))
            .slice(0, 10);

        return {
            totalOrders,
            totalRevenue: Number(totalRevenue.toFixed(2)),
            averageOrderValue: Number(averageOrderValue.toFixed(2)),
            ordersToday,
            ordersThisWeek,
            ordersThisMonth,
            revenueToday: Number(revenueToday.toFixed(2)),
            revenueThisWeek: Number(revenueThisWeek.toFixed(2)),
            revenueThisMonth: Number(revenueThisMonth.toFixed(2)),
            ordersByStatus,
            ordersByPaymentMethod,
            ordersByPaymentStatus,
            pendingOrders,
            completedOrders,
            cancelledOrders,
            refundedOrders,
            topProducts,
            recentOrders
        };
    }, [orders]);

    // ====== CRUD cơ bản ======
    const addOrder = (newOrder) => {
        const newId = Math.max(...orders.map(o => o.id), 0) + 1;
        const orderNumber = `ORD${Date.now()}`;

        const orderWithDefaults = {
            id: newId,
            orderNumber,
            status: ORDER_STATUS.PENDING,
            paymentStatus: PAYMENT_STATUS.PENDING,
            paymentMethod: PAYMENT_METHODS.COD,
            total: 0,
            subtotal: 0,
            tax: 0,
            shipping: 0,
            discount: 0,
            items: [],
            ...newOrder,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        setOrders((prev) => [...prev, orderWithDefaults]);
        return orderWithDefaults;
    };

    const updateOrder = (id, updatedFields) => {
        setOrders((prev) =>
            prev.map((o) =>
                o.id === id
                    ? {
                        ...o,
                        ...updatedFields,
                        updatedAt: new Date().toISOString()
                    }
                    : o
            )
        );
    };

    const deleteOrder = (id) => {
        setOrders((prev) => prev.filter((o) => o.id !== id));
    };

    // ====== Quản lý trạng thái đơn hàng ======
    const updateOrderStatus = (id, newStatus, note = '') => {
        const statusHistory = {
            status: newStatus,
            timestamp: new Date().toISOString(),
            note
        };

        updateOrder(id, {
            status: newStatus,
            [`${newStatus}At`]: new Date().toISOString(),
            statusHistory: (orders.find(o => o.id === id)?.statusHistory || []).concat(statusHistory)
        });
    };

    const confirmOrder = (id, note = '') => {
        updateOrderStatus(id, ORDER_STATUS.CONFIRMED, note);
    };

    const processOrder = (id, note = '') => {
        updateOrderStatus(id, ORDER_STATUS.PROCESSING, note);
    };

    const shipOrder = (id, trackingNumber = '', note = '') => {
        updateOrder(id, {
            status: ORDER_STATUS.SHIPPING,
            trackingNumber,
            shippedAt: new Date().toISOString(),
            statusHistory: (orders.find(o => o.id === id)?.statusHistory || []).concat({
                status: ORDER_STATUS.SHIPPING,
                timestamp: new Date().toISOString(),
                note: note || `Đã giao cho đơn vị vận chuyển. Mã vận đơn: ${trackingNumber}`
            })
        });
    };

    const deliverOrder = (id, note = '') => {
        updateOrder(id, {
            status: ORDER_STATUS.DELIVERED,
            paymentStatus: PAYMENT_STATUS.PAID, // Tự động cập nhật thanh toán khi giao hàng thành công
            deliveredAt: new Date().toISOString(),
            statusHistory: (orders.find(o => o.id === id)?.statusHistory || []).concat({
                status: ORDER_STATUS.DELIVERED,
                timestamp: new Date().toISOString(),
                note: note || 'Đơn hàng đã được giao thành công'
            })
        });
    };

    const cancelOrder = (id, reason = '') => {
        updateOrder(id, {
            status: ORDER_STATUS.CANCELLED,
            cancelledAt: new Date().toISOString(),
            cancellationReason: reason,
            statusHistory: (orders.find(o => o.id === id)?.statusHistory || []).concat({
                status: ORDER_STATUS.CANCELLED,
                timestamp: new Date().toISOString(),
                note: reason || 'Đơn hàng đã bị hủy'
            })
        });
    };

    // ====== Quản lý thanh toán ======
    const updatePaymentStatus = (id, paymentStatus, note = '') => {
        updateOrder(id, {
            paymentStatus,
            [`payment${paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}At`]: new Date().toISOString(),
            paymentNote: note
        });
    };

    const markAsPaid = (id, transactionId = '', note = '') => {
        updateOrder(id, {
            paymentStatus: PAYMENT_STATUS.PAID,
            paidAt: new Date().toISOString(),
            transactionId,
            paymentNote: note
        });
    };

    const refundOrder = (id, refundAmount, reason = '') => {
        const order = orders.find(o => o.id === id);
        const refundAmountFinal = refundAmount || order?.total || 0;

        updateOrder(id, {
            status: ORDER_STATUS.REFUNDED,
            paymentStatus: PAYMENT_STATUS.REFUNDED,
            refundedAt: new Date().toISOString(),
            refundAmount: refundAmountFinal,
            refundReason: reason,
            statusHistory: (order?.statusHistory || []).concat({
                status: ORDER_STATUS.REFUNDED,
                timestamp: new Date().toISOString(),
                note: `Đã hoàn tiền ${refundAmountFinal.toLocaleString()}đ. Lý do: ${reason}`
            })
        });
    };

    // ====== Tìm kiếm và lọc ======
    const searchOrders = (query) => {
        if (!query) return orders;

        const searchTerm = query.toLowerCase();
        return orders.filter(order =>
            order.orderNumber?.toLowerCase().includes(searchTerm) ||
            order.customerName?.toLowerCase().includes(searchTerm) ||
            order.customerEmail?.toLowerCase().includes(searchTerm) ||
            order.customerPhone?.includes(query) ||
            order.id?.toString().includes(query)
        );
    };

    const filterOrders = (filters) => {
        let filtered = [...orders];

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(o => o.status === filters.status);
        }

        if (filters.paymentStatus && filters.paymentStatus !== 'all') {
            filtered = filtered.filter(o => o.paymentStatus === filters.paymentStatus);
        }

        if (filters.paymentMethod && filters.paymentMethod !== 'all') {
            filtered = filtered.filter(o => o.paymentMethod === filters.paymentMethod);
        }

        if (filters.minTotal !== undefined) {
            filtered = filtered.filter(o => (o.total || 0) >= filters.minTotal);
        }

        if (filters.maxTotal !== undefined) {
            filtered = filtered.filter(o => (o.total || 0) <= filters.maxTotal);
        }

        if (filters.dateFrom) {
            const fromDate = new Date(filters.dateFrom);
            filtered = filtered.filter(o => new Date(o.createdAt || o.orderDate) >= fromDate);
        }

        if (filters.dateTo) {
            const toDate = new Date(filters.dateTo);
            filtered = filtered.filter(o => new Date(o.createdAt || o.orderDate) <= toDate);
        }

        if (filters.customerId) {
            filtered = filtered.filter(o => o.customerId === filters.customerId);
        }

        return filtered;
    };

    // ====== Sắp xếp ======
    const sortOrders = (orders, sortBy, sortOrder = 'desc') => {
        return [...orders].sort((a, b) => {
            let aVal, bVal;

            switch (sortBy) {
                case 'orderNumber':
                    aVal = a.orderNumber || '';
                    bVal = b.orderNumber || '';
                    break;
                case 'total':
                    aVal = a.total || 0;
                    bVal = b.total || 0;
                    break;
                case 'createdAt':
                    aVal = new Date(a.createdAt || a.orderDate || 0);
                    bVal = new Date(b.createdAt || b.orderDate || 0);
                    break;
                case 'customerName':
                    aVal = a.customerName || '';
                    bVal = b.customerName || '';
                    break;
                case 'status':
                    aVal = a.status || '';
                    bVal = b.status || '';
                    break;
                case 'paymentStatus':
                    aVal = a.paymentStatus || '';
                    bVal = b.paymentStatus || '';
                    break;
                default:
                    return 0;
            }

            if (sortOrder === 'desc') {
                return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
            }
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
    };

    // ====== Quản lý hàng loạt ======
    const bulkUpdateOrders = (orderIds, updates) => {
        setOrders(prev =>
            prev.map(order => {
                if (orderIds.includes(order.id)) {
                    return {
                        ...order,
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                }
                return order;
            })
        );
    };

    const bulkUpdateStatus = (orderIds, newStatus, note = '') => {
        const statusUpdate = {
            status: newStatus,
            [`${newStatus}At`]: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        bulkUpdateOrders(orderIds, statusUpdate);
    };

    // ====== Báo cáo và thống kê ======
    const getRevenueByDate = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return orders
            .filter(o => {
                const orderDate = new Date(o.createdAt || o.orderDate);
                return orderDate >= start && orderDate <= end &&
                    o.status !== ORDER_STATUS.CANCELLED &&
                    o.status !== ORDER_STATUS.REFUNDED;
            })
            .reduce((sum, o) => sum + (o.total || 0), 0);
    };

    const getOrdersByDateRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const dateMap = {};
        const current = new Date(start);

        while (current <= end) {
            const dateKey = current.toISOString().split('T')[0];
            dateMap[dateKey] = { date: dateKey, orders: 0, revenue: 0 };
            current.setDate(current.getDate() + 1);
        }

        orders.forEach(order => {
            const orderDate = new Date(order.createdAt || order.orderDate);
            if (orderDate >= start && orderDate <= end) {
                const dateKey = orderDate.toISOString().split('T')[0];
                if (dateMap[dateKey]) {
                    dateMap[dateKey].orders += 1;
                    if (order.status !== ORDER_STATUS.CANCELLED && order.status !== ORDER_STATUS.REFUNDED) {
                        dateMap[dateKey].revenue += (order.total || 0);
                    }
                }
            }
        });

        return Object.values(dateMap);
    };

    // ====== Xuất dữ liệu ======
    const exportOrders = (format = 'json', filters = {}) => {
        let ordersToExport = orders;

        if (Object.keys(filters).length > 0) {
            ordersToExport = filterOrders(filters);
        }

        const dataToExport = {
            orders: ordersToExport,
            analytics,
            exportedAt: new Date().toISOString(),
            totalExported: ordersToExport.length
        };

        if (format === 'json') {
            return JSON.stringify(dataToExport, null, 2);
        }

        if (format === 'csv') {
            const headers = [
                'Order ID', 'Order Number', 'Customer Name', 'Customer Email',
                'Total', 'Status', 'Payment Status', 'Payment Method',
                'Created At', 'Updated At'
            ];

            const csvRows = [
                headers.join(','),
                ...ordersToExport.map(order => [
                    order.id,
                    `"${order.orderNumber || ''}"`,
                    `"${order.customerName || ''}"`,
                    `"${order.customerEmail || ''}"`,
                    order.total || 0,
                    order.status || '',
                    order.paymentStatus || '',
                    order.paymentMethod || '',
                    order.createdAt || '',
                    order.updatedAt || ''
                ].join(','))
            ];
            return csvRows.join('\n');
        }

        return dataToExport;
    };

    const contextValue = {
        // Dữ liệu
        orders,
        analytics,

        // Constants
        ORDER_STATUS,
        PAYMENT_METHODS,
        PAYMENT_STATUS,

        // CRUD
        addOrder,
        updateOrder,
        deleteOrder,

        // Quản lý trạng thái
        updateOrderStatus,
        confirmOrder,
        processOrder,
        shipOrder,
        deliverOrder,
        cancelOrder,

        // Quản lý thanh toán
        updatePaymentStatus,
        markAsPaid,
        refundOrder,

        // Tìm kiếm & lọc
        searchOrders,
        filterOrders,
        sortOrders,

        // Hàng loạt
        bulkUpdateOrders,
        bulkUpdateStatus,

        // Báo cáo
        getRevenueByDate,
        getOrdersByDateRange,

        // Tiện ích
        exportOrders
    };

    return (
        <OrdersContext.Provider value={contextValue}>
            {children}
        </OrdersContext.Provider>
    );
};

// Hook tiện dùng
export const useOrders = () => {
    const context = useContext(OrdersContext);

    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }

    return context;
};

// Hook cho analytics
export const useOrderAnalytics = () => {
    const { analytics, getRevenueByDate, getOrdersByDateRange } = useOrders();
    return { analytics, getRevenueByDate, getOrdersByDateRange };
};

// Hook cho order actions
export const useOrderActions = () => {
    const {
        addOrder,
        updateOrder,
        deleteOrder,
        confirmOrder,
        processOrder,
        shipOrder,
        deliverOrder,
        cancelOrder,
        markAsPaid,
        refundOrder,
        bulkUpdateOrders,
        bulkUpdateStatus
    } = useOrders();

    return {
        addOrder,
        updateOrder,
        deleteOrder,
        confirmOrder,
        processOrder,
        shipOrder,
        deliverOrder,
        cancelOrder,
        markAsPaid,
        refundOrder,
        bulkUpdateOrders,
        bulkUpdateStatus
    };
};