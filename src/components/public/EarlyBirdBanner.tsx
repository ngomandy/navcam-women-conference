'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

// Early-bird rate (30,000 FCFA) ends June 30, 2026; standard rate is 35,000 FCFA.
const DEADLINE = new Date('2026-06-30T23:59:59+01:00')
const STORAGE_KEY = 'navcam-eb-dismissed'

export default function EarlyBirdBanner() {
  const { lang } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDismissed(localStorage.getItem(STORAGE_KEY) === '1')
  }, [])

  if (!mounted || dismissed) return null

  const msLeft = DEADLINE.getTime() - Date.now()
  if (msLeft < 0) return null // early-bird window closed

  const daysLeft = Math.ceil(msLeft / 86_400_000)

  const dismiss = () => {
    setDismissed(true)
    localStorage.setItem(STORAGE_KEY, '1')
  }

  const countdown =
    lang === 'en'
      ? daysLeft <= 1
        ? 'Early bird ends today'
        : `Early bird ends in ${daysLeft} days`
      : daysLeft <= 1
        ? "L'inscription anticipée se termine aujourd'hui"
        : `L'inscription anticipée se termine dans ${daysLeft} jours`

  const savePitch =
    lang === 'en' ? 'register now & save 5,000 FCFA' : 'inscrivez-vous & économisez 5 000 FCFA'

  return (
    <div className="relative z-30 bg-gradient-to-r from-[#C9A84C] via-[#B8963A] to-[#C9A84C] text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2 text-center text-xs sm:text-sm">
        <span className="text-base leading-none">🌱</span>
        <Link href="/register" className="font-semibold hover:underline">
          <span className="font-bold">{countdown}</span>
          <span className="hidden sm:inline"> — {savePitch}</span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={lang === 'en' ? 'Dismiss' : 'Fermer'}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/90"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
