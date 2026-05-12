import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * NotFoundPage - 404 page displayed for unmatched routes.
 * Provides a friendly message and a link back to the Home page.
 */
export default function NotFoundPage() {
  return (
    <motion.div
      className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="text-6xl font-heading font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-heading font-semibold text-dark mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-primary hover:bg-primaryDark text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}
