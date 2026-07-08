import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pre-Conference Bible Study — 2026 Navigators of Cameroon National Women's Conference",
  description: "A 25-day devotional to prepare your heart for the conference. Rooted in Christ, bearing lasting fruit. July 9 – August 6, 2026. Available in English and French.",
  openGraph: {
    title: "Pre-Conference Bible Study — 2026 NavCam Women's Conference",
    description: "A 25-day devotional journey preparing your heart for the conference. Rooted in Christ, Bearing Lasting Fruit.",
  },
}

export default function BibleStudyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
