import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Carousel - A reusable product showcase slider component.
 *
 * Supports touch swipe on mobile, arrow navigation on desktop,
 * and optional auto-play with configurable interval.
 *
 * @param {object} props
 * @param {Array<{ id: string, title: string, description?: string, icon?: string }>} props.items - Array of carousel items
 * @param {boolean} [props.autoPlay=true] - Enable auto-play sliding
 * @param {number} [props.interval=4000] - Auto-play interval in milliseconds
 * @param {string} [props.className] - Additional Tailwind classes
 */
export default function Carousel({ items = [], autoPlay = true, interval = 4000, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef(null);

  const itemCount = items.length;

  const goToNext = useCallback(() => {
    if (itemCount === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const goToPrev = useCallback(() => {
    if (itemCount === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToSlide = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || itemCount <= 1) return;

    autoPlayRef.current = setInterval(goToNext, interval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, interval, goToNext, itemCount]);

  // Pause auto-play on hover
  const pauseAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    if (autoPlay && itemCount > 1) {
      autoPlayRef.current = setInterval(goToNext, interval);
    }
  }, [autoPlay, interval, goToNext, itemCount]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (swipeDistance > minSwipeDistance) {
      goToNext();
    } else if (swipeDistance < -minSwipeDistance) {
      goToPrev();
    }

    resumeAutoPlay();
  }, [goToNext, goToPrev, resumeAutoPlay]);

  // Animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  if (itemCount === 0) {
    return null;
  }

  const currentItem = items[currentIndex];

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product showcase"
    >
      {/* Slide content */}
      <div className="relative min-h-[200px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: 'easeInOut' }
            }
            className="w-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${itemCount}`}
          >
            <div className="flex flex-col items-center text-center px-4 py-8">
              {currentItem.icon && (
                <span className="text-5xl mb-4" aria-hidden="true">
                  {currentItem.icon}
                </span>
              )}
              <h3 className="text-xl md:text-2xl font-heading font-semibold text-dark mb-2">
                {currentItem.title}
              </h3>
              {currentItem.description && (
                <p className="text-dark/70 max-w-md text-sm md:text-base">
                  {currentItem.description}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrow navigation (desktop) */}
      {itemCount > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-card hover:bg-white hover:shadow-card-hover transition-all duration-150 text-primary"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 shadow-card hover:bg-white hover:shadow-card-hover transition-all duration-150 text-primary"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {itemCount > 1 && (
        <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Slide indicators">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary scale-110'
                  : 'bg-sage/50 hover:bg-sage'
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
