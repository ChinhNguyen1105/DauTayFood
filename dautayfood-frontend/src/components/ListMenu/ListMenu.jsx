import React, { useEffect, useState } from "react";
import FilterTabs from "../FilterTabs/FilterTabs";
import ProductCard from "../ProductCard/ProductCard";
import "./ListMenu.css";

const ListMenu = ({ Products, selectedType = "tat-ca", searchTerm = "" }) => {
    console.log('Products in ListMenu:', Products);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    // Improved normalize text function
    const normalizeText = (str) => {
        if (!str) return "";
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    };

    // Improved filter logic
    const filteredProducts = Products.filter((product) => {
        // Type filtering
        const matchType =
            selectedType === "tat-ca" ||
            product.type === selectedType;

        // Search term filtering
        const normalizedSearch = normalizeText(searchTerm);
        const normalizedName = normalizeText(product.name);
        const normalizedDesc = normalizeText(product.description || "");

        // Search in both name and description
        const matchSearch = normalizedSearch === "" ||
            normalizedName.includes(normalizedSearch) ||
            normalizedDesc.includes(normalizedSearch);

        return matchType && matchSearch;
    });

    // Phân trang
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    // Reset về trang 1 khi lọc thay đổi
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
    console.log("searchTerm nhận được:", searchTerm);

    return (
        <div className="list-menu">
            {/* Lưới sản phẩm */}
            <div className="product-grid">
                {currentProducts.length === 0 ? (
                    <p>Không tìm thấy sản phẩm phù hợp.</p>
                ) : (
                    currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}  // Truyền trực tiếp object product thay vì tạo object mới
                        />
                    ))
                )}
            </div>

            {/* Phân trang */}
            <div className="pagination">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Trang trước
                </button>
                <span>
                    {currentPage} / {totalPages || 1}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || totalPages === 0}
                >
                    Trang sau
                </button>
            </div>
        </div>
    );
};

export default ListMenu;


