// src/components/Users/Statistics/RoleStats.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Users, Shield, ShoppingBag } from 'lucide-react';

const RoleStats = ({ users }) => {
    const stats = {
        totalUsers: users.length,
        regularUsers: users.filter(u => u.role === "user").length,
        sellerUsers: users.filter(u => u.role === "seller").length,
        adminUsers: users.filter(u => u.role === "admin").length,
    };

    const roleCards = [
        {
            title: 'Người dùng',
            count: stats.regularUsers,
            icon: Users,
            color: 'bg-blue-50 text-blue-600',
            iconColor: 'text-blue-500',
            percentage: stats.totalUsers ? ((stats.regularUsers / stats.totalUsers) * 100).toFixed(1) : 0
        },
        {
            title: 'Người bán',
            count: stats.sellerUsers,
            icon: ShoppingBag,
            color: 'bg-green-50 text-green-600',
            iconColor: 'text-green-500',
            percentage: stats.totalUsers ? ((stats.sellerUsers / stats.totalUsers) * 100).toFixed(1) : 0
        },
        {
            title: 'Quản trị viên',
            count: stats.adminUsers,
            icon: Shield,
            color: 'bg-purple-50 text-purple-600',
            iconColor: 'text-purple-500',
            percentage: stats.totalUsers ? ((stats.adminUsers / stats.totalUsers) * 100).toFixed(1) : 0
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {roleCards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <div
                        key={index}
                        className={`${card.color} rounded-lg p-6 transition-all duration-200 hover:shadow-md`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                                <div className="mt-2 flex items-baseline">
                                    <p className="text-2xl font-bold">{card.count}</p>
                                    <p className="ml-2 text-sm opacity-75">
                                        ({card.percentage}%)
                                    </p>
                                </div>
                            </div>
                            <div className={`p-3 rounded-full ${card.color}`}>
                                <Icon className={`w-6 h-6 ${card.iconColor}`} />
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4">
                            <div className="h-2 bg-white rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${card.iconColor} bg-current transition-all duration-500`}
                                    style={{ width: `${card.percentage}%` }}
                                />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

RoleStats.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            role: PropTypes.string.isRequired,
            status: PropTypes.string
        })
    ).isRequired
};

export default RoleStats;
