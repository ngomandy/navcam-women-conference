'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/components/LanguageContext'
import { ScrollReveal } from '@/components/public/ScrollReveal'

type Session = {
  icon: string
  en: { title: string; tagline: string; intro: string; expects: string[] }
  fr: { title: string; tagline: string; intro: string; expects: string[] }
}

const ROUND1: Session[] = [
  {
    icon: '🌿',
    en: {
      title: 'Identity in Christ',
      tagline: 'Discover who you are through God\'s eyes.',
      intro: 'Have you ever struggled with comparison, insecurity, rejection, or feeling like you\'re not enough? In this breakout, you\'ll explore what God says about your identity and learn how to live from His truth rather than the expectations of others. Together, we\'ll reflect on Scripture, address common identity struggles, and discover the freedom that comes from knowing who we are in Christ.',
      expects: [
        'Gain a deeper understanding of your identity as God\'s daughter.',
        'Recognize and challenge false beliefs about yourself.',
        'Learn how to build confidence rooted in Christ.',
        'Leave encouraged to walk in freedom and purpose.',
      ],
    },
    fr: {
      title: 'Identité en Christ',
      tagline: 'Découvrez qui vous êtes à travers les yeux de Dieu.',
      intro: 'Avez-vous déjà lutté avec la comparaison, l\'insécurité, le rejet ou le sentiment de ne pas être à la hauteur ? Dans cet atelier, vous explorerez ce que Dieu dit de votre identité et apprendrez à vivre selon Sa vérité plutôt que selon les attentes des autres. Ensemble, nous méditerons les Écritures, aborderons les luttes d\'identité courantes et découvrirons la liberté qui vient de savoir qui nous sommes en Christ.',
      expects: [
        'Acquérir une compréhension plus profonde de votre identité en tant que fille de Dieu.',
        'Reconnaître et remettre en question les fausses croyances sur vous-même.',
        'Apprendre à développer une confiance ancrée en Christ.',
        'Repartir encouragée à marcher dans la liberté et le but.',
      ],
    },
  },
  {
    icon: '💛',
    en: {
      title: 'Emotional Healing & Inner Restoration',
      tagline: 'Allow God to bring healing to the places that still hurt.',
      intro: 'Life leaves wounds — disappointments, losses, rejection, betrayal, unmet expectations. In this breakout, you\'ll find a safe space to explore how God meets us in our pain and leads us toward healing and restoration. Whether your wounds are recent or years old, you\'ll discover biblical principles and practical steps for moving toward wholeness.',
      expects: [
        'Understand how emotional wounds affect your spiritual journey.',
        'Learn biblical pathways toward healing and forgiveness.',
        'Reflect on areas where God may be inviting deeper restoration.',
        'Leave with renewed hope and practical next steps.',
      ],
    },
    fr: {
      title: 'Guérison Émotionnelle & Restauration Intérieure',
      tagline: 'Permettez à Dieu d\'apporter la guérison aux endroits qui souffrent encore.',
      intro: 'La vie laisse des blessures — des déceptions, des pertes, des rejets, des trahisons, des attentes non satisfaites. Dans cet atelier, vous trouverez un espace sûr pour explorer comment Dieu nous rejoint dans notre douleur et nous conduit vers la guérison et la restauration. Que vos blessures soient récentes ou anciennes, vous découvrirez des principes bibliques et des étapes pratiques pour avancer vers la plénitude.',
      expects: [
        'Comprendre comment les blessures émotionnelles affectent votre cheminement spirituel.',
        'Apprendre les voies bibliques vers la guérison et le pardon.',
        'Réfléchir aux domaines où Dieu vous invite à une restauration plus profonde.',
        'Repartir avec un espoir renouvelé et des prochaines étapes pratiques.',
      ],
    },
  },
  {
    icon: '🙏',
    en: {
      title: 'Prayer & Intimacy with God',
      tagline: 'Deepen your relationship with the One who loves you most.',
      intro: 'Do you long for a richer prayer life? Would you like to hear God\'s voice more clearly and experience greater closeness with Him? This breakout will help you move beyond prayer as a routine and embrace it as a life-giving relationship with God.',
      expects: [
        'Learn practical ways to grow in prayer.',
        'Explore different forms of prayer and worship.',
        'Develop habits that foster intimacy with God.',
        'Leave inspired to cultivate a deeper daily walk with Christ.',
      ],
    },
    fr: {
      title: 'Prière & Intimité avec Dieu',
      tagline: 'Approfondissez votre relation avec Celui qui vous aime le plus.',
      intro: 'Aspirez-vous à une vie de prière plus riche ? Souhaitez-vous entendre la voix de Dieu plus clairement et vivre une plus grande proximité avec Lui ? Cet atelier vous aidera à dépasser la prière comme routine et à l\'embrasser comme une relation vivifiante avec Dieu.',
      expects: [
        'Apprendre des moyens pratiques de grandir dans la prière.',
        'Explorer différentes formes de prière et d\'adoration.',
        'Développer des habitudes qui favorisent l\'intimité avec Dieu.',
        'Repartir inspirée à cultiver une marche quotidienne plus profonde avec Christ.',
      ],
    },
  },
  {
    icon: '👑',
    en: {
      title: 'Women & Discipleship',
      tagline: 'Grow as a disciple and help others do the same.',
      intro: 'Discipleship is not just for ministry leaders — it\'s God\'s invitation to every believer. In this breakout, you\'ll discover how to intentionally grow in your faith and invest in the spiritual growth of others, whether in your family, church, workplace, or community.',
      expects: [
        'Understand the heart of biblical discipleship.',
        'Learn practical ways to disciple and mentor others.',
        'Explore how discipleship fits into everyday life.',
        'Leave equipped to make a lasting spiritual impact.',
      ],
    },
    fr: {
      title: 'Femmes & Discipulat',
      tagline: 'Grandissez en tant que disciple et aidez les autres à faire de même.',
      intro: 'Le discipulat n\'est pas réservé aux leaders du ministère — c\'est l\'invitation de Dieu à chaque croyant. Dans cet atelier, vous découvrirez comment grandir intentionnellement dans votre foi et investir dans la croissance spirituelle des autres, que ce soit dans votre famille, votre église, votre lieu de travail ou votre communauté.',
      expects: [
        'Comprendre le cœur du discipulat biblique.',
        'Apprendre des moyens pratiques de faire des disciples et de mentorer les autres.',
        'Explorer comment le discipulat s\'intègre dans la vie quotidienne.',
        'Repartir équipée pour avoir un impact spirituel durable.',
      ],
    },
  },
  {
    icon: '⏳',
    en: {
      title: 'Singleness, Waiting & Trusting God',
      tagline: 'Embrace God\'s purpose for this season of your life.',
      intro: 'Whether you are single by choice, circumstance, or season, God has meaningful plans for your life today. This breakout offers encouragement, wisdom, and practical guidance for navigating waiting seasons while living with joy, purpose, and trust.',
      expects: [
        'Explore God\'s perspective on singleness.',
        'Learn how to thrive rather than simply endure seasons of waiting.',
        'Discuss common struggles and questions honestly.',
        'Leave encouraged to trust God\'s timing and live purposefully.',
      ],
    },
    fr: {
      title: 'Célibat, Attente & Confiance en Dieu',
      tagline: 'Embrassez le but de Dieu pour cette saison de votre vie.',
      intro: 'Que vous soyez célibataire par choix, circonstance ou saison, Dieu a des projets significatifs pour votre vie aujourd\'hui. Cet atelier offre encouragement, sagesse et conseils pratiques pour naviguer les saisons d\'attente tout en vivant avec joie, but et confiance.',
      expects: [
        'Explorer la perspective de Dieu sur le célibat.',
        'Apprendre à s\'épanouir plutôt qu\'à simplement endurer les saisons d\'attente.',
        'Discuter honnêtement des luttes et questions courantes.',
        'Repartir encouragée à faire confiance au timing de Dieu et à vivre avec intention.',
      ],
    },
  },
  {
    icon: '💼',
    en: {
      title: 'Faith, Work & Purpose in Everyday Life',
      tagline: 'Discover how your faith can transform your everyday life.',
      intro: 'Your workplace, home, studies, business, and community are all places where God can work through you. This breakout will help you connect your faith with your daily responsibilities and discover how to live with purpose wherever God has placed you.',
      expects: [
        'Reflect on your God-given purpose.',
        'Learn how to integrate faith into everyday decisions.',
        'Explore ways to influence others through your work and life.',
        'Leave with practical ideas for living missionally every day.',
      ],
    },
    fr: {
      title: 'Foi, Travail & But dans la Vie Quotidienne',
      tagline: 'Découvrez comment votre foi peut transformer votre vie quotidienne.',
      intro: 'Votre lieu de travail, votre foyer, vos études, votre entreprise et votre communauté sont tous des endroits où Dieu peut agir à travers vous. Cet atelier vous aidera à connecter votre foi avec vos responsabilités quotidiennes et à découvrir comment vivre avec intention partout où Dieu vous a placée.',
      expects: [
        'Réfléchir à votre but donné par Dieu.',
        'Apprendre à intégrer la foi dans les décisions quotidiennes.',
        'Explorer des façons d\'influencer les autres à travers votre travail et votre vie.',
        'Repartir avec des idées pratiques pour vivre missionnellement chaque jour.',
      ],
    },
  },
]

