import React, { useState, useMemo } from "react";
import OrderHeader from "../components/Orders/OrderHeader";
import StatsOverview from "../components/Orders/Statistics";
import OrderFilters from "../components/Orders/Filters";
import OrderTable from "../components/Orders/Table";
import OrderDetailModal from "../components/Orders/Modals";
import Pagination from "../components/Orders/Pagination";
import { orders } from "../../data/orders";

const Orders = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showOrderModal, setShowOrderModal] = useState(false);

    // 📊 Statistics calculation
    const stats = useMemo(() => {
        const totalOrders = orders.length;
        const completedOrders = orders.filter((o) => o.status === "completed").length;
        const pendingOrders = orders.filter((o) => o.status === "pending").length;
        const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;
        const totalRevenue = orders
            .filter((o) => o.status === "completed")
            .reduce((sum, o) => sum + o.total, 0);

        return {
            totalOrders,
            completedOrders,
            pendingOrders,
            cancelledOrders,
            totalRevenue,
        };
    }, []);

    // 🔎 Filter logic
    const filteredOrders = useMemo(() => {
        let result = [...orders];

        // Search theo mã đơn hàng hoặc tên khách hàng
        if (searchTerm.trim() !== "") {
            const lowerSearch = searchTerm.toLowerCase();
            result = result.filter(
                (order) =>
                    order.id.toString().includes(lowerSearch) ||
                    order.userName.toLowerCase().includes(lowerSearch)
            );
        }

        // Lọc theo trạng thái
        if (statusFilter !== "all") {
            result = result.filter((order) => order.status === statusFilter);
        }

        // Lọc theo ngày
        if (dateFilter !== "all") {
            const now = new Date();
            result = result.filter((order) => {
                const orderDate = new Date(order.createdAt);
                const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);

                if (dateFilter === "today") return diffDays < 1;
                if (dateFilter === "week") return diffDays < 7;
                if (dateFilter === "month") return diffDays < 30;
                return true;
            });
        }

        return result;
    }, [searchTerm, statusFilter, dateFilter]);

    return (
        <div className="min-h-screen bg-gray-50">
            <OrderHeader />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <StatsOverview stats={stats} />

                <OrderFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                    setCurrentPage={setCurrentPage}
                />

                <OrderTable
                    orders={filteredOrders}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setSelectedOrder={setSelectedOrder}
                    setShowOrderModal={setShowOrderModal}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            {showOrderModal && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setShowOrderModal(false)}
                    onStatusUpdate={(orderId, newStatus) => {
                        // 🛠 Cập nhật trạng thái đơn hàng
                        console.log(`Updating order ${orderId} to status: ${newStatus}`);
                        setShowOrderModal(false);
                    }}
                />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrders.length / itemsPerPage)}
                itemsPerPage={itemsPerPage}
                totalItems={filteredOrders.length}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Orders;
