// src/components/Orders/StatusBadge.jsx
import React from "react";
import PropTypes from "prop-types";

const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    processing: "bg-blue-100 text-blue-800 border border-blue-200",
    completed: "bg-green-100 text-green-800 border border-green-200",
    cancelled: "bg-red-100 text-red-800 border border-red-200",
};

const statusLabels = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    completed: "Hoàn tất",
    cancelled: "Đã hủy",
};

const StatusBadge = ({ status }) => {
    const style = statusStyles[status] || "bg-gray-100 text-gray-800 border border-gray-200";
    const label = statusLabels[status] || status;

    return (
        <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}
        >
            {label}
        </span>
    );
};

StatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};

export default StatusBadge;
