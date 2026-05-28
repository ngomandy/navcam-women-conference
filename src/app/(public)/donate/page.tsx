'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/components/LanguageContext'

// ─────────────────────────────────────────────
// PAYMENT DETAILS
// ─────────────────────────────────────────────
const ACCOUNT_NAME = 'Matchim Tchapoa epse Ribouem Christelle Adeline'
const FUNDRAISING_GOAL = 5_000_000 // FCFA

const PAYMENT_METHODS = [
  {
    id: 'mtn',
    icon: '🟡',
    nameEn: 'MTN Mobile Money',
    nameFr: 'MTN Mobile Money',
    accountName: ACCOUNT_NAME,
    number: '+237 670 546 041',
    numberRaw: '237670546041',
    instructionEn: 'Dial *126# or use the MoMo app. Send to the number above. Use your full name as the payment reference.',
    instructionFr: 'Composez *126# ou utilisez l\'appli MoMo. Envoyez au numéro ci-dessus. Utilisez votre nom complet comme référence de paiement.',
    available: true,
    color: '#FFCC00',
    bgColor: '#FFFBEB',
    borderColor: 'border-yellow-300',
  },
  {
    id: 'orange',
    icon: '🟠',
    nameEn: 'Orange Money',
    nameFr: 'Orange Money',
    accountName: ACCOUNT_NAME,
    number: '+237 694 756 099',
    numberRaw: '237694756099',
    instructionEn: 'Use the Orange Money app or USSD. Send to the number above. Use your full name as the payment reference.',
    instructionFr: 'Utilisez l\'application Orange Money ou le code USSD. Envoyez au numéro ci-dessus. Utilisez votre nom complet comme référence.',
    available: true,
    color: '#FF6600',
    bgColor: '#FFF7F0',
    borderColor: 'border-orange-300',
  },
  {
    id: 'bank',
    icon: '🏦',
    nameEn: 'Bank Transfer',
    nameFr: 'Virement Bancaire',
    accountName: ACCOUNT_NAME,
    number: null,
    numberRaw: null,
    whatsappNumber: '670546041',
    instructionEn: 'Bank details are shared privately. Send a WhatsApp message to one of the numbers below to receive bank transfer instructions.',
    instructionFr: 'Les coordonnées bancaires sont partagées en privé. Envoyez un message WhatsApp à l\'un des numéros ci-dessous pour recevoir les instructions de virement bancaire.',
    available: true,
    color: '#1B3A5C',
    bgColor: '#F0F4F8',
    borderColor: 'border-blue-200',
  },
]

const DONATION_TIERS = [
  { value: 5000,  icon: '🌱', labelEn: 'Seed Gift',    labelFr: 'Don Graine'      },
  { value: 10000, icon: '🌿', labelEn: 'Growth Gift',  labelFr: 'Don Croissance'  },
  { value: 25000, icon: '🌳', labelEn: 'Harvest Gift', labelFr: 'Don Récolte'     },
  { value: 0,     icon: '💛', labelEn: 'My Own Amount',labelFr: 'Mon Propre Montant' },
]

const DONATION_PURPOSES = {
  en: [
    'Scholarship fund — sponsor a sister who cannot afford registration fees',
    "Children's program materials and care",
    'Conference décor, ambience & sisterhood experience',
    'Worship & praise equipment',
    'Conference pack & printed materials',
    'General conference fund',
  ],
  fr: [
    "Fonds de bourse — parrainer une sœur qui ne peut pas se permettre les frais d'inscription",
    'Matériaux et soins du programme enfants',
    'Décoration, ambiance & expérience de sororité de la conférence',
    'Équipement de louange & adoration',
    'Pack de conférence & matériaux imprimés',
    'Fonds général de la conférence',
  ],
}

function VinePattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="vines-donate" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" opacity="0.6" />
          <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" opacity="0.4" />
          <path d="M60 110 Q80 90 60 60 Q40 90 60 110Z" fill="#74C69D" opacity="0.5" />
          <circle cx="60" cy="60" r="3" fill="#C9A84C" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#vines-donate)" />
    </svg>
  )
}

function formatFCFA(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA'
}

