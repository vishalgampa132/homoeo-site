import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
import Services from './Services';

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

function renderServices() {
  return render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>
  );
}

describe('Services', () => {
  it('renders the section heading "Our Services"', () => {
    renderServices();
    expect(
      screen.getByRole('heading', { name: /our services/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = renderServices();
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'services-heading');
  });

  it('renders six service items', () => {
    renderServices();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(6);
  });

  it('renders the list with accessible role and label', () => {
    renderServices();
    const list = screen.getByRole('list', { name: /our services/i });
    expect(list).toBeInTheDocument();
  });

  it('renders "Homeopathy Consultation" service with description', () => {
    renderServices();
    expect(screen.getByText('Homeopathy Consultation')).toBeInTheDocument();
    expect(
      screen.getByText(/personalized consultations with experienced/i)
    ).toBeInTheDocument();
  });

  it('renders "Medicine Store" service with description', () => {
    renderServices();
    expect(screen.getByText('Medicine Store')).toBeInTheDocument();
    expect(
      screen.getByText(/authentic homeopathic medicines sourced/i)
    ).toBeInTheDocument();
  });

  it('renders "Chronic Disease Care" service with description', () => {
    renderServices();
    expect(screen.getByText('Chronic Disease Care')).toBeInTheDocument();
    expect(
      screen.getByText(/specialized long-term treatment programs/i)
    ).toBeInTheDocument();
  });

  it('renders "Skin & Hair Treatment" service with description', () => {
    renderServices();
    expect(screen.getByText('Skin & Hair Treatment')).toBeInTheDocument();
    expect(
      screen.getByText(/targeted treatments for skin allergies/i)
    ).toBeInTheDocument();
  });

  it('renders "Child Care" service with description', () => {
    renderServices();
    expect(screen.getByText('Child Care')).toBeInTheDocument();
    expect(
      screen.getByText(/gentle and safe homeopathic care for children/i)
    ).toBeInTheDocument();
  });

  it('renders "Lifestyle Disorders" service with description', () => {
    renderServices();
    expect(screen.getByText('Lifestyle Disorders')).toBeInTheDocument();
    expect(
      screen.getByText(/holistic management of modern lifestyle issues/i)
    ).toBeInTheDocument();
  });

  it('renders decorative icons with aria-hidden', () => {
    const { container } = renderServices();
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(6);
  });

  it('renders links for services that have a link property', () => {
    renderServices();
    // Services with links: Homeopathy Consultation, Chronic Disease Care, Skin & Hair, Child Care, Lifestyle Disorders
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(5);
  });

  it('renders "Learn more" text for services with links', () => {
    renderServices();
    const learnMoreTexts = screen.getAllByText(/learn more/i);
    expect(learnMoreTexts.length).toBe(5);
  });

  it('does not render a link for "Medicine Store" (no link property)', () => {
    renderServices();
    const medicineStoreLink = screen.queryByRole('link', {
      name: /learn more about medicine store/i,
    });
    expect(medicineStoreLink).not.toBeInTheDocument();
  });

  it('renders a subtitle paragraph', () => {
    renderServices();
    expect(
      screen.getByText(/comprehensive homeopathic care/i)
    ).toBeInTheDocument();
  });

  it('uses responsive grid classes', () => {
    const { container } = renderServices();
    const grid = container.querySelector('[role="list"]');
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('sm:grid-cols-2');
    expect(grid.className).toContain('lg:grid-cols-3');
  });
});
