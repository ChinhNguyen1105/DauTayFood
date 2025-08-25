// src/pages/MenuPage/MenuPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../../assets/banner.png";
import FilterTabs from "../../components/ui/FilterTabs/FilterTabs";
import TrendProduct from "../../components/sections/TrendProduct/TrendProduct";
import ListMenu from "../../components/layout/ListMenu/ListMenu";

// hooks
import useSelectedProduct from "../../hooks/useSelectedProduct";
import { useSearch } from "../../hooks/useSearch";

function MenuPage({ Products }) {
    const [selectedType, setSelectedType] = useState("tat-ca");
    const location = useLocation();

    // lấy search từ context
    const { searchTerm, onSearch } = useSearch();

    // lấy state selectedProduct từ custom hook
    const { selectedProduct, handleOpen, handleClose } = useSelectedProduct();

    // khi search thì auto chuyển về tab "tất cả"
    useEffect(() => {
        if (searchTerm) {
            setSelectedType("tat-ca");
        }
    }, [searchTerm]);

    // scroll đến section nếu có hash (#id) trên URL
    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    // xử lý đổi tab
    const handleTabChange = (tabId) => {
        setSelectedType(tabId);
        if (tabId === "tat-ca" && onSearch) {
            onSearch(""); // clear search khi chọn lại "tất cả"
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
            {/* Banner */}
            <img
                className="w-screen h-screen object-cover"
                src={Banner}
                alt="banner"
            />

            {/* Top món ngon */}
            <div className="relative bg-[#dbffcb] dark:bg-gray-800 p-3 text-center -mt-12 z-10 transition-colors">
                <h2 className="text-[1.4rem] font-semibold text-[#222] dark:text-gray-100 tracking-wider">
                    top món ngon hàng tuần
                </h2>
            </div>

            <TrendProduct
                selectedProduct={selectedProduct}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />

            {/* Big Menu */}
            <div className="relative bg-[#dbffcb] dark:bg-gray-800 p-3 text-center -mt-12 z-10 transition-colors">
                <h2 className="text-[1.4rem] font-semibold text-[#222] dark:text-gray-100 tracking-wider">
                    Big Menu
                </h2>
            </div>

            {/* Search + List Menu */}
            <div
                id="search-linking"
                className="bg-gradient-to-b from-[#ff8080] to-[#d4ece0] 
                           dark:from-gray-700 dark:to-gray-900 
                           z-[100] mx-auto max-w-[100%] transition-colors"
            >
                {/* Tabs */}
                <FilterTabs activeTab={selectedType} onTabChange={handleTabChange} />

                {/* List Menu */}
                <ListMenu
                    Products={Products}
                    selectedType={selectedType}
                    searchTerm={searchTerm} // truyền searchTerm để ListMenu lọc toàn bộ sản phẩm có chứa chữ đó
                    selectedProduct={selectedProduct}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
}

export default MenuPage;
