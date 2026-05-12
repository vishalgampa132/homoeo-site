import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Breadcrumb from './Breadcrumb';

function renderWithRouter(ui) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Breadcrumb', () => {
  it('renders nothing when items is empty', () => {
    const { container } = renderWithRouter(<Breadcrumb items={[]} />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('renders nothing when items is undefined', () => {
    const { container } = renderWithRouter(<Breadcrumb items={undefined} />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('renders a nav element with aria-label="Breadcrumb"', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'About Us' }];
    renderWithRouter(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(nav).toBeInTheDocument();
  });

  it('renders all breadcrumb items', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'Treatments' }];
    renderWithRouter(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Treatments')).toBeInTheDocument();
  });

  it('renders linked items with path as Link elements', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'About Us' }];
    renderWithRouter(<Breadcrumb items={items} />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders the last item as non-linked text', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'Contact Us' }];
    renderWithRouter(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Contact Us');
    expect(lastItem.tagName).not.toBe('A');
    expect(lastItem).not.toHaveAttribute('href');
  });

  it('applies aria-current="page" to the last item', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'Consultation' }];
    renderWithRouter(<Breadcrumb items={items} />);
    const lastItem = screen.getByText('Consultation');
    expect(lastItem).toHaveAttribute('aria-current', 'page');
  });

  it('renders separators between items', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'Treatments' }];
    const { container } = renderWithRouter(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('[aria-hidden="true"]');
    expect(separators.length).toBe(1);
    expect(separators[0].textContent).toBe('/');
  });

  it('does not render a separator before the first item', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'About Us' }];
    const { container } = renderWithRouter(<Breadcrumb items={items} />);
    const listItems = container.querySelectorAll('li');
    const firstLi = listItems[0];
    expect(firstLi.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('renders correctly for breadcrumbMap "/about" path', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'About Us' }];
    renderWithRouter(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('About Us')).toHaveAttribute('aria-current', 'page');
  });

  it('renders correctly for breadcrumbMap "/contact" path', () => {
    const items = [{ label: 'Home', path: '/' }, { label: 'Contact Us' }];
    renderWithRouter(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Contact Us')).toHaveAttribute('aria-current', 'page');
  });

  it('handles single item (no links, just current page)', () => {
    const items = [{ label: 'Home' }];
    renderWithRouter(<Breadcrumb items={items} />);
    const item = screen.getByText('Home');
    expect(item).toHaveAttribute('aria-current', 'page');
    expect(item.tagName).not.toBe('A');
  });
});
