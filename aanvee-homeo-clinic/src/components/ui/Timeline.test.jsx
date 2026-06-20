import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Timeline from './Timeline';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, role, 'aria-label': ariaLabel, ...props }) => (
      <div className={className} role={role} aria-label={ariaLabel}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
  useReducedMotion: () => false,
}));

const mockSteps = [
  {
    title: 'Appointment Booking',
    description: 'Schedule your consultation online or by phone.',
    icon: '📅',
  },
  {
    title: 'Health Assessment',
    description: 'Detailed evaluation of your health history and symptoms.',
    icon: '🩺',
  },
  {
    title: 'Personalized Medicine',
    description: 'Custom homoeopathic treatment plan tailored to you.',
    icon: '💊',
  },
  {
    title: 'Follow-up Care',
    description: 'Regular check-ins to monitor progress and adjust treatment.',
    icon: '🔄',
  },
];

describe('Timeline', () => {
  it('renders all step titles', () => {
    render(<Timeline steps={mockSteps} />);

    mockSteps.forEach((step) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  it('renders all step descriptions', () => {
    render(<Timeline steps={mockSteps} />);

    mockSteps.forEach((step) => {
      expect(screen.getByText(step.description)).toBeInTheDocument();
    });
  });

  it('renders step icons when provided', () => {
    render(<Timeline steps={mockSteps} />);

    mockSteps.forEach((step) => {
      expect(screen.getByText(step.icon)).toBeInTheDocument();
    });
  });

  it('renders step numbers when no icon is provided', () => {
    const stepsWithoutIcons = [
      { title: 'Step One', description: 'First step description' },
      { title: 'Step Two', description: 'Second step description' },
    ];

    render(<Timeline steps={stepsWithoutIcons} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders with role="list" for accessibility', () => {
    render(<Timeline steps={mockSteps} />);

    expect(screen.getByRole('list', { name: 'Timeline steps' })).toBeInTheDocument();
  });

  it('renders each step as a listitem', () => {
    render(<Timeline steps={mockSteps} />);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockSteps.length);
  });

  it('renders empty when no steps provided', () => {
    const { container } = render(<Timeline />);

    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(container.querySelector('[role="list"]')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<Timeline steps={mockSteps} className="my-custom-class" />);

    const list = screen.getByRole('list');
    expect(list.className).toContain('my-custom-class');
  });
});
