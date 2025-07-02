
import type { Metadata } from 'next';
import { Crimson_Text, Fleur_De_Leah, Great_Vibes } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { AppProviders } from '@/components/AppProviders';
import { cn } from '@/lib/utils';

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-text',
});

const fleurDeLeah = Fleur_De_Leah({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fleur-de-leah',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
});

export const metadata: Metadata = {
  title: 'Invitacion XV Valentina',
  description: 'An elegant invitation to our special event.',
  icons: {
    icon: '/favicon-32x32.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          "font-body antialiased",
          crimsonText.variable,
          fleurDeLeah.variable,
          greatVibes.variable
        )} 
        suppressHydrationWarning
      >
        <AppProviders>
          {children}
          <Toaster />
        </AppProviders>
        <SpeedInsights />
      </body>
    </html>
  );
}
