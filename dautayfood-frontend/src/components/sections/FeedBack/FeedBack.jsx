import React, { useRef, useEffect } from "react";

const feedbacks = [
    {
        id: 1,
        rating: 5,
        comment:
            "Đồ ăn siêu ngon, giao hàng đúng giờ, mình đặt gần như mỗi tuần luôn! Chất lượng ổn định và dịch vụ tuyệt vời.",
        name: "Trần Ngọc Trang",
        role: "Khách hàng thân thiết",
        avatarColor: "from-pink-400 to-red-500",
        avatarInitial: "T",
    },
    {
        id: 2,
        rating: 5,
        comment:
            "Menu đa dạng, từ trà sữa đến bánh tráng đều tuyệt vời! Mỗi món đều có hương vị riêng biệt và độc đáo.",
        name: "Minh Quân",
        role: "Food Blogger",
        avatarColor: "from-blue-400 to-indigo-500",
        avatarInitial: "M",
    },
    {
        id: 3,
        rating: 5,
        comment:
            "Mình rất thích dịch vụ chăm sóc khách hàng, cực kỳ chuyên nghiệp. Nhân viên luôn nhiệt tình và chu đáo.",
        name: "Lan Hương",
        role: "Khách hàng thân thiết",
        avatarColor: "from-green-400 to-emerald-500",
        avatarInitial: "L",
    },
];

export default function FeedbackSection() {
    const feedbackRef = useRef(null);

    useEffect(() => {
        const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add("animate-in");
            });
        }, observerOptions);

        if (feedbackRef.current) observer.observe(feedbackRef.current);
        document.querySelectorAll(".fade-in-card").forEach((card) =>
            observer.observe(card)
        );

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={feedbackRef}
            className={`section-fade relative pt-2 pb-14 px-4 md:px-8 overflow-hidden
        bg-gradient-to-br from-red-50 via-pink-50 to-orange-50 
        dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}
        >
            <div className="max-w-7xl mx-auto">
                <h2
                    className="text-2xl md:text-4xl lg:text-5xl font-bold text-center 
            bg-gradient-to-r from-red-600 via-red-500 to-pink-500 
            bg-clip-text text-transparent mb-10"
                >
                    Khách hàng nói gì?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {feedbacks.map((fb, idx) => (
                        <div key={fb.id} className={`fade-in-card stagger-${idx + 1} group`}>
                            <div
                                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl 
                  shadow-lg hover:shadow-2xl transition-all duration-300 
                  border border-white/50 dark:border-gray-700 
                  group-hover:scale-105 group-hover:bg-white dark:group-hover:bg-gray-800"
                            >
                                {/* Rating */}
                                <div className="flex items-center mb-6">
                                    <div className="flex text-yellow-400 text-xl">
                                        {"★".repeat(fb.rating)}
                                    </div>
                                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {fb.rating}.0
                                    </span>
                                </div>

                                {/* Comment */}
                                <blockquote className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6 italic relative">
                                    <span className="text-4xl text-red-300 absolute -top-2 -left-2">
                                        "
                                    </span>
                                    <span className="relative z-10">{fb.comment}</span>
                                    <span className="text-4xl text-red-300 absolute -bottom-4 -right-2">
                                        "
                                    </span>
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center">
                                    <div
                                        className={`w-12 h-12 bg-gradient-to-br ${fb.avatarColor} 
                      rounded-full flex items-center justify-center text-white font-bold text-lg`}
                                    >
                                        {fb.avatarInitial}
                                    </div>
                                    <div className="ml-4">
                                        <div className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                            {fb.name}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {fb.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
