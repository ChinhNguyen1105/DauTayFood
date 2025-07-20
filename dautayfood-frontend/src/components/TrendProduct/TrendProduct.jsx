import React from 'react';
import sticker from '../../assets/sticker.png';
import ProductCard from '../ProductCard/ProductCard';
import './TrendProduct.css';
import TopProducts from '../../Products/ProductsWeek';

const TrendProduct = ({ selectedProduct, handleAddToCart, handleOpen, handleClose }) => {
    return (
        <div className='TrendProduct-container'>
            <div className='TrendProduct-quote-and-sticker'>
                <div className='TrendProduct-sticker'>
                    <img src={sticker} alt="sticker" />
                </div>
                <div className='TrendProduct-quote'>
                    <p className="text-lg leading-relaxed italic">
                        "Vì chua - cay - mặn - ngọt đủ đầy trong một hộp nhỏ xinh!
                        Bánh tráng trộn nhà Đậu là món 'must-try' với topping đầy đủ:
                        xoài non, bò khô, rau răm, trứng cút... trộn đều tay, đậm đà từng miếng.
                        Ăn một lần là ghiền luôn đó nha!"
                    </p>
                </div>
            </div>

            <div className='TrendProduct-top-product'>
                {TopProducts.map((item, index) => (
                    <div className='TrendProduct-top2' key={item.id || index}>
                        <div className='TrendProduct-cirle2'>{index + 1}</div>
                        <ProductCard
                            product={item}
                            selectedProduct={selectedProduct}
                            handleAddToCart={handleAddToCart}
                            handleOpen={handleOpen}
                            handleClose={handleClose}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendProduct;
