'use client'

import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

const PRAYERS = [
  {
    icon: '🌿',
    color: '#2D6A4F',
    light: '#E8F5EE',
    en: 'Rooted in Christ',
    fr: 'Enracinées en Christ',
    scripture: 'John 15:5',
    scriptureRef: 'Jean 15:5',
    points: {
      en: [
        'Pray that every woman attending would develop a deeper hunger for God\'s Word and prayer.',
        'Pray that participants would come with open hearts, ready to encounter Christ personally.',
        'Ask God to remove distractions and anything that hinders intimacy with Him.',
        'Pray that women would learn what it truly means to abide in Christ daily.',
        'Pray for a fresh outpouring of the Holy Spirit throughout the conference.',
      ],
      fr: [
        'Priez pour que chaque femme développe une faim plus profonde pour la Parole de Dieu et la prière.',
        'Priez pour que les participantes viennent avec un cœur ouvert, prêtes à rencontrer Christ personnellement.',
        'Demandez à Dieu d\'éliminer les distractions et tout ce qui entrave l\'intimité avec Lui.',
        'Priez pour que les femmes apprennent ce que signifie vraiment demeurer en Christ chaque jour.',
        'Priez pour un déversement frais du Saint-Esprit tout au long de la conférence.',
      ],
    },
  },
  {
    icon: '❤️',
    color: '#C9848A',
    light: '#FDF0F1',
    en: 'Healing and Wholeness',
    fr: 'Guérison et Plénitude',
    scripture: 'Psalm 147:3',
    scriptureRef: 'Psaume 147:3',
    points: {
      en: [
        'Pray that God would bring healing to wounded hearts and broken relationships.',
        'Pray for freedom from fear, shame, guilt, bitterness, and discouragement.',
        'Ask God to restore hope where there has been disappointment or loss.',
        'Pray that women would experience the Father\'s love in a life-changing way.',
        'Pray for spiritual, emotional, and relational renewal.',
      ],
      fr: [
        'Priez pour que Dieu apporte la guérison aux cœurs blessés et aux relations brisées.',
        'Priez pour la liberté de la peur, de la honte, de la culpabilité, de l\'amertume et du découragement.',
        'Demandez à Dieu de restaurer l\'espoir là où il y a eu déception ou perte.',
        'Priez pour que les femmes vivent l\'amour du Père d\'une manière qui change leur vie.',
        'Priez pour un renouveau spirituel, émotionnel et relationnel.',
      ],
    },
  },
  {
    icon: '🌱',
    color: '#40916C',
    light: '#EAF5F0',
    en: 'Fruitful Lives',
    fr: 'Vies Fructueuses',
    scripture: 'John 15:8',
    scriptureRef: 'Jean 15:8',
    points: {
      en: [
        'Pray that every participant would bear fruit that glorifies God.',
        'Pray for growth in Christlike character — love, joy, peace, patience, and self-control.',
        'Ask God to reveal areas where He desires greater fruitfulness.',
        'Pray that women would leave equipped to influence their families, churches, workplaces, and communities.',
        'Pray that the impact of the conference would continue long after it ends.',
      ],
      fr: [
        'Priez pour que chaque participante porte du fruit qui glorifie Dieu.',
        'Priez pour la croissance dans le caractère christique — amour, joie, paix, patience et maîtrise de soi.',
        'Demandez à Dieu de révéler les domaines où Il désire une plus grande fécondité.',
        'Priez pour que les femmes repartent équipées pour influencer leurs familles, églises, lieux de travail et communautés.',
        'Priez pour que l\'impact de la conférence se poursuive longtemps après sa fin.',
      ],
    },
  },
  {
    icon: '🤝',
    color: '#C9A84C',
    light: '#FDF8EC',
    en: 'Sisterhood and Unity',
    fr: 'Sororité et Unité',
    scripture: 'Ephesians 4:3',
    scriptureRef: 'Éphésiens 4:3',
    points: {
      en: [
        'Pray for genuine relationships to be formed among participants.',
        'Pray that women from different generations, cultures, and backgrounds would be united in Christ.',
        'Ask God to create an atmosphere of love, encouragement, and mutual support.',
        'Pray that lasting mentoring and discipleship relationships would emerge.',
        'Pray against division, comparison, and isolation.',
      ],
      fr: [
        'Priez pour que de vraies relations se forment entre les participantes.',
        'Priez pour que les femmes de différentes générations, cultures et origines soient unies en Christ.',
        'Demandez à Dieu de créer une atmosphère d\'amour, d\'encouragement et de soutien mutuel.',
        'Priez pour que des relations durables de mentorat et de discipulat émergent.',
        'Priez contre la division, la comparaison et l\'isolement.',
      ],
    },
  },
  {
    icon: '🎯',
    color: '#1B3A5C',
    light: '#EEF2F7',
    en: 'Purpose and Calling',
    fr: 'But et Vocation',
    scripture: 'Ephesians 2:10',
    scriptureRef: 'Éphésiens 2:10',
    points: {
      en: [
        'Pray that women would discover or gain clarity about God\'s purpose for their lives.',
        'Ask God to awaken gifts, talents, and callings that have been dormant.',
        'Pray for courage to obey God\'s leading.',
        'Pray that women would embrace their identity as daughters of God.',
        'Pray that participants would return home with renewed vision and direction.',
      ],
      fr: [
        'Priez pour que les femmes découvrent ou clarifient le but de Dieu pour leur vie.',
        'Demandez à Dieu de réveiller les dons, talents et vocations qui ont été endormis.',
        'Priez pour le courage d\'obéir à la conduite de Dieu.',
        'Priez pour que les femmes embrassent leur identité de filles de Dieu.',
        'Priez pour que les participantes rentrent chez elles avec une vision et une direction renouvelées.',
      ],
    },
  },
  {
    icon: '🎤',
    color: '#40916C',
    light: '#EAF5F0',
    en: 'Speakers, Facilitators & Leaders',
    fr: 'Oratrices, Facilitatrices & Leaders',
    scripture: 'Colossians 4:3–4',
    scriptureRef: 'Colossiens 4:3–4',
    points: {
      en: [
        'Pray for spiritual protection, wisdom, and strength for every speaker and facilitator.',
        'Pray that every message shared would be firmly grounded in God\'s Word.',
        'Ask God to anoint each session and discussion.',
        'Pray that leaders would be sensitive to the guidance of the Holy Spirit.',
        'Pray that God would speak through every person serving during the conference.',
      ],
      fr: [
        'Priez pour la protection spirituelle, la sagesse et la force de chaque orateur et facilitateur.',
        'Priez pour que chaque message partagé soit solidement ancré dans la Parole de Dieu.',
        'Demandez à Dieu d\'oindre chaque session et discussion.',
        'Priez pour que les leaders soient sensibles à la direction du Saint-Esprit.',
        'Priez pour que Dieu parle à travers chaque personne servant lors de la conférence.',
      ],
    },
  },
  {
    icon: '🛡️',
    color: '#1B3A5C',
    light: '#EEF2F7',
    en: 'Protection and Provision',
    fr: 'Protection et Provision',
    scripture: 'Psalm 121:7–8',
    scriptureRef: 'Psaume 121:7–8',
    points: {
      en: [
        'Pray for God\'s protection over all participants, their families, and their travel.',
        'Pray for good health and safety throughout the conference.',
        'Ask God to provide all financial, logistical, and material needs.',
        'Pray for favorable weather and smooth operations.',
        'Pray against any spiritual opposition to God\'s work.',
      ],
      fr: [
        'Priez pour la protection de Dieu sur toutes les participantes, leurs familles et leurs voyages.',
        'Priez pour une bonne santé et la sécurité tout au long de la conférence.',
        'Demandez à Dieu de pourvoir à tous les besoins financiers, logistiques et matériels.',
        'Priez pour un temps favorable et des opérations sans accroc.',
        'Priez contre toute opposition spirituelle à l\'œuvre de Dieu.',
      ],
    },
  },
  {
    icon: '🌍',
    color: '#2D6A4F',
    light: '#E8F5EE',
    en: 'Kingdom Impact',
    fr: 'Impact pour le Royaume',
    scripture: 'Matthew 5:16',
    scriptureRef: 'Matthieu 5:16',
    points: {
      en: [
        'Pray that the conference would contribute to spiritual awakening among women across Cameroon and beyond.',
        'Pray that women would become faithful disciple-makers in their communities.',
        'Ask God to raise women who will influence future generations for Christ.',
        'Pray that churches, ministries, families, and communities would be strengthened through the lives of participants.',
        'Pray that Christ alone would be glorified through everything that takes place.',
      ],
      fr: [
        'Priez pour que la conférence contribue au réveil spirituel des femmes à travers le Cameroun et au-delà.',
        'Priez pour que les femmes deviennent des faiseurs de disciples fidèles dans leurs communautés.',
        'Demandez à Dieu de susciter des femmes qui influenceront les générations futures pour Christ.',
        'Priez pour que les églises, ministères, familles et communautés soient renforcés par la vie des participantes.',
        'Priez pour que Christ seul soit glorifié à travers tout ce qui se passe.',
      ],
    },
  },
]

