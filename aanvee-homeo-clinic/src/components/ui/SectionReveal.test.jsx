import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import SectionReveal from './SectionReveal';

// Mock IntersectionObserver for jsdom
beforeAll(() => {
  global.IntersectionObserver = class IntersectionObserver {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {
      // Immediately trigger with isIntersecting: true to simulate viewport entry
      this.callback([{ isIntersecting: true }]);
    }
    unobserve() {}
    disconnect() {}
  };
});

// Mock framer-motion's useReducedMotion hook
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    useReducedMotion: () => false,
  };
});

describe('SectionReveal', () => {
  it('renders children content', () => {
    render(
      <SectionReveal>
        <p>Animated content</p>
      </SectionReveal>
    );
    expect(screen.getByText('Animated content')).toBeInTheDocument();
  });

  it('applies additional className prop', () => {
    const { container } = render(
      <SectionReveal className="mt-8 px-4">
        <p>Content</p>
      </SectionReveal>
    );
    const wrapper = container.firstChild;
    expect(wrapper.className).toContain('mt-8');
    expect(wrapper.className).toContain('px-4');
  });

  it('renders as a div element', () => {
    const { container } = render(
      <SectionReveal>
        <p>Content</p>
      </SectionReveal>
    );
    expect(container.firstChild.tagName).toBe('DIV');
  });

  it('renders with default direction (up) without crashing', () => {
    const { container } = render(
      <SectionReveal>
        <span>Default direction</span>
      </SectionReveal>
    );
    expect(container.firstChild).toBeDefined();
    expect(screen.getByText('Default direction')).toBeInTheDocument();
  });

  it('renders with direction="left" without crashing', () => {
    render(
      <SectionReveal direction="left">
        <span>Left reveal</span>
      </SectionReveal>
    );
    expect(screen.getByText('Left reveal')).toBeInTheDocument();
  });

  it('renders with direction="right" without crashing', () => {
    render(
      <SectionReveal direction="right">
        <span>Right reveal</span>
      </SectionReveal>
    );
    expect(screen.getByText('Right reveal')).toBeInTheDocument();
  });

  it('renders with direction="fade" without crashing', () => {
    render(
      <SectionReveal direction="fade">
        <span>Fade reveal</span>
      </SectionReveal>
    );
    expect(screen.getByText('Fade reveal')).toBeInTheDocument();
  });

  it('accepts a delay prop without crashing', () => {
    render(
      <SectionReveal delay={0.3}>
        <span>Delayed content</span>
      </SectionReveal>
    );
    expect(screen.getByText('Delayed content')).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    render(
      <SectionReveal>
        <h2>Title</h2>
        <p>Description</p>
      </SectionReveal>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

describe('SectionReveal with reduced motion', () => {
  it('renders content when reduced motion is preferred', async () => {
    // Re-mock with reduced motion enabled
    vi.doMock('framer-motion', async () => {
      const actual = await vi.importActual('framer-motion');
      return {
        ...actual,
        useReducedMotion: () => true,
      };
    });

    // Re-import to get the new mock
    const { default: SectionRevealReduced } = await import('./SectionReveal');

    render(
      <SectionRevealReduced>
        <p>Reduced motion content</p>
      </SectionRevealReduced>
    );
    expect(screen.getByText('Reduced motion content')).toBeInTheDocument();
  });
});
