import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Prayer Wall — 2026 NavCam Women's Conference",
  description: "Join us in prayer as we prepare our hearts for the 2026 Navigators National Women's Conference. Eight themes to pray through together.",
  openGraph: {
    title: "Prayer Wall — 2026 NavCam Women's Conference",
    description: "Preparing our hearts together through prayer. Eight themes covering rootedness, healing, fruitfulness, unity, purpose, and more.",
  },
}

export default function PrayerWallLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
