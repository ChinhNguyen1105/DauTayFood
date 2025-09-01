// src/components/Users/Statistics/UserStats.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Users, UserCheck, UserMinus, UserX } from 'lucide-react';
import StatCard from './StatCard';

const UserStats = ({ users }) => {
    const stats = {
        totalUsers: users.length,
        activeUsers: users.filter(u => u.status === "active").length,
        inactiveUsers: users.filter(u => u.status === "inactive").length,
        bannedUsers: users.filter(u => u.status === "banned").length,
        userGrowth: 12.5 // TODO: thay bằng logic tính tăng trưởng thực tế
    };

    const cards = [
        {
            title: "Tổng số người dùng",
            value: stats.totalUsers,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
            trend: stats.userGrowth
        },
        {
            title: "Đang hoạt động",
            value: stats.activeUsers,
            icon: UserCheck,
            color: "bg-green-50 text-green-600",
            trend: stats.totalUsers ? ((stats.activeUsers / stats.totalUsers) * 100).toFixed(1) : 0
        },
        {
            title: "Không hoạt động",
            value: stats.inactiveUsers,
            icon: UserMinus,
            color: "bg-yellow-50 text-yellow-600",
            trend: stats.totalUsers ? ((stats.inactiveUsers / stats.totalUsers) * 100).toFixed(1) : 0
        },
        {
            title: "Đã cấm",
            value: stats.bannedUsers,
            icon: UserX,
            color: "bg-red-50 text-red-600",
            trend: stats.totalUsers ? ((stats.bannedUsers / stats.totalUsers) * 100).toFixed(1) : 0
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <StatCard key={index} {...card} />
            ))}
        </div>
    );
};

UserStats.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            status: PropTypes.string.isRequired,
            role: PropTypes.string
        })
    ).isRequired
};

export default UserStats;
