import React, { useRef, useEffect } from "react";
import useTheme from "../../../hooks/useTheme";

const reasons = [
    { title: "Giao hàng nhanh", desc: "Nhanh chóng trong 30 phút, nóng hổi đến tận tay bạn.", color: "red" },
    { title: "Nguyên liệu tươi sạch", desc: "Đảm bảo chất lượng với 100% nguyên liệu tự nhiên.", color: "green" },
    { title: "Được khách hàng yêu thích", desc: "Hơn 10,000 lượt đánh giá 5 sao từ khách hàng.", color: "pink" },
];

export default function WhyChooseUs() {
    const whyChooseRef = useRef(null);
    const { theme } = useTheme();
    const darkMode = theme === "dark";

    useEffect(() => {
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("animate-in");
            });
        }, observerOptions);

        if (whyChooseRef.current) observer.observe(whyChooseRef.current);
        document.querySelectorAll(".fade-in-card").forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={whyChooseRef}
            className={`section-fade relative px-4 md:px-8 overflow-hidden
        ${darkMode
                    ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
                    : "bg-gradient-to-br from-white via-red-50/30 to-pink-50/40"}`}
        >
            <div className="relative z-10 max-w-7xl mx-auto text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold 
                       bg-gradient-to-r from-red-600 via-red-500 to-pink-500 
                       bg-clip-text text-transparent mb-4">
                    Vì sao chọn Dâu Tây Food?
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-pink-400 mx-auto rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
                    Khám phá những lý do khiến hàng ngàn khách hàng tin tưởng và lựa chọn chúng tôi mỗi ngày
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                {reasons.map((item, idx) => (
                    <div key={item.title} className={`fade-in-card stagger-${idx + 1} group`}>
                        <div className="gradient-border floating-animation" style={{ animationDelay: `${idx * 2}s` }}>
                            <div className="card-inner bg-white dark:bg-gray-800 p-8 text-center 
                              group-hover:glow-effect transition-all duration-300">
                                <h3 className={`font-bold text-xl mb-3 group-hover:text-${item.color}-600 
                                text-gray-800 dark:text-gray-100 transition-colors`}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
