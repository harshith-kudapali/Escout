import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    
    themes: [
      {
        FragNation: {
          primary: "#45a29e", // FragNation Blue (remains same, but can make it darker if needed)
          secondary: "#1f2833", // Dark background (dark mode)
          accent: "#66fcf1", // Dark Green for accents (a bit darker version)
          "accent-content": "#ff6a3d", // Lighter blue for accents
          neutral: "#c5c6c7", // Lighter gray for text in dark theme
          "base-100": "#0b0c10", // Dark gray (background)

          info: "#ffffff", // Light gray for secondary text
          success: "#2A9D8F", // Dark teal (success messages)
          warning: "#F2A900", // Golden yellow (warnings)
          error: "#FF4C4C", // Dark red (for errors)

        },
      },
    ],
  },
};
