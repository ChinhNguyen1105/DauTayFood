import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({
    backgroundImages = [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80',
    ],
    title = 'Thanh Sơn - Kiến Thụy - Hải Phòng',
    subtitle = 'Giao hàng trong khu vực trong vòng 1 giờ',
    promoText = 'mua ngay để nhận khuyến mãi',
    initialTime = { hours: 9, minutes: 11, seconds: 23 },
    totalSlides = 5,
    currentSlide = 0,
    autoSlideInterval = 5000,
}) => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [activeSlide, setActiveSlide] = useState(currentSlide);

    useEffect(() => {
        const slideTimer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % totalSlides);
        }, autoSlideInterval);
        return () => clearInterval(slideTimer);
    }, [totalSlides, autoSlideInterval]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (num) => num.toString().padStart(2, '0');

    const handleSlideChange = (index) => setActiveSlide(index);

    const handlePromoClick = () => navigate('/menu#search-linking');

    return (
        <section className="relative w-screen h-screen overflow-hidden">
            {/* Background Slides */}
            {backgroundImages.map((img, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-[1000ms] ease-in-out ${i === activeSlide ? 'opacity-100 scale-100 z-0' : 'opacity-0 scale-105 -z-10'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg animate-fade-in">
                    {title}
                </h1>
                <p className="text-lg md:text-xl mt-4 animate-fade-in-delay">{subtitle}</p>

                <div className="mt-6 animate-fade-in-delay-2">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((unit, idx) => (
                            <React.Fragment key={idx}>
                                <span className="bg-white/20 backdrop-blur px-4 py-2 rounded text-2xl md:text-3xl font-mono font-bold">
                                    {formatTime(unit)}
                                </span>
                                {idx < 2 && (
                                    <span className="text-2xl md:text-3xl">:</span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <button
                        onClick={handlePromoClick}
                        className="bg-gradient-to-r from-cyan-400 to-red-400 hover:from-pink-500 hover:to-orange-400 text-white px-6 py-3 rounded-full uppercase tracking-wider font-semibold text-base md:text-lg shadow-md hover:scale-105 transition-transform"
                    >
                        {promoText}
                    </button>
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                            onClick={() => handleSlideChange(index)}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
