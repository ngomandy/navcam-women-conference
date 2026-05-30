import type { Metadata } from 'next'
import './globals.css'

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
    images: [
      {
        url: '/2025conf/conf-36.jpg',
        width: 960,
        height: 720,
        alt: '2025 Navigators National Women\'s Conference — Women Ministry Cameroon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/2025conf/conf-36.jpg'],
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
        {children}
      </body>
    </html>
  )
}
