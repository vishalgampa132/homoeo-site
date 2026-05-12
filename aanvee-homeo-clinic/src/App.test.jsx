import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderWithRouter(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
}

describe('App Routing', () => {
  it('renders HomePage at /', async () => {
    renderWithRouter('/');
    expect(await screen.findByRole('heading', { level: 1, name: /natural healing for better living/i })).toBeInTheDocument();
  });

  it('renders AboutPage at /about', async () => {
    renderWithRouter('/about');
    expect(await screen.findByRole('heading', { level: 1, name: 'About Us' })).toBeInTheDocument();
  });

  it('renders TreatmentsPage at /treatments', async () => {
    renderWithRouter('/treatments');
    expect(await screen.findByRole('heading', { level: 1, name: 'Treatments' })).toBeInTheDocument();
  });

  it('renders ConsultationPage at /consultation', async () => {
    renderWithRouter('/consultation');
    expect(await screen.findByRole('heading', { level: 1, name: 'Consultation' })).toBeInTheDocument();
  });

  it('renders ContactPage at /contact', async () => {
    renderWithRouter('/contact');
    expect(await screen.findByRole('heading', { level: 1, name: 'Contact Us' })).toBeInTheDocument();
  });

  it('renders NotFoundPage for unknown routes', async () => {
    renderWithRouter('/unknown-route');
    expect(await screen.findByRole('heading', { level: 1, name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('NotFoundPage has a link back to Home', async () => {
    renderWithRouter('/unknown-route');
    const homeLink = await screen.findByRole('link', { name: /back to home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders Navbar on all routes', async () => {
    renderWithRouter('/');
    expect(await screen.findByRole('banner')).toBeInTheDocument();
  });

  it('renders Footer on all routes', async () => {
    renderWithRouter('/about');
    expect(await screen.findByRole('contentinfo')).toBeInTheDocument();
  });
});
