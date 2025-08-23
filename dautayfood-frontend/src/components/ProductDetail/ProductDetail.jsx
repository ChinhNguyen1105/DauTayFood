import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonCart from "../ButtonCart/ButtonCart";
import ButtonTry from "../ButtonTry/ButtonTry";
import ButtonClose from "../ButtonClose/ButtonClose";
import useCart from "../../hooks/useCart";
import { toast } from "react-hot-toast";

const ProductDetail = ({ product, onClose }) => {
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState("");
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleCheckout = () => {
        navigate('/checkout', {
            state: {
                selectedItems: [{ ...product, quantity, note }],
                customerName: 'Nguyễn Văn A',
                phone: '0912345678',
                address: '123 Trần Hưng Đạo, Hà Nội'
            }
        });
        onClose();
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success("Đã thêm vào giỏ hàng!");
        onClose();
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-md shadow-lg max-w-[700px] w-[85vw] relative text-gray-900 z-[1000]">
            {/* Nút đóng */}
            <div className="absolute top-3 right-3 z-[1001]">
                <ButtonClose onClick={onClose} />
            </div>

            {/* Phần ảnh + thông tin */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-2">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full sm:w-[250px] h-[180px] sm:h-[250px] object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-bold mb-1">Thông tin chi tiết</h2>
                    <div className="mb-1"><b>Tên sản phẩm:</b> {product.name}</div>
                    <div><b>Mô tả:</b> {product.description}</div>
                </div>
            </div>

            {/* Ghi chú */}
            <div className="mb-2">
                <label className="block mb-2 font-medium">Thêm ghi chú:</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Phần trăm đá, lượng đường, dặn dò thêm..."
                    className="w-full h-[90px] rounded-md p-2 border border-gray-300 bg-gray-100 text-sm resize-none"
                />
            </div>

            {/* Số lượng và hành động */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                    <b>Số lượng:</b>
                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="bg-gray-300 px-3 py-1 text-black"
                        >−</button>
                        <span className="px-4 py-1">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="bg-gray-300 px-3 py-1 text-black"
                        >+</button>
                    </div>
                </div>

                <div className="flex gap-4 justify-end">
                    <ButtonCart onClick={handleAddToCart}>
                        Thêm vào giỏ
                    </ButtonCart>
                    <ButtonTry onClick={handleCheckout}>
                        Thanh toán
                    </ButtonTry>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
