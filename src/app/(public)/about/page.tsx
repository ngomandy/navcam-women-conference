'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'

function VinePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="vines-about" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
          <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M60 110 Q80 90 60 60 Q40 90 60 110Z" fill="#74C69D" opacity="0.5" />
          <circle cx="60" cy="60" r="3" fill="#C9A84C" opacity="0.8" />
          <line x1="60" y1="10" x2="60" y2="110" stroke="#74C69D" strokeWidth="1" opacity="0.3" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="#74C69D" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vines-about)" />
    </svg>
  )
}

const objectives = {
  en: [
    'Provide opportunities for women to deepen their faith and experience spiritual growth and ministry expansion',
    'Provide a safe environment where women can feel valued and of worth',
    'Address the deepest concerns of women',
    'Build networks and strong relationships among women',
    'Mentor young women, teens, and girls',
    'Challenge Nav women to use their talents and spiritual gifts for the glory of God at home, in the ministry and everywhere they are',
  ],
  fr: [
    'Offrir aux femmes des occasions d\'approfondir leur foi et de connaître une croissance spirituelle et une expansion du ministère',
    'Créer un environnement sûr où les femmes peuvent se sentir valorisées et estimées',
    'Répondre aux préoccupations profondes des femmes',
    'Construire des réseaux et des relations solides entre les femmes',
    'Encadrer les jeunes femmes, les adolescentes et les filles',
    'Défier les femmes Navigateurs d\'utiliser leurs talents et dons spirituels pour la gloire de Dieu à la maison, dans le ministère et partout où elles sont',
  ],
}

const pillars = [
  { icon: '🙏', en: 'Prayer Networks', fr: 'Réseaux de Prière' },
  { icon: '🤝', en: 'Mentoring', fr: 'Mentorat' },
  { icon: '💞', en: 'Relational Ministry', fr: 'Ministère Relationnel' },
  { icon: '🌍', en: 'Gospel Advance', fr: 'Avancement de l\'Évangile' },
  { icon: '👩‍👧', en: 'Generational Discipleship', fr: 'Discipulat Intergénérationnel' },
  { icon: '✨', en: 'Spiritual Gift Development', fr: 'Développement des Dons' },
]

