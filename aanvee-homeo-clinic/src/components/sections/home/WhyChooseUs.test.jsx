import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeAll } from 'vitest';
import WhyChooseUs from './WhyChooseUs';

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

describe('WhyChooseUs', () => {
  it('renders the section heading "Why Choose Us"', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByRole('heading', { name: /why choose us/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = render(<WhyChooseUs />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'why-choose-us-heading');
  });

  it('renders six GlassCard items', () => {
    render(<WhyChooseUs />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  it('renders the list with accessible role and label', () => {
    render(<WhyChooseUs />);
    const list = screen.getByRole('list', { name: /reasons to choose us/i });
    expect(list).toBeInTheDocument();
  });

  it('renders "Personalized Treatment" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Personalized Treatment')).toBeInTheDocument();
    expect(
      screen.getByText(/customized treatment plan/i)
    ).toBeInTheDocument();
  });

  it('renders "Experienced Consultation" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Experienced Consultation')).toBeInTheDocument();
    expect(
      screen.getByText(/seasoned homeopathic consultants/i)
    ).toBeInTheDocument();
  });

  it('renders "Authentic Medicines" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Authentic Medicines')).toBeInTheDocument();
    expect(
      screen.getByText(/genuine, high-quality homeopathic medicines/i)
    ).toBeInTheDocument();
  });

  it('renders "Holistic Healing" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Holistic Healing')).toBeInTheDocument();
    expect(
      screen.getByText(/mind, body, and spirit/i)
    ).toBeInTheDocument();
  });

  it('renders "Family Care" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Family Care')).toBeInTheDocument();
    expect(
      screen.getByText(/infants to elders/i)
    ).toBeInTheDocument();
  });

  it('renders "Affordable Treatment" card with description', () => {
    render(<WhyChooseUs />);
    expect(screen.getByText('Affordable Treatment')).toBeInTheDocument();
    expect(
      screen.getByText(/accessible to all/i)
    ).toBeInTheDocument();
  });

  it('renders decorative icons with aria-hidden', () => {
    const { container } = render(<WhyChooseUs />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(6);
  });

  it('renders a subtitle paragraph', () => {
    render(<WhyChooseUs />);
    expect(
      screen.getByText(/trusted partner in natural healing/i)
    ).toBeInTheDocument();
  });
});
