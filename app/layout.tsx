import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { logger } from '@/lib/logger';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Neo-Brutalism App',
  description: 'A bold, unapologetic web application built with Next.js and neo-brutalism design principles',
  keywords: ['neo-brutalism', 'nextjs', 'react', 'design', 'bold'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  logger.info('Application layout initialized');
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}