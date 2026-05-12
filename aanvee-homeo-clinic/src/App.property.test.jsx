import React from 'react';
import { render, screen, within, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Ensure window.scrollTo is mocked for this test file
beforeAll(() => {
  window.scrollTo = () => {};
});

/**
 * Property 3: Global UI elements present on all pages
 *
 * For any page route in the application, the rendered page should contain
 * a footer with clinic details, contact information, social media icons,
 * navigation links, working hours, and copyright notice, as well as a
 * floating WhatsApp button.
 *
 * **Validates: Requirements 9.1, 11.1**
 */
describe('Feature: aanvee-homoeo-website, Property 3: Global UI elements present on all pages', () => {
  afterEach(() => {
    cleanup();
  });

  const routeArb = fc.constantFrom('/', '/about', '/treatments', '/consultation', '/contact');

  function renderRoute(route) {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  }

  it('should render footer with role="contentinfo" and aria-label on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // Footer should be present with correct role and aria-label
        const footer = await screen.findByRole('contentinfo', { name: 'Site footer' }, { timeout: 5000 });
        expect(footer).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  }, 30000);

  it('should render floating WhatsApp button on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // WhatsApp button should be present with correct aria-label
        const whatsappButton = await screen.findByLabelText('Chat on WhatsApp', {}, { timeout: 5000 });
        expect(whatsappButton).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  }, 30000);

  it('should render footer with clinic name, navigation, working hours, copyright, and social links on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // Get the footer element and scope all queries within it
        const footer = await screen.findByRole('contentinfo', { name: 'Site footer' }, { timeout: 5000 });
        const footerView = within(footer);

        // Clinic name should be present in footer (appears in heading and copyright)
        const clinicNameElements = footerView.getAllByText(/Aanvee Homoeo Store/i);
        expect(clinicNameElements.length).toBeGreaterThanOrEqual(1);

        // Footer navigation links should be present
        expect(footerView.getByLabelText('Footer navigation')).toBeInTheDocument();

        // Working hours should be present
        expect(footerView.getByText(/Mon - Sat/i)).toBeInTheDocument();

        // Copyright notice should be present
        expect(footerView.getByText(/All rights reserved/i)).toBeInTheDocument();

        // Social media links should be present
        expect(footerView.getByLabelText('Social media links')).toBeInTheDocument();
      }),
      { numRuns: 100 }
    );
  }, 30000);
});
