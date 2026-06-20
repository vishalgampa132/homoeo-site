import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FAQAccordion from './FAQAccordion';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, role, id, 'aria-labelledby': ariaLabelledBy, ...props }) => (
      <div className={className} role={role} id={id} aria-labelledby={ariaLabelledBy}>
        {children}
      </div>
    ),
    span: ({ children, className, 'aria-hidden': ariaHidden, ...props }) => (
      <span className={className} aria-hidden={ariaHidden}>
        {children}
      </span>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useReducedMotion: () => false,
}));

const mockItems = [
  {
    question: 'What is homoeopathy?',
    answer: 'homoeopathy is a natural system of medicine that uses highly diluted substances to stimulate the body\'s own healing mechanisms.',
  },
  {
    question: 'How long does treatment take?',
    answer: 'Treatment duration varies depending on the condition. Acute conditions may resolve in days, while chronic conditions may take weeks to months.',
  },
  {
    question: 'Are there any side effects?',
    answer: 'homoeopathic medicines are generally safe with no known side effects when prescribed by a qualified practitioner.',
  },
];

describe('FAQAccordion', () => {
  it('renders all questions', () => {
    render(<FAQAccordion items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item.question)).toBeInTheDocument();
    });
  });

  it('does not show answers initially', () => {
    render(<FAQAccordion items={mockItems} />);

    mockItems.forEach((item) => {
      expect(screen.queryByText(item.answer)).not.toBeInTheDocument();
    });
  });

  it('expands an item when its question is clicked', () => {
    render(<FAQAccordion items={mockItems} />);

    fireEvent.click(screen.getByText(mockItems[0].question));

    expect(screen.getByText(mockItems[0].answer)).toBeInTheDocument();
  });

  it('collapses an item when clicked again', () => {
    render(<FAQAccordion items={mockItems} />);

    const button = screen.getByText(mockItems[0].question);
    fireEvent.click(button);
    expect(screen.getByText(mockItems[0].answer)).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.queryByText(mockItems[0].answer)).not.toBeInTheDocument();
  });

  it('closes other items when a new one is opened (single mode)', () => {
    render(<FAQAccordion items={mockItems} />);

    fireEvent.click(screen.getByText(mockItems[0].question));
    expect(screen.getByText(mockItems[0].answer)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockItems[1].question));
    expect(screen.queryByText(mockItems[0].answer)).not.toBeInTheDocument();
    expect(screen.getByText(mockItems[1].answer)).toBeInTheDocument();
  });

  it('allows multiple items open when allowMultiple is true', () => {
    render(<FAQAccordion items={mockItems} allowMultiple />);

    fireEvent.click(screen.getByText(mockItems[0].question));
    fireEvent.click(screen.getByText(mockItems[1].question));

    expect(screen.getByText(mockItems[0].answer)).toBeInTheDocument();
    expect(screen.getByText(mockItems[1].answer)).toBeInTheDocument();
  });

  it('renders with accessible region role and label', () => {
    render(<FAQAccordion items={mockItems} />);

    expect(screen.getByRole('region', { name: 'Frequently Asked Questions' })).toBeInTheDocument();
  });

  it('sets aria-expanded correctly on buttons', () => {
    render(<FAQAccordion items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });

  it('links question buttons to answer panels via aria-controls', () => {
    render(<FAQAccordion items={mockItems} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button, index) => {
      expect(button).toHaveAttribute('aria-controls', `faq-answer-${index}`);
      expect(button).toHaveAttribute('id', `faq-question-${index}`);
    });
  });

  it('renders empty when no items provided', () => {
    const { container } = render(<FAQAccordion />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(container.querySelector('[role="region"]')).toBeInTheDocument();
  });

  it('applies additional className', () => {
    render(<FAQAccordion items={mockItems} className="my-custom-class" />);

    const region = screen.getByRole('region', { name: 'Frequently Asked Questions' });
    expect(region.className).toContain('my-custom-class');
  });
});
