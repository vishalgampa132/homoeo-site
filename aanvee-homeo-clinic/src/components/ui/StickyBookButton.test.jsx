import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import StickyBookButton from './StickyBookButton';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }) => (
      <div className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }) => children,
  useReducedMotion: () => false,
}));

describe('StickyBookButton', () => {
  let matchMediaListeners = [];
  let mockMatches = true;

  beforeEach(() => {
    matchMediaListeners = [];
    mockMatches = true;

    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: mockMatches,
      media: query,
      addEventListener: (event, handler) => {
        matchMediaListeners.push(handler);
      },
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    matchMediaListeners = [];
  });

  it('renders on mobile viewport', () => {
    mockMatches = true;
    render(
      <MemoryRouter>
        <StickyBookButton />
      </MemoryRouter>
    );
    expect(screen.getByText('Book Appointment')).toBeInTheDocument();
  });

  it('does not render on desktop viewport', () => {
    mockMatches = false;
    render(
      <MemoryRouter>
        <StickyBookButton />
      </MemoryRouter>
    );
    expect(screen.queryByText('Book Appointment')).not.toBeInTheDocument();
  });

  it('links to /consultation', () => {
    mockMatches = true;
    render(
      <MemoryRouter>
        <StickyBookButton />
      </MemoryRouter>
    );
    const link = screen.getByText('Book Appointment');
    expect(link).toHaveAttribute('href', '/consultation');
  });

  it('has fixed positioning', () => {
    mockMatches = true;
    render(
      <MemoryRouter>
        <StickyBookButton />
      </MemoryRouter>
    );
    const container = screen.getByText('Book Appointment').parentElement;
    expect(container.className).toContain('fixed');
    expect(container.className).toContain('bottom-0');
  });

  it('has accessible label', () => {
    mockMatches = true;
    render(
      <MemoryRouter>
        <StickyBookButton />
      </MemoryRouter>
    );
    const link = screen.getByLabelText('Book Appointment');
    expect(link).toBeInTheDocument();
  });
});
