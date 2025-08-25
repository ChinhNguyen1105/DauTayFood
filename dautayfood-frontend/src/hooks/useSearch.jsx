import { useContext } from "react";
import SearchContext from "../context/SearchContext";

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch phải được dùng trong SearchProvider");
    }
    return context;
};
