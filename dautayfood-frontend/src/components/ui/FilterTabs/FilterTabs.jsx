import React, { useRef, useEffect, useState, useMemo } from "react";

const FilterTabs = ({ activeTab, onTabChange, products = [] }) => {
    const tabRefs = useRef([]);
    const [highlightStyle, setHighlightStyle] = useState({});

    // Memo hóa tabs
    const tabs = useMemo(() => [
        { id: "tat-ca", label: "tất cả" },
        ...Array.from(new Set(products.map((p) => p.category))).map((cat) => ({
            id: cat.toLowerCase().replace(/\s+/g, "-"),
            label: cat,
        })),
    ], [products]);

    useEffect(() => {
        const idx = tabs.findIndex((tab) => tab.id === activeTab);
        const node = tabRefs.current[idx];
        if (node) {
            setHighlightStyle({
                left: node.offsetLeft,
                width: node.offsetWidth,
            });
        }
    }, [activeTab, tabs]); // tabs giờ đã ổn định nhờ useMemo

    return (
        <div className="flex justify-center items-center p-4 min-h-[100px]">
            <div className="relative flex flex-nowrap gap-4 bg-white rounded-full p-2 overflow-x-auto scrollbar-hide shadow-md">
                <div
                    className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#ff5252] shadow-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={highlightStyle}
                />
                {tabs.map((tab, idx) => (
                    <button
                        key={tab.id}
                        ref={(el) => (tabRefs.current[idx] = el)}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === tab.id
                            ? "text-white font-semibold scale-110 drop-shadow-md"
                            : "text-gray-600 hover:text-gray-800 hover:scale-105"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterTabs;
