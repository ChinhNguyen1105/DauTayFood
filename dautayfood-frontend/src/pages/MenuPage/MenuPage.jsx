import Banner from '../../assets/banner.png';
import ButtonTry from '../../components/ButtonTry/ButtonTry';
import FilterTabs from '../../components/FilterTabs/FilterTabs';
import TrendProduct from '../../components/TrendProduct/TrendProduct';
const MenuPage = () => {
    return (
        <>
            <div>
                <img src={Banner} alt="banner" />
                <div className='section1-title'>
                    <h2 className="section-title">top món ngon hàng tuần</h2>
                </div>
                <TrendProduct />
                <FilterTabs />
            </div>
        </>

    );
};
export default MenuPage;