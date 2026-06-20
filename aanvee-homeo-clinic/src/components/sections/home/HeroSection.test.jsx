import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HeroSection from './HeroSection';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('HeroSection', () => {
  it('renders the headline "Natural Healing for Better Living"', () => {
    renderWithRouter(<HeroSection />);
    expect(
      screen.getByRole('heading', { name: /natural healing for better living/i })
    ).toBeInTheDocument();
  });

  it('renders the subheadline mentioning trusted homoeopathy consultation and medicines', () => {
    renderWithRouter(<HeroSection />);
    expect(
      screen.getByText(/trusted homoeopathy consultation/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/medicines/i)
    ).toBeInTheDocument();
  });

  it('renders "Book Appointment" CTA linking to /consultation', () => {
    renderWithRouter(<HeroSection />);
    const bookLink = screen.getByRole('link', { name: /book appointment/i });
    expect(bookLink).toBeInTheDocument();
    expect(bookLink).toHaveAttribute('href', '/consultation');
  });

  it('renders "Explore Treatments" CTA linking to /treatments', () => {
    renderWithRouter(<HeroSection />);
    const exploreLink = screen.getByRole('link', { name: /explore treatments/i });
    expect(exploreLink).toBeInTheDocument();
    expect(exploreLink).toHaveAttribute('href', '/treatments');
  });

  it('renders the hero section with aria-label', () => {
    renderWithRouter(<HeroSection />);
    expect(screen.getByLabelText('Hero')).toBeInTheDocument();
  });

  it('renders floating decorative elements with aria-hidden', () => {
    const { container } = renderWithRouter(<HeroSection />);
    const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(decorativeElements.length).toBeGreaterThan(0);
  });

  it('renders with full viewport height styling', () => {
    const { container } = renderWithRouter(<HeroSection />);
    const section = container.querySelector('section');
    expect(section.className).toContain('min-h-screen');
  });

  it('renders the headline with heading font family class', () => {
    renderWithRouter(<HeroSection />);
    const heading = screen.getByRole('heading', { name: /natural healing for better living/i });
    expect(heading.className).toContain('font-heading');
  });
});
