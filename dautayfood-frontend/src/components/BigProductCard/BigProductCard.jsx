import React from "react";
import "./BigProductCard.css";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonCart from "../ButtonCart/ButtonCart";
import ProductDetail from "../ProductDetail/ProductDetail";

const BigProductCard = ({
    product,
    selectedProduct,
    handleAddToCart,
    handleOpen,
    handleClose
}) => {
    const showDetail = selectedProduct?.id === product.id;

    return (
        <>
            <div className="big-product-card">
                <div className="big-product-imgbox">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="big-product-img"
                        onError={(e) => {
                            console.error('Image failed to load:', product.image);
                            e.target.src = 'fallback-image-path.jpg';
                        }}
                    />
                    <div className="big-product-meta">
                        <div>Đánh giá: {product.rating}/5</div>
                        <div>Đã bán: {product.sold} lượt bán</div>
                    </div>
                </div>

                <div className="big-product-info">
                    <h2 className="big-product-title">{product.name}</h2>
                    <p className="big-product-desc">{product.description}</p>
                    <div className="big-product-price">
                        Giá bán: <span>{product.price.toLocaleString()}đ</span>
                    </div>

                    <div className="big-product-actions">
                        <ButtonTry onClick={() => handleOpen(product)}>thử ngay</ButtonTry>
                        <ButtonCart onClick={() => { handleAddToCart(product); alert('đã thêm vào giỏ hàng') }}>Thêm vào giỏ hàng</ButtonCart>
                    </div>
                </div>
            </div>

            {showDetail && (
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
};

export default BigProductCard;
