import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Fees — 2026 Navigators National Women's Conference",
  description: "Early Bird: 30,000 FCFA (before June 30) · Regular: 35,000 FCFA · Core Team: 50,000 FCFA. All meals, accommodation assistance and conference materials included.",
  openGraph: {
    title: "Registration Fees — 2026 NavCam Women's Conference",
    description: "Early Bird 30,000 FCFA · Regular 35,000 FCFA. Includes meals, materials and more.",
  },
}

export default function FeesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
