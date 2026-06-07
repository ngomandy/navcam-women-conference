import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Donate — 2026 Navigators National Women's Conference",
  description: "Support the 2026 NavCam Women's Conference. Help sponsor sisters who cannot afford registration fees, fund children's programming, worship and the full conference experience.",
  openGraph: {
    title: "Donate — 2026 NavCam Women's Conference",
    description: "Help make the conference possible. Sponsor a sister, fund the experience.",
  },
}

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
