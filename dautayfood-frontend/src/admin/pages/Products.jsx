// src/pages/Products.jsx
import React, { useState, useMemo, useEffect } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { Loader } from "lucide-react";
import useOverlay from "../hooks/useOverlay";

import HeaderProducts from "../components/Products/HeaderProducts";
import SearchBar from "../components/Products/SearchBar";
import Sort from "../components/Products/Sort";
import CategoryFilter from "../components/Products/CategroryFilter";
import StatisticCards from "../components/Products/StatisticCards";
import ProductsTable from "../components/Products/ProductsTable";
import Pagination from "../components/Products/Pagination";
import DetailModal from "../components/Products/DetailModal";
import EditModal from "../components/Products/EditModal";
import DeleteModal from "../components/Products/DeleteModal";

const Products = () => {
    // Context and Hooks
    const { products, loading, error, deleteProduct, updateProduct } = useProducts();
    const { isOpen, overlayType, overlayData, openOverlay, closeOverlay } = useOverlay();

    // Local State
    const [filters, setFilters] = useState({
        search: "",
        category: "all",
        sortBy: "name",
        sortOrder: "asc",
        currentPage: 1,
    });

    const itemsPerPage = 5;

    // Derived State
    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category || "Chưa phân loại"))],
        [products]
    );

    // Filter + Sort
    const filteredAndSortedProducts = useMemo(() => {
        let result = products;

        if (filters.search) {
            result = result.filter(
                (p) =>
                    (p.name || "").toLowerCase().includes(filters.search.toLowerCase()) ||
                    (p.id?.toString() || "").includes(filters.search)
            );
        }

        if (filters.category !== "all") {
            result = result.filter((p) => p.category === filters.category);
        }

        return [...result].sort((a, b) => {
            if (["price", "stock", "sold"].includes(filters.sortBy)) {
                const aVal = Number(a[filters.sortBy]) || 0;
                const bVal = Number(b[filters.sortBy]) || 0;
                return filters.sortOrder === "asc" ? aVal - bVal : bVal - aVal;
            }
            return filters.sortOrder === "asc"
                ? (a[filters.sortBy] || "").localeCompare(b[filters.sortBy] || "")
                : (b[filters.sortBy] || "").localeCompare(a[filters.sortBy] || "");
        });
    }, [products, filters]);

    // Pagination
    const paginationData = useMemo(() => {
        const totalPages = Math.max(1, Math.ceil(filteredAndSortedProducts.length / itemsPerPage));
        const paginatedProducts = filteredAndSortedProducts.slice(
            (filters.currentPage - 1) * itemsPerPage,
            filters.currentPage * itemsPerPage
        );
        return { totalPages, paginatedProducts };
    }, [filteredAndSortedProducts, filters.currentPage]);

    // Stats
    const stats = useMemo(() => {
        return {
            total: products.length,
            lowStock: products.filter((p) => Number(p.stock) > 0 && Number(p.stock) < 10).length,
            outOfStock: products.filter((p) => Number(p.stock) === 0).length,
            totalValue: products.reduce(
                (sum, p) => sum + (Number(p.price) || 0) * (Number(p.stock) || 0),
                0
            ),
        };
    }, [products]);

    // Handlers
    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
            currentPage: key !== "currentPage" ? 1 : value,
        }));
    };

    const handleOverlayAction = (type, product) => {
        openOverlay(type, product);
    };

    // Overlay renderer
    const renderOverlay = () => {
        if (!isOpen) return null;

        switch (overlayType) {
            case "detail":
                return <DetailModal
                    showModal={true}
                    selectedProduct={overlayData}
                    onClose={closeOverlay} />;
            case "edit":
                return (
                    <EditModal
                        showModal={true}
                        categories={categories}
                        modalMode={'edit'}
                        selectedProduct={overlayData}
                        onClose={closeOverlay}
                        onSave={async (data) => {
                            try {
                                await updateProduct(overlayData.id, data);
                                closeOverlay();
                            } catch (error) {
                                console.error("❌ Error updating product:", error);
                            }
                        }}

                    />
                );
            case "add":
                return (
                    <EditModal
                        showModal={true}
                        categories={categories}
                        modalMode={'add'}
                        selectedProduct={overlayData}
                        onClose={closeOverlay}
                        onSave={async (data) => {
                            try {
                                await updateProduct(overlayData.id, data);
                                closeOverlay();
                            } catch (error) {
                                console.error("❌ Error adding product:", error);
                            }
                        }}

                    />
                );
            case "delete":
                return (
                    <DeleteModal
                        showModal={true}
                        modalMode={'delete'}
                        selectedProduct={overlayData}
                        onClose={closeOverlay}
                        onSubmit={async (data) => {
                            try {
                                await deleteProduct(overlayData.id, data);
                                closeOverlay();
                            } catch (error) {
                                console.error("❌ Error delete product:", error);
                            }
                        }
                        }
                    />
                );
            default:
                return null;
        }
    };

    // Loading & Error
    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-600">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-2">Có lỗi xảy ra</h2>
                    <p>{String(error)}</p>
                </div>
            </div>
        );
    }
    // ✅ Export dữ liệu sản phẩm ra JSON file
    const handleExportData = () => {
        try {
            const dataStr = JSON.stringify(products, null, 2);
            const blob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "products_export.json";
            link.click();

            URL.revokeObjectURL(url);
            console.log("✅ Xuất dữ liệu thành công");
        } catch (error) {
            console.error("❌ Lỗi khi export dữ liệu:", error);
        }
    };

    // ✅ Import dữ liệu từ file JSON
    const handleImportData = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const importedData = JSON.parse(e.target.result);

                if (!Array.isArray(importedData)) {
                    throw new Error("Dữ liệu không hợp lệ (phải là mảng).");
                }

                // TODO: gọi API hoặc context update
                console.log("📥 Dữ liệu import:", importedData);
                // ví dụ: setProducts(importedData);

            } catch (error) {
                console.error("❌ Lỗi khi import dữ liệu:", error);
            }
        };
        reader.readAsText(file);
    };
    // Render
    return (
        <div className="p-6 ">
            <HeaderProducts
                onAdd={() => handleOverlayAction("add", null)}
                onExport={handleExportData}
                onImport={handleImportData}
                onSearch={(term) => handleFilterChange("search", term)}   // liên kết với search filter
                onFilterChange={(newFilters) => {
                    // merge filter từ Header với state filters
                    setFilters((prev) => ({
                        ...prev,
                        ...newFilters,
                        currentPage: 1,
                    }));
                }}
            />

            <StatisticCards stats={stats} />

            <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <SearchBar
                            value={filters.search}
                            onChange={(value) => handleFilterChange("search", value)}
                        />
                        <div className="flex gap-3">
                            <CategoryFilter
                                categories={categories}
                                selectedCategory={filters.category}
                                onChange={(value) => handleFilterChange("category", value)}
                            />
                            <Sort
                                sortBy={filters.sortBy}
                                sortOrder={filters.sortOrder}
                                onSortChange={(by, order) => {
                                    handleFilterChange("sortBy", by);
                                    handleFilterChange("sortOrder", order);
                                }}
                            />
                        </div>
                    </div>
                </div>

                <ProductsTable
                    openOverlay={openOverlay}
                    products={paginationData.paginatedProducts}
                    onView={(product) => handleOverlayAction("detail", product)}
                    onEdit={(product) => handleOverlayAction("edit", product)}
                    onDelete={(product) => handleOverlayAction("delete", product)}

                />

                <div className="p-4 border-t border-gray-200">
                    <Pagination
                        currentPage={filters.currentPage}
                        totalPages={paginationData.totalPages}
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredAndSortedProducts.length}
                        onPageChange={(page) => handleFilterChange("currentPage", page)}
                    />

                </div>
            </div>

            {renderOverlay()}
        </div>
    );
};

export default Products;
