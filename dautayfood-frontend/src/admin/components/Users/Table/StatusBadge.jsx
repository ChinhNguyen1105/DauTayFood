import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
    const getBadgeConfig = (status) => {
        switch (status.toLowerCase()) {
            case 'active':
                return {
                    label: 'Hoạt động',
                    icon: CheckCircle,
                    className: 'bg-green-100 text-green-800'
                };
            case 'banned':
                return {
                    label: 'Đã cấm',
                    icon: XCircle,
                    className: 'bg-red-100 text-red-800'
                };
            case 'inactive':
                return {
                    label: 'Không hoạt động',
                    icon: AlertCircle,
                    className: 'bg-yellow-100 text-yellow-800'
                };
            default:
                return {
                    label: 'Không xác định',
                    icon: AlertCircle,
                    className: 'bg-gray-100 text-gray-800'
                };
        }
    };

    const { label, icon: Icon, className } = getBadgeConfig(status);

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            <Icon className="w-3.5 h-3.5 mr-1" />
            {label}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.oneOf(['active', 'inactive', 'banned']).isRequired
};

export default StatusBadge;