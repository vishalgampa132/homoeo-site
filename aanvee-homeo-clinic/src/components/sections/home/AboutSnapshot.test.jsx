import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
import AboutSnapshot from './AboutSnapshot';

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

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('AboutSnapshot', () => {
  it('renders the section heading "About Our Clinic"', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(
      screen.getByRole('heading', { name: /about our clinic/i })
    ).toBeInTheDocument();
  });

  it('renders a brief clinic introduction paragraph', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(
      screen.getByText(/trusted name in holistic healthcare/i)
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = renderWithRouter(<AboutSnapshot />);
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'about-snapshot-heading');
  });

  it('displays years of experience trust indicator', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Years of Experience')).toBeInTheDocument();
  });

  it('displays patients treated trust indicator', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(screen.getByText('10,000+')).toBeInTheDocument();
    expect(screen.getByText('Patients Treated')).toBeInTheDocument();
  });

  it('displays success rate trust indicator', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
  });

  it('displays medicines available trust indicator', () => {
    renderWithRouter(<AboutSnapshot />);
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Medicines Available')).toBeInTheDocument();
  });

  it('renders trust indicators list with accessible role', () => {
    renderWithRouter(<AboutSnapshot />);
    const list = screen.getByRole('list', { name: /trust indicators/i });
    expect(list).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(4);
  });

  it('renders a "Learn More About Us" link to /about', () => {
    renderWithRouter(<AboutSnapshot />);
    const link = screen.getByRole('link', { name: /learn more about us/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders decorative icons with aria-hidden', () => {
    const { container } = renderWithRouter(<AboutSnapshot />);
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBeGreaterThan(0);
  });
});
