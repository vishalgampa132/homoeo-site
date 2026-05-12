import React from 'react';
import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TreatmentsPage from './TreatmentsPage';
import { treatments } from '../data/treatments';

function renderTreatmentsPage() {
  return render(
    <MemoryRouter>
      <TreatmentsPage />
    </MemoryRouter>
  );
}

describe('TreatmentsPage', () => {
  afterEach(() => {
    document.title = '';
    document.querySelectorAll('meta[property^="og:"], meta[name="description"]').forEach((el) => el.remove());
  });

  it('renders page heading', () => {
    renderTreatmentsPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Treatments' })).toBeInTheDocument();
  });

  it('renders page description', () => {
    renderTreatmentsPage();
    expect(screen.getByText(/discover how homeopathy can help/i)).toBeInTheDocument();
  });

  it('renders Breadcrumb navigation', () => {
    renderTreatmentsPage();
    expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  });

  it('renders all 12 treatment cards', () => {
    renderTreatmentsPage();
    treatments.forEach((treatment) => {
      expect(screen.getByText(treatment.name)).toBeInTheDocument();
    });
  });

  it('all cards are collapsed by default', () => {
    renderTreatmentsPage();
    const expandButtons = screen.getAllByRole('button', { expanded: false });
    expect(expandButtons.length).toBe(12);
  });

  it('expands a card when clicked', () => {
    renderTreatmentsPage();
    const migraineButton = screen.getByRole('button', { name: /migraine/i });
    fireEvent.click(migraineButton);
    expect(migraineButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses a card when clicked again', () => {
    renderTreatmentsPage();
    const migraineButton = screen.getByRole('button', { name: /migraine/i });
    fireEvent.click(migraineButton);
    fireEvent.click(migraineButton);
    expect(migraineButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('only one card is expanded at a time (accordion behavior)', () => {
    renderTreatmentsPage();
    const migraineButton = screen.getByRole('button', { name: /migraine/i });
    const thyroidButton = screen.getByRole('button', { name: /thyroid/i });

    fireEvent.click(migraineButton);
    expect(migraineButton).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(thyroidButton);
    expect(thyroidButton).toHaveAttribute('aria-expanded', 'true');
    expect(migraineButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets document title for SEO', () => {
    renderTreatmentsPage();
    expect(document.title).toBe('Treatments | Aanvee Homoeo Store');
  });

  it('sets meta description tag', () => {
    renderTreatmentsPage();
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute('content')).toContain('homeopathic treatments');
  });

  it('sets Open Graph title tag', () => {
    renderTreatmentsPage();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute('content')).toContain('Treatments');
  });

  it('sets Open Graph description tag', () => {
    renderTreatmentsPage();
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc).not.toBeNull();
    expect(ogDesc.getAttribute('content')).toContain('homeopathic treatments');
  });

  it('cleans up meta tags on unmount', () => {
    const { unmount } = renderTreatmentsPage();
    unmount();
    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle).toBeNull();
  });
});
