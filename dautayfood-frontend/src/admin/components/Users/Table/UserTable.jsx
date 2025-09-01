// src/components/Users/Table/UserTable.jsx
import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '../Pagination/TablePagination';
import UserTableRow from './UserTableRow';
import UserTableHeader from './UserTableHeader';

const UserTable = ({
    users,
    currentPage,
    itemsPerPage,
    onView,
    onEdit,
    onDelete,
    setCurrentPage,
    filters
}) => {
    // Filter users based on search term and filters
    const filteredUsers = users.filter(user => {
        const matchesSearch = !filters.searchTerm ||
            user.username.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            user.fullName.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesRole = filters.roleFilter === 'all' || user.role === filters.roleFilter;
        const matchesStatus = filters.statusFilter === 'all' || user.status === filters.statusFilter;

        return matchesSearch && matchesRole && matchesStatus;
    });

    // Calculate pagination
    const totalItems = filteredUsers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Tách header riêng */}
                    <UserTableHeader />

                    <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedUsers.map((user) => (
                            <UserTableRow
                                key={user.id}
                                user={user}
                                onView={onView}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
            />
        </div>
    );
};

UserTable.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired,
            role: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            createdAt: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
                PropTypes.instanceOf(Date)
            ]).isRequired,
            avatar: PropTypes.string
        })
    ).isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onView: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    filters: PropTypes.shape({
        searchTerm: PropTypes.string,
        roleFilter: PropTypes.string,
        statusFilter: PropTypes.string
    }).isRequired
};

export default UserTable;
