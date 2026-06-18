import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: "2026 Navigators National Women's Conference",
  description:
    "Rooted in Christ, bearing lasting fruit — John 15:5, 8. The 2026 Navigators of Cameroon National Women's Conference.",
  startDate: '2026-08-10T09:00:00+01:00',
  endDate: '2026-08-14T17:00:00+01:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: ['https://navcam-women-conference.vercel.app/opengraph-image'],
  location: {
    '@type': 'Place',
    name: 'Care & Hope Center',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Yaoundé',
      addressCountry: 'CM',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: 'The Navigators Cameroon',
    url: 'https://navcam-women-conference.vercel.app',
  },
  offers: {
    '@type': 'Offer',
    name: 'Early Bird Registration',
    price: '30000',
    priceCurrency: 'XAF',
    availability: 'https://schema.org/InStock',
    validThrough: '2026-06-30',
    url: 'https://navcam-women-conference.vercel.app/register',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://navcam-women-conference.vercel.app'),
  title: '2026 Navigators National Women\'s Conference | NavCam',
  description:
    'Rooted in Christ, bearing lasting fruit — John 15:5, 8. August 10–14, 2026 at Care & Hope, Yaoundé, Cameroon.',
  keywords: [
    'Navigators Cameroon',
    'Women Conference 2026',
    'Conférence Femmes',
    'Yaoundé',
    'Christian Conference',
  ],
  openGraph: {
    title: '2026 Navigators National Women\'s Conference',
    description: 'Rooted in Christ, bearing lasting fruit — August 10–14, 2026 | Yaoundé, Cameroon',
    type: 'website',
    locale: 'fr_CM',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
