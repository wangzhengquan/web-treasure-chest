import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');
// console.log('colors', colors)
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        border: 'rgb(var(--border))',
        // ring: "rgb(var(--ring))",
        ring: colors.sky['500'],
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          foreground: 'rgb(var(--secondary-foreground))',
        },
        nav: {
          DEFAULT: 'rgb(var(--nav) / <alpha-value>)',
          foreground: 'rgb(var(--nav-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive))',
          foreground: 'rgb(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted))',
          foreground: 'rgb(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          200: 'rgb(var(--accent-200))',
          foreground: 'rgb(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'rgb(var(--popover))',
          foreground: 'rgb(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'rgb(var(--card))',
          foreground: 'rgb(var(--card-foreground))',
          body: 'rgb(var(--card-body))',
          200: 'rgb(var(--card-200))',
        },
        input: {
          DEFAULT: 'rgb(var(--input))',
          foreground: 'rgb(var(--input-foreground))',
          border: 'rgb(var(--input-border))',
        },
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
