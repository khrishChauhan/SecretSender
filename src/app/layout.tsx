import { Inter } from 'next/font/google';
import "./globals.css";
import type { Metadata } from 'next';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'SecretSender - Anonymous Messaging & Feedback',
    template: '%s | SecretSender'
  },
  description: 'Send and receive anonymous messages, feedback, and confessions. Join the SecretSender community and discover what people really think.',
  keywords: ['anonymous messaging', 'secret messages', 'feedback', 'confessions', 'anonymous feedback', 'SecretSender', 'mystery message'],
  authors: [{ name: 'Khrish Chauhan' }],
  creator: 'Khrish Chauhan',
  metadataBase: new URL('https://secretsender.vercel.app'), // Replace with your actual domain
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://secretsender.vercel.app',
    title: 'SecretSender - Anonymous Messaging',
    description: 'Dive into the world of anonymous feedback. Send and receive secret messages securely.',
    siteName: 'SecretSender',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SecretSender Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecretSender - Anonymous Messaging',
    description: 'Dive into the world of anonymous feedback.',
    images: ['/twitter-image.png'],
    creator: '@khrishchauhan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          {children}
          <Toaster />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'SecretSender',
                description: 'Send and receive anonymous messages, feedback, and confessions.',
                url: 'https://secretsender.vercel.app',
                applicationCategory: 'CommunicationApplication',
                operatingSystem: 'Any',
                author: {
                  '@type': 'Person',
                  name: 'Khrish Chauhan',
                },
              }),
            }}
          />
        </body>

      </AuthProvider>
    </html >
  );
}
