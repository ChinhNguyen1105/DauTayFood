// ImpressiveStats.jsx
import { useEffect, useRef, useState } from "react";

const ImpressiveStats = () => {
    const countersRef = useRef([]);
    const [hasAnimated, setHasAnimated] = useState(false);

    const stats = [
        { id: 1, end: 1200, label: "Khách hàng" },
        { id: 2, end: 350, label: "Sản phẩm" },
        { id: 3, end: 25, label: "Giải thưởng" },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        stats.forEach((stat, index) => {
                            let start = 0;
                            const duration = 2000; // 2s
                            const stepTime = Math.max(Math.floor(duration / stat.end), 1);
                            const timer = setInterval(() => {
                                start += 1;
                                if (countersRef.current[index]) {
                                    countersRef.current[index].textContent = start;
                                }
                                if (start >= stat.end) clearInterval(timer);
                            }, stepTime);
                        });
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (countersRef.current[0]) observer.observe(countersRef.current[0]);

        return () => observer.disconnect();
    }, [hasAnimated, stats]);

    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 mb-8">
                    Các con số ấn tượng
                </h2>
                <div className="flex flex-col sm:flex-row justify-center gap-12 text-4xl font-extrabold text-red-500">
                    {stats.map((stat, idx) => (
                        <div key={stat.id} className="flex flex-col items-center">
                            <span ref={(el) => (countersRef.current[idx] = el)}>0</span>
                            <p className="text-base font-medium text-gray-600 dark:text-gray-300 mt-2">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpressiveStats;
