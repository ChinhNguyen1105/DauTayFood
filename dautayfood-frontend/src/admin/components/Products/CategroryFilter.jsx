// CategoryFilter.jsx
import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onChange }) => {
    return (
        <select
            value={selectedCategory}
            onChange={(e) => {
                onChange(e.target.value); // gọi callback cha để cập nhật filters
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
            <option value="all">Tất cả danh mục</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>
    );
};

export default CategoryFilter;
