import '@appstyles/global.css';
import { ThemeProvider } from '@app/components/theme-provider';
import { inter } from '@appstyles/fonts';
import { Metadata } from 'next';
import SvgFilter from '@/app/ui/svg-effects/svg-filter';

export const metadata: Metadata = {
  title: 'Web Demos',
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
      className="h-screen overflow-hidden"
      suppressHydrationWarning
    >
      {/* <head>
      <script src="http://localhost:8097"></script>
      </head> */}
      <body
        className={`${inter.className} h-screen overflow-hidden antialiased`}
      >
        <SvgFilter />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
