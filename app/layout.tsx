import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

export const metadata: Metadata = {
  title: 'Masud Rana | Senior QA Automation Engineer',
  description:
    'Portfolio of Masud Rana — Senior QA Automation Engineer specializing in Playwright, Selenium, WebdriverIO, CI/CD pipelines, and scalable test architecture.',
  keywords: [
    'QA Automation Engineer',
    'Playwright',
    'Selenium',
    'WebdriverIO',
    'Test Automation',
    'CI/CD',
    'GitHub Actions',
    'Jenkins',
    'Python',
    'JavaScript',
    'TypeScript',
    'Performance Testing',
    'k6',
    'JMeter',
    'Masud Rana',
  ],
  authors: [{ name: 'Masud Rana' }],
  creator: 'Masud Rana',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://masudrana.dev',
    siteName: 'Masud Rana Portfolio',
    title: 'Masud Rana | Senior QA Automation Engineer',
    description:
      'Ensuring quality through automation, strategy, and continuous delivery. 5+ years of experience building scalable test frameworks.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Masud Rana – Senior QA Automation Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masud Rana | Senior QA Automation Engineer',
    description: 'Ensuring quality through automation, strategy, and continuous delivery.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
