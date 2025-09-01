// SearchBar.jsx
import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
    return (
        <div className="relative flex-1 max-w-md">
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
            />
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
        </div>
    );
};

export default SearchBar;
