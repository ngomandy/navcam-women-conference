import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Programme — 2026 Navigators National Women's Conference",
  description: "Five days of plenary sessions, breakout workshops, worship, and fellowship. August 10–14, 2026 · Care & Hope Center, Yaoundé, Cameroon.",
  openGraph: {
    title: "Conference Schedule — 2026 NavCam Women's Conference",
    description: "Five days of sessions, workshops, worship and sisterhood. Aug 10–14, 2026 · Yaoundé.",
  },
}

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
