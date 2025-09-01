import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

// Custom hook để tái sử dụng
const useProducts = () => {
    return useContext(ProductsContext);
};

export default useProducts;
