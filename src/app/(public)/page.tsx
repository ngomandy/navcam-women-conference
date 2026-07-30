'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'
import { formatCurrency } from '@/lib/utils'
import { FloatingLeaves } from '@/components/public/FloatingLeaves'
import { ScrollReveal } from '@/components/public/ScrollReveal'
import { AnimatedCounter } from '@/components/public/AnimatedCounter'
import { ScriptureHighlight } from '@/components/public/ScriptureHighlight'
import { RegistrationProgress } from '@/components/public/RegistrationProgress'
import { ShareButtons } from '@/components/public/ShareButtons'
import { NewsletterSignup } from '@/components/public/NewsletterSignup'
import { WhatsAppCommunity } from '@/components/public/WhatsAppCommunity'

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: 'I am a wonderful woman called to not remain silent so that generations can rise and be blessed.',
  },
  {
    quote: 'To raise the next generation I must be on my knees.',
  },
  {
    quote: 'Impact is seen and not discussed.',
  },
  {
    quote: 'Love must be loving and active. For the gospel to go through.',
  },
]

// ─── OBJECTIVE DETAILS ────────────────────────────────────────────────────────
const OBJECTIVE_DETAILS: { en: string[]; fr: string[] }[] = [
  {
    en: [
      'Jesus declared, "I am the vine; you are the branches" (John 15:5). Lasting fruit is only possible when our lives are deeply connected to Him. During this conference, you will be invited into a deeper relationship with Christ through the study of Scripture, personal reflection, worship, and prayer. Together, we will learn what it means to abide in Him daily — not merely as a spiritual practice, but as a way of life.',
      'As women, we often carry many responsibilities and demands, yet Christ calls us first to sit at His feet and know Him intimately. Through powerful biblical teaching and guided times of prayer, you will be encouraged to strengthen your spiritual foundations, hear God\'s voice more clearly, and cultivate a life that is firmly rooted in His truth. As your roots grow deeper in Christ, you will discover a renewed confidence, stability, and joy that cannot be shaken by life\'s circumstances.',
    ],
    fr: [
      'Jésus a déclaré : « Je suis le cep, vous êtes les sarments » (Jean 15:5). Un fruit durable n\'est possible que lorsque nos vies sont profondément connectées à Lui. Lors de cette conférence, vous serez invitées à approfondir votre relation avec Christ à travers l\'étude des Écritures, la réflexion personnelle, l\'adoration et la prière. Ensemble, nous apprendrons ce que signifie demeurer en Lui au quotidien — non pas simplement comme une pratique spirituelle, mais comme un mode de vie.',
      'En tant que femmes, nous portons souvent de nombreuses responsabilités, mais Christ nous appelle d\'abord à nous asseoir à Ses pieds et à Le connaître intimement. À travers un enseignement biblique puissant et des moments guidés de prière, vous serez encouragées à renforcer vos fondements spirituels, à entendre la voix de Dieu plus clairement et à cultiver une vie fermement ancrée dans Sa vérité. À mesure que vos racines s\'approfondissent en Christ, vous découvrirez une confiance, une stabilité et une joie renouvelées qu\'aucune circonstance de la vie ne pourra ébranler.',
    ],
  },
  {
    en: [
      'The Lord is not only interested in what we do; He cares deeply about who we are. Many women carry hidden wounds, disappointments, fears, regrets, and burdens that affect their relationship with God, themselves, and others. This conference will create space for Christ, the Great Healer, to minister to every area of our lives.',
      'Through biblical teaching, prayer, worship, and authentic community, you will be invited to bring your whole heart before God. We believe that Jesus still heals broken hearts, restores hope, renews minds, and brings freedom where there has been bondage. As you encounter His love and grace, you will experience greater emotional, spiritual, and relational wholeness — allowing you to move forward in freedom and become all that God has created you to be.',
    ],
    fr: [
      'Le Seigneur ne s\'intéresse pas seulement à ce que nous faisons ; Il se soucie profondément de qui nous sommes. Beaucoup de femmes portent des blessures cachées, des déceptions, des peurs, des regrets et des fardeaux qui affectent leur relation avec Dieu, avec elles-mêmes et avec les autres. Cette conférence créera un espace pour que Christ, le Grand Guérisseur, puisse ministrer à chaque aspect de nos vies.',
      'À travers l\'enseignement biblique, la prière, l\'adoration et une communauté authentique, vous serez invitées à apporter tout votre cœur devant Dieu. Nous croyons que Jésus guérit encore les cœurs brisés, restaure l\'espoir, renouvelle les esprits et apporte la liberté là où il y a eu servitude. En rencontrant Son amour et Sa grâce, vous vivrez une plus grande plénitude émotionnelle, spirituelle et relationnelle — vous permettant d\'avancer dans la liberté et de devenir tout ce que Dieu vous a créées pour être.',
    ],
  },
  {
    en: [
      'God\'s desire is not simply that we survive spiritually, but that we flourish and bear fruit that remains (John 15:8, 16). Fruitfulness is the visible evidence of Christ\'s life flowing through us — transforming our character, relationships, homes, ministries, workplaces, and communities.',
      'Throughout the conference, you will receive practical biblical tools and spiritual encouragement to help you live out your faith intentionally. You will learn how to cultivate Christlike character, steward your gifts faithfully, influence others for God\'s glory, and remain fruitful through every season of life. Whether you are serving in ministry, raising a family, leading in your workplace, or impacting your community, you will be equipped to produce fruit that reflects God\'s heart and advances His kingdom.',
    ],
    fr: [
      'Le désir de Dieu n\'est pas simplement que nous survivions spirituellement, mais que nous prospérions et portions des fruits qui demeurent (Jean 15:8, 16). La fécondité est la preuve visible de la vie de Christ qui coule à travers nous — transformant notre caractère, nos relations, nos foyers, nos ministères, nos lieux de travail et nos communautés.',
      'Tout au long de la conférence, vous recevrez des outils bibliques pratiques et des encouragements spirituels pour vous aider à vivre votre foi de manière intentionnelle. Vous apprendrez à cultiver un caractère semblable à celui de Christ, à gérer fidèlement vos dons, à influencer les autres pour la gloire de Dieu et à rester fructueuses à travers chaque saison de la vie. Que vous serviez dans un ministère, élèviez une famille, dirigiez dans votre lieu de travail ou impactiez votre communauté, vous serez équipées pour produire des fruits qui reflètent le cœur de Dieu et font avancer Son royaume.',
    ],
  },
  {
    en: [
      'God never intended for women to walk their spiritual journey alone. Throughout Scripture, we see the beauty and power of women encouraging, mentoring, praying for, and strengthening one another. This conference is an opportunity to experience genuine Christian sisterhood centered on Christ.',
      'As women from different backgrounds and generations gather together, you will form meaningful connections, share experiences, and learn from one another. Through fellowship, prayer, discussions, and shared moments of worship, bonds will be formed that extend beyond the conference itself. You will leave encouraged, supported, and connected to a community of women who are committed to growing in Christ and helping one another remain rooted and fruitful.',
    ],
    fr: [
      'Dieu n\'a jamais eu l\'intention que les femmes marchent seules dans leur voyage spirituel. À travers les Écritures, nous voyons la beauté et la puissance des femmes qui s\'encouragent, se mentorent, prient les unes pour les autres et se fortifient mutuellement. Cette conférence est une opportunité de vivre une véritable sororité chrétienne centrée sur Christ.',
      'Alors que des femmes de différents milieux et générations se rassemblent, vous formerez des liens significatifs, partagerez des expériences et apprendrez les unes des autres. À travers la communion fraternelle, la prière, les discussions et les moments partagés d\'adoration, des liens se formeront qui s\'étendront au-delà de la conférence elle-même. Vous repartirez encouragées, soutenues et connectées à une communauté de femmes engagées à croître en Christ et à s\'aider mutuellement à rester enracinées et fructueuses.',
    ],
  },
  {
    en: [
      'Every woman has been intentionally created by God and uniquely called to participate in His redemptive work in the world. Yet many women struggle with questions about identity, calling, and significance. This conference will help you explore who God says you are and how He desires to use your life for His glory.',
      'Through biblical teaching and personal reflection, you will gain a clearer understanding of your gifts, passions, experiences, and opportunities for influence. More importantly, you will be challenged to see your purpose not merely as what you do, but as who you are in Christ. As your identity becomes firmly rooted in Him, you will be empowered to walk confidently in your calling and faithfully fulfill the unique assignment God has entrusted to you.',
    ],
    fr: [
      'Chaque femme a été intentionnellement créée par Dieu et uniquement appelée à participer à Son œuvre rédemptrice dans le monde. Pourtant, beaucoup de femmes luttent avec des questions d\'identité, de vocation et de signification. Cette conférence vous aidera à explorer ce que Dieu dit de qui vous êtes et comment Il désire utiliser votre vie pour Sa gloire.',
      'À travers l\'enseignement biblique et la réflexion personnelle, vous acquerrez une compréhension plus claire de vos dons, passions, expériences et opportunités d\'influence. Plus important encore, vous serez mises au défi de voir votre but non pas simplement comme ce que vous faites, mais comme qui vous êtes en Christ. À mesure que votre identité s\'enracine fermement en Lui, vous serez habilitées à marcher avec confiance dans votre vocation et à accomplir fidèlement la mission unique que Dieu vous a confiée.',
    ],
  },
  {
    en: [
      'An encounter with Christ always leads to a mission. As women rooted in Christ and transformed by His presence, we are called to bear fruit that blesses others and points them to Him. The conference will culminate in a powerful call to live intentionally as women of influence wherever God has placed us.',
      'Whether in your family, church, workplace, neighborhood, campus, or nation, God desires to use you as an instrument of His love, truth, and grace. You will be challenged and encouraged to step out in faith, embrace your role as a disciple-maker, and carry the life of Christ into every sphere of influence. As you return home, you will do so not merely inspired, but commissioned — ready to abide in Christ, bear lasting fruit, and participate wholeheartedly in God\'s mission in the world.',
    ],
    fr: [
      'Une rencontre avec Christ conduit toujours à une mission. En tant que femmes enracinées en Christ et transformées par Sa présence, nous sommes appelées à porter des fruits qui bénissent les autres et les orientent vers Lui. La conférence culminera par un puissant appel à vivre intentionnellement comme des femmes d\'influence partout où Dieu nous a placées.',
      'Que ce soit dans votre famille, votre église, votre lieu de travail, votre quartier, votre campus ou votre nation, Dieu désire vous utiliser comme instrument de Son amour, de Sa vérité et de Sa grâce. Vous serez mises au défi et encouragées à vous avancer dans la foi, à embrasser votre rôle de femme faisant des disciples et à porter la vie de Christ dans chaque sphère d\'influence. En rentrant chez vous, vous le ferez non pas simplement inspirées, mais commissionnées — prêtes à demeurer en Christ, à porter des fruits durables et à participer pleinement à la mission de Dieu dans le monde.',
    ],
  },
]

