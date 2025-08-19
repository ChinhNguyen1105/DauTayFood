import React from "react";
import sticker from "../../assets/sticker.png";
import ProductCard from "../ProductCard/ProductCard";
import TopProducts from "../../Products/ProductsWeek";

const TrendProduct = ({ selectedProduct, handleAddToCart, handleOpen, handleClose }) => {
    return (
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-8 flex flex-col items-center mx-auto my-10 max-w-[90%] shadow-md">
            {/* Quote & Sticker */}
            <div className="flex items-center mb-8 w-full justify-center flex-wrap">
                <div className="w-[120px] h-auto mr-8">
                    <img src={sticker} alt="sticker" className="w-full h-auto" />
                </div>
                <div className="max-w-[600px] bg-white/40 p-5 rounded-2xl italic text-base text-gray-800 leading-relaxed shadow-md">
                    "Vì chua - cay - mặn - ngọt đủ đầy trong một hộp nhỏ xinh!
                    Bánh tráng trộn nhà Đậu là món 'must-try' với topping đầy đủ:
                    xoài non, bò khô, rau răm, trứng cút... trộn đều tay, đậm đà từng miếng.
                    Ăn một lần là ghiền luôn đó nha!"
                </div>
            </div>

            {/* Top Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 ">
                {TopProducts.map((item, index) => (
                    <div key={item.id || index} className="relative flex flex-col items-center">
                        {/* Number Circle */}
                        <div
                            className={`w-[50px] h-[50px] rounded-full text-[22px] font-bold text-white flex items-center justify-center absolute -top-5 z-10
                            ${index === 0 ? "bg-red-500" : index === 1 ? "bg-yellow-400" : "bg-blue-500"}`}
                        >
                            {index + 1}
                        </div>

                        {/* Product Card */}
                        <ProductCard
                            product={item}
                            selectedProduct={selectedProduct}
                            handleAddToCart={handleAddToCart}
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendProduct;