const ROUND2: Session[] = [
  {
    icon: '🏠',
    en: {
      title: 'Marriage & Family Fruitfulness',
      tagline: 'Build relationships that reflect God\'s love and purpose.',
      intro: 'Whether you are married, preparing for marriage, raising children, or influencing family members, this breakout will help you cultivate healthy, Christ-centered relationships that bear lasting fruit.',
      expects: [
        'Explore biblical principles for thriving families.',
        'Learn practical tools for strengthening relationships.',
        'Discuss challenges and opportunities within family life.',
        'Leave encouraged to build a lasting spiritual legacy.',
      ],
    },
    fr: {
      title: 'Fécondité dans le Mariage & la Famille',
      tagline: 'Construisez des relations qui reflètent l\'amour et le but de Dieu.',
      intro: 'Que vous soyez mariée, en préparation au mariage, en train d\'élever des enfants ou d\'influencer des membres de votre famille, cet atelier vous aidera à cultiver des relations saines et centrées sur Christ qui portent des fruits durables.',
      expects: [
        'Explorer les principes bibliques pour des familles épanouies.',
        'Apprendre des outils pratiques pour renforcer les relations.',
        'Discuter des défis et opportunités au sein de la vie familiale.',
        'Repartir encouragée à construire un héritage spirituel durable.',
      ],
    },
  },
  {
    icon: '🌟',
    en: {
      title: 'Leadership & Influence',
      tagline: 'Lead with confidence, character, and purpose.',
      intro: 'You don\'t need a title to be a leader. Wherever God has placed you, you have influence. This breakout will help you understand how to lead authentically, serve effectively, and inspire others through your example.',
      expects: [
        'Discover your unique sphere of influence.',
        'Learn principles of Christ-centered leadership.',
        'Develop confidence in your leadership journey.',
        'Leave equipped to lead with wisdom and humility.',
      ],
    },
    fr: {
      title: 'Leadership & Influence',
      tagline: 'Dirigez avec confiance, caractère et but.',
      intro: 'Vous n\'avez pas besoin d\'un titre pour être un leader. Partout où Dieu vous a placée, vous avez de l\'influence. Cet atelier vous aidera à comprendre comment diriger de manière authentique, servir efficacement et inspirer les autres par votre exemple.',
      expects: [
        'Découvrir votre sphère d\'influence unique.',
        'Apprendre les principes d\'un leadership centré sur Christ.',
        'Développer la confiance dans votre parcours de leadership.',
        'Repartir équipée pour diriger avec sagesse et humilité.',
      ],
    },
  },
  {
    icon: '🎯',
    en: {
      title: 'Purpose & Calling',
      tagline: 'Clarify what God may be calling you to do.',
      intro: 'Have you ever wondered what God created you for? In this breakout, you\'ll explore how God shapes purpose, calling, gifts, passions, and opportunities to accomplish His plans through your life.',
      expects: [
        'Reflect on your gifts, strengths, and passions.',
        'Gain clarity about your purpose and calling.',
        'Learn how to take practical next steps toward God\'s vision.',
        'Leave motivated to pursue your God-given assignment.',
      ],
    },
    fr: {
      title: 'But & Vocation',
      tagline: 'Clarifiez ce à quoi Dieu vous appelle peut-être.',
      intro: 'Vous êtes-vous déjà demandé pour quoi Dieu vous a créée ? Dans cet atelier, vous explorerez comment Dieu façonne le but, la vocation, les dons, les passions et les opportunités pour accomplir Ses plans à travers votre vie.',
      expects: [
        'Réfléchir à vos dons, forces et passions.',
        'Obtenir de la clarté sur votre but et votre vocation.',
        'Apprendre à faire des prochaines étapes pratiques vers la vision de Dieu.',
        'Repartir motivée à poursuivre votre mission donnée par Dieu.',
      ],
    },
  },
  {
    icon: '🌱',
    en: {
      title: 'Faithful Stewardship',
      tagline: 'Manage God\'s resources with wisdom and purpose.',
      intro: 'God entrusts each of us with time, talents, opportunities, relationships, and finances. This breakout will help you learn how to steward these gifts faithfully so they can produce lasting fruit.',
      expects: [
        'Explore biblical principles of stewardship.',
        'Learn practical approaches to managing resources wisely.',
        'Evaluate priorities and areas for growth.',
        'Leave with tools to live more intentionally and fruitfully.',
      ],
    },
    fr: {
      title: 'Intendance Fidèle',
      tagline: 'Gérez les ressources de Dieu avec sagesse et intention.',
      intro: 'Dieu nous confie à chacune du temps, des talents, des opportunités, des relations et des finances. Cet atelier vous aidera à apprendre comment gérer fidèlement ces dons afin qu\'ils puissent produire des fruits durables.',
      expects: [
        'Explorer les principes bibliques de l\'intendance.',
        'Apprendre des approches pratiques pour gérer sagement les ressources.',
        'Évaluer les priorités et les domaines de croissance.',
        'Repartir avec des outils pour vivre de manière plus intentionnelle et fructueuse.',
      ],
    },
  },
  {
    icon: '🤝',
    en: {
      title: 'Mentorship Across Generations',
      tagline: 'Learn from others and invest in the next generation.',
      intro: 'Some of life\'s greatest growth happens through relationships. This breakout will explore how women of different ages and experiences can encourage, support, and strengthen one another in their walk with Christ.',
      expects: [
        'Understand the value of mentoring relationships.',
        'Learn how to find, become, or support a mentor.',
        'Explore ways to bridge generational gaps.',
        'Leave inspired to build meaningful intergenerational connections.',
      ],
    },
    fr: {
      title: 'Mentorat entre Générations',
      tagline: 'Apprenez des autres et investissez dans la prochaine génération.',
      intro: 'Certaines des plus grandes croissances de la vie se produisent à travers les relations. Cet atelier explorera comment les femmes de différents âges et expériences peuvent s\'encourager, se soutenir et se renforcer mutuellement dans leur marche avec Christ.',
      expects: [
        'Comprendre la valeur des relations de mentorat.',
        'Apprendre comment trouver, devenir ou soutenir un mentor.',
        'Explorer des façons de combler les écarts générationnels.',
        'Repartir inspirée à construire des connexions intergénérationnelles significatives.',
      ],
    },
  },
  {
    icon: '🌍',
    en: {
      title: 'Missions & Disciple-Making',
      tagline: 'Join God in transforming lives and communities.',
      intro: 'God\'s mission is bigger than any one of us — and He invites every believer to participate. In this breakout, you\'ll discover practical ways to share your faith, make disciples, and engage in God\'s work both locally and globally.',
      expects: [
        'Gain a clearer understanding of God\'s mission.',
        'Learn practical approaches to disciple-making.',
        'Explore opportunities to serve and impact others.',
        'Leave inspired to live as a disciple who makes disciples.',
      ],
    },
    fr: {
      title: 'Missions & Faire des Disciples',
      tagline: 'Rejoignez Dieu pour transformer des vies et des communautés.',
      intro: 'La mission de Dieu est plus grande que chacune d\'entre nous — et Il invite chaque croyant à y participer. Dans cet atelier, vous découvrirez des façons pratiques de partager votre foi, de faire des disciples et de vous engager dans l\'œuvre de Dieu, localement et mondialement.',
      expects: [
        'Acquérir une compréhension plus claire de la mission de Dieu.',
        'Apprendre des approches pratiques pour faire des disciples.',
        'Explorer des opportunités pour servir et impacter les autres.',
        'Repartir inspirée à vivre en tant que disciple qui fait des disciples.',
      ],
    },
  },
]

