import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Breakout Sessions — 2026 NavCam Women's Conference",
  description: "Two rounds of focused breakout sessions at the 2026 Navigators of Cameroon National Women's Conference. Choose your session on Day 2 and Day 3 in Yaoundé, Cameroon.",
  openGraph: {
    title: "Breakout Sessions — 2026 NavCam Women's Conference",
    description: "12 breakout sessions across two rounds — August 11 & 12, 2026 · Yaoundé, Cameroon.",
  },
}

export default function BreakoutsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
