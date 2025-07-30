// src/components/shared/ImageSlider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSliderProps<T> {
  slides: T[];
  autoSlide?: boolean;
  slideInterval?: number;
  className?: string;
  children: (activeSlide: T) => React.ReactNode;
  activeIndex?: number;
  onSlideChange?: (index: number) => void;

  // <<< THAY ĐỔI 1: THÊM PROP MỚI ĐỂ TÙY CHỈNH MÀU NÚT >>>
  arrowStyle?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'screen';
}

function HeroSlider<T>({
  slides,
  autoSlide = false,
  slideInterval = 6000,
  className = 'relative w-full h-screen',
  children,
  activeIndex,
  onSlideChange,
  arrowStyle = 'light',
  size = 'screen', // <<< Đặt giá trị mặc định là 'light'
}: HeroSliderProps<T>) {
  
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = activeIndex !== undefined && onSlideChange !== undefined;
  const currentIndex = isControlled ? activeIndex : internalIndex;

  const handleSetCurrentIndex = (newIndex: number) => {
    if (isControlled) onSlideChange(newIndex);
    else setInternalIndex(newIndex);
  };

  const nextSlide = () => handleSetCurrentIndex((currentIndex + 1) % slides.length);
  const prevSlide = () => handleSetCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => handleSetCurrentIndex(index);

  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    const timer = setInterval(nextSlide, slideInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoSlide, slideInterval, currentIndex]);

  if (!slides || slides.length === 0) return null;

  const activeSlide = slides[currentIndex];
  const isSlider = slides.length > 1;

  const sizeClasses = {
    sm: 'h-[50vh]',
    md: 'h-[75vh]',
    lg: 'h-[90vh]',
    screen: 'h-screen',
  };
  const arrowClasses = {
    light: 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20',
    dark: 'bg-gray-900/10 backdrop-blur-sm text-gray-800 hover:bg-gray-900/20 border border-gray-900/10',
  };

  const dotClasses = {
      light: 'bg-white',
      dark: 'bg-gray-700'
  }
  const FinalclassName = `relative w-full ${sizeClasses[size]} ${className}`;
  return (
    <section className={FinalclassName}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {children(activeSlide)}
        </motion.div>
      </AnimatePresence>
      
      {isSlider && (
        <div className="absolute inset-0 z-30 pointer-events-none">
            {/* <<< THAY ĐỔI 3: ÁP DỤNG CLASS CSS ĐỘNG VÀO CÁC NÚT >>> */}
            <button
              onClick={prevSlide}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-105 pointer-events-auto ${arrowClasses[arrowStyle]}`}
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={nextSlide}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-105 pointer-events-auto ${arrowClasses[arrowStyle]}`}
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ease-in-out pointer-events-auto ${dotClasses[arrowStyle]} ${index === currentIndex ? 'w-6 opacity-100' : 'w-2 opacity-50 hover:opacity-75'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
      )}
    </section>
  );
}

export default HeroSlider;