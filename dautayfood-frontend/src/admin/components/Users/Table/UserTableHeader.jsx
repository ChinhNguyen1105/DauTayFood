import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

const UserTableHeader = ({ sortConfig, onSort }) => {
    const headers = [
        { id: 'fullName', label: 'Người dùng', sortable: true },
        { id: 'email', label: 'Email', sortable: true },
        { id: 'role', label: 'Vai trò', sortable: true },
        { id: 'status', label: 'Trạng thái', sortable: true },
        { id: 'createdAt', label: 'Ngày tạo', sortable: true },
        { id: 'actions', label: 'Thao tác', sortable: false }
    ];

    const getSortIcon = (headerId) => {
        if (!sortConfig || sortConfig.key !== headerId) {
            return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
        }
        return sortConfig.direction === 'asc'
            ? <ArrowUp size={14} className="ml-1 text-indigo-600" />
            : <ArrowDown size={14} className="ml-1 text-indigo-600" />;
    };

    const handleSort = (headerId) => {
        if (!onSort) return;

        let direction = 'asc';
        if (sortConfig && sortConfig.key === headerId && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        onSort(headerId, direction);
    };

    return (
        <thead className="bg-gray-50">
            <tr>
                {headers.map(header => (
                    <th
                        key={header.id}
                        scope="col"
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                            ${header.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                        onClick={() => header.sortable && handleSort(header.id)}
                    >
                        <div className="flex items-center">
                            {header.label}
                            {header.sortable && getSortIcon(header.id)}
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

UserTableHeader.propTypes = {
    sortConfig: PropTypes.shape({
        key: PropTypes.string,
        direction: PropTypes.oneOf(['asc', 'desc'])
    }),
    onSort: PropTypes.func
};

export default UserTableHeader;