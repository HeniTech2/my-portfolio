/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgba(0, 0, 0, 0.1)',
        background: '#ffffff',
        foreground: 'oklch(0.145 0 0)',
        primary: '#030213',
        'primary-foreground': '#ffffff',
        secondary: 'oklch(0.95 0.0058 264.53)',
        'secondary-foreground': '#030213',
        muted: '#ececf0',
        'muted-foreground': '#717182',
        accent: '#e9ebef',
        'accent-foreground': '#030213',
        destructive: '#d4183d',
        'destructive-foreground': '#ffffff',
        ring: 'oklch(0.708 0 0)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}