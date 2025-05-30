import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Correct import for Geist Sans from its package
import { Poppins, Nunito } from 'next/font/google';
import './globals.css';
import { PersonaProvider } from '@/contexts/PersonaContext';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans; // Use GeistSans directly from the 'geist' package

const poppins = Poppins({
  variable: '--font-poppins', // Used for Jamallin
  subsets: ['latin'],
  weight: ['400', '700'], // Regular and Bold
});

const nunito = Nunito({
  variable: '--font-nunito', // Used for Uncle J
  subsets: ['latin'],
  weight: ['400', '700'], // Regular and Bold
});

export const metadata: Metadata = {
  title: 'PersonaPage',
  description: 'My Personal Portfolio, with a twist!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${poppins.variable} ${nunito.variable} antialiased`}>
        <PersonaProvider>
          {children}
          <Toaster />
        </PersonaProvider>
      </body>
    </html>
  );
}
