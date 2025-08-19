import { useEffect, useRef } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import BigProductCard from '../../components/BigProductCard/BigProductCard.jsx';
import HeroSection from '../../components/HeroBanner/HeroBanner.jsx';
import TypicalProducts from '../../Products/TypicalProduct.jsx';
import ProductForBigCard from '../../Products/ProductForBigCard.jsx';
import ScrollToTop from '../../ScrollToTop';

function Home({ selectedProduct, handleOpen, handleClose, handleAddToCart }) {
  const whyChooseRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe sections
    if (whyChooseRef.current) observer.observe(whyChooseRef.current);
    if (feedbackRef.current) observer.observe(feedbackRef.current);

    // Observe individual cards
    const cards = document.querySelectorAll('.fade-in-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      <ScrollToTop />

      <style jsx>{`
        .fade-in-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        
        .fade-in-card.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .section-fade {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }
        
        .section-fade.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        
        .gradient-border {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffa8a8);
          padding: 2px;
          border-radius: 16px;
        }
        
        .card-inner {
          background: white;
          border-radius: 14px;
          height: 100%;
        }
        
        .floating-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .glow-effect {
          box-shadow: 0 0 30px rgba(255, 77, 77, 0.15);
        }
      `}</style>

      <main className='overflow-x-hidden overflow-y-hidden'>
        {/* Hero section */}
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

        {/* Why Choose Us Section */}
        <section
          ref={whyChooseRef}
          className="section-fade relative bg-gradient-to-br from-white via-red-50/30 to-pink-50/40 py-0 px-4 md:px-8 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl mt-4 lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
                Vì sao chọn Dâu Tây Food?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
                Khám phá những lý do khiến hàng ngàn khách hàng tin tưởng và lựa chọn chúng tôi mỗi ngày
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="fade-in-card stagger-1 group">
                <div className="gradient-border floating-animation">
                  <div className="card-inner p-8 text-center group-hover:glow-effect transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <img src="/icons/fast-delivery.svg" alt="Giao hàng nhanh" className="h-10 w-10 filter brightness-0 invert" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">⚡</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                      Giao hàng nhanh
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nhanh chóng trong <span className="font-semibold text-red-500">30 phút</span>,
                      nóng hổi đến tận tay bạn với đội ngũ shipper chuyên nghiệp.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in-card stagger-2 group">
                <div className="gradient-border floating-animation" style={{ animationDelay: '2s' }}>
                  <div className="card-inner p-8 text-center group-hover:glow-effect transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <img src="/icons/fresh-ingredient.svg" alt="Nguyên liệu sạch" className="h-10 w-10 filter brightness-0 invert" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">🌿</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                      Nguyên liệu tươi sạch
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Đảm bảo chất lượng và an toàn thực phẩm mỗi ngày với
                      <span className="font-semibold text-green-500"> 100% nguyên liệu tự nhiên</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="fade-in-card stagger-3 group">
                <div className="gradient-border floating-animation" style={{ animationDelay: '4s' }}>
                  <div className="card-inner p-8 text-center group-hover:glow-effect transition-all duration-300">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-pink-400 to-red-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <img src="/icons/love.svg" alt="Khách hàng yêu thích" className="h-10 w-10 filter brightness-0 invert" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs">❤️</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                      Được khách hàng yêu thích
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Hơn <span className="font-semibold text-pink-500">10,000 lượt đánh giá 5 sao</span>
                      từ người dùng thân thiết trên toàn quốc.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typical Products Section */}
        <section className="fade-in-card py-0 px-4 md:px-8 bg-white">
          <div className='flex justify-center items-center flex-col my-5'>
            <h2 className="text-2xl md:text-4xl mt-4 lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 lg:py-10 py-2 tracking-tight">
              Món ngon đề xuất cho bạn
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div></div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-fit mx-auto">
            {TypicalProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedProduct={selectedProduct}
                handleAddToCart={handleAddToCart}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="fade-in-card py-0 px-4 md:px-8 bg-gray-50">
          <div className='flex justify-center items-center flex-col my-5'>
            <h2 className="text-2xl md:text-4xl mt-4 lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 lg:py-10 py-2 tracking-tight">
              Tham khảo thêm...
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div></div>

          <div className="flex flex-col gap-8 justify-center items-center">
            {ProductForBigCard.map((product) => (
              <BigProductCard
                key={product.id}
                product={product}
                selectedProduct={selectedProduct}
                handleAddToCart={handleAddToCart}
                handleOpen={() => handleOpen(product)}
                handleClose={handleClose}
                className='fade-in-card'
              />
            ))}
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section
          ref={feedbackRef}
          className="section-fade relative bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 pt-2 pb-14 px-4 md:px-8 overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-red-200/10 to-pink-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-56 h-56 bg-gradient-to-tl from-orange-200/10 to-red-200/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-4xl mt-4 lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 lg:py-10 py-2 tracking-tight">
                Khách hàng nói gì về Dâu Tây Food
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
                Những phản hồi chân thực từ cộng đồng khách hàng thân thiết của chúng tôi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="fade-in-card stagger-1 group">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:bg-white">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 text-xl">
                      ★★★★★
                    </div>
                    <span className="ml-2 text-sm text-gray-500 font-medium">5.0</span>
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative">
                    <span className="text-4xl text-red-300 absolute -top-2 -left-2">"</span>
                    <span className="relative z-10">Đồ ăn siêu ngon, giao hàng đúng giờ, mình đặt gần như mỗi tuần luôn! Chất lượng ổn định và dịch vụ tuyệt vời.</span>
                    <span className="text-4xl text-red-300 absolute -bottom-4 -right-2">"</span>
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      T
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 text-lg">Trần Ngọc Trang</div>
                      <div className="text-sm text-gray-500">Khách hàng thân thiết</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fade-in-card stagger-2 group">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:bg-white">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 text-xl">
                      ★★★★★
                    </div>
                    <span className="ml-2 text-sm text-gray-500 font-medium">5.0</span>
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative">
                    <span className="text-4xl text-red-300 absolute -top-2 -left-2">"</span>
                    <span className="relative z-10">Menu đa dạng, từ trà sữa đến bánh tráng đều tuyệt vời! Mỗi món đều có hương vị riêng biệt và độc đáo.</span>
                    <span className="text-4xl text-red-300 absolute -bottom-4 -right-2">"</span>
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      M
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 text-lg">Minh Quân</div>
                      <div className="text-sm text-gray-500">Food Blogger</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="fade-in-card stagger-3 group">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 group-hover:scale-105 group-hover:bg-white">
                  <div className="flex items-center mb-6">
                    <div className="flex text-yellow-400 text-xl">
                      ★★★★★
                    </div>
                    <span className="ml-2 text-sm text-gray-500 font-medium">5.0</span>
                  </div>
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative">
                    <span className="text-4xl text-red-300 absolute -top-2 -left-2">"</span>
                    <span className="relative z-10">Mình rất thích dịch vụ chăm sóc khách hàng, cực kỳ chuyên nghiệp. Nhân viên luôn nhiệt tình và chu đáo.</span>
                    <span className="text-4xl text-red-300 absolute -bottom-4 -right-2">"</span>
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      L
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 text-lg">Lê Hoàng Yến</div>
                      <div className="text-sm text-gray-500">Doanh nhân</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="fade-in-card">
                  <div className="text-3xl font-bold text-red-600 mb-2">10K+</div>
                  <div className="text-gray-600 text-sm">Đánh giá 5 sao</div>
                </div>
                <div className="fade-in-card">
                  <div className="text-3xl font-bold text-red-600 mb-2">50K+</div>
                  <div className="text-gray-600 text-sm">Đơn hàng thành công</div>
                </div>
                <div className="fade-in-card">
                  <div className="text-3xl font-bold text-red-600 mb-2">99%</div>
                  <div className="text-gray-600 text-sm">Khách hàng hài lòng</div>
                </div>
                <div className="fade-in-card">
                  <div className="text-3xl font-bold text-red-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Hỗ trợ khách hàng</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  );
}

export default Home;