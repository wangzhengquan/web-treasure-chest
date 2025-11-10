// const styleguide = require('@vercel/style-guide/prettier');
import styleguide from '@vercel/style-guide/prettier';
export default {
  ...styleguide,
  plugins: [...styleguide.plugins, 'prettier-plugin-tailwindcss'],
};
