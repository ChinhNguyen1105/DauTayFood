import React, { useState, useEffect } from "react";
import { ChefHat, Users, Award, Heart, Star } from "lucide-react";
import banner from "../../assets/banner.png";
import { Link } from "react-router-dom";
import ScrollToTop from "../../ScrollToTop";

const AboutUsPage = () => {
    const [visibleSections, setVisibleSections] = useState(new Set());

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set([...prev, entry.target.id]));
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -100px 0px",
            }
        );

        const sections = document.querySelectorAll("[data-animate]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const isVisible = (id) => visibleSections.has(id);

    return (
        <div
            className="
                bg-gradient-to-br from-[#D4ECE0] to-[#FF8080] 
                dark:from-gray-900 dark:to-gray-800
                font-sans text-gray-800 dark:text-gray-200
                transition-colors duration-500
            "
        >
            <ScrollToTop />

            {/* Hero */}
            <section
                id="hero"
                data-animate
                className={`relative h-screen flex items-center justify-center text-center px-8 clip-path-custom mt-7
                    ${isVisible("hero")
                        ? "opacity-100 translate-y-0 transition-all duration-700"
                        : "opacity-0 translate-y-12 transition-all duration-700"
                    }`}
            >
                <div className="absolute inset-0">
                    <img src={banner} alt="banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                <div className="relative z-10 max-w-3xl text-white">
                    <ChefHat className="w-20 h-20 mx-auto animate-bounce" />
                    <h1 className="text-5xl font-bold mt-4">Đậu Tây Food</h1>
                    <p className="text-xl mt-4">
                        Chuyên bánh tráng, đồ chiên, trà sữa - giao hàng tận nơi
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <Link to="/menu#search-linking">
                            <button
                                className="
                                    bg-white text-[#FF8080] font-semibold rounded-full px-6 py-3 shadow-md 
                                    hover:bg-[#ffeaea] hover:-translate-y-1 transition-all
                                    dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
                                "
                            >
                                Đặt hàng ngay
                            </button>
                        </Link>
                        <Link to="/menu#search-linking">
                            <button
                                className="
                                    border-2 border-white text-white font-semibold rounded-full px-6 py-3 
                                    hover:bg-white hover:text-[#FF8080] hover:-translate-y-1 transition-all
                                    dark:border-gray-400 dark:hover:bg-gray-200 dark:hover:text-gray-800
                                "
                            >
                                Xem menu
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section
                id="story"
                data-animate
                className={`max-w-6xl mx-auto px-4 py-16 
                    ${isVisible("story")
                        ? "opacity-100 translate-y-0 transition-all duration-700"
                        : "opacity-0 translate-y-12 transition-all duration-700"
                    }`}
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Câu chuyện của chúng tôi</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#D4ECE0] to-[#FF8080] dark:from-gray-600 dark:to-gray-400 mx-auto my-4 rounded"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="flex flex-col gap-6">
                        <div className="bg-[#D4ECE0] dark:bg-gray-800 p-6 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                            <h3 className="font-bold text-xl">Khởi đầu từ năm 2023</h3>
                            <p className="mt-2">
                                Đậu Tây Food được thành lập vào đầu năm 2023, bắt đầu từ một gian bếp nhỏ tại
                                Thanh Sơn - Kiến Thụy, Hải Phòng...
                            </p>
                        </div>
                        <div className="bg-[#FF8080] text-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                            <h3 className="font-bold text-xl">Triết lý "ngon - sạch - giá sinh viên"</h3>
                            <p className="mt-2">
                                Với tiêu chí "ngon - sạch - giá sinh viên", Đậu Tây Food cam kết sử dụng nguyên
                                liệu tươi, mới mỗi ngày...
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        {[
                            { icon: <Heart />, title: "Chất lượng đầu tiên", desc: "Cam kết nguyên liệu tươi ngon", bg: "bg-[#D4ECE0] dark:bg-gray-700" },
                            { icon: <Users />, title: "Phục vụ tận tâm", desc: "Giao hàng nhanh chóng, chu đáo", bg: "bg-[#FF8080] text-white dark:bg-gray-600" },
                            { icon: <Award />, title: "Giá cả hợp lý", desc: "Phù hợp với mọi đối tượng", bg: "bg-[#D4ECE0] dark:bg-gray-700" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:scale-105 transition-transform">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.bg}`}>
                                    {item.icon}
                                </div>
                                <h4 className="font-semibold mt-3">{item.title}</h4>
                                <p className="text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products */}
            <section
                id="products"
                data-animate
                className={`max-w-6xl mx-auto px-4 py-16 
                    ${isVisible("products")
                        ? "opacity-100 translate-y-0 transition-all duration-700"
                        : "opacity-0 translate-y-12 transition-all duration-700"
                    }`}
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Sản phẩm của chúng tôi</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#D4ECE0] to-[#FF8080] dark:from-gray-600 dark:to-gray-400 mx-auto my-4 rounded"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {[
                        { icon: <ChefHat />, title: "Bánh tráng nướng", desc: "Bánh tráng nướng giòn tan...", rating: 5 },
                        { icon: "🍗", title: "Đồ chiên", desc: "Gà rán, cánh gà, khoai tây chiên...", rating: 4.9 },
                        { icon: "🧋", title: "Trà sữa", desc: "Trà sữa đa dạng hương vị...", rating: 4.8 },
                    ].map((p, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-2xl text-center shadow-md hover:scale-105 transition-transform">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 bg-[#D4ECE0] dark:bg-gray-700 text-[#FF8080] text-4xl">
                                {typeof p.icon === "string" ? p.icon : React.cloneElement(p.icon, { className: "w-10 h-10" })}
                            </div>
                            <h3 className="font-bold text-lg">{p.title}</h3>
                            <p className="text-sm mt-2">{p.desc}</p>
                            <div className="flex items-center justify-center gap-1 mt-3 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4" />
                                ))}
                                <span className="ml-1 text-gray-600 dark:text-gray-400 text-sm">{p.rating}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Values */}
            <section
                id="values"
                data-animate
                className={`max-w-6xl mx-auto px-4 py-16 
                    ${isVisible("values")
                        ? "opacity-100 translate-y-0 transition-all duration-700"
                        : "opacity-0 translate-y-12 transition-all duration-700"
                    }`}
            >
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Giá trị cốt lõi</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#D4ECE0] to-[#FF8080] dark:from-gray-600 dark:to-gray-400 mx-auto my-4 rounded"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-center">
                    {[
                        { icon: <Heart />, title: "Chất lượng", desc: "Cam kết sử dụng nguyên liệu tươi ngon..." },
                        { icon: <Users />, title: "Khách hàng", desc: "Luôn lắng nghe và phục vụ tận tâm..." },
                        { icon: <Award />, title: "Uy tín", desc: "Xây dựng thương hiệu bền vững..." },
                    ].map((v, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 dark:text-gray-200 p-6 rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                            <div className="w-16 h-16 rounded-full bg-[#FF8080] dark:bg-gray-600 flex items-center justify-center text-white mx-auto mb-3">
                                {v.icon}
                            </div>
                            <h3 className="font-semibold">{v.title}</h3>
                            <p className="text-sm mt-1">{v.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;
