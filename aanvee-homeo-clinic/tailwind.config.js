/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8B1A1A",
        primaryLight: "#B22222",
        primaryDark: "#6B0F0F",
        sage: "#D4A59A",
        cream: "#FFF8F6",
        gold: "#D4A853",
        dark: "#2D2424",
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.35' }],
        '3xl': ['1.875rem', { lineHeight: '1.25' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.15' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'normal': '0',
        'wide': '0.02em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      borderRadius: {
        glass: "16px",
        card: "12px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(139, 26, 26, 0.1)",
        card: "0 4px 16px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 24px rgba(139, 26, 26, 0.15)",
        cta: "0 4px 12px rgba(139, 26, 26, 0.3)",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        heading: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.7' }],
        'lg': ['1.125rem', { lineHeight: '1.6' }],
        'xl': ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.15' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
      },
    },
  },
  plugins: [],
}
