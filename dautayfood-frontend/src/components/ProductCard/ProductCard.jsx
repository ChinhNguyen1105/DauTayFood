import './ProductCard.css'

function ProductCard1({ name, image, price }) {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-img" />
            <h3 className='product-price'>{price}</h3>
            <h3 className="product-name">{name}</h3>
            <button className="try-btn">Thử ngay</button>
        </div>
    );
}

export default ProductCard1;
