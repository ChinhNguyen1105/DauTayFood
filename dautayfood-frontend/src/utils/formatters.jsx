// src/utils/formatters.js

// Format tiền VNĐ
export const formatCurrency = (amount) => {
    if (typeof amount !== "number") return "0 ₫";
    return amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

// Format ngày (dd/MM/yyyy HH:mm)
export const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }) + " " + d.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
    });
};
