import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');
// console.log('colors', colors)
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: {
          DEFAULT: 'hsl(var(--border) / <alpha-value>)',
        },
        // ring: "hsl(var(--ring))",
        ring: colors.sky['500'],
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        nav: {
          DEFAULT: 'hsl(var(--nav) / <alpha-value>)',
          foreground: 'hsl(var(--nav-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          200: 'hsl(var(--accent-200) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
          body: 'hsl(var(--card-body) / <alpha-value>)',
          200: 'hsl(var(--card-200) / <alpha-value>)',
        },
        input: {
          DEFAULT: 'hsl(var(--input) / <alpha-value>)',
          foreground: 'hsl(var(--input-foreground) / <alpha-value>)',
          border: 'hsl(var(--input-border) / <alpha-value>)',
        },
        alpha: 'hsl(var(--alpha) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      gridTemplateColumns: {
        autofill: 'repeat(auto-fill, minmax(0, 1fr))',
        autofit: 'repeat(auto-fit, minmax(0, 1fr))',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        loading: {
          '0%, 50%': { transform: 'scale(1)', opacity: '1' },
          '20%': { transform: 'scale(1.7)', opacity: '0.5' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        followpath: {
          to: { offsetDistance: '100%' },
        },
        'curtain-rollout': {
          '0%': { clipPath: 'polygon(0 0, 105% 0, 100% 100%, 0 100%)' },
          '100%': { clipPath: 'polygon(0 0, -5% 0, 0 100%, 0 100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        loading: '2s ease-out 0s infinite normal none running loading',
        followpath: 'followpath 1s linear',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;