export default function AboutPage() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[340px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D6A4F] via-[#1B3A5C] to-[#40916C]">
        <VinePattern />
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#C9848A]/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-[#C9A84C] text-sm font-medium backdrop-blur-sm">
            <span>🌿</span>
            <span>{lang === 'en' ? 'Navigators Cameroon' : 'Navigateurs Cameroun'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {lang === 'en' ? "Women's Ministry" : 'Ministère des Femmes'}
          </h1>
          <p className="text-[#74C69D] text-lg">
            {lang === 'en'
              ? 'Rooted women. Discipling women. Transforming nations.'
              : 'Des femmes enracinées. Qui discipulent. Qui transforment les nations.'}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25 C360 50 1080 0 1440 25 L1440 50 L0 50 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ── VISION ── */}
      <section className="py-20 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'Our Vision' : 'Notre Vision'}
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? 'Modelling a Life of Discipleship' : 'Modéliser une Vie de Discipulat'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9A84C] mb-6" />
              <p className="text-gray-600 leading-relaxed mb-4">
                {lang === 'en'
                  ? 'Our vision as a Navigator women\'s ministry is to model a life of discipleship in all the diverse roles we play as women. This means that we seek to be disciple housewives, mothers, cooks, career women, students... and to reproduce ourselves in the lives of other women who will do the same.'
                  : 'Notre vision en tant que ministère des femmes Navigateurs est de modéliser une vie de discipulat dans tous les rôles divers que nous jouons en tant que femmes. Cela signifie que nous cherchons à être des femmes au foyer, mères, cuisinières, femmes de carrière, étudiantes disciples... et à nous reproduire dans la vie d\'autres femmes qui feront de même.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {lang === 'en'
                  ? 'We challenge and encourage women to trust and know God to the utmost and to rise above their circumstances as they raise God-fearing physical and spiritual generations of laborers.'
                  : 'Nous défions et encourageons les femmes à faire confiance à Dieu et à Le connaître au maximum, et à s\'élever au-dessus de leurs circonstances tout en élevant des générations physiques et spirituelles d\'ouvriers craignant Dieu.'}
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {pillars.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[#74C69D]/20 hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className="text-3xl mb-2">{p.icon}</div>
                  <p className="text-[#1B3A5C] text-sm font-semibold leading-snug">
                    {lang === 'en' ? p.en : p.fr}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY PROMISES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Our Foundation' : 'Notre Fondement'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Key Promises' : 'Promesses Clés'}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              {lang === 'en'
                ? 'Beside the Navigators\' promises, we hold these scriptures as foundational to our women\'s ministry.'
                : 'En plus des promesses des Navigateurs, nous tenons ces Écritures comme fondamentales pour notre ministère des femmes.'}
            </p>
            <div className="w-16 h-0.5 bg-[#C9848A] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Promise 1 */}
            <div className="relative bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-block bg-[#C9A84C]/20 text-[#F0D080] text-xs font-bold px-3 py-1 rounded-full mb-4 border border-[#C9A84C]/30">
                  {lang === 'en' ? 'Psalms 126:1–2' : 'Psaumes 126:1–2'}
                </div>
                <p className="text-white/90 leading-relaxed italic text-sm mb-4">
                  {lang === 'en'
                    ? '"When the Lord restored the fortunes of Zion, we were like those who dreamed. Our mouths were filled with laughter, our tongues with songs of joy. Then it was said among the nations, \'The Lord has done great things for them\'."'
                    : '"Quand l\'Éternel a ramené les captifs de Sion, nous étions comme des hommes qui rêvent. Notre bouche se remplissait de rires, et notre langue de cris de joie. Alors on disait parmi les nations : L\'Éternel a fait de grandes choses pour eux."'}
                </p>
                <p className="text-[#74C69D] text-xs font-semibold uppercase tracking-wider">Psalms / Psaumes 126:1-2</p>
              </div>
            </div>

            {/* Promise 2 */}
            <div className="relative bg-gradient-to-br from-[#C9848A] to-[#9B5F65] rounded-3xl p-8 text-white overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <div className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 border border-white/20">
                  {lang === 'en' ? 'Titus 2:3–5' : 'Tite 2:3–5'}
                </div>
                <p className="text-white/90 leading-relaxed italic text-sm mb-4">
                  {lang === 'en'
                    ? '"Likewise, teach the older women to be reverent in the way they live, not to be slanderers or addicted to much wine, but to teach what is good. Then they can urge the younger women to love their husbands and children..."'
                    : '"Que les femmes âgées, pareillement, aient une tenue en rapport avec la sainteté, qu\'elles ne soient ni médisantes ni adonnées au vin, mais qu\'elles enseignent ce qui est bien, pour former les jeunes femmes à aimer leurs maris et leurs enfants..."'}
                </p>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Titus / Tite 2:3-5</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIVES ── */}
      <section className="py-20 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'What We Do' : 'Ce Que Nous Faisons'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Our Objectives' : 'Nos Objectifs'}
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {objectives[lang].map((obj, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                  {i + 1}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING QUOTE ── */}
      <section className="py-20 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] relative overflow-hidden">
        <VinePattern />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-5xl mb-6">🌿</p>
          <blockquote
            className="text-2xl sm:text-3xl text-white font-light italic leading-relaxed mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en'
              ? '"Through these aspects, we desire to use women\'s God-given attributes to advance the Gospel of Jesus and His Kingdom into the nations through spiritual generations of laborers living and discipling among the lost."'
              : '"À travers ces aspects, nous désirons utiliser les attributs donnés par Dieu aux femmes pour faire avancer l\'Évangile de Jésus et Son Royaume dans les nations à travers des générations spirituelles d\'ouvriers vivant et discipulant parmi les perdus."'}
          </blockquote>
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest">
            {lang === 'en' ? 'Navigators Cameroon — Women\'s Ministry' : 'Navigateurs Cameroun — Ministère des Femmes'}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full transition-all shadow-lg hover:-translate-y-0.5">
              {lang === 'en' ? 'Join Us at the Conference' : 'Rejoignez-nous à la Conférence'}
              <span>🌿</span>
            </Link>
            <Link href="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full border border-white/30 transition-all backdrop-blur-sm">
              {lang === 'en' ? 'Support the Ministry' : 'Soutenir le Ministère'}
              <span>💛</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
