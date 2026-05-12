import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Carousel from './Carousel';

const mockItems = [
  { id: 'immunity', title: 'Immunity Boosters', description: 'Strengthen your immune system', icon: '🛡️' },
  { id: 'hair', title: 'Hair Care', description: 'Natural hair growth solutions', icon: '💇' },
  { id: 'skin', title: 'Skin Care', description: 'Radiant skin naturally', icon: '✨' },
  { id: 'digestive', title: 'Digestive Care', description: 'Healthy digestion support', icon: '🌿' },
  { id: 'wellness', title: 'Wellness Drops', description: 'Daily wellness essentials', icon: '💧' },
];

describe('Carousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when items array is empty', () => {
    const { container } = render(<Carousel items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the first item by default', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    expect(screen.getByText('Immunity Boosters')).toBeInTheDocument();
    expect(screen.getByText('Strengthen your immune system')).toBeInTheDocument();
  });

  it('renders item icon', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    expect(screen.getByText('🛡️')).toBeInTheDocument();
  });

  it('renders dot indicators for multiple items', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    const dots = screen.getAllByRole('tab');
    expect(dots).toHaveLength(5);
  });

  it('does not render dot indicators for single item', () => {
    render(<Carousel items={[mockItems[0]]} autoPlay={false} />);
    expect(screen.queryAllByRole('tab')).toHaveLength(0);
  });

  it('navigates to next slide on next button click', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const nextButton = screen.getByLabelText('Next slide');
    fireEvent.click(nextButton);
    expect(await screen.findByText('Hair Care')).toBeInTheDocument();
  });

  it('navigates to previous slide on prev button click', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const prevButton = screen.getByLabelText('Previous slide');
    fireEvent.click(prevButton);
    // Wraps around to last item
    expect(await screen.findByText('Wellness Drops')).toBeInTheDocument();
  });

  it('navigates to specific slide on dot click', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[2]);
    expect(await screen.findByText('Skin Care')).toBeInTheDocument();
  });

  it('marks current dot as selected', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    const dots = screen.getAllByRole('tab');
    expect(dots[0]).toHaveAttribute('aria-selected', 'true');
    expect(dots[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('auto-plays and advances slides', async () => {
    render(<Carousel items={mockItems} autoPlay={true} interval={3000} />);
    expect(screen.getByText('Immunity Boosters')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // After auto-play triggers, the dot indicator should update
    const dots = screen.getAllByRole('tab');
    expect(dots[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('has correct aria attributes for accessibility', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    const carousel = screen.getByRole('region');
    expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    expect(carousel).toHaveAttribute('aria-label', 'Product showcase');
  });

  it('renders slide with correct aria-label', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    const slide = screen.getByRole('group');
    expect(slide).toHaveAttribute('aria-roledescription', 'slide');
    expect(slide).toHaveAttribute('aria-label', 'Slide 1 of 5');
  });

  it('handles touch swipe to next', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const carousel = screen.getByRole('region');

    fireEvent.touchStart(carousel, { touches: [{ clientX: 300 }] });
    fireEvent.touchMove(carousel, { touches: [{ clientX: 100 }] });
    fireEvent.touchEnd(carousel);

    expect(await screen.findByText('Hair Care')).toBeInTheDocument();
  });

  it('handles touch swipe to previous', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const carousel = screen.getByRole('region');

    fireEvent.touchStart(carousel, { touches: [{ clientX: 100 }] });
    fireEvent.touchMove(carousel, { touches: [{ clientX: 300 }] });
    fireEvent.touchEnd(carousel);

    // Wraps to last item
    expect(await screen.findByText('Wellness Drops')).toBeInTheDocument();
  });

  it('ignores small swipe gestures', () => {
    render(<Carousel items={mockItems} autoPlay={false} />);
    const carousel = screen.getByRole('region');

    fireEvent.touchStart(carousel, { touches: [{ clientX: 200 }] });
    fireEvent.touchMove(carousel, { touches: [{ clientX: 180 }] });
    fireEvent.touchEnd(carousel);

    // Should stay on first item (swipe distance < 50px)
    expect(screen.getByText('Immunity Boosters')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<Carousel items={mockItems} autoPlay={false} className="mt-8" />);
    const carousel = screen.getByRole('region');
    expect(carousel.className).toContain('mt-8');
  });

  it('wraps around from last to first on next', async () => {
    vi.useRealTimers();
    render(<Carousel items={mockItems} autoPlay={false} />);
    const nextButton = screen.getByLabelText('Next slide');

    // Click next 5 times to wrap around
    for (let i = 0; i < 5; i++) {
      fireEvent.click(nextButton);
      // Wait for animation to complete between clicks
      await screen.findByRole('group');
    }

    expect(await screen.findByText('Immunity Boosters')).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const itemsWithoutDesc = [
      { id: 'test', title: 'Test Item', icon: '🧪' },
    ];
    render(<Carousel items={itemsWithoutDesc} autoPlay={false} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('🧪')).toBeInTheDocument();
  });

  it('renders without icon when not provided', () => {
    const itemsWithoutIcon = [
      { id: 'test', title: 'No Icon Item', description: 'A description' },
    ];
    render(<Carousel items={itemsWithoutIcon} autoPlay={false} />);
    expect(screen.getByText('No Icon Item')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });
});
