import React, { useState } from "react";
import "./BigProductCard.css";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonCart from "../ButtonCart/ButtonCart";
import ProductDetail from "../ProductDetail/ProductDetail";

const BigProductCard = ({
    image = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    name = "Bông lan trứng muối",
    desc = "Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt “quốc dân” khiến ai ăn thử cũng mê! loremmmmmmmmmmmmmmmmmmmmmmmmm",
    price = "55k",
    rating = 4.5,
    sold = "1.7k"
}) => {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <>
            <div className="big-product-card">
                <div className="big-product-imgbox">
                    <img src={image} alt={name} className="big-product-img" />
                    <div className="big-product-meta">
                        <div>Đánh giá: {rating}/5</div>
                        <div>Đã bán: {sold} lượt bán</div>
                    </div>
                </div>
                <div className="big-product-info">
                    <h2 className="big-product-title">{name}</h2>
                    <p className="big-product-desc">{desc}</p>
                    <div className="big-product-price">Giá bán: <span>{price}</span></div>
                    <div className="big-product-actions">
                        <ButtonTry onClick={() => setShowDetail(true)}>Thử ngay</ButtonTry>
                        <ButtonCart onClick={() => alert("Đã thêm vào giỏ hàng!")}>Thêm vào giỏ hàng</ButtonCart>
                    </div>
                </div>
            </div>
            {showDetail && (
                <ProductDetail
                    image={image}
                    name={name}
                    desc={desc}
                // Có thể truyền thêm props khác nếu cần
                />
            )}
        </>
    );
};

export default BigProductCard;