export default function PrayerWallPage() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-col bg-[#FDF6EC]">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1B3A5C] via-[#2D6A4F] to-[#40916C]">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pw-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="#74C69D" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pw-dots)" />
          </svg>
        </div>

        {/* Glow orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#74C69D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#C9848A]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl mx-auto py-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[#C9A84C] text-sm font-medium backdrop-blur-sm">
              <span>🙏</span>
              <span>{lang === 'en' ? 'Preparing Our Hearts' : 'Préparons Nos Cœurs'}</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? 'Prayer Wall' : 'Mur de Prière'}
            </h1>
            <p className="text-[#74C69D] text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
              {lang === 'en'
                ? 'Preparing our hearts for the conference through united, focused prayer.'
                : 'Préparons nos cœurs pour la conférence par une prière unie et ciblée.'}
            </p>
          </ScrollReveal>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ── INTRO ─────────────────────────────────────────────────────────── */}
      <section className="py-14 bg-[#FDF6EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-gray-600 text-lg leading-relaxed">
              {lang === 'en'
                ? 'Prayer is the foundation of everything we do. As we gather in August, we invite you to join us in praying through these eight themes — lifting one another up and asking God to move powerfully at the conference.'
                : 'La prière est le fondement de tout ce que nous faisons. Alors que nous nous rassemblons en août, nous vous invitons à vous joindre à nous pour prier ces huit thèmes — nous soutenir mutuellement et demander à Dieu d\'agir puissamment lors de la conférence.'}
            </p>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/40" />
              <span className="text-[#C9A84C] text-xl">✦</span>
              <div className="h-px flex-1 max-w-24 bg-[#C9A84C]/40" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PRAYER CARDS ──────────────────────────────────────────────────── */}
      <section className="pb-20 bg-[#FDF6EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRAYERS.map((prayer, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="prayer-card bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">

                  {/* Colored top bar */}
                  <div className="h-1.5 w-full" style={{ backgroundColor: prayer.color }} />

                  <div className="p-7 flex flex-col h-full">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: prayer.light }}
                      >
                        {prayer.icon}
                      </div>
                      <div>
                        <h2
                          className="text-xl font-bold leading-tight"
                          style={{ color: prayer.color, fontFamily: "'Playfair Display', serif" }}
                        >
                          {lang === 'en' ? prayer.en : prayer.fr}
                        </h2>
                      </div>
                    </div>

                    {/* Prayer Points */}
                    <ul className="space-y-3 flex-1">
                      {(lang === 'en' ? prayer.points.en : prayer.points.fr).map((point, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span
                            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: prayer.color, opacity: 0.6 }}
                          />
                          <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                        </li>
                      ))}
                    </ul>

                    {/* Scripture badge */}
                    <div className="mt-6 pt-5 border-t border-gray-50">
                      <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                        style={{ backgroundColor: prayer.light, color: prayer.color }}
                      >
                        <span>📖</span>
                        {lang === 'en'
                          ? `Scripture: ${prayer.scripture}`
                          : `Écriture : ${prayer.scriptureRef}`}
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALL TO PRAYER ────────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-[#74C69D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'Pray With Us' : 'Priez Avec Nous'}
            </p>
            <h2
              className="text-3xl font-bold text-[#1B3A5C] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en'
                ? 'Every Prayer Makes a Difference'
                : 'Chaque Prière Fait une Différence'}
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              {lang === 'en'
                ? 'Share this page with your church, small group, or family. The more we pray together, the more God moves.'
                : 'Partagez cette page avec votre église, votre groupe de maison ou votre famille. Plus nous prions ensemble, plus Dieu agit.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/237670546041"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1EB85A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {lang === 'en' ? 'Share on WhatsApp' : 'Partager sur WhatsApp'}
              </a>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                🌿 {lang === 'en' ? 'Register for the Conference' : "S'inscrire à la Conférence"}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="pw-vine" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
                <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
                <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pw-vine)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <ScrollReveal>
            <p className="text-[#74C69D] text-sm font-semibold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'August 10–14, 2026 · Yaoundé, Cameroon' : '10–14 Août 2026 · Yaoundé, Cameroun'}
            </p>
            <h2
              className="text-3xl font-bold text-white mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en'
                ? 'Rooted in Christ, Bearing Lasting Fruit'
                : 'Enracinées en Christ, Portant des Fruits Durables'}
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
