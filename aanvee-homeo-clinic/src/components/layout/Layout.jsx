import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import Footer from './Footer';
import AnimatedPage from './AnimatedPage';
import FloatingWhatsApp from '../ui/FloatingWhatsApp';
import ScrollToTop from '../ui/ScrollToTop';
import StickyBookButton from '../ui/StickyBookButton';
import ScrollToTopOnRoute from '../ui/ScrollToTopOnRoute';

/**
 * Layout - Main layout wrapper for all pages.
 *
 * Wraps:
 * - Navbar (sticky, with mobile menu toggle)
 * - MobileMenu (full-screen overlay, controlled by isOpen state)
 * - Page content via Outlet (with AnimatePresence for transitions)
 * - Footer
 * - FloatingElements placeholder (WhatsApp, ScrollToTop - added later)
 *
 * Adds top padding to account for the fixed navbar height.
 *
 * Requirements: 14.3, 15.1
 */
export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />

      {/* Main content area with top padding for fixed navbar */}
      <main className="flex-1 pt-16 md:pt-20">
        <AnimatePresence mode="wait">
          <AnimatedPage key={location.pathname}>
            <Outlet />
          </AnimatedPage>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* FloatingElements - WhatsApp button, ScrollToTop, StickyBookButton */}
      <FloatingWhatsApp />
      <ScrollToTop />
      <StickyBookButton />
      <ScrollToTopOnRoute />
    </div>
  );
}
