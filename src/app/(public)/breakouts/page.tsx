'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

const ROUND1 = [
  { icon: '🌿', en: 'Identity in Christ',                    fr: 'Identité en Christ' },
  { icon: '💛', en: 'Emotional Healing & Inner Restoration', fr: 'Guérison Émotionnelle & Restauration Intérieure' },
  { icon: '🙏', en: 'Prayer & Intimacy with God',            fr: 'Prière & Intimité avec Dieu' },
  { icon: '👑', en: 'Women & Discipleship',                  fr: 'Femmes & Discipulat' },
  { icon: '⏳', en: 'Singleness, Waiting & Trusting God',    fr: 'Célibat, Attente & Confiance en Dieu' },
  { icon: '💼', en: 'Faith, Work & Purpose in Everyday Life',fr: 'Foi, Travail & But dans la Vie Quotidienne' },
]

const ROUND2 = [
  { icon: '🏠', en: 'Marriage & Family Fruitfulness',        fr: 'Fécondité dans le Mariage & la Famille' },
  { icon: '🌟', en: 'Leadership & Influence',                fr: 'Leadership & Influence' },
  { icon: '🎯', en: 'Purpose & Calling',                     fr: 'But & Vocation' },
  { icon: '🌱', en: 'Faithful Stewardship',                  fr: 'Intendance Fidèle' },
  { icon: '🤝', en: 'Mentorship Across Generations',         fr: 'Mentorat entre Générations' },
  { icon: '🌍', en: 'Missions & Disciple-Making',            fr: 'Missions & Faire des Disciples' },
]

export default function BreakoutsPage() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col bg-[#FDF6EC]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative py-24 bg-gradient-to-br from-[#2D6A4F] via-[#1B3A5C] to-[#40916C] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="vines-b" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
                <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
                <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#vines-b)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-bold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Choose Your Session' : 'Choisissez Votre Atelier'}
            </p>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Breakout Sessions' : 'Ateliers en Groupes'}
            </h1>
            <p className="text-[#74C69D] text-lg max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Two rounds of focused, intimate sessions where you choose the topic that speaks to your season.'
                : 'Deux tours d\'ateliers ciblés et intimes où vous choisissez le sujet qui correspond à votre saison de vie.'}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── ROUND 1 ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                {lang === 'en' ? 'Round 1 · Day 2 · Aug 11' : 'Tour 1 · Jour 2 · 11 Août'}
              </span>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Roots That Heal & Deepen' : 'Racines qui Guérissent & Approfondissent'}
              </h2>
              <div className="w-14 h-0.5 bg-[#2D6A4F] mx-auto mt-4" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROUND1.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-[#FDF6EC] rounded-2xl p-6 border border-[#74C69D]/20 shadow-sm h-full flex items-start gap-4 card-hover">
                  <span className="text-3xl flex-shrink-0">{s.icon}</span>
                  <p className="font-semibold text-[#1B3A5C] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en' ? s.en : s.fr}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROUND 2 ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#FDF6EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="inline-block bg-[#C9848A]/10 text-[#C9848A] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                {lang === 'en' ? 'Round 2 · Day 3 · Aug 12' : 'Tour 2 · Jour 3 · 12 Août'}
              </span>
              <h2
                className="text-3xl font-bold text-[#1B3A5C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {lang === 'en' ? 'Bearing Lasting Fruits' : 'Porter des Fruits Durables'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9848A] mx-auto mt-4" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROUND2.map((s, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 border border-[#C9848A]/20 shadow-sm h-full flex items-start gap-4 card-hover">
                  <span className="text-3xl flex-shrink-0">{s.icon}</span>
                  <p className="font-semibold text-[#1B3A5C] leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {lang === 'en' ? s.en : s.fr}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFO BANNER ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[#74C69D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 rounded-2xl p-6">
              <p className="text-2xl mb-3">🌿</p>
              <p className="text-[#1B3A5C] font-semibold mb-2">
                {lang === 'en'
                  ? 'Session selection happens at the conference'
                  : 'La sélection des ateliers se fait lors de la conférence'}
              </p>
              <p className="text-gray-500 text-sm">
                {lang === 'en'
                  ? 'You will choose your preferred breakout session on-site each day, based on what speaks to your heart in that moment.'
                  : 'Vous choisirez votre atelier préféré sur place chaque jour, selon ce qui parle à votre cœur à ce moment-là.'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] text-center">
        <div className="max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-[#74C69D] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Join Us August 10–14, 2026' : 'Rejoignez-nous du 10 au 14 Août 2026'}
            </p>
            <h2
              className="text-3xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Ready to Register?' : 'Prête à Vous Inscrire ?'}
            </h2>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full text-base transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              🌿 {lang === 'en' ? 'Register Now' : "S'inscrire Maintenant"}
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  )
}
