import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../assets/banner.png';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import TrendProduct from '../../components/TrendProduct/TrendProduct';
import './MenuPage.css';
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
    const showOverlay = !!selectedProduct;
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleTabChange = (tabId) => {
        setSelectedType(tabId);
        if (tabId === 'tat-ca' && onSearch) {
            onSearch('');
        }
    };

    return (
        <div>
            <img className='banner' src={Banner} alt="banner" />
            <div className='MenuPage-section1-title'>
                <h2 className="MenuPage-section-title">top món ngon hàng tuần</h2>
            </div>
            <TrendProduct
                selectedProduct={selectedProduct}
                handleAddToCart={handleAddToCart}
                handleOpen={handleOpen}
                handleClose={handleClose}
            />
            <div className='MenuPage-section2-title'>
                <h2 className="MenuPage-section-title">Big Menu</h2>
            </div>
            <div className='MenuPage-ListMenu-container' id='search-linking'>
                <FilterTabs
                    activeTab={selectedType}
                    onTabChange={handleTabChange}
                />
                <ListMenu
                    Products={Products}
                    selectedType={selectedType}
                    searchTerm={searchTerm}
                    selectedProduct={selectedProduct}
                    handleAddToCart={handleAddToCart}
                    showOverlay={showOverlay}
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
