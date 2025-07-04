import './ProductCard.css'
import ButtonTry from "../ButtonTry/ButtonTry";

function ProductCard({ name, image, price }) {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-img" />
            <h3 className='product-price'>{price}</h3>
            <h3 className="product-name">{name}</h3>
            <div className='ButtonTry'><ButtonTry onClick={() => alert("Bạn đã chọn thử ngay!")}>Thử ngay</ButtonTry></div>
        </div>
    );
}

export default ProductCard;
