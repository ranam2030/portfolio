import type { Metadata } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';

const BASE_URL = 'https://masudrana.dev';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
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
  authors: [{ name: 'Masud Rana', url: BASE_URL }],
  creator: 'Masud Rana',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Masud Rana Portfolio',
    title: 'Masud Rana | Senior QA Automation Engineer',
    description:
      'Ensuring quality through automation, strategy, and continuous delivery. 6+ years of experience building scalable test frameworks.',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Masud Rana – Senior QA Automation Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Masud Rana | Senior QA Automation Engineer',
    description: 'Ensuring quality through automation, strategy, and continuous delivery.',
    images: ['/og'],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Masud Rana',
  url: BASE_URL,
  jobTitle: 'Senior QA Automation Engineer',
  description:
    'QA Automation Engineer with 6+ years of experience specializing in Playwright, Selenium, CI/CD pipelines, and test architecture.',
  email: 'masudr2030@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
  sameAs: ['https://github.com/ranam2030', 'https://www.linkedin.com/in/masudr2030/'],
  knowsAbout: [
    'Playwright', 'Selenium', 'WebdriverIO', 'Appium', 'Cypress',
    'TypeScript', 'Python', 'GitHub Actions', 'Docker', 'k6', 'JMeter',
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Skip to main content — keyboard / screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-lg focus:font-semibold focus:text-sm focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
