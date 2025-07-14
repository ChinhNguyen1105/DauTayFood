import React, { useRef, useEffect, useState } from 'react';
import './FilterTabs.css';

const tabs = [
    { id: 'tat-ca', label: 'tất cả' },
    { id: 'tra-sua', label: 'trà sữa' },
    { id: 'che', label: 'chè' },
    { id: 'banh-trang', label: 'bánh tráng' },
    { id: 'bong-lan', label: 'bông lan' }
];

const FilterTabs = ({ activeTab, onTabChange }) => {
    const tabRefs = useRef([]);
    const [highlightStyle, setHighlightStyle] = useState({}); // Thêm dòng này

    useEffect(() => {
        const idx = tabs.findIndex(tab => tab.id === activeTab);
        const node = tabRefs.current[idx];
        if (node) {
            setHighlightStyle({
                left: node.offsetLeft,
                width: node.offsetWidth,
            });
        }
    }, [activeTab, tabs]);

    return (
        <div className="nav-tabs-container">
            <div className="nav-tabs-wrapper" style={{ position: 'relative' }}>
                <div
                    className="nav-tab-highlight"
                    style={highlightStyle}
                />
                {tabs.map((tab, idx) => (
                    <button
                        key={tab.id}
                        ref={el => tabRefs.current[idx] = el}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterTabs;