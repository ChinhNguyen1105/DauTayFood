import tranChau from '../assets/tran-chau-duong-den.jpg';
import matcha from '../assets/tra-matcha.jpg';
import mangCau from '../assets/tra-mang-cau.jpg';
import tiramisu from '../assets/tiramisu - Copy.jpg';

const TypicalProducts = [
    {
        id: 46,
        name: "Trà sữa trân châu đường đen",
        image: tranChau,
        price: "30.000đ",
        description: "Trà sữa truyền thống với trân châu đường đen.",
        type: "tra-sua"
    },
    {
        id: 47,
        name: "Trà sữa matcha",
        image: matcha,
        price: "35.000đ",
        description: "Trà sữa kết hợp với matcha nguyên chất.",
        type: "tra-sua"
    },
    {
        id: 48,
        name: "Trà măng cầu",
        image: mangCau,
        price: "32.000đ",
        description: "Trà măng cầu chua nhẹ, thanh mát.",
        type: "che"
    },
    {
        id: 49,
        name: "Tiramisu",
        image: tiramisu,
        price: "40.000đ",
        description: "Bánh tiramisu thơm ngon, béo ngậy.",
        type: "banh-trang"
    },
    {
        id: 50,
        name: "Trà măng cầu",
        image: mangCau,
        price: "32.000đ",
        description: "Trà măng cầu chua nhẹ, thanh mát.",
        type: "che"
    },
    {
        id: 51,
        name: "Tiramisu",
        image: tiramisu,
        price: "40.000đ",
        description: "Bánh tiramisu thơm ngon, béo ngậy.",
        type: "banh-trang"
    }
]
TypicalProducts.forEach(product => {
    product.price = parseInt(product.price.replace(/[^\d]/g, ''), 10);
});
export default TypicalProducts;