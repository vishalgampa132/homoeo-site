import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * CTAButton - A call-to-action button with gradient background and hover animation.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional Tailwind classes
 * @param {'primary'|'secondary'|'outline'} [props.variant='primary'] - Button style variant
 * @param {string} [props.to] - If provided, renders as react-router Link
 * @param {function} [props.onClick] - Click handler (for button variant)
 * @param {string} [props.type='button'] - Button type attribute (button, submit, reset)
 */
export default function CTAButton({
  children,
  className = '',
  variant = 'primary',
  to,
  onClick,
  type = 'button',
}) {
  const baseClasses =
    'inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-150';

  const variantClasses = {
    primary: 'text-white shadow-cta',
    secondary: 'bg-sage text-dark shadow-card',
    outline: 'bg-transparent border-2 border-primary text-primary',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #8B1A1A, #B22222)',
    },
    secondary: {},
    outline: {},
  };

  const hoverAnimation = {
    scale: 1.03,
    boxShadow: '0 6px 20px rgba(139, 26, 26, 0.4)',
  };

  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.primary} ${className}`;
  const inlineStyle = variantStyles[variant] || {};

  if (to) {
    return (
      <motion.div
        whileHover={hoverAnimation}
        transition={{ duration: 0.15 }}
        className="inline-block"
      >
        <Link
          to={to}
          className={classes}
          style={inlineStyle}
          onClick={onClick}
        >
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      style={inlineStyle}
      onClick={onClick}
      whileHover={hoverAnimation}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
}
