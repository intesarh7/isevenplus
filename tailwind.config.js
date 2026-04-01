/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // ✅ App Router
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ Components
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // ✅ (optional)
  ],

  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },

    extend: {
      colors: {
        primary: "#2563eb",
      },

      borderRadius: {
        xl: "0.75rem",
      },

      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.06)",
      },
    },
  },

  // ⚠️ optional (remove if warning aaye)
  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    require("@tailwindcss/typography"),
    // ❌ REMOVE this (v3 me already included)
    // require("@tailwindcss/line-clamp"),
  ],
};