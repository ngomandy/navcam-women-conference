'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { formatCurrency } from '@/lib/utils'

// Countdown Timer Component
function CountdownTimer() {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date('2026-08-10T14:00:00').getTime()

    const tick = () => {
      const now = Date.now()
      const diff = target - now
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { value: timeLeft.days, label: t.hero.days },
    { value: timeLeft.hours, label: t.hero.hours },
    { value: timeLeft.minutes, label: t.hero.minutes },
    { value: timeLeft.seconds, label: t.hero.seconds },
  ]

  return (
    <div className="text-center">
      <p className="text-[#C9A84C] text-sm font-medium uppercase tracking-widest mb-4">
        {t.hero.countdown}
      </p>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        {units.map((unit, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center shadow-lg">
              <span
                className="text-white text-2xl sm:text-3xl font-bold tabular-nums"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {String(unit.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[#74C69D] text-xs mt-1 font-medium">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Vine leaf SVG pattern
function VinePattern() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="vines" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path
            d="M60 10 Q80 30 60 60 Q40 30 60 10Z"
            fill="#74C69D"
            opacity="0.6"
          />
          <path
            d="M10 60 Q30 40 60 60 Q30 80 10 60Z"
            fill="#74C69D"
            opacity="0.4"
          />
          <path
            d="M110 60 Q90 40 60 60 Q90 80 110 60Z"
            fill="#74C69D"
            opacity="0.4"
          />
          <path
            d="M60 110 Q80 90 60 60 Q40 90 60 110Z"
            fill="#74C69D"
            opacity="0.5"
          />
          <circle cx="60" cy="60" r="3" fill="#C9A84C" opacity="0.8" />
          <line x1="60" y1="10" x2="60" y2="110" stroke="#74C69D" strokeWidth="1" opacity="0.3" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="#74C69D" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vines)" />
    </svg>
  )
}

export default function HomePage() {
  const { t, lang } = useLanguage()

  const dayThemes = [
    {
      day: lang === 'en' ? 'Day 1' : 'Jour 1',
      date: lang === 'en' ? 'Aug 10' : '10 Août',
      theme: t.schedule.dayThemes[0],
      icon: '🌱',
      color: 'bg-[#40916C]',
    },
    {
      day: lang === 'en' ? 'Day 2' : 'Jour 2',
      date: lang === 'en' ? 'Aug 11' : '11 Août',
      theme: t.schedule.dayThemes[1],
      icon: '🌿',
      color: 'bg-[#2D6A4F]',
    },
    {
      day: lang === 'en' ? 'Day 3' : 'Jour 3',
      date: lang === 'en' ? 'Aug 12' : '12 Août',
      theme: t.schedule.dayThemes[2],
      icon: '🍃',
      color: 'bg-[#C9848A]',
    },
    {
      day: lang === 'en' ? 'Day 4' : 'Jour 4',
      date: lang === 'en' ? 'Aug 13' : '13 Août',
      theme: t.schedule.dayThemes[3],
      icon: '✨',
      color: 'bg-[#C9A84C]',
    },
    {
      day: lang === 'en' ? 'Day 5' : 'Jour 5',
      date: lang === 'en' ? 'Aug 14' : '14 Août',
      theme: t.schedule.dayThemes[4],
      icon: '🕊️',
      color: 'bg-[#1B3A5C]',
    },
  ]

  const fees = [
    {
      type: lang === 'en' ? 'Early Bird' : 'Inscription Anticipée',
      amount: 30000,
      deadline: lang === 'en' ? 'Before June 30, 2026' : 'Avant le 30 juin 2026',
      highlight: true,
    },
    {
      type: lang === 'en' ? 'Regular' : 'Standard',
      amount: 35000,
      deadline: lang === 'en' ? 'Standard rate' : 'Tarif standard',
      highlight: false,
    },
    {
      type: lang === 'en' ? 'Core Team' : 'Équipe Centrale',
      amount: 50000,
      deadline: lang === 'en' ? 'For team leaders' : 'Pour les responsables',
      highlight: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D6A4F] via-[#1B3A5C] to-[#40916C]">
        <VinePattern />

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#74C69D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C9848A]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[#C9A84C] text-sm font-medium backdrop-blur-sm">
            <span>🌿</span>
            <span>{t.conference.daysCount}</span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en'
              ? 'Navigators National Women\'s Conference'
              : 'Conférence Nationale des Femmes Navigateurs'}
          </h1>

          {/* Theme */}
          <div className="my-6">
            <p
              className="text-xl sm:text-2xl md:text-3xl text-[#F4C2C2] italic font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{t.conference.theme}&rdquo;
            </p>
            <p className="text-[#C9A84C] text-sm mt-2 font-medium">
              — {t.conference.scripture}
            </p>
          </div>

          {/* Event Details */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-sm text-gray-300">
            <span className="flex items-center gap-1.5">
              <span>📅</span> {t.conference.dates}
            </span>
            <span className="hidden sm:block text-white/30">•</span>
            <span className="flex items-center gap-1.5">
              <span>📍</span> {t.conference.venue}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>🌿</span>
              {t.hero.cta}
            </Link>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-base border border-white/30 transition-all backdrop-blur-sm"
            >
              {t.hero.learnMore}
              <span>→</span>
            </Link>
          </div>

          {/* Countdown */}
          <CountdownTimer />
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z"
              fill="#FDF6EC"
            />
          </svg>
        </div>
      </section>

      {/* ========== ABOUT / OBJECTIVES SECTION ========== */}
      <section className="py-20 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'About' : 'À Propos'}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.about.title}
            </h2>
            <p className="text-[#40916C] text-lg">{t.about.subtitle}</p>
            <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          {/* Intro Text */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-gray-600 text-lg leading-relaxed">
              {lang === 'en'
                ? 'Welcome to a gathering of women rooted in faith, sisterhood, and purpose. This conference is a sacred space for every woman to encounter Christ deeply, be healed, and be equipped to carry lasting fruit into her world.'
                : 'Bienvenue à un rassemblement de femmes enracinées dans la foi, la sororité et le but. Cette conférence est un espace sacré pour chaque femme pour rencontrer Christ profondément, être guérie et être équipée pour porter des fruits durables dans son monde.'}
            </p>
          </div>

          {/* Objectives Grid */}
          <div className="mb-8">
            <h3
              className="text-xl font-semibold text-[#2D6A4F] text-center mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.about.objectives.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.about.objectives.list.map((obj, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white rounded-2xl p-5 shadow-sm border border-[#74C69D]/20 card-hover"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-[#2D6A4F] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONFERENCE JOURNEY TIMELINE ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Program Overview' : 'Aperçu du Programme'}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Your Conference Journey' : 'Votre Parcours de Conférence'}
            </h2>
            <p className="text-gray-500">
              {lang === 'en'
                ? 'Five intentional days designed for deep encounter and lasting transformation'
                : 'Cinq jours intentionnels conçus pour une rencontre profonde et une transformation durable'}
            </p>
            <div className="w-16 h-0.5 bg-[#C9848A] mx-auto mt-4" />
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#74C69D]/30 -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 relative">
              {dayThemes.map((day, i) => (
                <div key={i} className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                  {/* Connector line for mobile */}
                  {i < dayThemes.length - 1 && (
                    <div className="lg:hidden absolute left-6 top-12 w-0.5 h-full bg-[#74C69D]/30 -z-0" />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`relative z-10 w-12 h-12 lg:w-14 lg:h-14 ${day.color} rounded-full flex items-center justify-center text-xl shadow-md flex-shrink-0 lg:mb-4`}
                  >
                    {day.icon}
                  </div>

                  <div className="lg:text-center">
                    <div className="text-xs font-bold text-[#C9A84C] mb-0.5">{day.day}</div>
                    <div className="text-xs text-gray-400 mb-1">{day.date}</div>
                    <p className="text-sm font-medium text-[#1B3A5C] leading-snug">{day.theme}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white rounded-full font-semibold text-sm transition-all"
            >
              {lang === 'en' ? 'View Full Schedule' : 'Voir le Programme Complet'}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FEES PREVIEW ========== */}
      <section className="py-20 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Fees' : 'Frais'}
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.fees.title}
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {fees.map((fee, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 text-center shadow-sm card-hover ${
                  fee.highlight
                    ? 'bg-[#2D6A4F] text-white border-2 border-[#C9A84C] shadow-lg'
                    : 'bg-white border border-[#74C69D]/20'
                }`}
              >
                {fee.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {lang === 'en' ? '🌟 Best Value' : '🌟 Meilleure Offre'}
                  </div>
                )}
                <div className="text-3xl mb-2">
                  {i === 0 ? '🌱' : i === 1 ? '🌿' : '🌳'}
                </div>
                <h3
                  className={`text-lg font-bold mb-2 ${fee.highlight ? 'text-white' : 'text-[#1B3A5C]'}`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {fee.type}
                </h3>
                <p
                  className={`text-2xl font-bold mb-1 ${fee.highlight ? 'text-[#F0D080]' : 'text-[#2D6A4F]'}`}
                >
                  {formatCurrency(fee.amount)}
                </p>
                <p className={`text-xs ${fee.highlight ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                  {fee.deadline}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/fees"
              className="inline-flex items-center gap-2 text-[#2D6A4F] hover:text-[#40916C] font-semibold text-sm underline underline-offset-4"
            >
              {lang === 'en' ? 'See full fees details' : 'Voir tous les détails des frais'}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA SECTION ========== */}
      <section className="py-20 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] relative overflow-hidden">
        <VinePattern />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl mb-4 block">🌿</span>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en'
              ? 'Ready to be Rooted & Bear Fruit?'
              : 'Prête à être Enracinée & Porter du Fruit ?'}
          </h2>
          <p className="text-[#74C69D] text-lg mb-8">
            {lang === 'en'
              ? 'Secure your place today. Limited spots available.'
              : "Réservez votre place aujourd'hui. Places limitées."}
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-lg transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            {t.hero.cta}
            <span>🌿</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
