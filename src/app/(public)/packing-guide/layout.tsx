import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Outfits & Packing Guide — 2026 Navigators of Cameroon National Women's Conference",
  description: "What to wear and what to pack for the conference: the week's outfit schedule and a full checklist of personal items. August 10–14, 2026, Yaoundé. Available in English and French.",
  openGraph: {
    title: "Outfits & Packing Guide — 2026 NavCam Women's Conference",
    description: "The week's outfit schedule and a full packing checklist so you can prepare with peace of mind.",
  },
}

export default function PackingGuideLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
