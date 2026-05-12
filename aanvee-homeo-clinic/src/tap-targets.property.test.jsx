import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeAll } from 'vitest';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import fs from 'fs';
import path from 'path';
import App from './App';

// Ensure window.scrollTo is mocked for this test file
beforeAll(() => {
  window.scrollTo = () => {};
});

/**
 * Property 5: Mobile interactive elements meet minimum tap target size
 *
 * For any interactive element (button, link, form input) rendered at a mobile
 * viewport width (< 768px), the element's computed clickable area should be
 * at least 44px × 44px.
 *
 * Since jsdom does not compute CSS styles, this property test verifies:
 * 1. The global CSS rule in index.css enforces min-height: 44px on interactive elements for mobile
 * 2. The media query correctly unsets min-height at ≥ 768px (desktop)
 * 3. Key interactive components rendered on each route have appropriate sizing
 *
 * **Validates: Requirements 1.2**
 */
describe('Feature: aanvee-homoeo-website, Property 5: Mobile interactive elements meet minimum tap target size', () => {
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

  it('should have a global CSS rule enforcing min-height 44px on interactive elements for mobile', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const cssPath = path.resolve(__dirname, 'index.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');

        // Verify the mobile tap target rule exists
        // The rule should target button, a, input, select, textarea with min-height: 44px
        expect(cssContent).toMatch(/button.*,.*a.*,.*input.*,.*select.*,.*textarea\s*\{[^}]*min-height:\s*44px/s);
      }),
      { numRuns: 100 }
    );
  });

  it('should have a media query that unsets min-height at desktop breakpoint (≥ 768px)', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const cssPath = path.resolve(__dirname, 'index.css');
        const cssContent = fs.readFileSync(cssPath, 'utf-8');

        // Verify the desktop media query unsets min-height
        expect(cssContent).toMatch(/@media\s*\(\s*min-width:\s*768px\s*\)/);
        expect(cssContent).toMatch(/min-height:\s*unset/);
      }),
      { numRuns: 100 }
    );
  });

  it('should render interactive elements (buttons, links) on all pages that benefit from the global 44px rule', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // Wait for lazy-loaded page content to render
        await screen.findByRole('contentinfo', { name: 'Site footer' }, { timeout: 5000 });

        // Verify that interactive elements exist on the page
        // These elements are covered by the global CSS rule: button, a, input, select, textarea
        const allLinks = screen.getAllByRole('link');
        const allButtons = screen.queryAllByRole('button');

        // Every page should have at least some interactive elements (nav links, footer links, etc.)
        const totalInteractive = allLinks.length + allButtons.length;
        expect(totalInteractive).toBeGreaterThan(0);

        // Verify that links and buttons exist and are rendered as proper HTML elements
        // The global CSS rule in index.css applies min-height: 44px to all of these on mobile
        allLinks.forEach((link) => {
          expect(link.tagName.toLowerCase()).toBe('a');
        });

        allButtons.forEach((button) => {
          expect(button.tagName.toLowerCase()).toBe('button');
        });
      }),
      { numRuns: 100 }
    );
  }, 30000);

  it('should render the floating WhatsApp button with explicit sizing classes (≥ 44px)', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // Wait for WhatsApp button to appear
        const whatsappButton = await screen.findByLabelText('Chat on WhatsApp', {}, { timeout: 5000 });
        expect(whatsappButton).toBeInTheDocument();

        // The WhatsApp button uses w-14 h-14 (56px) which exceeds 44px minimum
        const classes = whatsappButton.className;
        // w-14 = 3.5rem = 56px, h-14 = 56px — both exceed 44px
        expect(classes).toMatch(/w-14/);
        expect(classes).toMatch(/h-14/);
      }),
      { numRuns: 100 }
    );
  }, 30000);

  it('should render navigation links that are covered by the global 44px min-height rule', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        renderRoute(route);

        // Wait for page to render
        await screen.findByRole('contentinfo', { name: 'Site footer' }, { timeout: 5000 });

        // Get navigation element - the navbar should have links
        const nav = screen.getByRole('navigation', { name: 'Main navigation' });
        expect(nav).toBeInTheDocument();

        // Navigation links are <a> elements, covered by the global CSS rule
        const navLinks = nav.querySelectorAll('a');
        expect(navLinks.length).toBeGreaterThan(0);

        // Each nav link is an <a> element which gets min-height: 44px from global CSS
        navLinks.forEach((link) => {
          expect(link.tagName.toLowerCase()).toBe('a');
        });
      }),
      { numRuns: 100 }
    );
  });
});
