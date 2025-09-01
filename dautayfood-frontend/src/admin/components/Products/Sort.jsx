// Sort.jsx
import React from "react";

const Sort = ({ sortBy, sortOrder, onSortChange }) => {
    return (
        <div className="flex items-center">
            <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                    const [field, order] = e.target.value.split("-");
                    onSortChange(field, order); // gọi callback cha
                }}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="name-asc">Tên A-Z</option>
                <option value="name-desc">Tên Z-A</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="stock-asc">Tồn kho ít → nhiều</option>
                <option value="stock-desc">Tồn kho nhiều → ít</option>
                <option value="sold-desc">Bán chạy nhất</option>
            </select>
        </div>
    );
};

export default Sort;
