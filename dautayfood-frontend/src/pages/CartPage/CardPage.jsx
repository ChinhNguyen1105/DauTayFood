// CartPage.jsx
import React, { useState } from 'react';
import './CardPage.css';
import logo from '../../assets/logo.png';
import OverlayNote from '../../components/OverlayNote/OverlayNote';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [noteProduct, setNoteProduct] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectItem = (id, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(cartItems.map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const updateQuantity = (id, delta) => {
        setCartItems(prev =>
            prev.map(item =>
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
        setCartItems(prev =>
            prev.map(item =>
                item.id === updatedProduct.id
                    ? { ...item, note: updatedProduct.note }
                    : item
            )
        );
        setNoteProduct(null);
    };

    const handleRemoveItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    };

    const total = cartItems
        .filter(item => selectedItems.includes(item.id))
        .reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (selectedItems.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        const selectedProducts = cartItems.filter(item =>
            selectedItems.includes(item.id)
        );

        navigate('/checkout', {
            state: {
                selectedItems: selectedProducts,
                customerName: 'Nguyễn Văn A',
                phone: '0912345678',
                address: '123 Trần Hưng Đạo, Hà Nội'
            }
        });
    };

    return (
        <div className="CartPage-container">
            <div className='Cartpage-logo-container'>
                <img className="CartPage-logo" src={logo} alt="Logo" />
                <span className='CartPage-slogan'>Giỏ hàng</span>
            </div>

            <div className="CartPage-table-header">
                <span>sản phẩm</span>
                <span>đơn giá</span>
                <span>số lượng</span>
                <span>thành tiền</span>
            </div>

            {cartItems.map((item) => (
                <React.Fragment key={item.id}>
                    <div className='CartPage-item-container'>
                        <div className="CartPage-item">
                            <span
                                className="CartPage-remove"
                                onClick={() => {
                                    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
                                        handleRemoveItem(item.id);
                                    }
                                }}
                            >
                                xóa
                            </span>

                            <img src={item.image} alt={item.name} className="CartPage-image" />
                            <div className="CartPage-name">{item.name}<br />hộp 45k</div>
                            <div className="CartPage-price">{item.price.toLocaleString()}đ</div>
                            <div className="CartPage-quantity">
                                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                            </div>
                            <div className="CartPage-total">
                                {(item.price * item.quantity).toLocaleString()}đ
                            </div>
                            <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                            />
                            <span
                                className="CartPage-edit-note"
                                onClick={() => handleFixNote(item)}
                            >
                                sửa ghi chú
                            </span>
                        </div>

                        {item.note && item.note.trim() !== "" && (
                            <div className="CartPage-note-preview">
                                Ghi chú: {item.note}
                            </div>
                        )}
                    </div>
                </React.Fragment>
            ))}

            <div className="CartPage-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={selectedItems.length === cartItems.length}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                    /> Chọn tất cả
                </label>

                <div className="CartPage-footer-right">
                    <span>Tổng cộng: {total.toLocaleString()}đ</span>
                    <button className="CartPage-checkout" onClick={handleCheckout}>Thanh toán</button>
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
