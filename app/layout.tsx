import '@app/styles/global.css';
import { ThemeProvider } from 'next-themes';
import { inter } from '@app/styles/fonts';
import { Metadata } from 'next';
import SvgFilter from '@/app/ui/svg-effects/svg-filter';

export const metadata: Metadata = {
  title: 'Web Treasure Chest',
  description: 'wangzheng_service@126.com',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
      </head>
      <body
        className={`${inter.className} h-screen overflow-hidden antialiased`}
      >
        <SvgFilter />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
