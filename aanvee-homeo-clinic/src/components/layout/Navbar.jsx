import React from 'react';
import { NavLink } from 'react-router-dom';
import { navLinks } from '../../data/navigation';
import CTAButton from '../ui/CTAButton';
import useScrollPosition from '../../hooks/useScrollPosition';

/**
 * Navbar - Sticky navigation bar with scroll-based background transition.
 *
 * Behavior:
 * - Transparent background when scroll < 50px, solid white with shadow when >= 50px
 * - Logo (left), nav links (center), "Book Consultation" CTA (right)
 * - On mobile (< 768px), hides nav links and CTA, shows hamburger icon
 * - Active link highlighting via NavLink
 *
 * @param {object} props
 * @param {function} props.onMobileMenuToggle - Callback to toggle mobile menu
 */
export default function Navbar({ onMobileMenuToggle }) {
  const scrollPosition = useScrollPosition();
  const isScrolled = scrollPosition > 50;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-card'
          : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 font-heading font-bold text-lg md:text-xl tracking-tight"
          aria-label="Aanvee Homoeo - Home"
        >
          <img src="/logo.png" alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          <span
            className={`transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-primary'
            }`}
          >
            Aanvee Homoeo
          </span>
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                end={link.exact}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : isScrolled
                        ? 'text-dark/80 hover:text-primary'
                        : 'text-dark/80 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <CTAButton to="/consultation" className="text-sm font-semibold">
            Book Consultation
          </CTAButton>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg transition-colors duration-200 hover:bg-sage/20"
          onClick={onMobileMenuToggle}
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${
              isScrolled ? 'text-dark' : 'text-dark'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </header>
  );
}
