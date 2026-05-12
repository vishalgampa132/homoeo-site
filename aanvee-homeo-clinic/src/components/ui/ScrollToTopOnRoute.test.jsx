import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollToTopOnRoute from './ScrollToTopOnRoute';

describe('ScrollToTopOnRoute', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('scrolls to top on initial render', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <ScrollToTopOnRoute />
      </MemoryRouter>
    );
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' });
  });

  it('does not scroll to top when hash is present', () => {
    render(
      <MemoryRouter initialEntries={['/about#section']}>
        <ScrollToTopOnRoute />
      </MemoryRouter>
    );
    expect(window.scrollTo).not.toHaveBeenCalled();
  });

  it('renders nothing (returns null)', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTopOnRoute />
      </MemoryRouter>
    );
    expect(container.innerHTML).toBe('');
  });
});
