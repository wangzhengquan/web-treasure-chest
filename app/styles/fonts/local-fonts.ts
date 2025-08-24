import localFont from 'next/font/local';

export const inter = localFont({
  src: './inter/Inter-VariableFont_slnt,wght.woff2',
  display: 'swap',
});

export const ds_digital = localFont({
  src: './ds-digital/DS-DIGII.woff2',
  display: 'swap',
});

export const D7CBI = localFont({
  src: './DSEG7/Classic-Italic-Custom2.woff2',
  display: 'swap',
  style: 'italic',
  weight: '400',
});


export const digital7 = localFont({
  src: [
    {
      path: './digital7/digital-7.woff2',
      style: 'normal',
    },
    {
      path: './digital7/digital-7-italic.woff2',
      style: 'italic',
    },
  ],

  display: 'swap',
});

