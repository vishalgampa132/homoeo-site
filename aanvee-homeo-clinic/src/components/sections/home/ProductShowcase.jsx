import React from 'react';
import SectionReveal from '../../ui/SectionReveal';
import Carousel from '../../ui/Carousel';

const productCategories = [
  {
    id: 'immunity-boosters',
    title: 'Immunity Boosters',
    description: 'Strengthen your natural defenses with potent homoeopathic formulations for enhanced immunity.',
    icon: '🛡️',
  },
  {
    id: 'hair-care',
    title: 'Hair Care',
    description: 'Revitalize hair health with natural remedies that address hair fall, thinning, and scalp conditions.',
    icon: '💇',
  },
  {
    id: 'skin-care',
    title: 'Skin Care',
    description: 'Gentle, side-effect-free solutions for acne, eczema, pigmentation, and overall skin wellness.',
    icon: '✨',
  },
  {
    id: 'digestive-care',
    title: 'Digestive Care',
    description: 'Restore digestive balance with remedies for acidity, bloating, IBS, and gut health.',
    icon: '🌿',
  },
  {
    id: 'wellness-drops',
    title: 'Wellness Drops',
    description: 'Daily wellness tinctures and drops for stress relief, better sleep, and overall vitality.',
    icon: '💧',
  },
];

/**
 * ProductShowcase - Displays product categories in an auto-playing carousel.
 *
 * Uses the Carousel component to showcase 5 homoeopathy product categories
 * with icons, titles, and descriptions. Wrapped in SectionReveal for
 * scroll-triggered animation.
 */
export default function ProductShowcase() {
  return (
    <section
      className="py-16 md:py-24 bg-cream"
      aria-labelledby="product-showcase-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal direction="up">
          <h2
            id="product-showcase-heading"
            className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-4"
          >
            Our Products
          </h2>
          <p className="text-dark/70 text-center max-w-2xl mx-auto mb-10">
            Explore our range of authentic homoeopathic products crafted for holistic wellness.
          </p>
        </SectionReveal>

        <SectionReveal direction="fade" delay={0.2}>
          <Carousel
            items={productCategories}
            autoPlay={true}
            interval={4000}
            className="bg-white/40 backdrop-blur-sm rounded-glass border border-white/30 shadow-glass p-4"
          />
        </SectionReveal>
      </div>
    </section>
  );
}