function SessionCard({ session, accent }: { session: Session; accent: string }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const s = lang === 'en' ? session.en : session.fr

  return (
    <div className={`rounded-3xl border overflow-hidden transition-all duration-300 ${open ? 'shadow-md border-[#2D6A4F]/30' : 'shadow-sm border-gray-100 bg-white'}`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-start gap-4 p-6 text-left transition-colors duration-200 ${open ? 'bg-[#2D6A4F]' : 'bg-white hover:bg-[#F0FAF4]'}`}
      >
        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-colors ${open ? 'bg-white/20' : 'bg-[#F0FAF4]'}`}>
          {session.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-base leading-snug mb-1 transition-colors ${open ? 'text-white' : 'text-[#1B3A5C]'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
            {s.title}
          </h3>
          <p className={`text-sm leading-snug transition-colors ${open ? 'text-[#74C69D]' : 'text-gray-400 italic'}`}>
            {s.tagline}
          </p>
        </div>
        <ChevronDown size={18} className={`flex-shrink-0 mt-1 transition-all duration-300 ${open ? 'rotate-180 text-white' : 'text-[#2D6A4F]'}`} />
      </button>

      <div style={{ maxHeight: open ? '600px' : '0px' }} className="transition-[max-height] duration-500 ease-in-out overflow-hidden">
        <div className="px-6 pb-6 pt-5 bg-white border-t border-[#74C69D]/20 space-y-4">
          <p className="text-gray-600 text-sm leading-relaxed">{s.intro}</p>
          <div>
            <p className="text-[#2D6A4F] text-xs font-bold uppercase tracking-widest mb-3">
              {lang === 'en' ? 'You can expect to:' : 'Vous pouvez vous attendre à :'}
            </p>
            <ul className="space-y-2">
              {s.expects.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                  <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoundSection({ label, theme, sessions, color, bg }: {
  label: string; theme: string; sessions: Session[]; color: string; bg: string
}) {
  return (
    <section className={`py-16 ${bg}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3`} style={{ backgroundColor: color + '18', color }}>
              {label}
            </span>
            <h2 className="text-3xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {theme}
            </h2>
            <div className="w-14 h-0.5 mx-auto mt-4" style={{ backgroundColor: color }} />
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((s, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <SessionCard session={s} accent={color} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

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
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Breakout Sessions' : 'Ateliers en Groupes'}
            </h1>
            <p className="text-[#74C69D] text-lg max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Two rounds of focused, intimate sessions — choose the topic that speaks to your season. Click any session to read more.'
                : 'Deux tours d\'ateliers ciblés et intimes — choisissez le sujet qui correspond à votre saison. Cliquez sur un atelier pour en savoir plus.'}
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ── ROUND 1 ──────────────────────────────────────────────────────── */}
      <RoundSection
        label={lang === 'en' ? 'Round 1 · Day 2 · August 11' : 'Tour 1 · Jour 2 · 11 Août'}
        theme={lang === 'en' ? 'Roots That Heal & Deepen' : 'Racines qui Guérissent & Approfondissent'}
        sessions={ROUND1}
        color="#2D6A4F"
        bg="bg-white"
      />

      {/* ── ROUND 2 ──────────────────────────────────────────────────────── */}
      <RoundSection
        label={lang === 'en' ? 'Round 2 · Day 3 · August 12' : 'Tour 2 · Jour 3 · 12 Août'}
        theme={lang === 'en' ? 'Bearing Lasting Fruits' : 'Porter des Fruits Durables'}
        sessions={ROUND2}
        color="#C9848A"
        bg="bg-[#FDF6EC]"
      />

      {/* ── INFO BANNER ──────────────────────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-[#74C69D]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <div className="bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 rounded-2xl p-6">
              <p className="text-2xl mb-3">🌿</p>
              <p className="text-[#1B3A5C] font-semibold mb-2">
                {lang === 'en' ? 'Session selection happens at the conference' : 'La sélection des ateliers se fait lors de la conférence'}
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
            <h2 className="text-3xl font-bold text-white mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
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
