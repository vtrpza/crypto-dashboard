import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/lib/providers/query-provider';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Dashboard',
  description: 'A modern cryptocurrency dashboard built with Next.js',
  keywords: ['cryptocurrency', 'bitcoin', 'dashboard', 'trading'],
  authors: [{ name: 'Crypto Dashboard' }],
  creator: 'Crypto Dashboard',
  publisher: 'Crypto Dashboard',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crypto-dashboard.vercel.app',
    title: 'Crypto Dashboard',
    description: 'A modern cryptocurrency dashboard built with Next.js',
    siteName: 'Crypto Dashboard',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Dashboard',
    description: 'A modern cryptocurrency dashboard built with Next.js',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="min-h-screen bg-background">
              {children}
            </div>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}