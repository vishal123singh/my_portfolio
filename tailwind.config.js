module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        muted: "var(--text-muted)",
        "border-light": "var(--border-light)",
        "border-medium": "var(--border-medium)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
      },
      backgroundColor: {
        dark: "var(--bg-dark)",
        darker: "var(--bg-darker)",
        light: "var(--bg-light)",
        elevated: "var(--bg-elevated)",
        metal: "var(--bg-metal)",
      },
      backgroundImage: {
        "gradient-matte": "var(--gradient-matte)",
        "gradient-metal": "var(--gradient-metal)",
      },

      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
      },

      animation: {
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0%" },
          "100%": { backgroundPosition: "-200% 0%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
