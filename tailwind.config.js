/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primary_25: "var(--primary-25)",
        player_bg: "var(--player-bg)",
        sidebar_bg: "var(--sidebar-bg)",
        text_color: "var(--text-color)",
      },
      screens: {
        lg: "992px",
      },
    },

    container: {
      center: true,
    },
  },
  plugins: [],
};
