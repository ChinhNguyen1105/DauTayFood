import './Home.css';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import BigProductCard from '../../components/BigProductCard/BigProductCard.jsx';
import HeroSection from '../../components/HeroBanner/HeroBanner.jsx';
import TypicalProducts from '../../Products/TypicalProduct.jsx';
import ProductForBigCard from '../../Products/ProductForBigCard.jsx';

function Home({ selectedProduct, handleOpen, handleClose, handleAddToCart }) {
  console.log("value of typical product: ", TypicalProducts);
  const showOverlay = !!selectedProduct;
  return (
    <div className="Home-app-container">
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

        {/* Products Section */}
        <section className="Home-products-section">
          <div className='Home-section1-title'>
            <h2 className="Home-section-title">món ngon đề xuất cho bạn</h2>
          </div>
          <div className="Home-products-grid">
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

        {/* Featured Product Section */}
        <section className="Home-featured-section">
          <div className='Home-section2-title'>
            <h2 className="Home-section-title">tham khảo thêm...</h2>
          </div>
          <div className="Home-featured-product">
            <div className="Home-featured-image">
              {ProductForBigCard.map((product) => (
                <BigProductCard
                  key={product.id}
                  product={product}
                  selectedProduct={selectedProduct}
                  handleAddToCart={handleAddToCart}
                  handleOpen={() => handleOpen(product)}
                  handleClose={handleClose}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
