import { useState } from 'react'
import './Home.css'
import ProductCard from '../../components/ProductCard/ProductCard.jsx'
import tcdd from '../../assets/tran-chau-duong-den.jpg'
import BigProductCard from '../../components/BigProductCard/BigProductCard.jsx'
import HeroSection from '../../components/HeroBanner/HeroBanner.jsx'
import ProductDetail from '../../components/ProductDetail/ProductDetail.jsx'

function Home() {
  const [count, setCount] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false);

  const handleOpen = () => {
    setShowOverlay(true);
  };

  const handleClose = () => {
    setShowOverlay(false);
  };
  return (
    <div className="app-container">
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

        {/* <!-- Products Section --> */}
        <section className="products-section">
          <div className='section1-title'>
            <h2 className="section-title">món ngon đề xuất cho bạn</h2>
          </div>
          <div className="products-grid">
            <ProductCard
              onclick={handleOpen}
              name="trà sữa trân châu đường đen"
              image={tcdd}
              price={'30.000đ'}
            />
            <ProductCard
              onclick={handleOpen}
              name="trà sữa trân châu đường đen"
              image={tcdd}
              price={'30.000đ'}
            />
            <ProductCard
              onclick={handleOpen}
              name="trà sữa trân châu đường đen"
              image={tcdd}
              price={'30.000đ'}
            />
            <ProductCard
              onclick={handleOpen}
              name="trà sữa trân châu đường đen"
              image={tcdd}
              price={'30.000đ'}
            />
          </div>
        </section>

        {/* <!-- Featured Product Section --> */}

        <section className="featured-section">
          <div className='section2-title'>
            <h2 className="section-title">tham khảo thêm...</h2>
          </div>
          <div className="featured-product">
            <div className="featured-image">
              <BigProductCard
                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                name="Bông lan trứng muối"
                desc="Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt “quốc dân” khiến ai ăn thử cũng mê! loremmmmmmmmmmmmmmmmmmmmmmmmm"
                price="55k"
                rating='4.5'
                sold="1.7k"
              />
              <ProductCard
                onclick={handleOpen}
                name="trà sữa trân châu đường đen"
                image={tcdd}
                price={'30.000đ'}
              />
            </div>
          </div>
        </section>
        {showOverlay && (
          <div className="overlay">
            <div className="detail-box">
              <ProductDetail
                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                name="Bông lan trứng muối"
                desc="Bông lan mềm mịn kết hợp vị béo ngậy của sốt phô mai, chà bông mặn và trứng muối bùi bùi – món ăn vặt quốc dân khiến ai ăn thử cũng mê!"
                onClose={handleClose}
              />
            </div>
          </div>
        )}
        {/* Thêm nội dung chính ở đây */}
      </main>
    </div>
  )
}

export default Home
