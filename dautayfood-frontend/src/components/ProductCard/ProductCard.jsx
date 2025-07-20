import React from 'react';
import './ProductCard.css';
import ButtonTry from '../ButtonTry/ButtonTry';
import ProductDetail from '../ProductDetail/ProductDetail';
import PropTypes from 'prop-types';

function ProductCard({
    product,
    selectedProduct,
    handleAddToCart,
    handleOpen,
    handleClose
}) {
    if (!product) return null; // tránh lỗi undefined
    const isOverlayVisible = selectedProduct?.id === product.id;
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
                <h3 className="product-price">{product.price.toLocaleString()}đ</h3>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-type">Mã loại: {product.type}</div>
                <div className="ButtonTry">
                    <ButtonTry onClick={() => handleOpen(product)}>thử ngay</ButtonTry>
                </div>
            </div>

            {isOverlayVisible && (
                <div className="overlay">
                    <div className="detail-box">
                        <ProductDetail
                            product={product}
                            onClose={handleClose}
                            handleAddToCart={handleAddToCart}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['tra-sua', 'che', 'banh-trang', 'bong-lan']).isRequired,
        description: PropTypes.string
    }),
    selectedProduct: PropTypes.object,
    handleAddToCart: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ProductCard;
