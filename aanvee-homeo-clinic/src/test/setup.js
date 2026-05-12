import '@testing-library/jest-dom'

// Mock IntersectionObserver for Framer Motion's whileInView and useInView
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
  }
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = IntersectionObserverMock;
}

// Mock window.matchMedia for components that use media queries (e.g., StickyBookButton)
if (typeof window.matchMedia === 'undefined') {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
}

// Mock window.scrollTo for components that use scroll behavior (e.g., ScrollToTopOnRoute)
window.scrollTo = () => {};