function ObjectivesSection() {
  const { t, lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <div className="mb-8">
      <ScrollReveal>
        <h3
          className="text-xl font-semibold text-[#2D6A4F] text-center mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.about.objectives.title}
        </h3>
      </ScrollReveal>
      <div className="space-y-3 max-w-4xl mx-auto">
        {t.about.objectives.list.map((obj, i) => {
          const isOpen = openIndex === i
          const detail = OBJECTIVE_DETAILS[i]
          return (
            <ScrollReveal key={i} delay={i * 60}>
              <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-[#2D6A4F]/40 shadow-md' : 'border-[#74C69D]/20 shadow-sm bg-white'}`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${isOpen ? 'bg-[#2D6A4F] text-white' : 'bg-white hover:bg-[#F0FAF4]'}`}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isOpen ? 'bg-white text-[#2D6A4F]' : 'bg-[#2D6A4F] text-white'}`}>
                    {i + 1}
                  </div>
                  <p className={`flex-1 font-semibold text-sm sm:text-base leading-snug ${isOpen ? 'text-white' : 'text-[#1B3A5C]'}`}>
                    {obj}
                  </p>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-[#2D6A4F]'}`}
                  />
                </button>
                <div
                  ref={el => { contentRefs.current[i] = el }}
                  style={{ maxHeight: isOpen ? (contentRefs.current[i]?.scrollHeight ?? 500) + 'px' : '0px' }}
                  className="transition-[max-height] duration-500 ease-in-out overflow-hidden"
                >
                  <div className="px-6 py-5 border-t border-[#74C69D]/20 bg-white space-y-3">
                    {detail && (lang === 'en' ? detail.en : detail.fr).map((para, j) => (
                      <p key={j} className="text-gray-600 text-sm leading-relaxed">{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────
function buildFaq(lang: 'en' | 'fr') {
  return [
    {
      q: lang === 'en' ? 'What is included in the registration fee?' : "Qu'est-ce qui est inclus dans les frais d'inscription ?",
      a: lang === 'en'
        ? '5 full days of conference sessions, all meals (breakfast, lunch & dinner), your conference pack & materials, on-site accommodation, and the Day 3 excursion.'
        : '5 jours complets de sessions, tous les repas (petit-déjeuner, déjeuner & dîner), votre pack de conférence & matériels, l\'hébergement sur place et l\'excursion du Jour 3.',
    },
    {
      q: lang === 'en' ? 'When is the Early Bird deadline?' : "Quelle est la date limite de l'inscription anticipée ?",
      a: lang === 'en'
        ? 'The Early Bird rate of 30 000 FCFA is available until June 30, 2026. After that date, the standard rate of 35 000 FCFA applies.'
        : 'Le tarif anticipé de 30 000 FCFA est disponible jusqu\'au 30 juin 2026. Après cette date, le tarif standard de 35 000 FCFA s\'applique.',
    },
    {
      q: lang === 'en' ? 'How do I pay my registration fees?' : 'Comment puis-je payer mes frais d\'inscription ?',
      a: lang === 'en'
        ? 'Payment is made via MTN Mobile Money (+237 670 546 041) or Orange Money (+237 694 756 099). Use "NavCamWomen2026 — [Your Name]" as your payment reference, then send the screenshot to the finance team on WhatsApp.'
        : 'Le paiement se fait via MTN Mobile Money (+237 670 546 041) ou Orange Money (+237 694 756 099). Utilisez "NavCamWomen2026 — [Votre Nom]" comme référence, puis envoyez la capture d\'écran à l\'équipe finance sur WhatsApp.',
    },
    {
      q: lang === 'en' ? 'Can I come with my children?' : 'Puis-je venir avec mes enfants ?',
      a: lang === 'en'
        ? 'Yes! Children are welcome. Please indicate the number and ages of your children during registration so we can make the appropriate arrangements for them. An additional registration fee of 5,000 FCFA applies per child over 5 years old.'
        : 'Oui ! Les enfants sont les bienvenus. Veuillez indiquer le nombre et l\'âge de vos enfants lors de l\'inscription afin que nous puissions prendre les dispositions appropriées. Des frais d\'inscription supplémentaires de 5 000 FCFA s\'appliquent par enfant de plus de 5 ans.',
    },
    {
      q: lang === 'en' ? 'What language will the sessions be in?' : 'Dans quelle langue se dérouleront les sessions ?',
      a: lang === 'en'
        ? 'The conference is bilingual — sessions will be conducted in both French and English to welcome all women across Cameroon.'
        : 'La conférence est bilingue — les sessions se déroulent en français et en anglais pour accueillir toutes les femmes du Cameroun.',
    },
    {
      q: lang === 'en' ? 'Where exactly is the venue?' : 'Où se trouve exactement le lieu de la conférence ?',
      a: lang === 'en'
        ? 'The conference will be held at Care & Hope Center, Yaoundé, Cameroon. Step-by-step directions and a short route video are on the Venue page.'
        : 'La conférence se tiendra au Care & Hope Center, Yaoundé, Cameroun. Un itinéraire pas à pas et une courte vidéo du trajet sont disponibles sur la page Lieu.',
      link: { href: 'https://maps.app.goo.gl/J9jLSDLPDpMimPtx7', labelEn: '🗺️ View on Google Maps', labelFr: '🗺️ Voir sur Google Maps' },
    },
    {
      q: lang === 'en' ? 'What should I bring?' : 'Que dois-je apporter ?',
      a: lang === 'en'
        ? 'Please bring: your Bible, a notebook & pen, personal toiletries, comfortable clothing & shoes (including sportswear) for 5 days, one outfit from a previous NavCam Women\'s Conference, a gala/formal dress, a bedsheet, and any other personal items you may need. Your conference pack will be provided upon arrival.'
        : 'Veuillez apporter : votre Bible, un cahier & stylo, vos articles de toilette, des vêtements & chaussures confortables (y compris une tenue de sport) pour 5 jours, une tenue issue d\'une précédente conférence des femmes NavCam, une robe de gala, un drap de lit et tout article personnel dont vous pourriez avoir besoin. Votre pack de conférence vous sera remis à l\'arrivée.',
    },
    {
      q: lang === 'en' ? 'What is the cancellation policy?' : 'Quelle est la politique d\'annulation ?',
      a: lang === 'en'
        ? 'Please note that the 10,000 FCFA deposit and all contributions are non-refundable. If you are unable to attend, please inform the team as soon as possible via WhatsApp so we can take note.'
        : 'Veuillez noter que l\'acompte de 10 000 FCFA et toutes les contributions ne sont pas remboursables. Si vous ne pouvez pas assister, veuillez en informer l\'équipe dès que possible via WhatsApp afin que nous puissions en prendre note.',
    },
  ]
}

function FAQSection() {
  const { lang } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqs = buildFaq(lang)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'en' ? 'Common Questions' : 'Questions Fréquentes'}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en' ? 'Frequently Asked Questions' : 'Questions Fréquemment Posées'}
          </h2>
          <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-[#FDF6EC] rounded-2xl border border-[#74C69D]/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="font-semibold text-[#1B3A5C] text-sm leading-snug">{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#C9A84C] flex items-center justify-center text-[#C9A84C] text-xs font-bold transition-transform ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  {(faq as { a: string; q: string; link?: { href: string; labelEn: string; labelFr: string } }).link && (
                    <a
                      href={(faq as { link: { href: string; labelEn: string; labelFr: string } }).link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 bg-[#2D6A4F] hover:bg-[#40916C] text-white text-xs font-semibold rounded-full transition-all"
                    >
                      {lang === 'en'
                        ? (faq as { link: { href: string; labelEn: string; labelFr: string } }).link.labelEn
                        : (faq as { link: { href: string; labelEn: string; labelFr: string } }).link.labelFr}
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          {lang === 'en'
            ? 'Still have questions? '
            : 'Vous avez encore des questions ? '}
          <a
            href="https://wa.me/237696238088"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2D6A4F] font-semibold hover:underline"
          >
            {lang === 'en' ? 'Chat with us on WhatsApp' : 'Écrivez-nous sur WhatsApp'}
          </a>
        </p>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { lang } = useLanguage()
  const attribution = lang === 'en' ? 'NavCam Women\'s Conference — Previous Edition' : 'Conférence Femmes NavCam — Édition Précédente'

  return (
    <section className="py-20 bg-[#FDF6EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'en' ? 'Voices' : 'Témoignages'}
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en' ? 'Words from Previous Attendees' : 'Paroles des Participantes Précédentes'}
          </h2>
          <div className="w-16 h-0.5 bg-[#C9848A] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {testimonials.map((item, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#74C69D]/20 flex flex-col h-full">
                <span className="text-[#C9848A] text-4xl leading-none mb-3">&ldquo;</span>
                <p
                  className="text-gray-700 text-sm leading-relaxed italic flex-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.quote}
                </p>
                <div className="mt-5 pt-4 border-t border-[#74C69D]/20">
                  <p className="text-[#2D6A4F] text-xs font-semibold">— {attribution}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

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
                key={String(unit.value)}
                className="text-white text-2xl sm:text-3xl font-bold tabular-nums animate-countdown-tick"
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
          <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
          <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M60 110 Q80 90 60 60 Q40 90 60 110Z" fill="#74C69D" opacity="0.5" />
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

  // Typewriter effect for hero title
  const titleText = lang === 'en'
    ? "2026 Navigators of Cameroon National Women's Conference"
    : 'Conférence Nationale des Femmes Navigateurs du Cameroun 2026'
  const [typed, setTyped] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  useEffect(() => {
    let i = 0
    setTyped('')
    setTypingDone(false)
    const id = setInterval(() => {
      i++
      setTyped(titleText.slice(0, i))
      if (i >= titleText.length) { clearInterval(id); setTypingDone(true) }
    }, 36)
    return () => clearInterval(id)
  }, [titleText])

  // Parallax background
  const parallaxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.35}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      deadline: lang === 'en' ? 'For team leaders' : 'Pour les leaders',
      highlight: false,
    },
  ]

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2D6A4F] via-[#1B3A5C] to-[#40916C]">
        {/* Parallax background layer */}
        <div ref={parallaxRef} className="absolute inset-0" style={{ willChange: 'transform' }}>
          <VinePattern />
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#74C69D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#C9848A]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl" />
        </div>
        <FloatingLeaves />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto py-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-[#C9A84C] text-sm font-medium backdrop-blur-sm">
            <span>🌿</span>
            <span>{t.conference.daysCount}</span>
          </div>

          {/* Title — typewriter */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {typed}
            {!typingDone && <span className="typewriter-cursor" aria-hidden="true" />}
          </h1>

          {/* Theme & Full Verse */}
          <div className="my-6">
            <p
              className="text-xl sm:text-2xl md:text-3xl text-[#F4C2C2] italic font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              &ldquo;{t.conference.theme}&rdquo;
            </p>
            <div className="mt-4 max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <p className="text-white/85 text-sm sm:text-base italic leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? (
                  <>&ldquo;I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing. If you do not remain in me, you are like a branch that is thrown away and withers; such branches are picked up, thrown into the fire and burned. If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you. This is to my Father&rsquo;s glory, that you bear much fruit, showing yourselves to be my disciples.&rdquo;</>
                ) : (
                  <>&ldquo;Je suis le cep, vous &ecirc;tes les sarments. Celui qui demeure en moi et en qui je demeure porte beaucoup de fruit, car sans moi vous ne pouvez rien faire. Si quelqu&apos;un ne demeure pas en moi, il est jet&eacute; dehors comme un sarment, et il s&egrave;che&nbsp;; on ramasse ces sarments, on les jette au feu, et ils br&ucirc;lent. Si vous demeurez en moi et que mes paroles demeurent en vous, demandez ce que vous voudrez et cela vous sera accord&eacute;. C&apos;est en ceci que mon P&egrave;re est glorifi&eacute;&nbsp;: que vous portiez beaucoup de fruit, et que vous soyez ainsi mes disciples.&rdquo;</>
                )}
              </p>
              <p className="text-[#C9A84C] text-sm mt-2 font-semibold">
                — {t.conference.scripture}
              </p>
            </div>
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
            <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: 5,   suffix: '',  icon: '📅', labelEn: 'Days',                labelFr: 'Jours' },
                { value: 20,  suffix: '',  icon: '👑', labelEn: 'Women Leaders',        labelFr: 'Femmes Leaders' },
                { value: 100, suffix: '+', icon: '🌿', labelEn: 'Women Expected',       labelFr: 'Femmes Attendues' },
                { value: 9,   suffix: '',  icon: '🌍', labelEn: 'Regions Represented',  labelFr: 'Régions Représentées' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div
                    className="text-3xl sm:text-4xl font-bold text-[#2D6A4F]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1200 + i * 150} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {lang === 'en' ? stat.labelEn : stat.labelFr}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
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
                : "Bienvenue à un rassemblement de femmes enracinées dans la foi, la sororité et le but. Cette conférence est un espace sacré pour chaque femme pour rencontrer Christ profondément, être guérie et être équipée pour porter des fruits durables dans son monde."}
            </p>
          </div>

          {/* Objectives Accordion */}
          <ObjectivesSection />
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
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#74C69D]/30 -translate-y-1/2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 relative">
              {dayThemes.map((day, i) => (
                <ScrollReveal key={i} delay={i * 120}>
                  <div className="relative flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0">
                    {i < dayThemes.length - 1 && (
                      <div className="lg:hidden absolute left-6 top-12 w-0.5 h-full bg-[#74C69D]/30 -z-0" />
                    )}
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
                </ScrollReveal>
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

      {/* ========== SCRIPTURE HIGHLIGHT ========== */}
      <ScriptureHighlight />

      {/* ========== TESTIMONIALS ========== */}
      <TestimonialsSection />

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
              <ScrollReveal key={i} delay={i * 130}>
                <div
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
                  <p className={`text-2xl font-bold mb-1 ${fee.highlight ? 'text-[#F0D080]' : 'text-[#2D6A4F]'}`}>
                    {formatCurrency(fee.amount)}
                  </p>
                  <p className={`text-xs ${fee.highlight ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                    {fee.deadline}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-8">
            <RegistrationProgress />
          </div>

          <div className="text-center mt-6">
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

      {/* ========== NEWSLETTER ========== */}
      <section className="py-16 bg-gradient-to-br from-[#FDF6EC] to-[#F4C2C2]/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Stay Informed' : 'Restez Informée'}
            </p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {lang === 'en' ? "Not Ready to Register Yet?" : 'Pas encore prête à vous inscrire ?'}
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">
              {lang === 'en'
                ? 'Leave your email and we will keep you updated on all conference news, reminders, and updates.'
                : 'Laissez votre email et nous vous tiendrons informée de toutes les actualités, rappels et mises à jour de la conférence.'}
            </p>
            <NewsletterSignup />
          </ScrollReveal>
        </div>
      </section>

      {/* ========== WHATSAPP COMMUNITY ========== */}
      <WhatsAppCommunity />

      {/* ========== FAQ ========== */}
      <FAQSection />

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
          <div className="mt-8 flex justify-center">
            <ShareButtons />
          </div>
        </div>
      </section>
    </div>
  )
}

