import { useEffect, useRef } from "react";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import BigProductCard from "../../components/BigProductCard/BigProductCard.jsx";
import HeroSection from "../../components/HeroBanner/HeroBanner.jsx";
import TypicalProducts from "../../Products/TypicalProduct.jsx";
import ProductForBigCard from "../../Products/ProductForBigCard.jsx";
import ScrollToTop from "../../ScrollToTop";
import WhyChoose from "../../components/WhyChoose/WhyChoose.jsx";
import Feedback from "../../components/Feedback/Feedback.jsx";

function Home({ selectedProduct, handleOpen, handleClose, handleAddToCart }) {
  const whyChooseRef = useRef(null);
  const feedbackRef = useRef(null);

  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("animate-in");
      });
    }, observerOptions);

    if (whyChooseRef.current) observer.observe(whyChooseRef.current);
    if (feedbackRef.current) observer.observe(feedbackRef.current);

    document.querySelectorAll(".fade-in-card").forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full transition-colors duration-300 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <ScrollToTop />

      {/* Animations */}
      <style>{`
        .fade-in-card { opacity: 0; transform: translateY(30px); transition: all 0.6s ease-out; }
        .fade-in-card.animate-in { opacity: 1; transform: translateY(0); }
        .section-fade { opacity: 0; transform: translateY(20px); transition: all 0.8s ease-out; }
        .section-fade.animate-in { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .gradient-border { background: linear-gradient(45deg, #ff6b6b, #ff8e8e, #ffa8a8); padding: 2px; border-radius: 16px; }
        .card-inner { border-radius: 14px; height: 100%; }
        .floating-animation { animation: float 6s ease-in-out infinite; }
        .glow-effect { box-shadow: 0 0 30px rgba(255, 77, 77, 0.15); }
      `}</style>

      <main className="overflow-x-hidden overflow-y-hidden">
        {/* Hero Section */}
        <HeroSection
          backgroundImages={[
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80",
            "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80",
          ]}
          autoSlide
          autoSlideInterval={3000}
        />

        {/* Why Choose Us */}
        <div ref={whyChooseRef}>
          <WhyChoose />
        </div>

        {/* Typical Products */}
        <section className="fade-in-card py-0 px-4 md:px-8 bg-white dark:bg-gray-900">
          <div className="flex flex-col items-center my-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 lg:py-10">
              Món ngon đề xuất cho bạn
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-fit mx-auto">
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

        {/* Featured Products */}
        <section className="fade-in-card py-0 px-4 md:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-center my-5">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4 lg:py-10">
              Tham khảo thêm...
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="flex flex-col gap-8 items-center">
            {ProductForBigCard.map((product) => (
              <BigProductCard
                key={product.id}
                product={product}
                selectedProduct={selectedProduct}
                handleAddToCart={handleAddToCart}
                handleOpen={() => handleOpen(product)}
                handleClose={handleClose}
                className="fade-in-card"
              />
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <div ref={feedbackRef}>
          <Feedback />
        </div>
      </main>
    </div>
  );
}

export default Home;
