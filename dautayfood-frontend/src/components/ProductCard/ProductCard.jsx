import React, { useState } from 'react';
import './ProductCard.css';
import ButtonTry from '../ButtonTry/ButtonTry';
import ProductDetail from '../ProductDetail/ProductDetail';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function ProductCard({ product }) {
    const [showOverlay, setShowOverlay] = useState(false);

    if (!product) {
        return <div className="product-card error">No product data received</div>;
    }

    const handleOpen = () => setShowOverlay(true);
    const handleClose = () => setShowOverlay(false);

    return (
        <>
            <div className="product-card">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                    onError={(e) => {
                        console.error('Image failed to load:', product.image);
                        e.target.src = 'fallback-image-path.jpg';
                    }}
                />
                <h3 className="product-price">{product.price}</h3>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-type">Mã loại: {product.type}</div>
                <div className="ButtonTry">
                    <ButtonTry onClick={handleOpen} />
                </div>
            </div>
            {showOverlay && (
                <div className="overlay">
                    <div className="detail-box">
                        <ProductDetail
                            product={product}
                            onClose={handleClose}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

// Update PropTypes to be more specific
ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['tra-sua', 'che', 'banh-trang', 'bong-lan']).isRequired,
        description: PropTypes.string
    }).isRequired
};


export default ProductCard;


