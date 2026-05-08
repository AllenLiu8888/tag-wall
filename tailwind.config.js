/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Noto Sans SC"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        paper: "#f8f3eb",
        ink: "#221d18",
        clay: "#ba6a3c",
        rosevoice: "#d75b82",
        orangevoice: "#db7c2a",
        violetvoice: "#7f67c7",
      },
      boxShadow: {
        soft: "0 24px 80px rgba(49, 32, 20, 0.12)",
        panel: "0 18px 45px rgba(49, 32, 20, 0.09)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -10px, 0) rotate(1deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.7", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
      },
      animation: {
        drift: "drift 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

