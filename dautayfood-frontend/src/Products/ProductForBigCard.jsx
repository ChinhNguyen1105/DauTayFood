import tranChau from '../assets/tran-chau-duong-den.jpg';
import matcha from '../assets/tra-matcha.jpg';
import mangCau from '../assets/tra-mang-cau.jpg';
import tiramisu from '../assets/tiramisu - Copy.jpg';
import trungMuoi from '../assets/bông lan trứng muói.jpg';

const featuredProducts = [
    {
        id: 41,
        name: "Bông lan trứng muối",
        image: trungMuoi,
        price: "55.000đ",
        description: "Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt “quốc dân” khiến ai ăn thử cũng mê!",
        rating: 4.5,
        sold: "1.7k"
    },
    {
        id: 42,
        name: "Trà sữa trân châu đường đen",
        image: tranChau,
        price: "45.000đ",
        description: "Trà sữa đậm vị, kết hợp cùng trân châu dẻo dai ngập đường đen – món khoái khẩu của giới trẻ hiện đại.",
        rating: 4.8,
        sold: "3.2k"
    },
    {
        id: 43,
        name: "Trà matcha kem cheese",
        image: matcha,
        price: "49.000đ",
        description: "Vị thanh nhẹ của matcha quyện cùng lớp kem cheese mặn mặn béo ngậy – giải khát sảng khoái mỗi ngày.",
        rating: 4.6,
        sold: "2.1k"
    },
    {
        id: 44,
        name: "Trà mãng cầu thanh mát",
        image: mangCau,
        price: "39.000đ",
        description: "Hương vị chua ngọt tự nhiên của mãng cầu, kết hợp cùng đá lạnh – giúp bạn giải nhiệt trong những ngày oi ả.",
        rating: 4.3,
        sold: "1.1k"
    },
    {
        id: 45,
        name: "Tiramisu ngọt ngào",
        image: tiramisu,
        price: "60.000đ",
        description: "Lớp kem mềm mịn, bánh quy thấm đẫm cà phê và cacao phủ trên cùng – món tráng miệng chuẩn Ý không thể bỏ qua.",
        rating: 4.7,
        sold: "900"
    }
];

// Chuyển đổi chuỗi `price` thành số để dễ xử lý
featuredProducts.forEach(product => {
    product.price = parseInt(product.price.replace(/[^\d]/g, ''), 10);
});

export default featuredProducts;
