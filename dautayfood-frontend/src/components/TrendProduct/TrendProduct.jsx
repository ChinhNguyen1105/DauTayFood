import sticker from '../../assets/sticker.png';
import ProductCard from '../ProductCard/ProductCard';
import './TrendProduct.css';
import tcdd from '../../assets/tran-chau-duong-den.jpg';

const TrendProduct = () => {

    return (
        <>
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
                    <div className='TrendProduct-top2'>
                        <div className='TrendProduct-cirle2'>2</div>
                        <ProductCard
                            name="trà sữa trân châu đường đen"
                            image={tcdd}
                            price={'30.000đ'}
                        />
                    </div>
                    <div className='TrendProduct-top1'>
                        <div className='TrendProduct-cirle1'>1</div>
                        <ProductCard
                            name="trà sữa trân châu đường đen"
                            image={tcdd}
                            price={'30.000đ'}
                        />
                    </div>
                    <div className='TrendProduct-top3'>
                        <div className='TrendProduct-cirle3'>3</div>
                        <ProductCard
                            name="trà sữa trân châu đường đen"
                            image={tcdd}
                            price={'30.000đ'}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
export default TrendProduct;