import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlassCard from './GlassCard';

describe('GlassCard', () => {
  it('renders children content', () => {
    render(<GlassCard><p>Hello World</p></GlassCard>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('applies glassmorphism base classes', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const card = container.firstChild;
    expect(card.className).toContain('backdrop-blur-[12px]');
    expect(card.className).toContain('bg-white/15');
    expect(card.className).toContain('border');
    expect(card.className).toContain('border-white/20');
    expect(card.className).toContain('rounded-xl');
    expect(card.className).toContain('shadow-glass');
  });

  it('applies additional className prop', () => {
    const { container } = render(<GlassCard className="p-6 mt-4">Content</GlassCard>);
    const card = container.firstChild;
    expect(card.className).toContain('p-6');
    expect(card.className).toContain('mt-4');
  });

  it('renders as motion.div when hover is true (default)', () => {
    const { container } = render(<GlassCard>Content</GlassCard>);
    const card = container.firstChild;
    // Framer Motion renders a div with style attribute for animations
    expect(card.tagName).toBe('DIV');
    expect(card.style).toBeDefined();
  });

  it('renders as plain div when hover is false', () => {
    const { container } = render(<GlassCard hover={false}>Content</GlassCard>);
    const card = container.firstChild;
    expect(card.tagName).toBe('DIV');
    // Plain div should not have framer-motion style transforms
    expect(card.style.transform).toBeFalsy();
  });

  it('renders multiple children correctly', () => {
    render(
      <GlassCard>
        <h2>Title</h2>
        <p>Description</p>
      </GlassCard>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});
