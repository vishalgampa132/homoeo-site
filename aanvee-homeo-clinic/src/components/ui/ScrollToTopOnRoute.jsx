import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTopOnRoute - Scrolls to top on route change and handles smooth anchor scrolling.
 *
 * - On route change (pathname change): scrolls to top of page
 * - On hash change: smoothly scrolls to the target anchor element
 * - Adds a global click handler for in-page anchor links to enable smooth scrolling with easing
 *
 * Requirements: 15.2
 */
export default function ScrollToTopOnRoute() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  // Handle hash-based anchor scrolling
  useEffect(() => {
    if (hash) {
      // Small delay to ensure DOM is ready after route change
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [hash]);

  // Add smooth scroll behavior for in-page anchor clicks
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || href === '#') return;

      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Update URL hash without triggering scroll
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return null;
}
