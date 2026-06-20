import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import ProductShowcase from './ProductShowcase';

// Mock IntersectionObserver for jsdom (required by Framer Motion's useInView)
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  };
});

describe('ProductShowcase', () => {
  it('renders the section heading "Our Products"', () => {
    render(<ProductShowcase />);
    expect(
      screen.getByRole('heading', { name: /our products/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<ProductShowcase />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'product-showcase-heading');
  });

  it('renders a carousel region with aria-roledescription', () => {
    render(<ProductShowcase />);
    const carousel = screen.getByRole('region', { name: /product showcase/i });
    expect(carousel).toBeInTheDocument();
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
  });

  it('renders the first product category "Immunity Boosters" by default', () => {
    render(<ProductShowcase />);
    expect(screen.getByText('Immunity Boosters')).toBeInTheDocument();
    expect(
      screen.getByText(/strengthen your natural defenses/i)
    ).toBeInTheDocument();
  });

  it('renders dot indicators for 5 product categories', () => {
    render(<ProductShowcase />);
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(5);
  });

  it('renders navigation arrows for desktop', () => {
    render(<ProductShowcase />);
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });

  it('renders a subtitle paragraph', () => {
    render(<ProductShowcase />);
    expect(
      screen.getByText(/explore our range of authentic homoeopathic products/i)
    ).toBeInTheDocument();
  });

  it('renders the slide with proper aria-label indicating slide number', () => {
    render(<ProductShowcase />);
    const slide = screen.getByRole('group');
    expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    expect(slide).toHaveAttribute('aria-label', 'Slide 1 of 5');
  });

  it('renders the icon with aria-hidden', () => {
    const { container } = render(<ProductShowcase />);
    const hiddenIcon = container.querySelector('[aria-hidden="true"]');
    expect(hiddenIcon).toBeInTheDocument();
  });
});
