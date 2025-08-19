import React from "react";
import { ShoppingCart, Eye, Star, TrendingUp } from "lucide-react";
import ProductDetail from "../ProductDetail/ProductDetail";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonCart from "../ButtonCart/ButtonCart";
import OverlayPortal from "../OverlayPortal/OverlayPortal";

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
            {/* Desktop Layout */}
            <div className="hidden lg:flex bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-8 gap-12 max-w-7xl w-full">
                {/* Image */}
                <div className="w-[400px] flex-shrink-0">
                    <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=No+Image';
                        }}
                        className="w-full h-[300px] object-cover rounded-xl"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-h-[300px]">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                        <p className="text-lg text-gray-600 mb-6">{product.description}</p>

                        {/* Stats */}
                        <div className="flex items-center gap-8 mb-8">
                            <div className="flex items-center gap-2">
                                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                                <span className="text-gray-500">/5</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <TrendingUp size={20} />
                                <span className="font-medium">{product.sold} đã bán</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div>
                        <div className="mb-6 text-4xl font-bold text-blue-600">
                            {product.price.toLocaleString()}đ
                        </div>
                        <div className="flex gap-4">
                            <ButtonTry onClick={(e) => {
                                e.stopPropagation();           // optional: ngăn bubbling nếu cần
                                console.log('open product', product.id);
                                handleOpen(product);
                            }}>Thử ngay</ButtonTry>
                            <ButtonCart onClick={() => {
                                handleAddToCart(product);
                                alert("Đã thêm vào giỏ hàng!");
                            }}>
                                Thêm vào giỏ hàng
                            </ButtonCart>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 max-w-2xl w-full">
                <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x250/f3f4f6/9ca3af?text=No+Image';
                    }}
                    className="w-full h-[250px] object-cover rounded-xl mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <p className="text-base text-gray-600 mb-4">{product.description}</p>

                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-yellow-400 fill-yellow-400" />
                        <span className="font-semibold text-gray-900">{product.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <TrendingUp size={18} />
                        <span className="font-medium">{product.sold} bán</span>
                    </div>
                </div>

                <div className="mb-6 text-3xl font-bold text-blue-600">
                    {product.price.toLocaleString()}đ
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <ButtonTry onClick={(e) => {
                        e.stopPropagation();           // optional: ngăn bubbling nếu cần
                        console.log('open product', product.id);
                        handleOpen(product);
                    }}>
                        Thử ngay
                    </ButtonTry>
                    <ButtonCart onClick={() => {
                        handleAddToCart(product);
                        alert("Đã thêm vào giỏ hàng!");
                    }}>
                        Thêm vào giỏ hàng
                    </ButtonCart>
                </div>
            </div>

            {/* Overlay Modal */}
            {showDetail && (
                <OverlayPortal onClickOutside={handleClose}>
                    <ProductDetail
                        product={product}
                        onClose={handleClose}
                        handleAddToCart={handleAddToCart}
                    />
                </OverlayPortal>
            )}
        </>
    );
};

export default BigProductCard;
