import React from 'react';
import PropTypes from 'prop-types';
import { Shield, Users, ShoppingBag } from 'lucide-react';

const RoleBadge = ({ role }) => {
    const getBadgeConfig = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return {
                    label: 'Quản trị viên',
                    icon: Shield,
                    className: 'bg-purple-100 text-purple-800'
                };
            case 'seller':
                return {
                    label: 'Người bán',
                    icon: ShoppingBag,
                    className: 'bg-blue-100 text-blue-800'
                };
            default:
                return {
                    label: 'Người dùng',
                    icon: Users,
                    className: 'bg-gray-100 text-gray-800'
                };
        }
    };

    const { label, icon: Icon, className } = getBadgeConfig(role);

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            <Icon className="w-3.5 h-3.5 mr-1" />
            {label}
        </span>
    );
};

RoleBadge.propTypes = {
    role: PropTypes.oneOf(['admin', 'seller', 'user']).isRequired
};

export default RoleBadge;