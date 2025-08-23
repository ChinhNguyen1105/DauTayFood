import React from 'react';
import ProductDetail from '../ProductDetail/ProductDetail';
import PropTypes from 'prop-types';
import OverlayPortal from '../OverlayPortal/OverlayPortal';
import useCart from '../../hooks/useCart';
import { toast } from 'react-hot-toast';

const ProductCard = ({
    product,
    selectedProduct,
    handleOpen,
    handleClose
}) => {
    if (!product) return null;

    const isOverlayVisible = selectedProduct?.id === product.id;

    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    };

    return (
        <>
            {/* Card hiển thị sản phẩm */}
            <div
                className="w-[170px] sm:w-[180px] rounded-md overflow-hidden bg-[#D4ECE0] shadow border hover:shadow-lg cursor-pointer transition"
                onClick={(e) => {
                    e.stopPropagation();
                    console.log('open product', product.id);
                    handleOpen(product);
                }}
            >
                <div className="relative w-full h-[160px] sm:h-[180px] overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition duration-200 hover:brightness-90"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/160x180/f3f4f6/9ca3af?text=No+Image';
                        }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-55 text-red-500 text-sm font-semibold px-2 py-1">
                        {product.price.toLocaleString()}đ
                    </div>
                </div>
                <div className="p-2 flex flex-col">
                    <div className="text-xs text-gray-800 line-clamp-2 leading-tight h-[2rem]">
                        {product.name}
                    </div>
                    <div className="text-red-400 text-[0.7rem]">
                        Phân loại: {product.type}
                    </div>
                </div>
            </div>

            {/* Overlay hiển thị chi tiết sản phẩm */}
            {isOverlayVisible && (
                <OverlayPortal onClickOutside={handleClose}>
                    <div
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ProductDetail
                            product={product}
                            onClose={handleClose}
                            handleAddToCart={handleAddToCart} // 👈 gọi trực tiếp từ hook
                        />
                    </div>
                </OverlayPortal>
            )}
        </>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        type: PropTypes.string,
        description: PropTypes.string
    }),
    selectedProduct: PropTypes.object,
    handleOpen: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default ProductCard;
