import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeAll } from 'vitest';
import FeaturedTreatments from './FeaturedTreatments';

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

function renderFeaturedTreatments() {
  return render(
    <MemoryRouter>
      <FeaturedTreatments />
    </MemoryRouter>
  );
}

describe('FeaturedTreatments', () => {
  it('renders the section heading "Featured Treatments"', () => {
    renderFeaturedTreatments();
    expect(
      screen.getByRole('heading', { name: /featured treatments/i })
    ).toBeInTheDocument();
  });

  it('renders the section with proper aria-labelledby', () => {
    const { container } = renderFeaturedTreatments();
    const section = container.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'featured-treatments-heading');
  });

  it('renders exactly 8 treatment cards', () => {
    renderFeaturedTreatments();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(8);
  });

  it('renders the list with accessible role and label', () => {
    renderFeaturedTreatments();
    const list = screen.getByRole('list', { name: /featured treatments/i });
    expect(list).toBeInTheDocument();
  });

  it('renders the first 8 treatments from data', () => {
    renderFeaturedTreatments();
    expect(screen.getByText('Migraine')).toBeInTheDocument();
    expect(screen.getByText('Thyroid Disorders')).toBeInTheDocument();
    expect(screen.getByText('Diabetes Support')).toBeInTheDocument();
    expect(screen.getByText('PCOS')).toBeInTheDocument();
    expect(screen.getByText('Skin Allergies')).toBeInTheDocument();
    expect(screen.getByText('Hair Fall')).toBeInTheDocument();
    expect(screen.getByText('Arthritis')).toBeInTheDocument();
    expect(screen.getByText('Gastric Issues')).toBeInTheDocument();
  });

  it('does not render treatments beyond the first 8', () => {
    renderFeaturedTreatments();
    expect(screen.queryByText('Respiratory Problems')).not.toBeInTheDocument();
    expect(screen.queryByText('Stress & Anxiety')).not.toBeInTheDocument();
    expect(screen.queryByText('Child Immunity')).not.toBeInTheDocument();
    expect(screen.queryByText('Lifestyle Disorders')).not.toBeInTheDocument();
  });

  it('renders treatment icons with aria-hidden', () => {
    const { container } = renderFeaturedTreatments();
    const hiddenIcons = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenIcons.length).toBe(8);
  });

  it('renders each treatment card as a link to /treatments', () => {
    renderFeaturedTreatments();
    const links = screen.getAllByRole('link', { name: /learn more about .+ treatment/i });
    expect(links).toHaveLength(8);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/treatments');
    });
  });

  it('renders treatment overview text for each card', () => {
    renderFeaturedTreatments();
    expect(
      screen.getByText(/migraine is a neurological condition/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/thyroid disorders include hypothyroidism/i)
    ).toBeInTheDocument();
  });

  it('renders a "View All Treatments" link', () => {
    renderFeaturedTreatments();
    const viewAllLink = screen.getByRole('link', { name: /view all treatments/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/treatments');
  });

  it('renders a subtitle paragraph', () => {
    renderFeaturedTreatments();
    expect(
      screen.getByText(/explore our specialized homoeopathic treatments/i)
    ).toBeInTheDocument();
  });

  it('uses responsive grid classes (4 cols desktop, 2 tablet, 1 mobile)', () => {
    const { container } = renderFeaturedTreatments();
    const grid = container.querySelector('[role="list"]');
    expect(grid.className).toContain('grid-cols-1');
    expect(grid.className).toContain('sm:grid-cols-2');
    expect(grid.className).toContain('lg:grid-cols-4');
  });
});
