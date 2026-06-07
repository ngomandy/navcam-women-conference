import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Register — 2026 Navigators National Women's Conference",
  description: "Secure your place at the 2026 Navigators National Women's Conference in Yaoundé, Cameroon. August 10–14, 2026. Limited spots available.",
  openGraph: {
    title: "Register — 2026 NavCam Women's Conference",
    description: "Secure your place for Aug 10–14, 2026 · Yaoundé, Cameroon. Limited spots available.",
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
