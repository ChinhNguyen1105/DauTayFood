import React, { useState, useEffect } from 'react';
import { ChefHat, Users, Award, Heart, Star, Phone, Mail, MapPin } from 'lucide-react';
import './AboutPage.css';
import banner from '../../assets/banner.png';
import { Link } from 'react-router-dom';

const AboutUsPage = () => {
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections(prev => new Set([...prev, entry.target.id]));
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        const sections = document.querySelectorAll('[data-animate]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const isVisible = (id) => visibleSections.has(id);

    return (
        <div className="AboutPage">
            <section
                id="hero"
                data-animate
                className={`AboutHeroSection ${isVisible('hero') ? 'AboutFadeIn' : 'AboutFadeOut'}`}>
                <div className="AboutHeroOverlay"><img src={banner} /></div>
                <div className='AboutHeroOverlay-cover'></div>
                <div className="AboutHeroContent">
                    <div className="AboutIconContainer">
                        <ChefHat className="AboutIconBounce" />
                    </div>
                    <h1 className="AboutHeroTitle">Đậu Tây Food</h1>
                    <p className="AboutHeroSubtitle">
                        Chuyên bánh tráng, đồ chiên, trà sữa - giao hàng tận nơi
                    </p>
                    <div className="AboutHeroButtons">
                        <Link to='/menu#search-linking'> <button className="AboutBtnPrimary">Đặt hàng ngay</button></Link>
                        <Link to='/menu#search-linking'><button className="AboutBtnOutline">Xem menu</button></Link>
                    </div>
                </div>
            </section>

            <section
                id="story"
                data-animate
                className={`AboutStorySection ${isVisible('story') ? 'AboutFadeIn' : 'AboutFadeOut'}`}>
                <div className="AboutContainer">
                    <div className="AboutSectionHeader">
                        <h2>Câu chuyện của chúng tôi</h2>
                        <div className="AboutSectionDivider"></div>
                    </div>

                    <div className="AboutStoryGrid">
                        <div className="AboutStoryLeft">
                            <div className="AboutStoryCard AboutGreen">
                                <h3>Khởi đầu từ năm 2023</h3>
                                <p>
                                    Đậu Tây Food được thành lập vào đầu năm 2023, bắt đầu từ một gian bếp nhỏ tại Thanh Sơn - Kiến Thụy, Hải Phòng.
                                    Xuất phát từ niềm đam mê với ẩm thực đường phố Việt Nam, đặc biệt là các món ăn vặt,
                                    chúng tôi mong muốn mang đến những hương vị ẩm thực truyền thống được chăm chút kỹ lưỡng về chất lượng.
                                </p>
                            </div>
                            <div className="AboutStoryCard AboutPink">
                                <h3>Triết lý "ngon - sạch - giá sinh viên"</h3>
                                <p>
                                    Với tiêu chí "ngon - sạch - giá sinh viên", Đậu Tây Food cam kết sử dụng nguyên liệu tươi,
                                    mới mỗi ngày, chế biến đảm bảo vệ sinh và mang đến trải nghiệm ẩm thực tuyệt vời cho mọi khách hàng.
                                </p>
                            </div>
                        </div>

                        <div className="AboutStoryRight">
                            <div className="AboutStoryHighlightBox">
                                <div className="AboutHighlightCard">
                                    <div className="AboutHighlightIcon AboutGreen"><Heart className="AboutIcon" /></div>
                                    <div>
                                        <h4>Chất lượng đầu tiên</h4>
                                        <p>Cam kết nguyên liệu tươi ngon</p>
                                    </div>
                                </div>
                                <div className="AboutHighlightCard">
                                    <div className="AboutHighlightIcon AboutPink"><Users className="AboutIcon" /></div>
                                    <div>
                                        <h4>Phục vụ tận tâm</h4>
                                        <p>Giao hàng nhanh chóng, chu đáo</p>
                                    </div>
                                </div>
                                <div className="AboutHighlightCard">
                                    <div className="AboutHighlightIcon AboutGreen"><Award className="AboutIcon" /></div>
                                    <div>
                                        <h4>Giá cả hợp lý</h4>
                                        <p>Phù hợp với mọi đối tượng</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="products"
                data-animate
                className={`AboutProductsSection ${isVisible('products') ? 'AboutFadeIn' : 'AboutFadeOut'}`}>
                <div className="AboutContainer">
                    <div className="AboutSectionHeader">
                        <h2>Sản phẩm của chúng tôi</h2>
                        <div className="AboutSectionDivider"></div>
                    </div>

                    <div className="AboutProductsGrid">
                        <div className="AboutProductCard">
                            <div className="AboutProductIcon AboutGreenBg">
                                <ChefHat className="AboutProductIconInner" />
                            </div>
                            <h3>Bánh tráng nướng</h3>
                            <p>Bánh tráng nướng giòn tan, nhiều loại topping hấp dẫn, chế biến theo công thức truyền thống.</p>
                            <div className="AboutProductRating">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="AboutStarIcon" />
                                ))}
                                <span>5.0</span>
                            </div>
                        </div>

                        <div className="AboutProductCard">
                            <div className="AboutProductIcon AboutPinkBg">
                                <span className="AboutEmoji">🍗</span>
                            </div>
                            <h3>Đồ chiên</h3>
                            <p>Gà rán, cánh gà, khoai tây chiên giòn rụm, đảm bảo vệ sinh an toàn thực phẩm.</p>
                            <div className="AboutProductRating">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="AboutStarIcon" />
                                ))}
                                <span>4.9</span>
                            </div>
                        </div>

                        <div className="AboutProductCard">
                            <div className="AboutProductIcon AboutGreenBg">
                                <span className="AboutEmoji">🧋</span>
                            </div>
                            <h3>Trà sữa</h3>
                            <p>Trà sữa đa dạng hương vị: trà đen, matcha, taro... Nguyên liệu chất lượng, pha chế tươi mới.</p>
                            <div className="AboutProductRating">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="AboutStarIcon" />
                                ))}
                                <span>4.8</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="values"
                data-animate
                className={`AboutValuesSection ${isVisible('values') ? 'AboutFadeIn' : 'AboutFadeOut'}`}>
                <div className="AboutContainer">
                    <div className="AboutSectionHeader">
                        <h2>Giá trị cốt lõi</h2>
                        <div className="AboutSectionDivider"></div>
                    </div>

                    <div className="AboutValuesGrid">
                        <div className="AboutValueCard">
                            <div className="AboutValueIcon AboutGreen"><Heart className="AboutIcon" /></div>
                            <h3>Chất lượng</h3>
                            <p>Cam kết sử dụng nguyên liệu tươi ngon, chế biến theo quy trình nghiêm ngặt</p>
                        </div>
                        <div className="AboutValueCard">
                            <div className="AboutValueIcon AboutPink"><Users className="AboutIcon" /></div>
                            <h3>Khách hàng</h3>
                            <p>Luôn lắng nghe và phục vụ với tâm huyết, mang đến trải nghiệm tốt nhất</p>
                        </div>
                        <div className="AboutValueCard">
                            <div className="AboutValueIcon AboutGreen"><Award className="AboutIcon" /></div>
                            <h3>Uy tín</h3>
                            <p>Xây dựng thương hiệu bền vững dựa trên sự tin tưởng của khách hàng</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
