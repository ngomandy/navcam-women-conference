import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Venue — Care & Hope Center · 2026 NavCam Women's Conference",
  description: "Conference venue: Care & Hope Center, Yaoundé, Cameroon. View photos of the conference hall, accommodation, kitchen and outdoor grounds, plus directions.",
  openGraph: {
    title: "Venue — Care & Hope Center · 2026 NavCam Women's Conference",
    description: "Conference venue in Yaoundé. Photos, facilities, Google Maps location and directions.",
    images: ['/venue/venue-aerial.jpg'],
  },
}

export default function VenueLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
