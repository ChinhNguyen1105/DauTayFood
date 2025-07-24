import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import ButtonCart from "../ButtonCart/ButtonCart";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonClose from "../ButtonClose/ButtonClose";

const ProductDetail = ({
    product,
    onClose, // hàm đóng overlay
    handleAddToCart
}) => {
    console.log('value of handleCart:', handleAddToCart);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const navigate = useNavigate(); // dùng để điều hướng

    const handleCheckout = () => {
        navigate('/checkout', {// ← navigate lần nữa KHÔNG có state → làm mất state
            state: {
                selectedItems: [{
                    ...product,
                    quantity,
                    note
                }],
                customerName: 'Nguyễn Văn A',
                phone: '0912345678',
                address: '123 Trần Hưng Đạo, Hà Nội'
            }
        });
        onClose();
        // console.log('selected Items in checkout', selectedItems);
    };


    return (
        <div className="product-detail-container">
            <div className="product-detail-closeButton">
                <ButtonClose onClick={onClose} />
            </div>

            <div className="product-detail-main1">
                <img src={product.image} alt={product.name} className="product-detail-img" />
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
                        placeholder="Phần trăm đá, lượng đường, dặn dò thêm..."
                        value={note}
                        onChange={e => setNote(e.target.value)}
                    />
                </div>
            </div>

            <div className="product-detail-main3">
                <div className="product-detail-qty">
                    <b>Số lượng</b>
                    <div className="qty-control">
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="button-decrease">
                            <span className="decrease">-</span>
                        </button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(q => q + 1)} className="button-increase">
                            <span className="increase">+</span>
                        </button>
                    </div>
                </div>

                <div className="product-detail-actions">
                    <div className="product-detail-cartButton">
                        <ButtonCart onClick={() => {
                            handleAddToCart(product, quantity, note);
                            alert("Đã thêm vào giỏ hàng!");
                            onClose(); // đóng overlay sau khi thêm
                        }}>
                            Thêm vào giỏ
                        </ButtonCart>
                    </div>
                    <div className="product-detail-payButton">
                        <ButtonTry onClick={() => {
                            handleCheckout();
                            onClose();
                        }}>
                            Thanh toán
                        </ButtonTry>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
