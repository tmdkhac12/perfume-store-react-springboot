/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#212529",
        "background": "#f8f9fa",
        "surface": "#ffffff",
        "surface-container": "#edeeef",
        "surface-container-low": "#f3f4f5",
        "surface-container-lowest": "#ffffff",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "surface-bright": "#f8f9fa",
        "surface-dim": "#d9dadb",
        "surface-tint": "#5f5e5e",
        "surface-variant": "#e1e3e4",
        "on-surface": "#212529",
        "on-surface-variant": "#495057",
        "on-background": "#191c1d",
        "outline-variant": "#ced4da",
        "outline": "#747878",
        "on-primary": "#ffffff",
        "on-primary-fixed": "#1b1c1c",
        "on-primary-fixed-variant": "#474746",
        "on-primary-container": "#8a8989",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#646464",
        "on-secondary-fixed": "#1b1c1c",
        "on-secondary-fixed-variant": "#464747",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#898989",
        "on-tertiary-fixed": "#1b1c1c",
        "on-tertiary-fixed-variant": "#464747",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "inverse-primary": "#c8c6c5",
        "inverse-on-surface": "#f0f1f2",
        "inverse-surface": "#2e3132",
        "primary-container": "#222222",
        "primary-fixed": "#e5e2e1",
        "primary-fixed-dim": "#c8c6c5",
        "secondary": "#495057",
        "secondary-container": "#e4e2e2",
        "secondary-fixed": "#e4e2e2",
        "secondary-fixed-dim": "#c8c6c6",
        "tertiary": "#0a0c0c",
        "tertiary-container": "#212222",
        "tertiary-fixed": "#e3e2e2",
        "tertiary-fixed-dim": "#c7c6c6",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "accent": "#212529"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {},
      fontFamily: {
        headline: ["Noto Serif"],
        body: ["Manrope"],
        label: ["Manrope"],
        sans: ["Manrope", "sans-serif"],
        serif: ["Noto Serif", "serif"],
        display: "Noto Serif"
      }
    }
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  //   require('@tailwindcss/container-queries'),
  // ]
};
