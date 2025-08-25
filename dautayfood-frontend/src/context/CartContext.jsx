import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Add or update product in cart
    const addToCart = (product, quantity = 1, note = "") => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                // Thay đổi logic ở đây - không cộng dồn quantity nữa
                return prev.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: quantity, // Sử dụng quantity mới trực tiếp
                            note: note || item.note
                        }
                        : item
                );
            }

            // Thêm mới vẫn giữ nguyên
            return [...prev, {
                ...product,
                quantity: Math.max(1, quantity),
                note: note || ""
            }];
        });
    };

    // Update quantity with validation
    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(1, Math.floor(quantity)) // Ensure positive integer
                    }
                    : item
            )
        );
    };

    // Update note
    const updateNote = (id, note) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, note: note || "" } // Ensure note is never undefined
                    : item
            )
        );
    };

    // Remove item
    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Also clear localStorage
    };

    // Calculate total items in cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                updateNote,
                clearCart,
                getTotalItems
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
