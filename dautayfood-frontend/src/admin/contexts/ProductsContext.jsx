// src/context/ProductsContext.jsx
import { createContext, useContext, useMemo, useState } from "react";
import { products as initialProducts } from "../../data/products";

// ====== Context ======
const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    // ====== Categories (unique từ data) ======
    const categories = useMemo(() => {
        const unique = new Set(products.map((p) => p.category).filter(Boolean));
        return ["all", ...Array.from(unique)];
    }, [products]);

    // ====== Phân tích dữ liệu cho admin ======
    const analytics = useMemo(() => {
        if (!products.length) {
            return {
                totalRevenue: 0,
                totalSold: 0,
                totalStock: 0,
                bestSellers: [],
                avgRate: 0,
                revenueByCategory: [],
                lowStockProducts: [],
                outOfStockProducts: [],
                totalProducts: 0,
            };
        }

        const totalRevenue = products.reduce(
            (sum, p) => sum + (p.price || 0) * (p.sold || 0),
            0
        );
        const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);
        const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

        // Top bán chạy
        const bestSellers = [...products]
            .sort((a, b) => (b.sold || 0) - (a.sold || 0))
            .slice(0, 5);

        // Trung bình đánh giá
        const avgRate =
            products.length > 0
                ? products.reduce((sum, p) => sum + (p.rate || 0), 0) / products.length
                : 0;

        // Sản phẩm sắp hết hàng (dưới 10 sản phẩm)
        const lowStockProducts = products.filter(
            (p) => (p.stock || 0) > 0 && (p.stock || 0) <= 10
        );

        // Sản phẩm hết hàng
        const outOfStockProducts = products.filter((p) => (p.stock || 0) === 0);

        // Doanh thu theo category
        const revenueByCategory = categories
            .filter((c) => c !== "all")
            .map((cat) => {
                const catProducts = products.filter((p) => p.category === cat);
                return {
                    category: cat,
                    revenue: catProducts.reduce(
                        (sum, p) => sum + (p.price || 0) * (p.sold || 0),
                        0
                    ),
                    sold: catProducts.reduce((sum, p) => sum + (p.sold || 0), 0),
                    stock: catProducts.reduce((sum, p) => sum + (p.stock || 0), 0),
                    productCount: catProducts.length,
                };
            });

        return {
            totalRevenue,
            totalSold,
            totalStock,
            bestSellers,
            avgRate: Number(avgRate.toFixed(2)),
            revenueByCategory,
            lowStockProducts,
            outOfStockProducts,
            totalProducts: products.length,
        };
    }, [products, categories]);

    // ====== CRUD cơ bản ======
    const addProduct = (newProduct) => {
        const newId = Math.max(...products.map((p) => p.id), 0) + 1;
        const productWithDefaults = {
            id: newId,
            sold: 0,
            rate: 0,
            stock: 0,
            ...newProduct,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setProducts((prev) => [...prev, productWithDefaults]);
        return productWithDefaults;
    };

    const updateProduct = (id, updatedFields) => {
        setProducts((prev) =>
            prev.map((p) =>
                p.id === id
                    ? {
                        ...p,
                        ...updatedFields,
                        updatedAt: new Date().toISOString(),
                    }
                    : p
            )
        );
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    // ====== Tìm kiếm và lọc ======
    const searchProducts = (query) => {
        if (!query) return products;
        return products.filter(
            (product) =>
                product.name?.toLowerCase().includes(query.toLowerCase()) ||
                product.category?.toLowerCase().includes(query.toLowerCase()) ||
                product.description?.toLowerCase().includes(query.toLowerCase())
        );
    };

    const filterProducts = (filters) => {
        let filtered = [...products];

        if (filters.category && filters.category !== "all") {
            filtered = filtered.filter((p) => p.category === filters.category);
        }
        if (filters.minPrice !== undefined) {
            filtered = filtered.filter((p) => (p.price || 0) >= filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            filtered = filtered.filter((p) => (p.price || 0) <= filters.maxPrice);
        }
        if (filters.inStock !== undefined) {
            filtered = filtered.filter((p) =>
                filters.inStock ? (p.stock || 0) > 0 : (p.stock || 0) === 0
            );
        }
        if (filters.minRating !== undefined) {
            filtered = filtered.filter((p) => (p.rate || 0) >= filters.minRating);
        }

        return filtered;
    };

    // ====== Sắp xếp ======
    const sortProducts = (list, sortBy, sortOrder = "asc") => {
        return [...list].sort((a, b) => {
            let aVal, bVal;
            switch (sortBy) {
                case "name":
                    aVal = a.name || "";
                    bVal = b.name || "";
                    break;
                case "price":
                    aVal = a.price || 0;
                    bVal = b.price || 0;
                    break;
                case "stock":
                    aVal = a.stock || 0;
                    bVal = b.stock || 0;
                    break;
                case "sold":
                    aVal = a.sold || 0;
                    bVal = b.sold || 0;
                    break;
                case "rate":
                    aVal = a.rate || 0;
                    bVal = b.rate || 0;
                    break;
                case "createdAt":
                    aVal = new Date(a.createdAt || 0);
                    bVal = new Date(b.createdAt || 0);
                    break;
                default:
                    return 0;
            }
            if (sortOrder === "desc") {
                return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
            }
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        });
    };

    // ====== Quản lý tồn kho ======
    const updateStock = (id, newStock) => {
        updateProduct(id, { stock: Math.max(0, newStock) });
    };

    const bulkUpdateStock = (updates) => {
        setProducts((prev) =>
            prev.map((product) => {
                const update = updates.find((u) => u.id === product.id);
                return update
                    ? {
                        ...product,
                        stock: Math.max(0, update.stock),
                        updatedAt: new Date().toISOString(),
                    }
                    : product;
            })
        );
    };

    // ====== Xuất dữ liệu ======
    const exportData = (format = "json") => {
        const dataToExport = {
            products,
            analytics,
            exportedAt: new Date().toISOString(),
        };
        if (format === "json") {
            return JSON.stringify(dataToExport, null, 2);
        }
        return dataToExport;
    };

    const contextValue = {
        products,
        analytics,
        categories,

        addProduct,
        updateProduct,
        deleteProduct,

        searchProducts,
        filterProducts,
        sortProducts,

        updateStock,
        bulkUpdateStock,

        exportData,
    };

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    );
};

// Hook tiện dùng
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
};

// Hook cho analytics
export const useProductAnalytics = () => {
    const { analytics } = useProducts();
    return analytics;
};

// Hook cho CRUD operations
export const useProductActions = () => {
    const { addProduct, updateProduct, deleteProduct, updateStock, bulkUpdateStock } =
        useProducts();
    return { addProduct, updateProduct, deleteProduct, updateStock, bulkUpdateStock };
};
