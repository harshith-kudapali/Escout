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
          primary: "#0A66C2", // FragNation Blue (remains same, but can make it darker if needed)
          secondary: "#4152aa", // Dark background (dark mode)
          accent: "#4CAF50", // Dark Green for accents (a bit darker version)
          neutral: "#ffffff", // Lighter gray for text in dark theme
          "base-100": "#002F81", // Dark gray (background)
		  
          info: "#ffffff", // Light gray for secondary text
          success: "#2A9D8F", // Dark teal (success messages)
          warning: "#F2A900", // Golden yellow (warnings)
          error: "#FF4C4C", // Dark red (for errors)
        },
      },
    ],
  },
};
