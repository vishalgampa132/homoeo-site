import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPage from './ContactPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/contact']}>
      <ContactPage />
    </MemoryRouter>
  );
}

describe('ContactPage', () => {
  afterEach(() => {
    document.querySelectorAll('meta[name="description"], meta[property^="og:"]').forEach((tag) => {
      tag.remove();
    });
  });

  it('renders the page heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Contact Us' })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    renderPage();
    expect(
      screen.getByText(/have questions or want to visit/i)
    ).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', () => {
    renderPage();
    const breadcrumb = screen.getByRole('navigation', { name: /breadcrumb/i });
    expect(breadcrumb).toBeInTheDocument();
    const homeLink = breadcrumb.querySelector('a[href="/"]');
    expect(homeLink).toBeInTheDocument();
    expect(breadcrumb).toHaveTextContent('Contact Us');
  });

  it('renders ContactForm section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /send us a message/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it('renders BusinessInfo section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /contact information/i })).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Working Hours')).toBeInTheDocument();
  });

  it('renders MapEmbed section', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /find us/i })).toBeInTheDocument();
  });

  it('sets SEO document title', () => {
    renderPage();
    expect(document.title).toBe('Contact Us | Aanvee Homoeo Store');
  });

  it('sets SEO meta description', () => {
    renderPage();
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute('content')).toContain('Get in touch with Aanvee Homoeo');
  });

  it('sets Open Graph meta tags', () => {
    renderPage();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toBe('Contact Us | Aanvee Homoeo Store');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute('content')).toContain('Get in touch with Aanvee Homoeo');
  });

  it('cleans up meta tags on unmount', () => {
    const { unmount } = renderPage();
    unmount();
    // After unmount, the og:type tag added by this page should be removed
    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType).toBeNull();
  });
});
