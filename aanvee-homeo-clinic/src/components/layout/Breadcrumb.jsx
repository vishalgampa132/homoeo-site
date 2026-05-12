import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Breadcrumb - Navigation aid showing the visitor's current location within the site hierarchy.
 *
 * @param {object} props
 * @param {Array<{label: string, path?: string}>} props.items - Breadcrumb segments from breadcrumbMap
 */
export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center flex-wrap gap-1 text-sm text-dark/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {index > 0 && (
                <span className="text-dark/40 mx-1" aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.path ? (
                <span
                  className="text-primary font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-primary transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
