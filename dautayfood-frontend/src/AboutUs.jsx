import { useState } from 'react'
import './AboutUs.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import ProductCard from './components/ProductCard/ProductCard.jsx'
import tcdd from './assets/tran-chau-duong-den.jpg'
import BigProductCard from './components/BigProductCard/BigProductCard.jsx'
import HeroSection from './components/HeroBanner/HeroBanner.jsx'
function AboutUs() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Header />
      <main>
        <HeroSection
          backgroundImages={[
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80"
          ]}
          autoSlide={true}
          autoSlideInterval={3000}
        />
        <ProductCard
          name="trà sữa trân châu đường đen"
          image={tcdd}
          price={'30.000đ'}
        />
        <BigProductCard />


        {/* Thêm nội dung chính ở đây */}
      </main>
      <Footer />
    </div>
  )
}

export default AboutUs
