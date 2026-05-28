'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { formatCurrency } from '@/lib/utils'

export default function FeesPage() {
  const { t, lang } = useLanguage()

  const feeCards = [
    {
      icon: '🌱',
      type: t.fees.earlyBird,
      amount: 30000,
      highlight: true,
      tag: lang === 'en' ? 'Best Value' : 'Meilleure Offre',
      deadline: t.fees.earlyBirdDeadline,
      desc: t.fees.earlyBirdDesc,
    },
    {
      icon: '🌿',
      type: t.fees.regular,
      amount: 35000,
      highlight: false,
      tag: null,
      deadline: lang === 'en' ? 'After June 30, 2026' : 'Après le 30 juin 2026',
      desc: t.fees.regularDesc,
    },
    {
      icon: '🌳',
      type: t.fees.coreTeam,
      amount: 50000,
      highlight: false,
      tag: null,
      deadline: lang === 'en' ? 'For core team members' : "Pour les membres de l'équipe",
      desc: t.fees.coreTeamDesc,
    },
  ]

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C9A84C] via-[#2D6A4F] to-[#1B3A5C] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#F0D080" opacity="0.8" />
                <circle cx="0" cy="0" r="1" fill="#74C69D" opacity="0.6" />
                <circle cx="40" cy="40" r="1" fill="#74C69D" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-5xl block mb-3">💰</span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.fees.title}
          </h1>
          <p className="text-[#F0D080] text-lg">{t.fees.subtitle}</p>
          <p className="text-white/70 text-sm mt-2">{t.conference.dates}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Fee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {feeCards.map((card, i) => (
            <div
              key={i}
              className={`relative rounded-3xl overflow-hidden transition-all duration-200 card-hover ${
                card.highlight
                  ? 'bg-[#2D6A4F] text-white shadow-2xl scale-105'
                  : 'bg-white text-[#1B3A5C] shadow-md border border-[#74C69D]/20'
              }`}
            >
              {card.tag && (
                <div className="absolute top-0 left-0 right-0 bg-[#C9A84C] text-white text-xs font-bold py-1.5 text-center">
                  🌟 {card.tag}
                </div>
              )}

              <div className={`p-7 ${card.tag ? 'pt-12' : ''}`}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3
                  className={`text-xl font-bold mb-1 ${card.highlight ? 'text-white' : 'text-[#1B3A5C]'}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {card.type}
                </h3>
                <p className={`text-sm mb-4 ${card.highlight ? 'text-[#74C69D]' : 'text-gray-500'}`}>
                  {card.desc}
                </p>

                <div className="mb-2">
                  <span
                    className={`text-3xl font-bold ${card.highlight ? 'text-[#F0D080]' : 'text-[#2D6A4F]'}`}
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {formatCurrency(card.amount)}
                  </span>
                </div>
                <p className={`text-xs mb-6 ${card.highlight ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                  📅 {card.deadline}
                </p>

                <Link
                  href="/register"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
                    card.highlight
                      ? 'bg-[#C9A84C] hover:bg-[#B8963A] text-white'
                      : 'bg-[#2D6A4F] hover:bg-[#40916C] text-white'
                  }`}
                >
                  {lang === 'en' ? 'Register Now' : "S'inscrire"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#74C69D]/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center text-xl">
                🎁
              </div>
              <h3
                className="text-lg font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.fees.included}
              </h3>
            </div>
            <ul className="space-y-3">
              {t.fees.includedItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-[#40916C] mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-7 shadow-sm border border-[#74C69D]/20">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#C9A84C] rounded-xl flex items-center justify-center text-xl">
                💳
              </div>
              <h3
                className="text-lg font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t.fees.paymentTitle}
              </h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.fees.paymentDesc}</p>

            {/* Deadline Banner */}
            <div className="bg-[#FDF6EC] border border-[#C9A84C]/30 rounded-xl p-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#C9A84C] text-lg">⏰</span>
                <div>
                  <p className="font-semibold text-[#1B3A5C]">
                    {lang === 'en' ? 'Early Bird Deadline' : 'Date Limite Inscription Anticipée'}
                  </p>
                  <p className="text-[#C9A84C] font-bold">
                    {lang === 'en' ? 'June 30, 2026' : '30 juin 2026'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-[#2D6A4F]/5 rounded-xl">
              <p className="text-xs text-gray-500">
                {t.fees.questions}{' '}
                <a
                  href="mailto:info@navcam2026.org"
                  className="text-[#2D6A4F] font-semibold hover:underline"
                >
                  info@navcam2026.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#2D6A4F] to-[#1B3A5C] rounded-3xl p-8 text-center text-white">
          <p className="text-[#74C69D] text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'en' ? 'Limited Spots Available' : 'Places Limitées'}
          </p>
          <h3
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en' ? 'Ready to Register?' : 'Prête à S\'inscrire ?'}
          </h3>
          <p className="text-[#74C69D] mb-6 text-sm">
            {lang === 'en'
              ? 'Secure your early bird rate before June 30, 2026'
              : 'Profitez du tarif anticipé avant le 30 juin 2026'}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full transition-all shadow-lg"
          >
            <span>🌿</span>
            {lang === 'en' ? 'Register Now — 30 000 FCFA' : "S'inscrire — 30 000 FCFA"}
          </Link>
        </div>
      </div>
    </div>
  )
}
