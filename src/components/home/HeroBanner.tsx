// src/components/HeroBanner.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderData } from '@/types';

interface HeroBannerProps {
  slides: SliderData[];
  autoSlide?: boolean;
  slideInterval?: number;
  maxHeight?: string;
  imageOverlay?: boolean;
  renderContent?: (activeSlide: SliderData) => React.ReactNode; // Thay children bằng renderContent
}

function HeroBanner({
  slides,
  autoSlide = true,
  slideInterval = 6000,
  maxHeight = '90vh',
  imageOverlay = false,
  renderContent, // Sử dụng renderContent thay vì children
}: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide || !slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, slideInterval);
    return () => clearInterval(timer);
  }, [slides, autoSlide, slideInterval]);

  const goToSlide = (index: number) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[currentIndex];
  const isSlider = slides.length > 1;

  return (
    <>
      <section
        className="relative w-full h-[100vh] bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${activeSlide.image})`, maxHeight }}
      >
        {isSlider && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full bg-white transition-all duration-500 ease-in-out ${index === currentIndex ? 'w-6 opacity-100' : 'w-2 opacity-50 hover:opacity-75'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <div className="relative z-10 h-full w-full flex flex-col">
        {renderContent ? renderContent(activeSlide) : null} {/* Gọi renderContent thay vì children */}
      </div>
      {/* {imageOverlay && <div className="absolute inset-0 bg-black/50"></div>} */}
    </>
  );
}

export default HeroBanner;