import React from 'react';
import GlassCard from '../../ui/GlassCard';
import { clinicInfo } from '../../../utils/constants';

/**
 * MapEmbed - Google Maps embed placeholder for the Contact page.
 * Displays a styled container with a map iframe or placeholder.
 */
export default function MapEmbed() {
  return (
    <GlassCard hover={false} className="p-4 md:p-6 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">
        Find Us
      </h2>
      <div
        className="relative w-full rounded-lg overflow-hidden bg-sage/20"
        style={{ paddingBottom: '56.25%' }}
        aria-label="Clinic location map"
        role="img"
      >
        {clinicInfo.mapEmbedUrl ? (
          <iframe
            src={clinicInfo.mapEmbedUrl}
            title="Aanvee Homoeo Store location on Google Maps"
            className="absolute inset-0 w-full h-full border-0 rounded-lg"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-dark/60">
            <div className="text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-primary/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <p className="text-sm font-medium">Map loading...</p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-dark/70">
        {clinicInfo.address.line1}, {clinicInfo.address.line2}, {clinicInfo.address.city}, {clinicInfo.address.state} - {clinicInfo.address.pincode}
      </p>
    </GlassCard>
  );
}
