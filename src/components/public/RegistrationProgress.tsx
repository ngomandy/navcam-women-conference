'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

const CAPACITY = 300

export function RegistrationProgress() {
  const { lang } = useLanguage()
  const [registered, setRegistered] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    fetch('/api/public/stats')
      .then((r) => r.json())
      .then((d) => {
        setRegistered(d.registered)
        setTimeout(() => setAnimated(true), 100)
      })
      .catch(() => {})
  }, [])

  if (registered === null) return null

  const pct = Math.min(Math.round((registered / CAPACITY) * 100), 100)
  const remaining = CAPACITY - registered
  const urgent = remaining <= 50

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#74C69D]/20 shadow-sm">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <p className="text-sm font-semibold text-[#1B3A5C]">
          {lang === 'en' ? 'Registration Status' : 'Statut des Inscriptions'}
        </p>
        <span
          className={`text-xs font-bold px-3 py-1 rounded-full ${
            urgent
              ? 'bg-[#C9848A]/15 text-[#C9848A]'
              : 'bg-[#40916C]/10 text-[#40916C]'
          }`}
        >
          {urgent
            ? lang === 'en'
              ? `⚠️ Only ${remaining} spots left!`
              : `⚠️ Plus que ${remaining} places !`
            : lang === 'en'
            ? '✅ Registrations Open'
            : '✅ Inscriptions Ouvertes'}
        </span>
      </div>

      <div className="w-full bg-[#74C69D]/20 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ease-out ${
            urgent ? 'bg-[#C9848A]' : 'bg-[#2D6A4F]'
          }`}
          style={{ width: animated ? `${pct}%` : '0%' }}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-400">
          {lang === 'en'
            ? `${registered} registered`
            : `${registered} inscrites`}
        </p>
        <p className="text-xs text-gray-400">
          {lang === 'en'
            ? `${CAPACITY} total capacity`
            : `${CAPACITY} places au total`}
        </p>
      </div>
    </div>
  )
}
