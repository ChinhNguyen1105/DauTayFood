import React, { useState } from 'react';
import Banner from '../../assets/banner.png';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import TrendProduct from '../../components/TrendProduct/TrendProduct';
import './MenuPage.css';
import ListMenu from '../../components/ListMenu/ListMenu';

const MenuPage = ({ searchTerm }) => {
    const [selectedType, setSelectedType] = useState('tat-ca');

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
                <div className='MenuPage-ListMenu-container'>
                    <FilterTabs activeTab={selectedType} onTabChange={setSelectedType} />
                    <ListMenu selectedType={selectedType} searchTerm={searchTerm} />
                </div>
            </div>
        </>

    );
};
export default MenuPage;