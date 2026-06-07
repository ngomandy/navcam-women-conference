import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About — 2026 Navigators of Cameroon National Women's Conference",
  description: "Meet the 20 women leaders behind the 2026 Navigators of Cameroon National Women's Conference. Discover the vision, objectives, and ministry of NavCam Women.",
  openGraph: {
    title: "About — 2026 NavCam Women's Conference",
    description: "Meet the 20 women leaders and learn about the vision of the conference.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
