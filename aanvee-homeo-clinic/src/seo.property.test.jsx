import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

/**
 * Property 4: SEO meta tags present on all pages
 *
 * For any page route in the application, the document head should contain
 * a title tag, meta description, and Open Graph tags (og:title, og:description)
 * with non-empty values specific to that page.
 *
 * **Validates: Requirements 13.3**
 */
describe('Feature: aanvee-homoeo-website, Property 4: SEO meta tags present on all pages', () => {
  beforeEach(() => {
    // Clean up any meta tags from previous iterations
    document.title = '';
    document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());
  });

  afterEach(() => {
    cleanup();
    // Clean up meta tags after each test
    document.title = '';
    document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
    document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());
  });

  const routeArb = fc.constantFrom('/', '/about', '/treatments', '/consultation', '/contact');

  function renderRoute(route) {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );
  }

  it('should set a non-empty document.title on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        // Clean meta tags between iterations
        document.title = '';
        document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());

        renderRoute(route);

        // Wait for lazy-loaded page to render and useEffect to fire
        await waitFor(() => {
          expect(document.title).not.toBe('');
        });

        expect(document.title.trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should have a non-empty meta description on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        document.title = '';
        document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());

        renderRoute(route);

        // Wait for the meta description tag to be set
        await waitFor(() => {
          const metaDesc = document.querySelector('meta[name="description"]');
          expect(metaDesc).not.toBeNull();
        });

        const metaDesc = document.querySelector('meta[name="description"]');
        expect(metaDesc).toBeInTheDocument();
        expect(metaDesc.getAttribute('content').trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should have a non-empty og:title on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        document.title = '';
        document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());

        renderRoute(route);

        // Wait for the og:title meta tag to be set
        await waitFor(() => {
          const ogTitle = document.querySelector('meta[property="og:title"]');
          expect(ogTitle).not.toBeNull();
        });

        const ogTitle = document.querySelector('meta[property="og:title"]');
        expect(ogTitle).toBeInTheDocument();
        expect(ogTitle.getAttribute('content').trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should have a non-empty og:description on all pages', async () => {
    await fc.assert(
      fc.asyncProperty(routeArb, async (route) => {
        cleanup();
        document.title = '';
        document.querySelectorAll('meta[name="description"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:title"]').forEach((el) => el.remove());
        document.querySelectorAll('meta[property="og:description"]').forEach((el) => el.remove());

        renderRoute(route);

        // Wait for the og:description meta tag to be set
        await waitFor(() => {
          const ogDesc = document.querySelector('meta[property="og:description"]');
          expect(ogDesc).not.toBeNull();
        });

        const ogDesc = document.querySelector('meta[property="og:description"]');
        expect(ogDesc).toBeInTheDocument();
        expect(ogDesc.getAttribute('content').trim().length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
