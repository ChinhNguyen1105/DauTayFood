import React, { useState } from "react";
import "./ProductDetail.css";
import ButtonCart from "../ButtonCart/ButtonCart";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonClose from "../ButtonClose/ButtonClose";

const ProductDetail = ({
    product,
    onClose // Nhận hàm đóng từ component cha
}) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");

    return (
        <div className="product-detail-container">
            <div className="product-detail-closeButton">
                <ButtonClose onClick={onClose} />
            </div>
            <div className="product-detail-main1">
                <img src={product.image} alt={name} className="product-detail-img" />
                <div className="product-detail-info">
                    <h2>Thông tin chi tiết</h2>
                    <div className="product-detail-name"><b>Tên sản phẩm:</b> {product.name}</div>
                    <div className="product-detail-desc"><b>Mô tả:</b> {product.description}</div>

                </div>
            </div>
            <div className="product-detail-main2">
                <div className="product-detail-note">
                    <label><b>Thêm ghi chú:</b></label>
                    <textarea
                        placeholder="Phần trăm đá, lượng đường"
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>
            </div>
            <div className="product-detail-main3">
                <div className="product-detail-qty">
                    <b>Số lượng</b>
                    <div className="qty-control">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="button-decrease"><span className="decrease">-</span></button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="button-increase"> <span className="increase"> + </span></button>
                    </div>
                </div>
                <div className="product-detail-actions">
                    <div className="product-detail-cartButton"> <ButtonCart>Thêm vào giỏ</ButtonCart></div>
                    <div className="product-detail-payButton"> <ButtonTry>Thanh toán</ButtonTry></div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;

