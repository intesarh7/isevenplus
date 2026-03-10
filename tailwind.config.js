/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
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
  future: {
    hoverOnlyWhenSupported: true,
  },

  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    
  ],
};