'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="bg-[#1B3A5C] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Theme */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/nav_women_conference_2026_C.svg" alt="" className="h-10 w-auto rounded-md" />
              <div>
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {t.conference.shortName}
                </h3>
              </div>
            </div>
            <blockquote className="border-l-2 border-[#C9A84C] pl-4">
              <p className="text-[#F4C2C2] italic text-sm">
                &ldquo;{t.conference.theme}&rdquo;
              </p>
              <cite className="text-[#C9A84C] text-xs mt-1 block">
                — {t.conference.scripture}
              </cite>
            </blockquote>
          </div>

          {/* Event Info */}
          <div className="space-y-4">
            <h4
              className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Event Details' : 'Détails de l\'Événement'}
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#74C69D] mt-0.5">📅</span>
                <span>{t.conference.dates}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#74C69D] mt-0.5">📍</span>
                <span>{t.conference.venue}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#74C69D] mt-0.5">🌿</span>
                <span>{t.conference.daysCount}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4
              className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Quick Links' : 'Liens Rapides'}
            </h4>
            <ul className="space-y-2">
              {[
                { href: '/about',    label: t.nav.about },
                { href: '/schedule', label: t.nav.schedule },
                { href: '/venue',    label: t.nav.venue },
                { href: '/2025',     label: t.nav.pastEdition },
                { href: '/fees',     label: t.nav.fees },
                { href: '/register', label: t.nav.register },
                { href: '/donate',   label: t.nav.donate },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#74C69D] transition-colors flex items-center gap-1"
                  >
                    <span className="text-[#C9A84C]">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>{t.common.copyRight}</p>
            <div className="flex items-center gap-1">
              <span className="text-[#74C69D]">🌿</span>
              <span>
                {lang === 'en'
                  ? 'The Navigators Cameroon'
                  : 'Les Navigateurs Cameroun'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
