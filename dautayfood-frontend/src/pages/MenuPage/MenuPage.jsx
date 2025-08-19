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
        <div>
            <img
                className="w-screen h-screen object-cover mt-5"
                src={Banner}
                alt="banner"
            />

            <div className="relative bg-[#dbffcb] p-3 text-center -mt-12 z-10">
                <h2 className="text-[1.4rem] font-semibold text-[#222] tracking-wider">
                    top món ngon hàng tuần
                </h2>
            </div>

            <TrendProduct
                selectedProduct={selectedProduct}
                handleAddToCart={handleAddToCart}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />

            <div className="relative bg-[#dbffcb] p-3 text-center -mt-12 z-10">
                <h2 className="text-[1.4rem] font-semibold text-[#222] tracking-wider">
                    Big Menu
                </h2>
            </div>

            <div
                id="search-linking"
                className="bg-gradient-to-b from-[#ff8080] to-[#d4ece0] z-[100] mx-auto max-w-[100%]"
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
