import React, { useState } from 'react';
import './FilterTabs.css';

const NavTabs = () => {
    const [activeTab, setActiveTab] = useState('chè');

    const tabs = [
        { id: 'tra-sua', label: 'trà sữa' },
        { id: 'che', label: 'chè' },
        { id: 'banh-trang', label: 'bánh tráng' },
        { id: 'bong-lan', label: 'bông lan' }
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="nav-tabs-container">
            <div className="nav-tabs-wrapper">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default NavTabs;