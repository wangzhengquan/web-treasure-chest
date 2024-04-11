import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    extend: {
      spacing: {
        'headerh': '3rem',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        // Light Theme
        'ufo-primary': 'rgb(var(--ufo-primary) / <alpha-value>)',
        'ufo-bg': 'rgb(var(--ufo-bg) / <alpha-value>)',
        'ufo-fg': 'rgb(var(--ufo-fg) / <alpha-value>)',
        'ufo-gray': 'rgb(var(--ufo-gray) / <alpha-value>)',
        'ufo-error': 'rgb(var(--ufo-error) / <alpha-value>)',
        'ufo-success': 'rgb(var(--ufo-success) / <alpha-value>)',
        'ufo-warning': 'rgb(var(--ufo-warning) / <alpha-value>)',

        // Dark Theme
        'ufo-dark-primary': 'rgb(var(--ufo-dark-primary) / <alpha-value>)',
        'ufo-dark-bg': 'rgb(var(--ufo-dark-bg) / <alpha-value>)',
        'ufo-dark-fg': 'rgb(var(--ufo-dark-fg) / <alpha-value>)',
        'ufo-dark-gray': 'rgb(var(--ufo-dark-gray) / <alpha-value>)',
        'ufo-dark-error': 'rgb(var(--ufo-dark-error) / <alpha-value>)',
        'ufo-dark-success': 'rgb(var(--ufo-dark-success) / <alpha-value>)',
        'ufo-dark-warning': 'rgb(var(--ufo-dark-warning) / <alpha-value>)',
        primary: '#303651',
        CtaBg: '#EBF3FF',
        CtaBgDarker: '#CFD5FF',
        CtaBgBorder: '#CDD2F3',
        // blue: {
        //   400: '#2589FE',
        //   500: '#0070F3',
        //   600: '#2F6FEB',
        // },
      },
      backgroundImage: {
      },
      transitionProperty: {
        width: 'width'
      }
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
