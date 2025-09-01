// src/pages/UsersPage.jsx
import React, { useState } from "react";
import { useUsers } from "../contexts/UsersContext";
import UserTable from "../components/Users/Table/UserTable";
import UserFilters from "../components/Users/Filters/UserFilters";
import UserHeader from "../components/Users/Header/UserHeader";
import UserStats from "../components/Users/Statistics/UserStats";
import RoleStats from "../components/Users/Statistics/RoleStats";
import AddUserModal from "../components/Users/Modals/AddUserModal";
import EditUserModal from "../components/Users/Modals/EditUserModal";
import UserDetailModal from "../components/Users/Modals/UserDetailModal";

const UsersPage = () => {
    const {
        users,
        loading,
        addUser,
        updateUser,
        deleteUser,
        activateUser,
        deactivateUser,
        banUser,
        unbanUser,
        updateUserRole,
        promoteToAdmin,
        demoteToUser,
        bulkUpdateUsers,
        bulkDeleteUsers,
    } = useUsers();

    // Filters
    const [filters, setFilters] = useState({
        searchTerm: "",
        roleFilter: "all",
        statusFilter: "all",
    });

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Modals
    const [selectedUser, setSelectedUser] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    // Handlers
    const handleView = (user) => {
        setSelectedUser(user);
        setIsDetailModalOpen(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            deleteUser(id);
        }
    };

    const handleAddUser = (newUser) => {
        addUser(newUser);
        setIsAddModalOpen(false);
    };

    const handleUpdateUser = (updatedUser) => {
        updateUser(updatedUser);
        setIsEditModalOpen(false);
    };

    const handleStatusUpdate = (id, newStatus) => {
        switch (newStatus) {
            case "active":
                activateUser(id);
                break;
            case "inactive":
                deactivateUser(id);
                break;
            case "banned":
                banUser(id);
                break;
            case "unbanned":
                unbanUser(id);
                break;
            default:
                break;
        }
    };

    // Apply filters to users
    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesRole =
            filters.roleFilter === "all" || user.role === filters.roleFilter;

        const matchesStatus =
            filters.statusFilter === "all" || user.status === filters.statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <UserHeader onAdd={() => setIsAddModalOpen(true)} />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserStats users={filteredUsers} />
                <RoleStats users={filteredUsers} />
            </div>

            {/* Filters */}
            <UserFilters filters={filters} setFilters={setFilters} />

            {/* Table */}
            {loading ? (
                <div className="text-center py-6">Đang tải dữ liệu...</div>
            ) : (
                <UserTable
                    users={filteredUsers}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setCurrentPage={setCurrentPage}
                    filters={filters}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}

            {/* Modals */}
            <AddUserModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddUser}
            />

            <EditUserModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                user={selectedUser}
                onUpdate={handleUpdateUser}
            />

            <UserDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                user={selectedUser}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
};

export default UsersPage;
