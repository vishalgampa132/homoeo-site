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
        heading: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
