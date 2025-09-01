// src/data/orders.js
import { users } from "./users";
import { products } from "./products";

const TOTAL_ORDERS = 300; // 🔹 số lượng đơn muốn sinh (3 tháng)
const startDate = new Date("2025-06-01");
const endDate = new Date("2025-08-28");

// 🔹 random date trong khoảng
const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// 🔹 random chọn sản phẩm
const pickRandomProducts = (count = 2) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        const p = products[Math.floor(Math.random() * products.length)];
        result.push({
            productId: p.id,
            name: p.name,
            price: p.price,
            quantity: Math.floor(Math.random() * 5) + 1,
        });
    }
    return result;
};

// 🔹 random status với tỷ lệ
const randomStatus = () => {
    const r = Math.random();
    if (r < 0.6) return "completed";   // 60%
    if (r < 0.9) return "pending";     // 30%
    return "cancelled";                // 10%
};

// 🔹 sinh dữ liệu orders
export const orders = Array.from({ length: TOTAL_ORDERS }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const createdAt = randomDate(startDate, endDate);
    const updatedAt = new Date(createdAt.getTime() + (Math.random() * 3 * 60 * 60 * 1000)); // + 0-3h
    const items = pickRandomProducts(Math.floor(Math.random() * 5) + 1);

    return {
        id: `ORD${String(i + 1).padStart(4, "0")}`,
        userId: user.id,
        userName: user.name,
        items,
        status: randomStatus(),
        createdAt: createdAt.toISOString(),
        updatedAt: updatedAt.toISOString(),
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
});
