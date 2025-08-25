import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = ({
    backgroundImages = [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80",
    ],
    title = "Thanh Sơn - Kiến Thụy - Hải Phòng",
    subtitle = "Giao hàng trong khu vực trong vòng 1 giờ",
    promoText = "mua ngay để nhận khuyến mãi",
    autoSlideInterval
}) => {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const slidesRef = useRef(null);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % backgroundImages.length);
        }, autoSlideInterval);
        return () => clearInterval(slideTimer);
    }, [backgroundImages.length, autoSlideInterval]);

    const handlePromoClick = () => navigate("/menu#search-linking");

    return (
        <section className="relative w-screen h-screen overflow-hidden">
            {/* Slider container */}
            <div
                ref={slidesRef}
                className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
                {backgroundImages.map((img, i) => (
                    <div
                        key={i}
                        className="w-full h-full flex-shrink-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
                    {title}
                </h1>
                <p className="text-lg md:text-xl mt-4">{subtitle}</p>

                <button
                    onClick={handlePromoClick}
                    className="mt-6 bg-gradient-to-r from-cyan-400 to-red-400 hover:from-pink-500 hover:to-orange-400 text-white px-6 py-3 rounded-full uppercase tracking-wider font-semibold text-base md:text-lg shadow-md hover:scale-105 transition-transform"
                >
                    {promoText}
                </button>
            </div>

            {/* Slide dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                {backgroundImages.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? "bg-white scale-125" : "bg-white/50"
                            }`}
                        onClick={() => setActiveSlide(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
