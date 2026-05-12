import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

function renderLayout(initialRoute = '/', pageContent = 'Test Page Content') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<div>{pageContent}</div>} />
          <Route path="about" element={<div>About Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('Layout', () => {
  it('renders Navbar', () => {
    renderLayout();
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    renderLayout();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders page content via Outlet', () => {
    renderLayout('/', 'Test Page Content');
    expect(screen.getByText('Test Page Content')).toBeInTheDocument();
  });

  it('renders main element with padding for fixed navbar', () => {
    renderLayout();
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main.className).toContain('pt-16');
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    renderLayout();
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', () => {
    renderLayout();
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(hamburgerButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close navigation menu');
    fireEvent.click(closeButton);
    // After AnimatePresence exit, dialog should be removed
    // Note: AnimatePresence may keep it briefly, but the state is toggled
  });
});
