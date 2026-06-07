'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'

export default function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer>
      {/* ── Photo strip ─────────────────────────────────────────────────── */}
      <div className="relative h-36 sm:h-44 overflow-hidden">
        <img
          src="/2025conf/conf-36.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1B3A5C]/60 via-[#1B3A5C]/70 to-[#1B3A5C]" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-widest mb-1">
              {lang === 'en' ? 'August 10–14, 2026 · Yaoundé, Cameroon' : '10–14 Août 2026 · Yaoundé, Cameroun'}
            </p>
            <p
              className="text-white text-xl sm:text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Rooted in Christ, Bearing Lasting Fruit' : 'Enracinées en Christ, Portant des Fruits Durables'}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main footer ─────────────────────────────────────────────────── */}
      <div className="bg-[#1B3A5C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/nav_women_conference_2026_C.svg" alt="" className="h-12 w-auto rounded-lg" />
              </div>
              <blockquote className="border-l-2 border-[#C9A84C] pl-4">
                <p className="text-[#F4C2C2] italic text-sm leading-relaxed">
                  &ldquo;{t.conference.theme}&rdquo;
                </p>
                <cite className="text-[#C9A84C] text-xs mt-1 block not-italic">— {t.conference.scripture}</cite>
              </blockquote>
              <a
                href="https://wa.me/237696238088"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#1EB85A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                {lang === 'en' ? 'Chat with us on WhatsApp' : 'Écrivez-nous sur WhatsApp'}
              </a>
            </div>

            {/* Event Info */}
            <div className="space-y-4">
              <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? 'Event Details' : "Détails de l'Événement"}
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-300">
                <li className="flex items-start gap-2"><span className="text-[#74C69D] mt-0.5">📅</span><span>{t.conference.dates}</span></li>
                <li className="flex items-start gap-2"><span className="text-[#74C69D] mt-0.5">📍</span><span>{t.conference.venue}</span></li>
                <li className="flex items-start gap-2"><span className="text-[#74C69D] mt-0.5">🌿</span><span>{t.conference.daysCount}</span></li>
                <li className="flex items-start gap-2"><span className="text-[#74C69D] mt-0.5">💳</span>
                  <span>{lang === 'en' ? 'Early Bird: 30,000 FCFA (before June 30)' : 'Anticipée : 30 000 FCFA (avant le 30 juin)'}</span>
                </li>
              </ul>
              <div className="pt-1">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:-translate-y-0.5"
                >
                  {t.hero.cta} →
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? 'Quick Links' : 'Liens Rapides'}
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {[
                  { href: '/about',        label: t.nav.about },
                  { href: '/schedule',     label: t.nav.schedule },
                  { href: '/breakouts',    label: t.nav.breakouts },
                  { href: '/prayer-wall',  label: t.nav.prayerWall },
                  { href: '/venue',        label: t.nav.venue },
                  { href: '/fees',         label: t.nav.fees },
                  { href: '/donate',       label: t.nav.donate },
                  { href: '/2025',         label: t.nav.pastEdition },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[#74C69D] transition-colors flex items-center gap-1">
                      <span className="text-[#C9A84C] text-xs">›</span>{link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
            <p>{t.common.copyRight}</p>
            <p>{lang === 'en' ? 'The Navigators Cameroon' : 'Les Navigateurs Cameroun'}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
