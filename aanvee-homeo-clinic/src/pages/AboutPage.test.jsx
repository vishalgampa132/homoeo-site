import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

function renderAboutPage() {
  return render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>
  );
}

describe('AboutPage', () => {
  afterEach(() => {
    document.title = '';
    document.querySelectorAll('meta[property^="og:"], meta[name="description"]').forEach((el) => el.remove());
  });

  it('renders page heading', () => {
    renderAboutPage();
    expect(screen.getByRole('heading', { level: 1, name: 'About Us' })).toBeInTheDocument();
  });

  it('renders Breadcrumb navigation', () => {
    renderAboutPage();
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('renders ClinicStory section', () => {
    renderAboutPage();
    expect(screen.getByText(/our story/i)).toBeInTheDocument();
  });

  it('renders MissionVision section', () => {
    renderAboutPage();
    expect(screen.getByText(/mission & vision/i)).toBeInTheDocument();
  });

  it('renders DoctorProfiles section', () => {
    renderAboutPage();
    expect(screen.getByText(/our consultants/i)).toBeInTheDocument();
  });

  it('renders ClinicTimeline section', () => {
    renderAboutPage();
    expect(screen.getByRole('heading', { name: /our journey/i })).toBeInTheDocument();
  });

  it('sets document title for SEO', () => {
    renderAboutPage();
    expect(document.title).toBe('About Us | Aanvee Homoeo Store');
  });

  it('sets meta description tag', () => {
    renderAboutPage();
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute('content')).toContain('Aanvee Homoeo');
  });

  it('sets Open Graph title tag', () => {
    renderAboutPage();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toContain('About Us');
  });

  it('sets Open Graph description tag', () => {
    renderAboutPage();
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute('content')).toContain('Aanvee Homoeo');
  });

  it('cleans up meta tags on unmount', () => {
    const { unmount } = renderAboutPage();
    unmount();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeNull();
  });

  it('renders all about sections', () => {
    const { container } = renderAboutPage();
    const sections = container.querySelectorAll('section');
    // ClinicStory, MissionVision, DoctorProfiles, ClinicTimeline = 4 sections
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
