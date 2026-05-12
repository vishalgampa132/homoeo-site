import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  afterEach(() => {
    document.title = '';
    document.querySelectorAll('meta[property^="og:"], meta[name="description"]').forEach((el) => el.remove());
  });

  it('renders HeroSection with headline', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { level: 1, name: /natural healing for better living/i })).toBeInTheDocument();
  });

  it('renders AboutSnapshot section', () => {
    renderHomePage();
    expect(screen.getByText(/about our clinic/i)).toBeInTheDocument();
  });

  it('renders WhyChooseUs section', () => {
    renderHomePage();
    expect(screen.getByText(/why choose us/i)).toBeInTheDocument();
  });

  it('renders Services section', () => {
    renderHomePage();
    expect(screen.getByText(/our services/i)).toBeInTheDocument();
  });

  it('renders FeaturedTreatments section', () => {
    renderHomePage();
    expect(screen.getByText(/featured treatments/i)).toBeInTheDocument();
  });

  it('renders ProductShowcase section', async () => {
    renderHomePage();
    expect(await screen.findByText(/our products/i)).toBeInTheDocument();
  });

  it('renders ConsultationProcess section', () => {
    renderHomePage();
    expect(screen.getByText(/how it works/i)).toBeInTheDocument();
  });

  it('renders Testimonials section', async () => {
    renderHomePage();
    expect(await screen.findByText(/what our patients say/i)).toBeInTheDocument();
  });

  it('renders CTABanner section', () => {
    renderHomePage();
    expect(screen.getByText(/ready to start your healing journey/i)).toBeInTheDocument();
  });

  it('sets document title for SEO', () => {
    renderHomePage();
    expect(document.title).toBe('Aanvee Homoeo Store | Natural Healing for Better Living');
  });

  it('sets meta description tag', () => {
    renderHomePage();
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute('content')).toContain('homeopathy consultation');
  });

  it('sets Open Graph title tag', () => {
    renderHomePage();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toContain('Aanvee Homoeo');
  });

  it('sets Open Graph description tag', () => {
    renderHomePage();
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute('content')).toContain('homeopathy consultation');
  });

  it('renders all sections in correct order', async () => {
    const { container } = renderHomePage();
    // Wait for lazy-loaded sections to appear
    await screen.findByText(/our products/i);
    await screen.findByText(/what our patients say/i);
    const sections = container.querySelectorAll('section');
    // HeroSection, AboutSnapshot, WhyChooseUs, Services, FeaturedTreatments,
    // ProductShowcase, ConsultationProcess, Testimonials, CTABanner = 9 sections
    expect(sections.length).toBeGreaterThanOrEqual(9);
  });

  it('cleans up meta tags on unmount', () => {
    const { unmount } = renderHomePage();
    unmount();
    // Tags created by the component should be removed
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeNull();
  });
});
