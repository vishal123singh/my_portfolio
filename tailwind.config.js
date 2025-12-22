module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#00f7ff", // 💡 match your :root --accent value
        "bg-dark": "#0f172a",
        "text-light": "#f1f5f9",
        "btn-hover": "#0ea5e9",
        panel: "#141627",
        neon: "#00f5ff",
        buy: "#00ff88",
        sell: "#ff4d4d",
        gold: {
          500: "#D4AF37",
          600: "#C49B2F",
        },
      },

      fontFamily: {
        futuristic: ["Orbitron", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 245, 255, 0.5)",
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
