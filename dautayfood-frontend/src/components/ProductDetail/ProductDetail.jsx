import React, { useState } from "react";
import "./ProductDetail.css";
import ButtonCart from "../ButtonCart/ButtonCart";
import ButtonTry from "../ButtonTry/ButtonTry";

const ProductDetail = ({
    image = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    name = "Bông lan trứng muối",
    desc = "Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt “quốc dân” khiến ai ăn thử cũng mê!",
}) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");

    return (
        <div className="product-detail-container">
            <div className="product-detail-main">
                <img src={image} alt={name} className="product-detail-img" />
                <div className="product-detail-info">
                    <h2>Thông tin chi tiết</h2>
                    <div className="product-detail-name"><b>Tên sản phẩm:</b> {name}</div>
                    <div className="product-detail-desc"><b>Mô tả:</b> {desc}</div>
                    <div className="product-detail-qty">
                        <b>Số lượng</b>
                        <div className="qty-control">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="button-decrease"><span className="decrease">-</span></button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="button-increase"> <span className="increase"> + </span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-detail-note">
                <label><b>Thêm ghi chú:</b></label>
                <textarea
                    placeholder="Phần trăm đá, lượng đường"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                />
            </div>
            <div className="product-detail-actions">
                <ButtonCart>Thêm vào giỏ</ButtonCart>
                <ButtonTry>Mua sản phẩm</ButtonTry>
            </div>
        </div>
    );
};

export default ProductDetail;