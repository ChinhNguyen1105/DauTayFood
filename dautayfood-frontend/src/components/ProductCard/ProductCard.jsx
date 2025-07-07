import React, { useState } from 'react';
import './ProductCard.css';
import ButtonTry from '../ButtonTry/ButtonTry';
import ProductDetail from '../ProductDetail/ProductDetail';
import ReactDOM from 'react-dom';

function ProductCard({ name, image, price }) {
    const [showOverlay, setShowOverlay] = useState(false);

    const handleOpen = () => setShowOverlay(true);
    const handleClose = () => setShowOverlay(false);

    return (
        <>
            <div className="product-card">
                <img src={image} alt={name} className="product-img" />
                <h3 className="product-price">{price}</h3>
                <h3 className="product-name">{name}</h3>
                <div className="ButtonTry">
                    <ButtonTry onClick={handleOpen} />
                </div>
            </div>

            {typeof document !== 'undefined' && showOverlay &&
                ReactDOM.createPortal(
                    <div className="overlay">
                        <div className="detail-box">
                            <ProductDetail
                                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                                name="Bông lan trứng muối"
                                desc="Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt quốc dân khiến ai ăn thử cũng mê!"
                                onClose={handleClose}
                            />
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    );
}

export default ProductCard;


