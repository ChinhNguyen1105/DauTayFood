import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../assets/banner.png';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import TrendProduct from '../../components/TrendProduct/TrendProduct';
import ListMenu from '../../components/ListMenu/ListMenu';
import PropTypes from 'prop-types';

function MenuPage({
    Products,
    searchTerm,
    onSearch,
    handleAddToCart,
    selectedProduct,
    handleOpen,
    handleClose
}) {
    const [selectedType, setSelectedType] = useState('tat-ca');
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            setSelectedType('tat-ca');
        }
    }, [searchTerm]);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    const handleTabChange = (tabId) => {
        setSelectedType(tabId);
        if (tabId === 'tat-ca' && onSearch) {
            onSearch('');
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
            {/* Banner */}
            <img
                className="w-screen h-screen object-cover mt-5"
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
                handleAddToCart={handleAddToCart}
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
                <FilterTabs activeTab={selectedType} onTabChange={handleTabChange} />
                <ListMenu
                    Products={Products}
                    selectedType={selectedType}
                    searchTerm={searchTerm}
                    selectedProduct={selectedProduct}
                    handleAddToCart={handleAddToCart}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                />
            </div>
        </div>
    );
}

MenuPage.propTypes = {
    Products: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
    selectedProduct: PropTypes.object,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default MenuPage;
