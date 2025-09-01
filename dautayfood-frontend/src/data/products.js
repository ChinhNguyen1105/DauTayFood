import bongLan from "../assets/bông lan trứng muói.jpg";
import tiramisu from "../assets/tiramisu - Copy.jpg";
import traMangCau from "../assets/tra-mang-cau.jpg";
import traMatcha from "../assets/tra-matcha.jpg";
import tranChauDuongDen from "../assets/tran-chau-duong-den.jpg";

const images = [bongLan, tiramisu, traMangCau, traMatcha, tranChauDuongDen];
const categories = ["Trà sữa", "Chè", "Bánh bông lan", "Giải khát"];

export const products = Array.from({ length: 30 }, (_, i) => {
    const id = i + 1;
    const category = categories[i % categories.length];

    return {
        id,
        name: `${category} ${id}`,
        description: `Mô tả chi tiết cho ${category.toLowerCase()} ${id}`,
        price: 20000 + id * 1000,
        image: images[i % images.length],
        sold: Math.floor(Math.random() * 200) + 1,
        stock: Math.floor(Math.random() * 50),   // 🔹 thêm tồn kho
        category,
        rate: Math.floor(Math.random() * 5) + 1, // đánh giá 1-5
    };
});
