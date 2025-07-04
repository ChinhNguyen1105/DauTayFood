import { useState } from 'react'
import './AboutUs.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProductCard from './components/ProductCard/ProductCard.jsx'
import tcdd from './assets/tran-chau-duong-den.jpg'
import BigProductCard from './components/BigProductCard/BigProductCard.jsx'

function AboutUs() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Header />
      <main>
        <h1 style={{ textAlign: 'center' }}>Chào mừng đến với Dâu Tây Food!</h1>
        <p>Dưới đây là một đoạn văn giới thiệu cho DautayFood
          – bạn có thể dùng cho trang chủ, giới thiệu doanh nghiệp, hoặc mục About Us:

          🍓 Giới thiệu DautayFood:

          DautayFood là cửa hàng chuyên cung cấp các món ăn vặt chất lượng cao, với nguyên liệu tươi ngon
          , an toàn và hợp vệ sinh. Lấy cảm hứng từ sự giản dị và hương vị tuổi thơ, chúng tôi mong muốn
          mang đến cho khách hàng—đặc biệt là học sinh, sinh viên và dân văn phòng—những trải nghiệm ẩm
          thực gần gũi nhưng mới mẻ. DautayFood cam kết phục vụ bằng sự tận tâm, luôn cải tiến và đặt
          trải nghiệm của khách hàng lên hàng đầu.

          Nếu bạn muốn đoạn này mang giọng văn hài hước, trang trọng, hoặc viết bằng tiếng Anh, mình có
          thể điều chỉnh lại theo yêu cầu nh

          <ProductCard
            name="trà sữa trân châu đường đen"
            image={tcdd}
            price={'30.000đ'}
          />
          <BigProductCard />

        </p>
        {/* Thêm nội dung chính ở đây */}
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs
