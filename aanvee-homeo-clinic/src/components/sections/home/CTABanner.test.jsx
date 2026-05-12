import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
import CTABanner from './CTABanner';

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

function renderCTABanner() {
  return render(
    <MemoryRouter>
      <CTABanner />
    </MemoryRouter>
  );
}

describe('CTABanner', () => {
  it('renders the section heading', () => {
    renderCTABanner();
    expect(
      screen.getByRole('heading', { name: /ready to start your healing journey/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = renderCTABanner();
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'cta-banner-heading');
  });

  it('renders a compelling subtext', () => {
    renderCTABanner();
    expect(
      screen.getByText(/book a personalized consultation/i)
    ).toBeInTheDocument();
  });

  it('renders a CTA button linking to /consultation', () => {
    renderCTABanner();
    const link = screen.getByRole('link', { name: /book your consultation/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/consultation');
  });

  it('applies gradient background to the section', () => {
    const { container } = renderCTABanner();
    const section = container.querySelector('section');
    expect(section.style.background).toContain('linear-gradient');
  });

  it('renders white text for contrast on gradient background', () => {
    renderCTABanner();
    const heading = screen.getByRole('heading', { name: /ready to start your healing journey/i });
    expect(heading.className).toContain('text-white');
  });
});
