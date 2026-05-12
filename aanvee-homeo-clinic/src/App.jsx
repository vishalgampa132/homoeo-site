import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Lazy-load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TreatmentsPage = lazy(() => import('./pages/TreatmentsPage'));
const ConsultationPage = lazy(() => import('./pages/ConsultationPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/**
 * Loading fallback displayed while lazy-loaded page components are loading.
 */
function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" aria-busy="true" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        <p className="text-dark/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

/**
 * App - Root application component with React Router v6 routing.
 *
 * Uses React.lazy and Suspense for code splitting — each page is loaded
 * on demand to reduce initial bundle size.
 *
 * Routes:
 * - / → HomePage
 * - /about → AboutPage
 * - /treatments → TreatmentsPage
 * - /consultation → ConsultationPage
 * - /contact → ContactPage
 * - * → NotFoundPage (404)
 *
 * All routes are nested under the Layout component which provides
 * Navbar, Footer, and page transition animations.
 *
 * Requirements: 13.1, 13.4, 14.3, 15.1
 */
function App() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="treatments" element={<TreatmentsPage />} />
          <Route path="consultation" element={<ConsultationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
