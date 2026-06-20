import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ConsultationPage from './ConsultationPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/consultation']}>
      <ConsultationPage />
    </MemoryRouter>
  );
}

describe('ConsultationPage', () => {
  afterEach(() => {
    // Clean up meta tags added by the page
    document.querySelectorAll('meta[name="description"], meta[property^="og:"]').forEach((tag) => {
      tag.remove();
    });
  });

  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Consultation' })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    renderPage();
    expect(
      screen.getByText(/book your personalized homoeopathic consultation/i)
    ).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    renderPage();
    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(breadcrumb).toBeInTheDocument();
    const homeLink = breadcrumb.querySelector('a[href="/"]');
    expect(homeLink).toBeInTheDocument();
    expect(breadcrumb).toHaveTextContent('Consultation');
  });

  it('renders ConsultationBenefits section', () => {
    renderPage();
    expect(screen.getByText('Consultation Options')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /online consultation/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /in-clinic consultation/i })).toBeInTheDocument();
  });

  it('renders AppointmentForm section', () => {
    renderPage();
    expect(screen.getByText('Book Your Consultation')).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mobile number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders DoctorAvailability section', () => {
    renderPage();
    expect(screen.getByText('Doctor Availability & Schedule')).toBeInTheDocument();
    expect(screen.getByText('Weekly Schedule')).toBeInTheDocument();
    expect(screen.getByText('Consultation Types')).toBeInTheDocument();
  });

  it('renders FAQ section', () => {
    renderPage();
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('How long is a typical consultation?')).toBeInTheDocument();
  });

  it('sets SEO document title', () => {
    renderPage();
    expect(document.title).toBe('Book Consultation | Aanvee Homoeo Store');
  });

  it('sets SEO meta description', () => {
    renderPage();
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute('content')).toContain('Book your homoeopathic consultation');
  });

  it('sets Open Graph meta tags', () => {
    renderPage();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toBe('Book Consultation | Aanvee Homoeo Store');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute('content')).toContain('Book your homoeopathic consultation');
  });
});
