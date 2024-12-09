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
        linkedin: {
          primary: "#0A66C2", // LinkedIn Blue (remains same, but can make it darker if needed)
          secondary: "#4152aa", // Dark background (dark mode)
          accent: "#4CAF50", // Dark Green for accents (a bit darker version)
          neutral: "#E1E1E1", // Lighter gray for text in dark theme
          "base-100": "#002F81", // Dark gray (background)
		  
          info: "#A0A0A0", // Light gray for secondary text
          success: "#2A9D8F", // Dark teal (success messages)
          warning: "#F2A900", // Golden yellow (warnings)
          error: "#FF4C4C", // Dark red (for errors)
        },
      },
    ],
  },
};
