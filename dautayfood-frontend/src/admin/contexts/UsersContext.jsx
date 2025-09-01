// src/context/UsersContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { users as initialUsers } from "../../data/users";

// ====== Context ======
const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(initialUsers);

    // ====== Phân tích dữ liệu cho admin ======
    const analytics = useMemo(() => {
        if (!users.length) {
            return {
                totalUsers: 0,
                activeUsers: 0,
                inactiveUsers: 0,
                newUsersToday: 0,
                newUsersThisWeek: 0,
                newUsersThisMonth: 0,
                usersByRole: [],
                usersByStatus: [],
                averageOrderValue: 0,
                topSpenders: [],
                recentRegistrations: []
            };
        }

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        // Thống kê cơ bản
        const totalUsers = users.length;
        const activeUsers = users.filter(u => u.status === 'active').length;
        const inactiveUsers = users.filter(u => u.status === 'inactive').length;

        // Người dùng mới
        const newUsersToday = users.filter(u => {
            const createdDate = new Date(u.createdAt || u.joinDate);
            return createdDate >= today;
        }).length;

        const newUsersThisWeek = users.filter(u => {
            const createdDate = new Date(u.createdAt || u.joinDate);
            return createdDate >= weekAgo;
        }).length;

        const newUsersThisMonth = users.filter(u => {
            const createdDate = new Date(u.createdAt || u.joinDate);
            return createdDate >= monthAgo;
        }).length;

        // Thống kê theo vai trò
        const roleStats = {};
        users.forEach(user => {
            const role = user.role || 'user';
            roleStats[role] = (roleStats[role] || 0) + 1;
        });
        const usersByRole = Object.entries(roleStats).map(([role, count]) => ({
            role,
            count,
            percentage: ((count / totalUsers) * 100).toFixed(1)
        }));

        // Thống kê theo trạng thái
        const statusStats = {};
        users.forEach(user => {
            const status = user.status || 'active';
            statusStats[status] = (statusStats[status] || 0) + 1;
        });
        const usersByStatus = Object.entries(statusStats).map(([status, count]) => ({
            status,
            count,
            percentage: ((count / totalUsers) * 100).toFixed(1)
        }));

        // Top khách hàng chi tiêu nhiều nhất
        const topSpenders = [...users]
            .filter(u => u.totalSpent && u.totalSpent > 0)
            .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
            .slice(0, 10);

        // Giá trị đơn hàng trung bình
        const totalSpent = users.reduce((sum, u) => sum + (u.totalSpent || 0), 0);
        const usersWithOrders = users.filter(u => (u.totalOrders || 0) > 0);
        const totalOrders = users.reduce((sum, u) => sum + (u.totalOrders || 0), 0);
        const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

        // Đăng ký gần đây
        const recentRegistrations = [...users]
            .sort((a, b) => new Date(b.createdAt || b.joinDate) - new Date(a.createdAt || a.joinDate))
            .slice(0, 10);

        return {
            totalUsers,
            activeUsers,
            inactiveUsers,
            newUsersToday,
            newUsersThisWeek,
            newUsersThisMonth,
            usersByRole,
            usersByStatus,
            averageOrderValue: Number(averageOrderValue.toFixed(2)),
            topSpenders,
            recentRegistrations,
            totalSpent: Number(totalSpent.toFixed(2))
        };
    }, [users]);

    // ====== CRUD cơ bản ======
    const addUser = (newUser) => {
        const newId = Math.max(...users.map(u => u.id), 0) + 1;
        const userWithDefaults = {
            id: newId,
            status: 'active',
            role: 'user',
            totalOrders: 0,
            totalSpent: 0,
            ...newUser,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            lastLogin: null
        };

        setUsers((prev) => [...prev, userWithDefaults]);
        return userWithDefaults;
    };

    const updateUser = (id, updatedFields) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === id
                    ? {
                        ...u,
                        ...updatedFields,
                        updatedAt: new Date().toISOString()
                    }
                    : u
            )
        );
    };

    const deleteUser = (id) => {
        setUsers((prev) => prev.filter((u) => u.id !== id));
    };

    // ====== Quản lý trạng thái user ======
    const activateUser = (id) => {
        updateUser(id, {
            status: 'active',
            activatedAt: new Date().toISOString()
        });
    };

    const deactivateUser = (id, reason = '') => {
        updateUser(id, {
            status: 'inactive',
            deactivatedAt: new Date().toISOString(),
            deactivationReason: reason
        });
    };

    const banUser = (id, reason = '') => {
        updateUser(id, {
            status: 'banned',
            bannedAt: new Date().toISOString(),
            banReason: reason
        });
    };

    const unbanUser = (id) => {
        updateUser(id, {
            status: 'active',
            bannedAt: null,
            banReason: null,
            unbannedAt: new Date().toISOString()
        });
    };

    // ====== Quản lý vai trò ======
    const updateUserRole = (id, newRole) => {
        updateUser(id, {
            role: newRole,
            roleUpdatedAt: new Date().toISOString()
        });
    };

    const promoteToAdmin = (id) => {
        updateUserRole(id, 'admin');
    };

    const demoteToUser = (id) => {
        updateUserRole(id, 'user');
    };

    // ====== Tìm kiếm và lọc ======
    const searchUsers = (query) => {
        if (!query) return users;

        const searchTerm = query.toLowerCase();
        return users.filter(user =>
            user.name?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm) ||
            user.username?.toLowerCase().includes(searchTerm) ||
            user.phone?.includes(query)
        );
    };

    const filterUsers = (filters) => {
        let filtered = [...users];

        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(u => u.status === filters.status);
        }

        if (filters.role && filters.role !== 'all') {
            filtered = filtered.filter(u => u.role === filters.role);
        }

        if (filters.minSpent !== undefined) {
            filtered = filtered.filter(u => (u.totalSpent || 0) >= filters.minSpent);
        }

        if (filters.maxSpent !== undefined) {
            filtered = filtered.filter(u => (u.totalSpent || 0) <= filters.maxSpent);
        }

        if (filters.minOrders !== undefined) {
            filtered = filtered.filter(u => (u.totalOrders || 0) >= filters.minOrders);
        }

        if (filters.registeredAfter) {
            const afterDate = new Date(filters.registeredAfter);
            filtered = filtered.filter(u => new Date(u.createdAt || u.joinDate) >= afterDate);
        }

        if (filters.registeredBefore) {
            const beforeDate = new Date(filters.registeredBefore);
            filtered = filtered.filter(u => new Date(u.createdAt || u.joinDate) <= beforeDate);
        }

        if (filters.hasOrders !== undefined) {
            filtered = filtered.filter(u =>
                filters.hasOrders ? (u.totalOrders || 0) > 0 : (u.totalOrders || 0) === 0
            );
        }

        return filtered;
    };

    // ====== Sắp xếp ======
    const sortUsers = (users, sortBy, sortOrder = 'asc') => {
        return [...users].sort((a, b) => {
            let aVal, bVal;

            switch (sortBy) {
                case 'name':
                    aVal = a.name || '';
                    bVal = b.name || '';
                    break;
                case 'email':
                    aVal = a.email || '';
                    bVal = b.email || '';
                    break;
                case 'totalSpent':
                    aVal = a.totalSpent || 0;
                    bVal = b.totalSpent || 0;
                    break;
                case 'totalOrders':
                    aVal = a.totalOrders || 0;
                    bVal = b.totalOrders || 0;
                    break;
                case 'createdAt':
                    aVal = new Date(a.createdAt || a.joinDate || 0);
                    bVal = new Date(b.createdAt || b.joinDate || 0);
                    break;
                case 'lastLogin':
                    aVal = new Date(a.lastLogin || 0);
                    bVal = new Date(b.lastLogin || 0);
                    break;
                case 'status':
                    aVal = a.status || '';
                    bVal = b.status || '';
                    break;
                case 'role':
                    aVal = a.role || '';
                    bVal = b.role || '';
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
    const bulkUpdateUsers = (userIds, updates) => {
        setUsers(prev =>
            prev.map(user => {
                if (userIds.includes(user.id)) {
                    return {
                        ...user,
                        ...updates,
                        updatedAt: new Date().toISOString()
                    };
                }
                return user;
            })
        );
    };

    const bulkDeleteUsers = (userIds) => {
        setUsers(prev => prev.filter(user => !userIds.includes(user.id)));
    };

    // ====== Xuất dữ liệu ======
    const exportUsers = (format = 'json', filters = {}) => {
        let usersToExport = users;

        if (Object.keys(filters).length > 0) {
            usersToExport = filterUsers(filters);
        }

        const dataToExport = {
            users: usersToExport,
            analytics,
            exportedAt: new Date().toISOString(),
            totalExported: usersToExport.length
        };

        if (format === 'json') {
            return JSON.stringify(dataToExport, null, 2);
        }

        if (format === 'csv') {
            const headers = ['ID', 'Name', 'Email', 'Role', 'Status', 'Total Orders', 'Total Spent', 'Created At'];
            const csvRows = [
                headers.join(','),
                ...usersToExport.map(user => [
                    user.id,
                    `"${user.name || ''}"`,
                    `"${user.email || ''}"`,
                    user.role || '',
                    user.status || '',
                    user.totalOrders || 0,
                    user.totalSpent || 0,
                    user.createdAt || user.joinDate || ''
                ].join(','))
            ];
            return csvRows.join('\n');
        }

        return dataToExport;
    };

    // ====== Thống kê nâng cao ======
    const getUserGrowthData = (days = 30) => {
        const growthData = [];
        const now = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

            const newUsers = users.filter(u => {
                const createdDate = new Date(u.createdAt || u.joinDate);
                return createdDate >= dayStart && createdDate < dayEnd;
            }).length;

            growthData.push({
                date: dayStart.toISOString().split('T')[0],
                newUsers,
                totalUsers: users.filter(u => new Date(u.createdAt || u.joinDate) <= dayEnd).length
            });
        }

        return growthData;
    };

    const contextValue = {
        // Dữ liệu
        users,
        analytics,

        // CRUD
        addUser,
        updateUser,
        deleteUser,

        // Quản lý trạng thái
        activateUser,
        deactivateUser,
        banUser,
        unbanUser,

        // Quản lý vai trò
        updateUserRole,
        promoteToAdmin,
        demoteToUser,

        // Tìm kiếm & lọc
        searchUsers,
        filterUsers,
        sortUsers,

        // Hàng loạt
        bulkUpdateUsers,
        bulkDeleteUsers,

        // Tiện ích
        exportUsers,
        getUserGrowthData
    };

    return (
        <UsersContext.Provider value={contextValue}>
            {children}
        </UsersContext.Provider>
    );
};

// Hook tiện dùng
export const useUsers = () => {
    const context = useContext(UsersContext);

    if (!context) {
        throw new Error('useUsers must be used within a UsersProvider');
    }

    return context;
};

// Hook cho analytics
export const useUserAnalytics = () => {
    const { analytics, getUserGrowthData } = useUsers();
    return { analytics, getUserGrowthData };
};

// Hook cho user actions
export const useUserActions = () => {
    const {
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
        bulkDeleteUsers
    } = useUsers();

    return {
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
        bulkDeleteUsers
    };
};