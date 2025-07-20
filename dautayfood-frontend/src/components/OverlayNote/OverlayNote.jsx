import React, { useState, useEffect } from 'react';
import './OverlayNote.css';

function OverlayNote({ product, onClose, onSave }) {
    const [note, setNote] = useState('');

    useEffect(() => {
        setNote(product?.note || '');
    }, [product]);

    const handleSave = () => {
        onSave({ ...product, note });
        onClose();
    };

    return (
        <div className="OverlayNote-backdrop">
            <div className="OverlayNote-box">
                <button className="OverlayNote-close" onClick={onClose}>×</button>
                <h3>Ghi chú cho: {product?.name}</h3>
                <textarea
                    className="OverlayNote-textarea"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Nhập ghi chú cho sản phẩm..."
                />
                <div className="OverlayNote-actions">
                    <button className="OverlayNote-button" onClick={handleSave}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default OverlayNote;
