import React, { useEffect, useState } from "react";
import FilterTabs from "../../ui/FilterTabs/FilterTabs";
import ProductCard from "../../common/ProductCard/ProductCard";

const ListMenu = ({
    Products,
    selectedType = "tat-ca",
    searchTerm = "",
    selectedProduct,
    handleAddToCart,
    handleOpen,
    handleClose
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const normalizeText = (str) => {
        if (!str) return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    const filteredProducts = Products.filter((product) => {
        const matchType =
            selectedType === "tat-ca" || product.type === selectedType;

        const normalizedSearch = normalizeText(searchTerm);
        const normalizedName = normalizeText(product.name);
        const normalizedDesc = normalizeText(product.description || "");

        const matchSearch =
            normalizedSearch === "" ||
            normalizedName.includes(normalizedSearch) ||
            normalizedDesc.includes(normalizedSearch);

        return matchType && matchSearch;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType, searchTerm]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto p-5 font-sans">
            {/* Product Grid */}
            <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10 justify-items-center items-center"
            >
                {currentProducts.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg col-span-full py-10">
                        Không tìm thấy sản phẩm phù hợp.
                    </p>
                ) : (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            selectedProduct={selectedProduct}
                            handleAddToCart={handleAddToCart}
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                        />
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex flex-row sm:flex-row justify-center items-center gap-5 mt-10">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 text-xs sm:text-xl rounded-md text-white font-medium shadow-md transition-all ${currentPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-800"
                        }`}
                >
                    Trang trước
                </button>

                <span className="text-base font-medium text-gray-700 px-4 py-2 bg-gray-100 border border-gray-300 rounded-md min-w-[80px] text-center">
                    {currentPage} / {totalPages || 1}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`px-6 py-3 text-xs sm:text-xl rounded-md text-white font-medium shadow-md transition-all ${currentPage === totalPages || totalPages === 0
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-800"
                        }`}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ListMenu;