export default function DonatePage() {
  const { lang } = useLanguage()
  const [selectedTier, setSelectedTier] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id)
      setTimeout(() => setCopied(null), 2500)
    })
  }

  const whatsappLink = (number: string, message: string) =>
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`

  const defaultWhatsAppMsg = lang === 'en'
    ? 'Hello, I would like to make a contribution to the 2026 NavCam Women\'s Conference. Please send me the bank transfer details. My name is: '
    : 'Bonjour, je souhaite faire une contribution à la Conférence Nationale des Femmes NavCam 2026. Veuillez m\'envoyer les coordonnées bancaires. Mon nom est : '

  return (
    <div className="flex flex-col">
      {/* ── HERO ── */}
      <section className="relative min-h-[320px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#C9A84C] via-[#2D6A4F] to-[#1B3A5C]">
        <VinePattern />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-[#F4C2C2]/10 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-4 py-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5 text-[#F0D080] text-sm font-medium backdrop-blur-sm">
            <span>💛</span>
            <span>{lang === 'en' ? 'Give & Support' : 'Donner & Soutenir'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {lang === 'en' ? 'Support the Conference' : 'Soutenir la Conférence'}
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            {lang === 'en'
              ? 'Your generosity helps women encounter Christ, be healed, and go home bearing lasting fruit.'
              : 'Votre générosité aide les femmes à rencontrer Christ, à être guéries et à rentrer chez elles en portant des fruits durables.'}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25 C360 50 1080 0 1440 25 L1440 50 L0 50 Z" fill="#FDF6EC" />
          </svg>
        </div>
      </section>

      {/* ── FUNDRAISING GOAL ── */}
      <section className="py-14 bg-[#FDF6EC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
            {lang === 'en' ? 'Fundraising Goal' : 'Objectif de Collecte'}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1B3A5C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            {formatFCFA(FUNDRAISING_GOAL)}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {lang === 'en'
              ? 'Our collective goal for the 2026 Navigators National Women\'s Conference'
              : 'Notre objectif collectif pour la Conférence Nationale des Femmes Navigateurs 2026'}
          </p>
          {/* Progress bar — static for now, can be wired to live budget data */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#2D6A4F] font-semibold">
                {lang === 'en' ? 'Contributions received' : 'Contributions reçues'}
              </span>
              <span className="text-gray-400">{lang === 'en' ? 'Goal' : 'Objectif'}: {formatFCFA(FUNDRAISING_GOAL)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-[#2D6A4F] to-[#74C69D] transition-all duration-1000"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              {lang === 'en' ? 'Updated by admin · Every gift counts 🌿' : 'Mis à jour par l\'admin · Chaque don compte 🌿'}
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY GIVE ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'Why Give?' : 'Pourquoi Donner ?'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Your Gift Makes a Difference' : 'Votre Don Fait une Différence'}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">
              {lang === 'en'
                ? 'Every contribution — large or small — directly enables women across Cameroon to gather, grow, and be sent.'
                : 'Chaque contribution — grande ou petite — permet directement aux femmes de tout le Cameroun de se rassembler, de grandir et d\'être envoyées.'}
            </p>
            <div className="w-16 h-0.5 bg-[#C9A84C] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-10">
            {DONATION_PURPOSES[lang].map((purpose, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#FDF6EC] rounded-2xl p-5 border border-[#74C69D]/20">
                <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-[#C9A84C] to-[#B8963A] text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                <p className="text-gray-700 text-sm leading-relaxed">{purpose}</p>
              </div>
            ))}
          </div>

          {/* Scripture */}
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-[#2D6A4F]/5 to-[#C9A84C]/5 rounded-3xl p-8 border border-[#74C69D]/20">
            <p className="text-3xl mb-3">🌿</p>
            <blockquote className="text-[#1B3A5C] text-lg italic font-light leading-relaxed mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en'
                ? '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."'
                : '"Que chacun donne comme il l\'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie."'}
            </blockquote>
            <p className="text-[#C9A84C] text-sm font-semibold">2 Corinthians / 2 Corinthiens 9:7</p>
          </div>
        </div>
      </section>

      {/* ── DONATION TIERS ── */}
      <section className="py-14 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Choose a Gift Amount' : 'Choisissez un Montant de Don'}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
            {DONATION_TIERS.map((tier, i) => (
              <button
                key={i}
                onClick={() => setSelectedTier(i)}
                className={`rounded-2xl p-5 text-center border-2 transition-all hover:-translate-y-0.5 ${
                  selectedTier === i
                    ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white shadow-lg'
                    : 'border-[#74C69D]/30 bg-white hover:border-[#2D6A4F]/50'
                }`}
              >
                <div className="text-2xl mb-2">{tier.icon}</div>
                <p className={`text-xs font-semibold mb-1 ${selectedTier === i ? 'text-[#74C69D]' : 'text-gray-400'}`}>
                  {lang === 'en' ? tier.labelEn : tier.labelFr}
                </p>
                <p className={`text-sm font-bold ${selectedTier === i ? 'text-[#F0D080]' : 'text-[#2D6A4F]'}`}>
                  {tier.value === 0 ? (lang === 'en' ? 'Custom' : 'Libre') : formatFCFA(tier.value)}
                </p>
              </button>
            ))}
          </div>
          {selectedTier === 3 && (
            <div className="max-w-xs mx-auto">
              <input
                type="number"
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                placeholder={lang === 'en' ? 'Enter amount in FCFA' : 'Entrez le montant en FCFA'}
                className="w-full border-2 border-[#74C69D]/40 rounded-xl px-4 py-3 text-center text-[#1B3A5C] font-bold text-lg focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── PAYMENT METHODS ── */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C9848A] text-sm font-semibold uppercase tracking-widest mb-2">
              {lang === 'en' ? 'How to Give' : 'Comment Donner'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              {lang === 'en' ? 'Payment Methods' : 'Modes de Paiement'}
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              {lang === 'en'
                ? 'Send your donation using any of the methods below. Always include your full name as the payment reference.'
                : 'Envoyez votre don via l\'un des modes ci-dessous. Incluez toujours votre nom complet comme référence de paiement.'}
            </p>
            <div className="w-16 h-0.5 bg-[#C9848A] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* MTN MoMo */}
            {(() => {
              const m = PAYMENT_METHODS[0]
              return (
                <div className="bg-[#FFFBEB] rounded-2xl p-6 border-2 border-yellow-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-[#FFCC00] rounded-xl flex items-center justify-center text-xl shadow-sm">📱</div>
                    <div>
                      <h3 className="font-bold text-[#1B3A5C]">MTN Mobile Money</h3>
                      <span className="text-xs bg-yellow-100 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">MoMo</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 border border-yellow-100">
                    <p className="text-xs text-gray-400 mb-0.5">{lang === 'en' ? 'Account Name' : 'Nom du Compte'}</p>
                    <p className="font-semibold text-[#1B3A5C] text-sm leading-tight mb-3">{m.accountName}</p>
                    <p className="text-xs text-gray-400 mb-0.5">{lang === 'en' ? 'MoMo Number' : 'Numéro MoMo'}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#2D6A4F] text-lg tracking-wide">{m.number}</p>
                      <button
                        onClick={() => copyToClipboard(m.numberRaw!, 'mtn')}
                        className="text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-3 py-1.5 rounded-lg hover:bg-[#2D6A4F]/20 transition-colors font-medium"
                      >
                        {copied === 'mtn' ? '✓ Copié!' : lang === 'en' ? 'Copy' : 'Copier'}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{lang === 'en' ? m.instructionEn : m.instructionFr}</p>
                  <a
                    href={whatsappLink('237670546041', defaultWhatsAppMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    <span>💬</span>
                    {lang === 'en' ? 'WhatsApp after payment' : 'WhatsApp après paiement'}
                  </a>
                </div>
              )
            })()}

            {/* Orange Money */}
            {(() => {
              const m = PAYMENT_METHODS[1]
              return (
                <div className="bg-[#FFF7F0] rounded-2xl p-6 border-2 border-orange-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-[#FF6600] rounded-xl flex items-center justify-center text-xl shadow-sm">📱</div>
                    <div>
                      <h3 className="font-bold text-[#1B3A5C]">Orange Money</h3>
                      <span className="text-xs bg-orange-100 text-orange-700 font-semibold px-2 py-0.5 rounded-full">OM</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 border border-orange-100">
                    <p className="text-xs text-gray-400 mb-0.5">{lang === 'en' ? 'Account Name' : 'Nom du Compte'}</p>
                    <p className="font-semibold text-[#1B3A5C] text-sm leading-tight mb-3">{m.accountName}</p>
                    <p className="text-xs text-gray-400 mb-0.5">{lang === 'en' ? 'OM Number' : 'Numéro OM'}</p>
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#2D6A4F] text-lg tracking-wide">{m.number}</p>
                      <button
                        onClick={() => copyToClipboard(m.numberRaw!, 'orange')}
                        className="text-xs bg-[#2D6A4F]/10 text-[#2D6A4F] px-3 py-1.5 rounded-lg hover:bg-[#2D6A4F]/20 transition-colors font-medium"
                      >
                        {copied === 'orange' ? '✓ Copié!' : lang === 'en' ? 'Copy' : 'Copier'}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{lang === 'en' ? m.instructionEn : m.instructionFr}</p>
                  <a
                    href={whatsappLink('237694756099', defaultWhatsAppMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    <span>💬</span>
                    {lang === 'en' ? 'WhatsApp after payment' : 'WhatsApp après paiement'}
                  </a>
                </div>
              )
            })()}

            {/* Bank Transfer */}
            {(() => {
              const m = PAYMENT_METHODS[2]
              return (
                <div className="bg-[#F0F4F8] rounded-2xl p-6 border-2 border-blue-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 bg-[#1B3A5C] rounded-xl flex items-center justify-center text-xl shadow-sm">🏦</div>
                    <div>
                      <h3 className="font-bold text-[#1B3A5C]">{lang === 'en' ? m.nameEn : m.nameFr}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                        {lang === 'en' ? 'By request' : 'Sur demande'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 border border-blue-100">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {lang === 'en' ? m.instructionEn : m.instructionFr}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {lang === 'en' ? 'Contact via WhatsApp:' : 'Contactez via WhatsApp :'}
                  </p>
                  <div className="space-y-2">
                    <a
                      href={whatsappLink('237670546041', defaultWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <span>💬 +237 670 546 041</span>
                      <span className="text-xs opacity-80">MTN</span>
                    </a>
                    <a
                      href={whatsappLink('237694756099', defaultWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <span>💬 +237 694 756 099</span>
                      <span className="text-xs opacity-80">Orange</span>
                    </a>
                    <a
                      href={whatsappLink('237670838779', defaultWhatsAppMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full py-2.5 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                    >
                      <span>💬 +237 670 838 779</span>
                      <span className="text-xs opacity-80">Rose · MTN</span>
                    </a>
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Reference reminder */}
          <div className="max-w-2xl mx-auto mt-10 bg-[#2D6A4F]/5 border border-[#2D6A4F]/20 rounded-2xl p-5 flex items-start gap-4">
            <div className="text-2xl flex-shrink-0">📌</div>
            <div>
              <p className="font-semibold text-[#1B3A5C] text-sm mb-1">
                {lang === 'en' ? 'Always include your payment reference:' : 'Incluez toujours votre référence de paiement :'}
              </p>
              <code className="bg-white px-3 py-1.5 rounded-lg text-[#2D6A4F] font-mono font-bold text-sm border border-[#74C69D]/30">
                NavCamWomen2026 — [Votre Nom / Your Name]
              </code>
              <p className="text-xs text-gray-500 mt-2">
                {lang === 'en'
                  ? 'This helps us match your payment to your registration.'
                  : 'Cela nous aide à associer votre paiement à votre inscription.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW PARTICIPANTS CONTRIBUTE ── */}
      <section className="py-14 bg-[#FDF6EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Steps */}
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                {lang === 'en' ? 'For Registered Participants' : 'Pour les Participants Inscrits'}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1B3A5C] mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? 'How to Send Your Contribution' : 'Comment Envoyer Votre Contribution'}
              </h2>
              <div className="w-14 h-0.5 bg-[#C9A84C] mb-6" />
              <div className="space-y-5">
                {[
                  {
                    en: 'Register via the registration form on this website to secure your spot.',
                    fr: "Inscrivez-vous via le formulaire d'inscription sur ce site pour réserver votre place.",
                  },
                  {
                    en: 'Pay your deposit using MTN MoMo (+237 670 546 041) or Orange Money (+237 694 756 099) to confirm your registration. Use "NavCamWomen2026 — [Your Name]" as reference.',
                    fr: 'Payez votre acompte via MTN MoMo (+237 670 546 041) ou Orange Money (+237 694 756 099) pour confirmer votre inscription. Utilisez "NavCamWomen2026 — [Votre Nom]" comme référence.',
                  },
                  {
                    en: 'Send the proof of payment (screenshot) to the Finance team on WhatsApp: +237 670 546 041, +237 694 756 099, or +237 670 838 779.',
                    fr: "Envoyez la preuve de paiement (capture d'écran) à l'équipe Finance sur WhatsApp : +237 670 546 041, +237 694 756 099 ou +237 670 838 779.",
                  },
                  {
                    en: 'Pay your full balance before the conference. Early bird deadline: 30 June 2026 (30 000 FCFA). After: 35 000 FCFA.',
                    fr: 'Payez votre solde complet avant la conférence. Date limite inscription anticipée : 30 juin 2026 (30 000 FCFA). Après : 35 000 FCFA.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-[#2D6A4F] to-[#40916C] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {i + 1}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed pt-1.5">
                      {lang === 'en' ? item.en : item.fr}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Finance contact card */}
            <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] rounded-3xl p-8 text-white">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {lang === 'en' ? 'Finance Team' : 'Équipe Finance'}
              </h3>
              <p className="text-[#74C69D] text-sm mb-6">
                {lang === 'en'
                  ? 'For payment confirmations, receipts, and all financial questions:'
                  : 'Pour confirmations de paiement, reçus et toutes questions financières :'}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#C9A84C] rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0">CR</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Christelle Ribouem</p>
                    <p className="text-[#74C69D] text-xs">{lang === 'en' ? 'Finance & Fundraising Lead' : 'Responsable Finance & Collecte'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                  <div className="w-10 h-10 bg-[#C9848A] rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0">RY</div>
                  <div>
                    <p className="font-semibold text-white text-sm">Rose Yuniwo</p>
                    <p className="text-[#74C69D] text-xs">{lang === 'en' ? 'Finance & Fundraising Lead' : 'Responsable Finance & Collecte'}</p>
                    <p className="text-white/70 text-xs font-mono mt-0.5">+237 670 838 779</p>
                  </div>
                </div>
              </div>

              {/* Contact buttons */}
              <div className="space-y-2">
                <a
                  href={whatsappLink('237670546041', defaultWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-3 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2"><span>💬</span> WhatsApp MTN</span>
                  <span className="font-mono text-xs opacity-90">+237 670 546 041</span>
                </a>
                <a
                  href={whatsappLink('237694756099', defaultWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-3 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2"><span>💬</span> WhatsApp Orange</span>
                  <span className="font-mono text-xs opacity-90">+237 694 756 099</span>
                </a>
                <a
                  href={whatsappLink('237670838779', defaultWhatsAppMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full py-3 px-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-xl text-sm font-semibold transition-colors"
                >
                  <span className="flex items-center gap-2"><span>💬</span> WhatsApp Rose · MTN</span>
                  <span className="font-mono text-xs opacity-90">+237 670 838 779</span>
                </a>
              </div>

              <div className="mt-5 p-4 bg-white/10 rounded-xl border border-white/20">
                <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-1">
                  {lang === 'en' ? 'Payment Reference Format' : 'Format de Référence'}
                </p>
                <p className="text-white font-mono text-sm">NavCamWomen2026 — [Ton Nom]</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-14 bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] relative overflow-hidden">
        <VinePattern />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <p className="text-4xl mb-4">🌿</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {lang === 'en' ? 'Every Gift Plants a Seed' : 'Chaque Don Plante une Graine'}
          </h2>
          <p className="text-[#74C69D] mb-8">
            {lang === 'en'
              ? 'Whether you give 5 000 or 500 000 FCFA — your generosity is a seed planted for lasting fruit.'
              : 'Que vous donniez 5 000 ou 500 000 FCFA — votre générosité est une graine plantée pour des fruits durables.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] hover:bg-[#B8963A] text-white font-bold rounded-full transition-all shadow-lg hover:-translate-y-0.5">
              {lang === 'en' ? 'Register for the Conference' : "S'inscrire à la Conférence"}
              <span>🌿</span>
            </Link>
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold border border-white/30 transition-all">
              {lang === 'en' ? 'About the Ministry' : 'À Propos du Ministère'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
