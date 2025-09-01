import React from 'react';
import PropTypes from 'prop-types';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    return (
        <div className={`${color} rounded-lg p-6 transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <div className="mt-2 flex items-baseline">
                        <p className="text-2xl font-bold">{value}</p>
                        {trend && (
                            <span className={`ml-2 text-sm ${trend > 0 ? 'text-green-600' :
                                    trend < 0 ? 'text-red-600' :
                                        'text-gray-600'
                                }`}>
                                {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
                                {Math.abs(trend)}%
                            </span>
                        )}
                    </div>
                </div>
                {Icon && (
                    <div className={`p-3 rounded-full ${color}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                )}
            </div>
        </div>
    );
};

StatCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    icon: PropTypes.elementType,
    color: PropTypes.string,
    trend: PropTypes.number
};

StatCard.defaultProps = {
    color: 'bg-gray-50 text-gray-600',
    trend: null
};

export default StatCard;