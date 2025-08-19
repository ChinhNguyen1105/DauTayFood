import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import OverlayNote from "../../components/OverlayNote/OverlayNote";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop";

function CartPage({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [noteProduct, setNoteProduct] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    // Load cart from localStorage khi mở trang
    useEffect(() => {
        const savedCart = localStorage.getItem("cartItems");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, [setCartItems]);

    // Update localStorage mỗi khi giỏ hàng thay đổi
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(cartItems.map((item) => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const updateQuantity = (id, delta) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const handleFixNote = (product) => {
        setNoteProduct(product);
    };

    const handleSaveNote = (updatedProduct) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === updatedProduct.id
                    ? { ...item, note: updatedProduct.note }
                    : item
            )
        );
        setNoteProduct(null);
    };

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id);
        setCartItems(updatedCart);
        setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    };

    const total = cartItems
        .filter((item) => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        const selectedProducts = cartItems.filter((item) =>
            selectedItems.includes(item.id)
        );

        localStorage.setItem("selectedItems", JSON.stringify(selectedProducts));
        navigate("/checkout");
    };

    return (
        <div className="max-w-[1300px] lg:mx-36 px-4 py-10 bg-[#f5b7b1] min-h-screen font-sans pt-[70px] mt-16 lg:mt-4">
            <ScrollToTop />
            {/* Logo */}
            <div className="flex items-center justify-center mb-6">
                <img src={logo} alt="Logo" className="h-[40px] w-auto brightness-0 border-r-2 pr-1 border-r-slate-500" />
                <span className="text-xl font-serif text-black p-0 ml-1">Giỏ hàng</span>
            </div>

            {/* Header */}
            <div className="hidden md:grid grid-cols-[60px_80px_2fr_1fr_120px_1fr_40px_100px] bg-[#a8e6a3] px-5 py-3 rounded-lg font-bold text-gray-800 gap-4 mb-5">
                <span className="col-span-3 text-left pl-5">Sản phẩm</span>
                <span className="text-center">Đơn giá</span>
                <span className="text-center">Số lượng</span>
                <span className="text-center">Thành tiền</span>
            </div>

            {/* Items */}
            {cartItems.map((item) => (
                <div
                    key={item.id}
                    className="bg-[#a8e6a3] rounded-lg p-4 mb-5 text-gray-800"
                >
                    {/* Mobile layout */}
                    <div className="flex md:hidden gap-3">
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            className="w-[18px] h-[18px] mt-2 cursor-pointer"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        />

                        {/* Ảnh */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-[80px] h-[80px] object-cover rounded-lg"
                        />

                        {/* Thông tin */}
                        <div className="flex-1 flex flex-col justify-between">
                            {/* Tên */}
                            <div className="text-sm leading-snug line-clamp-2">
                                {item.name}
                            </div>

                            {/* Giá */}
                            <div className="text-red-600 font-bold mt-1">
                                {item.price.toLocaleString()}đ
                            </div>

                            {/* Số lượng */}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="bg-[#ff6b6b] text-white w-[24px] h-[24px] rounded flex items-center justify-center"
                                >
                                    -
                                </button>
                                <span className="text-sm">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="bg-[#ff6b6b] text-white w-[24px] h-[24px] rounded flex items-center justify-center"
                                >
                                    +
                                </button>
                            </div>

                            {/* Sửa ghi chú */}
                            <span
                                className="text-blue-500 text-xs mt-1 cursor-pointer hover:underline"
                                onClick={() => handleFixNote(item)}
                            >
                                sửa ghi chú
                            </span>

                            {/* Thành tiền */}
                            <div className="text-red-600 font-bold mt-2">
                                Thành tiền: {(item.price * item.quantity).toLocaleString()}đ
                            </div>
                        </div>
                    </div>

                    {/* Desktop layout */}
                    <div className="hidden md:grid md:grid-cols-[60px_80px_2fr_1fr_120px_1fr_40px_100px] items-center gap-4">
                        <span
                            className="text-sm cursor-pointer"
                            onClick={() => {
                                if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                                    handleRemoveItem(item.id);
                                }
                            }}
                        >
                            xóa
                        </span>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-[60px] h-[60px] object-cover rounded-lg"
                        />
                        <div className="text-sm leading-snug">
                            {item.name}
                            <br /> hộp 45k
                        </div>
                        <div className="text-center font-bold">
                            {item.price.toLocaleString()}đ
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-[#ff6b6b] text-white w-[30px] h-[30px] rounded"
                            >
                                -
                            </button>
                            <span className="font-bold min-w-[20px] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-[#ff6b6b] text-white w-[30px] h-[30px] rounded"
                            >
                                +
                            </button>
                        </div>
                        <div className="text-center font-bold">
                            {(item.price * item.quantity).toLocaleString()}đ
                        </div>
                        <input
                            type="checkbox"
                            className="w-[18px] h-[18px] cursor-pointer"
                            checked={selectedItems.includes(item.id)}
                            onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        />
                        <span
                            className="text-blue-500 text-xs text-center cursor-pointer hover:underline"
                            onClick={() => handleFixNote(item)}
                        >
                            sửa ghi chú
                        </span>

                    </div>{/* Ghi chú */}
                    {item.note && item.note.trim() !== "" && (
                        <div className="text-sm text-red-700 break-words mt-1 w-100% ">
                            Ghi chú: {item.note}
                        </div>
                    )}
                </div>
            ))}




            {/* Footer */}
            <div className="flex flex-col md:flex-row bg-[#a8e6a3] p-5 rounded-lg mt-5 gap-4">
                <label className="flex items-center gap-2 text-gray-800 cursor-pointer justify-start">
                    <input
                        type="checkbox"
                        className="w-[18px] h-[18px] cursor-pointer"
                        checked={selectedItems.length === cartItems.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                    Chọn tất cả
                </label>

                <div className="flex items-center gap-5">
                    <span className="font-bold text-gray-800 text-lg">
                        Tổng cộng: {total.toLocaleString()}đ
                    </span>
                    <button
                        onClick={handleCheckout}
                        className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-6 py-3 rounded-lg font-bold"
                    >
                        Thanh toán
                    </button>
                </div>
            </div>

            {noteProduct && (
                <OverlayNote
                    product={noteProduct}
                    onClose={() => setNoteProduct(null)}
                    onSave={handleSaveNote}
                />
            )}
        </div>
    );
}

export default CartPage;
