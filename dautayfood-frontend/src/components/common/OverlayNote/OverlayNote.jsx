import React, { useState, useEffect } from "react";

function OverlayNote({ product, onClose, onSave }) {
    const [note, setNote] = useState("");

    useEffect(() => {
        setNote(product?.note || "");
    }, [product]);

    const handleSave = () => {
        onSave({ ...product, note });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-[90%] max-w-md relative animate-fadeIn">
                <button
                    className="absolute top-3 right-4 text-2xl text-gray-700 dark:text-gray-300 hover:text-red-500"
                    onClick={onClose}
                >
                    ×
                </button>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Ghi chú cho: {product?.name}
                </h3>
                <textarea
                    className="w-full h-28 mt-2 p-3 text-base resize-none border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-400 outline-none"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Nhập ghi chú cho sản phẩm..."
                />
                <div className="flex justify-end mt-4">
                    <button
                        className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        onClick={handleSave}
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OverlayNote;
