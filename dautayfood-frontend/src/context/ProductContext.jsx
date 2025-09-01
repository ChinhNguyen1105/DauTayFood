import { createContext, useEffect, useState } from "react";
import { products as productsData } from "../data/products"; // dữ liệu giả

// 1. Tạo context
export const ProductsContext = createContext();

// 2. Provider
export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]); // 5 sản phẩm mới nhất
    const [bestSellingProducts, setBestSellingProducts] = useState([]); // 4 sản phẩm bán chạy nhất
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Fetch dữ liệu (giả lập API)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = productsData;

                // Sắp xếp theo id giảm dần -> lấy 5 sản phẩm mới nhất
                const latest = [...allProducts]
                    .sort((a, b) => b.id - a.id)
                    .slice(0, 6);

                // Sắp xếp theo sold giảm dần -> lấy 4 sản phẩm bán chạy nhất
                const bestSelling = [...allProducts]
                    .sort((a, b) => b.sold - a.sold)
                    .slice(0, 4);

                setProducts(allProducts);
                setLatestProducts(latest);
                setBestSellingProducts(bestSelling);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{ products, latestProducts, bestSellingProducts, loading, error }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
