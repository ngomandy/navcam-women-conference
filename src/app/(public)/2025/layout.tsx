import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "2025 Edition — Navigators National Women's Conference",
  description: "Relive the 2025 Navigators National Women's Conference: 66 participants from 8 regions, 4 generations. Photos, videos, testimonies and the official conference report.",
  openGraph: {
    title: "2025 Edition — NavCam Women's Conference",
    description: "66 participants · 8 regions · 4 generations. Photos, videos and the official report.",
    images: ['/2025conf/conf-36.jpg'],
  },
}

export default function Edition2025Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
