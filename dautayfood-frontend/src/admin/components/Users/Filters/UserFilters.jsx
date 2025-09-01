import React from "react";
import PropTypes from "prop-types";

const UserFilters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Filter theo Role */}
            <div>
                <label className="block text-sm font-medium mb-1">Vai trò</label>
                <select
                    name="role"
                    value={filters.role}
                    onChange={handleChange}
                    className="w-full md:w-48 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                >
                    <option value="">Tất cả</option>
                    <option value="user">Người dùng</option>
                    <option value="seller">Người bán</option>
                    <option value="admin">Quản trị viên</option>
                </select>
            </div>

            {/* Filter theo Trạng thái */}
            <div>
                <label className="block text-sm font-medium mb-1">Trạng thái</label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    className="w-full md:w-48 border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                >
                    <option value="">Tất cả</option>
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Ngừng hoạt động</option>
                    <option value="banned">Bị khóa</option>
                </select>
            </div>
        </div>
    );
};

UserFilters.propTypes = {
    filters: PropTypes.shape({
        role: PropTypes.string,
        status: PropTypes.string,
    }).isRequired,
    setFilters: PropTypes.func.isRequired,
};

export default UserFilters;
