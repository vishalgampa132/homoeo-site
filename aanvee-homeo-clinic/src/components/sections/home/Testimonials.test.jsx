import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import Testimonials from './Testimonials';

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

describe('Testimonials', () => {
  it('renders the section heading', () => {
    render(<Testimonials />);
    expect(
      screen.getByRole('heading', { name: /what our patients say/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<Testimonials />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'testimonials-heading');
  });

  it('renders six testimonial cards', () => {
    render(<Testimonials />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  it('renders the list with accessible role and label', () => {
    render(<Testimonials />);
    const list = screen.getByRole('list', { name: /patient testimonials/i });
    expect(list).toBeInTheDocument();
  });

  it('renders patient names', () => {
    render(<Testimonials />);
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Rajesh Patel')).toBeInTheDocument();
    expect(screen.getByText('Anita Desai')).toBeInTheDocument();
    expect(screen.getByText('Vikram Singh')).toBeInTheDocument();
    expect(screen.getByText('Meera Krishnan')).toBeInTheDocument();
    expect(screen.getByText('Suresh Gupta')).toBeInTheDocument();
  });

  it('renders patient conditions', () => {
    render(<Testimonials />);
    expect(screen.getByText('Migraine')).toBeInTheDocument();
    expect(screen.getByText('Thyroid Disorder')).toBeInTheDocument();
    expect(screen.getByText('Skin Allergies')).toBeInTheDocument();
    expect(screen.getByText('Arthritis')).toBeInTheDocument();
    expect(screen.getByText('PCOS')).toBeInTheDocument();
    expect(screen.getByText('Gastric Issues')).toBeInTheDocument();
  });

  it('renders review text in blockquotes', () => {
    const { container } = render(<Testimonials />);
    const blockquotes = container.querySelectorAll('blockquote');
    expect(blockquotes).toHaveLength(6);
  });

  it('renders star ratings with accessible labels', () => {
    render(<Testimonials />);
    const ratings = screen.getAllByLabelText(/rating: \d out of 5 stars/i);
    expect(ratings.length).toBe(6);
  });

  it('renders a subtitle paragraph', () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/real stories from patients/i)
    ).toBeInTheDocument();
  });

  it('renders review content from testimonial data', () => {
    render(<Testimonials />);
    expect(
      screen.getByText(/suffered from severe migraines/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/thyroid levels have stabilized/i)
    ).toBeInTheDocument();
  });
});
