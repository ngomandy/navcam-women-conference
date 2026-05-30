import { LanguageProvider } from '@/components/LanguageContext'
import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import StickyRegisterCTA from '@/components/public/StickyRegisterCTA'
import HomeContent from '@/app/(public)/page'

export default function RootPage() {
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20 pb-16 md:pb-0">
          <HomeContent />
        </main>
        <Footer />
        <StickyRegisterCTA />
      </div>
    </LanguageProvider>
  )
}
