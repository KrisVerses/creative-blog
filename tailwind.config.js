/** @type {import('tailwindcss').Config} */
module.exports = {
  // content array defines patterns for files Tailwind should scan
  // to detect class names that need to be included in your CSS
  content: [
    // scans all files with these extensions in the src directory
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // scans all markdown files in the content directory
    "./content/**/*.{md,mdx}",
  ],

  // theme section is where you customize Tailwind's default design system
  theme: {
    // extend allows you to add new values while keeping the defaults
    extend: {},
  },

  // plugins array lets you add additional Tailwind functionality
  // @tailwindcss/typography adds prose classes for beautiful text styling
  plugins: [require("@tailwindcss/typography")],
};
