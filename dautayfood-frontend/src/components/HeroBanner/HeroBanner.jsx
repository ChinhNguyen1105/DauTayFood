import React, { useState, useEffect } from 'react';
import './HeroBanner.css';

const HeroSection = ({
    backgroundImages = [
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1920&q=80"
    ],
    title = "Thanh Sơn - Kiến Thụy - Hải Phòng",
    subtitle = "Giao hàng trong khu vực trong vòng 1 giờ",
    promoText = "mua ngay để nhận khuyến mãi",
    initialTime = { hours: 9, minutes: 11, seconds: 23 },
    totalSlides = 5,
    currentSlide = 0,
    autoSlideInterval = 5000 // Auto-slide every 5 seconds
}) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [activeSlide, setActiveSlide] = useState(currentSlide);

    // Auto-slide functionality
    useEffect(() => {
        const slideTimer = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % totalSlides);
        }, autoSlideInterval);

        return () => clearInterval(slideTimer);
    }, [totalSlides, autoSlideInterval]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
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

    const handleSlideChange = (index) => {
        setActiveSlide(index);
    };

    const handlePromoClick = () => {
        console.log('Promo button clicked!');
        // Add your promo logic here
    };

    return (
        <section className="hero-section">
            {/* Background Images with Transitions */}
            <div className="hero-background-container">
                {backgroundImages.map((image, index) => (
                    <div
                        key={index}
                        className={`hero-background ${index === activeSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${image})` }}
                    />
                ))}
                {/* Overlay */}
                <div className="hero-overlay"></div>
            </div>

            {/* Hero Content */}
            <div className="hero-content">
                <div className="hero-text-container">
                    {/* Main Title */}
                    <h1 className="hero-title animate-fade-in">
                        {title}
                    </h1>

                    {/* Subtitle */}
                    <p className="hero-subtitle animate-fade-in-delay">
                        {subtitle}
                    </p>

                    {/* Countdown Timer */}
                    <div className="countdown-section animate-fade-in-delay-2">
                        <div className="countdown-timer">
                            <div className="time-digit">
                                {formatTime(timeLeft.hours)}
                            </div>
                            <span className="time-separator">:</span>
                            <div className="time-digit">
                                {formatTime(timeLeft.minutes)}
                            </div>
                            <span className="time-separator">:</span>
                            <div className="time-digit">
                                {formatTime(timeLeft.seconds)}
                            </div>
                        </div>

                        {/* Promotional Button */}
                        <button
                            className="promo-button"
                            onClick={handlePromoClick}
                        >
                            {promoText}
                        </button>
                    </div>
                </div>

                {/* Slide Navigation Dots */}
                <div className="slide-indicators">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            className={`slide-dot ${index === activeSlide ? 'active' : ''}`}
                            onClick={() => handleSlideChange(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;