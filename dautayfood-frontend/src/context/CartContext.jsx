import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (product, quantity = 1, note = "") => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity, note }];
        });
    };

    // Xóa sản phẩm
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Cập nhật số lượng
    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Cập nhật ghi chú
    const updateNote = (id, note) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, note } : item))
        );
    };

    // Xóa giỏ hàng
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateNote, // thêm mới
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
