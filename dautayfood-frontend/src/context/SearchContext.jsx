import { createContext, useState, useMemo } from "react";

// Tạo context
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    // Hàm tìm kiếm nâng cấp
    const handleSearch = (term = "", products = []) => {
        const cleaned = term.trim().toLowerCase();
        setSearchTerm(cleaned);

        if (!cleaned) {
            setSearchResults(products); // clear → tất cả
            return;
        }

        const filtered = products.filter((item) =>
            item.name.toLowerCase().includes(cleaned)
        );
        setSearchResults(filtered);
    };

    return (
        <SearchContext.Provider
            value={{
                searchTerm,
                searchResults,
                handleSearch,
                clearSearch: () => setSearchTerm(""),
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
