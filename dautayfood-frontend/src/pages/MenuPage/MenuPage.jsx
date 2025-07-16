import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../assets/banner.png';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import TrendProduct from '../../components/TrendProduct/TrendProduct';
import './MenuPage.css';
import ListMenu from '../../components/ListMenu/ListMenu';
import PropTypes from 'prop-types';

const MenuPage = ({ Products, searchTerm, onSearch }) => {
    useEffect(() => {
        console.log('Products in MenuPage:', Products);
    }, [Products]);
    // Add detailed debugging
    useEffect(() => {
        console.log('MenuPage mounted');
        console.log('Products available:', Products);
        console.log('Products length:', Products?.length);
        console.log('First product:', Products?.[0]);
    }, []);

    const [selectedType, setSelectedType] = useState('tat-ca');

    // Reset về "tất cả" khi có searchTerm mới
    useEffect(() => {
        if (searchTerm) {
            setSelectedType('tat-ca');
        }
    }, [searchTerm]);

    const handleTabChange = (tabId) => {
        setSelectedType(tabId);
        // Nếu chọn "tất cả", reset searchTerm
        if (tabId === 'tat-ca') {
            // Thông báo lên component cha để reset searchTerm
            if (onSearch) {
                onSearch('');
            }
        }
    };
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <>
            <div>
                <img className='banner' src={Banner} alt="banner" />
                <div className='MenuPage-section1-title'>
                    <h2 className="MenuPage-section-title">top món ngon hàng tuần</h2>
                </div>
                <TrendProduct />
                <div className='MenuPage-section2-title'>
                    <h2 className="MenuPage-section-title">Big Menu</h2>
                </div>
                <div className='MenuPage-ListMenu-container' id='search-linking'>
                    <FilterTabs
                        activeTab={selectedType}
                        onTabChange={handleTabChange}
                    />
                    <ListMenu
                        Products={Products}  // Pass Products directly from import
                        selectedType={selectedType}
                        searchTerm={searchTerm}
                    />
                </div>
            </div>
        </>
    );
};

// Add PropTypes for type checking
MenuPage.propTypes = {
    searchTerm: PropTypes.string,
    onSearch: PropTypes.func
};

export default MenuPage;