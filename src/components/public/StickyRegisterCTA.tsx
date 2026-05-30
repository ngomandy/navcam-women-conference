'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/components/LanguageContext'

export default function StickyRegisterCTA() {
  const pathname = usePathname()
  const { t } = useLanguage()

  // Hide on the register page itself
  if (pathname === '/register') return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="bg-white/90 backdrop-blur-md border-t border-[#74C69D]/30 px-4 py-3 shadow-xl">
        <Link
          href="/register"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-xl text-base transition-all shadow-md"
        >
          <span>🌿</span>
          {t.hero.cta}
        </Link>
      </div>
    </div>
  )
}
