import tranChau from './assets/tran-chau-duong-den.jpg';
import matcha from './assets/tra-matcha.jpg';
import mangCau from './assets/tra-mang-cau.jpg';
import tiramisu from './assets/tiramisu - Copy.jpg';
import trungMuoi from './assets/bông lan trứng muói.jpg';

const products = [
    {
        id: 1,
        name: "Trà sữa trân châu đường đen",
        image: tranChau,
        price: "30.000đ",
        description: "Trà sữa truyền thống với trân châu đường đen.",
        type: "tra-sua"
    },
    {
        id: 2,
        name: "Trà sữa matcha",
        image: matcha,
        price: "35.000đ",
        description: "Trà sữa kết hợp với matcha nguyên chất.",
        type: "tra-sua"
    },
    {
        id: 3,
        name: "Trà măng cầu",
        image: mangCau,
        price: "32.000đ",
        description: "Trà măng cầu chua nhẹ, thanh mát.",
        type: "che"
    },
    {
        id: 4,
        name: "Tiramisu",
        image: tiramisu,
        price: "40.000đ",
        description: "Bánh tiramisu thơm ngon, béo ngậy.",
        type: "banh-trang"
    },
    {
        id: 5,
        name: "Bông lan trứng muối",
        image: trungMuoi,
        price: "28.000đ",
        description: "Bánh bông lan mềm mịn với trứng muối đậm đà.",
        type: "bong-lan"
    },
    {
        id: 6,
        name: "Trà sữa trân châu full topping",
        image: tranChau,
        price: "38.000đ",
        description: "Thêm pudding, thạch, và trân châu đen đặc biệt.",
        type: "tra-sua"
    },
    {
        id: 7,
        name: "Matcha kem cheese",
        image: matcha,
        price: "39.000đ",
        description: "Matcha kết hợp kem cheese béo ngậy.",
        type: "tra-sua"
    },
    {
        id: 8,
        name: "Trà măng cầu hạt chia",
        image: mangCau,
        price: "34.000đ",
        description: "Thêm hạt chia tốt cho sức khỏe.",
        type: "che"
    },
    {
        id: 9,
        name: "Tiramisu socola",
        image: tiramisu,
        price: "42.000đ",
        description: "Tiramisu kết hợp sốt socola đậm đà.",
        type: "banh-trang"
    },
    {
        id: 10,
        name: "Bông lan trứng muối phô mai",
        image: trungMuoi,
        price: "32.000đ",
        description: "Thêm lớp phô mai chảy hấp dẫn.",
        type: "bong-lan"
    },
    {
        id: 11,
        name: "Trà sữa caramel",
        image: tranChau,
        price: "33.000đ",
        description: "Thêm hương caramel ngọt dịu.",
        type: "tra-sua"
    },
    {
        id: 12,
        name: "Matcha đá xay",
        image: matcha,
        price: "37.000đ",
        description: "Matcha xay nhuyễn mát lạnh.",
        type: "tra-sua"
    },
    {
        id: 13,
        name: "Trà măng cầu bạc hà",
        image: mangCau,
        price: "33.000đ",
        description: "Vị chua mát hoà cùng bạc hà the lạnh.",
        type: "che"
    },
    {
        id: 14,
        name: "Tiramisu việt quất",
        image: tiramisu,
        price: "43.000đ",
        description: "Lớp việt quất chua ngọt hòa quyện bánh kem.",
        type: "banh-trang"
    },
    {
        id: 15,
        name: "Bông lan trứng muối chà bông",
        image: trungMuoi,
        price: "34.000đ",
        description: "Thêm lớp chà bông mặn mà hấp dẫn.",
        type: "bong-lan"
    },
    {
        id: 16,
        name: "Trà sữa truyền thống",
        image: tranChau,
        price: "28.000đ",
        description: "Trà sữa hương vị gốc, thanh dịu.",
        type: "tra-sua"
    },
    {
        id: 17,
        name: "Matcha sữa tươi",
        image: matcha,
        price: "36.000đ",
        description: "Matcha Nhật hòa quyện cùng sữa tươi nguyên kem.",
        type: "tra-sua"
    },
    {
        id: 18,
        name: "Trà măng cầu sữa tươi",
        image: mangCau,
        price: "35.000đ",
        description: "Thêm vị béo từ sữa tươi.",
        type: "che"
    },
    {
        id: 19,
        name: "Tiramisu dâu tây",
        image: tiramisu,
        price: "41.000đ",
        description: "Topping dâu tươi thơm ngọt.",
        type: "banh-trang"
    },
    {
        id: 20,
        name: "Bông lan muối lava trứng",
        image: trungMuoi,
        price: "36.000đ",
        description: "Lava trứng chảy hấp dẫn bên trong.",
        type: "bong-lan"
    },
    {
        id: 21,
        name: "Trà sữa đậu đỏ",
        image: tranChau,
        price: "32.000đ",
        description: "Thêm topping đậu đỏ mềm thơm.",
        type: "tra-sua"
    },
    {
        id: 22,
        name: "Matcha trân châu trắng",
        image: matcha,
        price: "37.000đ",
        description: "Thêm trân châu trắng dẻo nhẹ.",
        type: "tra-sua"
    },
    {
        id: 23,
        name: "Trà măng cầu yogurt",
        image: mangCau,
        price: "34.000đ",
        description: "Kết hợp sữa chua chua ngọt nhẹ.",
        type: "che"
    },
    {
        id: 24,
        name: "Tiramisu phô mai",
        image: tiramisu,
        price: "44.000đ",
        description: "Phô mai béo ngậy hoà quyện cốt bánh mềm.",
        type: "banh-trang"
    },
    {
        id: 25,
        name: "Bông lan trứng muối đặc biệt",
        image: trungMuoi,
        price: "38.000đ",
        description: "Công thức đặc biệt của quán.",
        type: "bong-lan"
    },
    {
        id: 26,
        name: "Trà sữa sương sáo",
        image: tranChau,
        price: "31.000đ",
        description: "Thêm topping sương sáo thanh mát.",
        type: "tra-sua"
    },
    {
        id: 27,
        name: "Matcha hạnh nhân",
        image: matcha,
        price: "38.000đ",
        description: "Hòa quyện cùng hạnh nhân giòn nhẹ.",
        type: "tra-sua"
    },
    {
        id: 28,
        name: "Trà măng cầu topping mix",
        image: mangCau,
        price: "36.000đ",
        description: "Đủ loại topping hấp dẫn.",
        type: "che"
    },
    {
        id: 29,
        name: "Tiramisu oreo",
        image: tiramisu,
        price: "42.000đ",
        description: "Lớp vụn bánh oreo giòn tan.",
        type: "banh-trang"
    },
    {
        id: 30,
        name: "Bông lan trứng muối vị mè",
        image: trungMuoi,
        price: "33.000đ",
        description: "Thêm mè rang thơm bùi.",
        type: "bong-lan"
    },
    {
        id: 31,
        name: "Trà sữa pudding trứng",
        image: tranChau,
        price: "34.000đ",
        description: "Pudding trứng mềm mịn.",
        type: "tra-sua"
    },
    {
        id: 32,
        name: "Matcha kem trứng",
        image: matcha,
        price: "39.000đ",
        description: "Matcha béo nhẹ hòa cùng kem trứng.",
        type: "tra-sua"
    },
    {
        id: 33,
        name: "Trà măng cầu thạch đào",
        image: mangCau,
        price: "35.000đ",
        description: "Thêm thạch đào giòn thơm.",
        type: "che"
    },
    {
        id: 34,
        name: "Tiramisu caramel",
        image: tiramisu,
        price: "43.000đ",
        description: "Thêm vị caramel ngọt ngào.",
        type: "banh-trang"
    },
    {
        id: 35,
        name: "Bông lan trứng muối trứng chảy",
        image: trungMuoi,
        price: "36.000đ",
        description: "Trứng chảy béo thơm tan chảy.",
        type: "bong-lan"
    },
    {
        id: 36,
        name: "Trà sữa thạch củ năng",
        image: tranChau,
        price: "31.000đ",
        description: "Thạch củ năng giòn giòn.",
        type: "tra-sua"
    },
    {
        id: 37,
        name: "Matcha chanh dây",
        image: matcha,
        price: "37.000đ",
        description: "Hương chanh dây chua nhẹ mát lạnh.",
        type: "tra-sua"
    },
    {
        id: 38,
        name: "Trà măng cầu sữa đặc",
        image: mangCau,
        price: "35.000đ",
        description: "Kết hợp sữa đặc béo mịn.",
        type: "che"
    },
    {
        id: 39,
        name: "Tiramisu hạt điều",
        image: tiramisu,
        price: "45.000đ",
        description: "Hạt điều rang phủ trên mặt bánh.",
        type: "banh-trang"
    },
    {
        id: 40,
        name: "Bông lan trứng muối vị trà xanh",
        image: trungMuoi,
        price: "37.000đ",
        description: "Kết hợp trà xanh và trứng muối độc đáo.",
        type: "bong-lan"
    }
];

export default products;
