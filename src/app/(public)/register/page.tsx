'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { formatCurrency } from '@/lib/utils'
import { ShareButtons } from '@/components/public/ShareButtons'

interface ChildAge {
  age: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  maritalStatus: string
  city: string
  dietaryNeeds: string
  hasChildren: boolean | null
  numberOfChildren: number
  childrenAges: ChildAge[]
  registrationType: string
  feesConfirmed: boolean
  depositConfirmed: boolean
  notes: string
  language: string
}

const FEES: Record<string, number> = {
  EARLY_BIRD: 30000,
  REGULAR: 35000,
  CORE_TEAM: 50000,
}

// Early Bird closes at midnight Cameroon time (WAT = UTC+1) on July 1 2026
const EARLY_BIRD_DEADLINE = new Date('2026-07-01T00:00:00+01:00')

// General WhatsApp contact for conference updates
const WHATSAPP_UPDATES = '237696238088'

// Downloadable calendar invite for the conference (all-day, Aug 10–14 2026).
// DTEND is exclusive, so the 15th marks the end of the 14th.
const ICS_HREF =
  'data:text/calendar;charset=utf-8,' +
  encodeURIComponent(
    [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NavCam Women 2026//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'UID:navcamwomen2026@navcam-women-conference.vercel.app',
      'DTSTAMP:20260101T000000Z',
      'DTSTART;VALUE=DATE:20260810',
      'DTEND;VALUE=DATE:20260815',
      "SUMMARY:2026 Navigators National Women's Conference",
      'LOCATION:Care & Hope Center, Yaoundé, Cameroon',
      'DESCRIPTION:Rooted in Christ, bearing lasting fruit. https://navcam-women-conference.vercel.app',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
  )

export default function RegisterPage() {
  const { t, lang } = useLanguage()
  const earlyBirdOpen = new Date() < EARLY_BIRD_DEADLINE

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    maritalStatus: '',
    city: '',
    dietaryNeeds: '',
    hasChildren: null,
    numberOfChildren: 0,
    childrenAges: [],
    registrationType: earlyBirdOpen ? 'EARLY_BIRD' : 'REGULAR',
    feesConfirmed: false,
    depositConfirmed: false,
    notes: '',
    language: lang,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

  // Confetti on success
  useEffect(() => {
    if (!success) return
    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999'
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')!
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const colors = ['#2D6A4F', '#C9A84C', '#C9848A', '#74C69D', '#F4C2C2', '#40916C', '#F0D080']
    const particles = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 120,
      vx: (Math.random() - 0.5) * 3.5,
      vy: Math.random() * 2.5 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 7 + 3,
      rotation: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 9,
      circle: Math.random() > 0.55,
    }))
    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.rotation += p.rotV
        if (p.y < canvas.height + 20) alive = true
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        if (p.circle) { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill() }
        else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        ctx.restore()
      }
      if (alive) frame = requestAnimationFrame(draw)
      else canvas.remove()
    }
    frame = requestAnimationFrame(draw)
    const t = setTimeout(() => { cancelAnimationFrame(frame); canvas.remove() }, 4500)
    return () => { cancelAnimationFrame(frame); clearTimeout(t); if (canvas.parentNode) canvas.remove() }
  }, [success])

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.firstName.trim()) e.firstName = t.register.required
    if (!form.lastName.trim()) e.lastName = t.register.required
    if (!form.phone.trim()) e.phone = t.register.required
    if (!form.maritalStatus) e.maritalStatus = t.register.required
    if (!form.city.trim()) e.city = t.register.required
    if (form.hasChildren === null) e.hasChildren = t.register.required
    if (!form.feesConfirmed) e.feesConfirmed = t.register.required
    if (!form.depositConfirmed) e.depositConfirmed = t.register.required
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      const payload = {
        ...form,
        language: lang,
        childrenAges: form.hasChildren
          ? JSON.stringify(form.childrenAges.map((c) => c.age))
          : null,
        numberOfChildren: form.hasChildren ? form.childrenAges.length : 0,
      }

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (data.code === 'DUPLICATE_PHONE') {
        setServerError(
          lang === 'en'
            ? 'This phone number is already registered. Contact us on WhatsApp if you need help.'
            : 'Ce numéro de téléphone est déjà inscrit. Contactez-nous sur WhatsApp si vous avez besoin d\'aide.'
        )
      } else {
        setServerError(data.message || t.register.errorMessage)
      }
    } catch {
      setServerError(t.register.errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const addChild = () => {
    setForm((f) => ({ ...f, childrenAges: [...f.childrenAges, { age: '' }] }))
  }

  const removeChild = (idx: number) => {
    setForm((f) => ({
      ...f,
      childrenAges: f.childrenAges.filter((_, i) => i !== idx),
    }))
  }

  const updateChildAge = (idx: number, age: string) => {
    setForm((f) => ({
      ...f,
      childrenAges: f.childrenAges.map((c, i) => (i === idx ? { age } : c)),
    }))
  }

  const fieldClass = (fieldName: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border ${
      errors[fieldName]
        ? 'border-[#C9848A] bg-[#F4C2C2]/10'
        : 'border-[#74C69D]/40 bg-white'
    } text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all`

  const labelClass = 'block text-sm font-semibold text-[#1B3A5C] mb-1.5'

  const registrationOptions = [
    ...(earlyBirdOpen ? [{
      value: 'EARLY_BIRD',
      label: lang === 'en' ? 'Early Bird — before June 30, 2026' : 'Inscription Anticipée — avant le 30 juin 2026',
      amount: FEES.EARLY_BIRD,
      badge: '🌟',
    }] : []),
    {
      value: 'REGULAR',
      label: lang === 'en' ? 'Regular' : 'Standard',
      amount: FEES.REGULAR,
      badge: '🌿',
    },
    {
      value: 'CORE_TEAM',
      label: lang === 'en' ? 'Core Team Leader' : 'Leader Équipe Centrale',
      amount: FEES.CORE_TEAM,
      badge: '🌳',
    },
  ]

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-xl border border-[#74C69D]/20">
          <div className="flex justify-center mb-5">
            <svg className="w-20 h-20 animate-check-circle" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="38" fill="#2D6A4F" />
              <circle cx="40" cy="40" r="38" fill="none" stroke="#40916C" strokeWidth="2" opacity="0.4" />
              <polyline
                className="animate-check-stroke"
                points="24,42 35,53 57,28"
                stroke="white"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2
            className="text-2xl font-bold text-[#2D6A4F] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.register.successTitle}
          </h2>
          <p className="text-gray-600 mb-6">{t.register.successMessage}</p>
          <div className="bg-[#2D6A4F]/5 rounded-xl p-4 text-sm text-[#2D6A4F] mb-6">
            <p className="font-semibold">{form.firstName} {form.lastName}</p>
            <p className="text-gray-500 mt-1">
              {registrationOptions.find((o) => o.value === form.registrationType)?.label}
            </p>
            <p className="text-[#C9A84C] font-bold mt-1">
              {formatCurrency(FEES[form.registrationType])}
            </p>
          </div>
          {/* Payment instructions */}
          <div className="bg-[#FFF8E7] border border-[#F0D080] rounded-2xl p-5 text-left mb-5">
            <p className="font-bold text-[#1B3A5C] text-sm mb-3 flex items-center gap-2">
              <span>💳</span>
              {lang === 'en' ? 'How to Complete Your Registration' : 'Comment Finaliser Votre Inscription'}
            </p>
            <p className="text-gray-600 text-xs mb-2">
              {lang === 'en' ? 'Send your payment via Mobile Money:' : 'Envoyez votre paiement via Mobile Money :'}
            </p>
            <p className="text-sm mb-1"><strong>MTN MoMo:</strong> +237 670 546 041</p>
            <p className="text-sm mb-3"><strong>Orange Money:</strong> +237 694 756 099</p>
            <div className="bg-white rounded-xl px-3 py-2 mb-3">
              <p className="text-xs text-gray-400 mb-0.5">{lang === 'en' ? 'Reference' : 'Référence'}</p>
              <p className="font-bold text-[#2D6A4F] text-sm tracking-wide">
                NavCamWomen2026-{form.firstName}{form.lastName}
              </p>
            </div>
            <a
              href={`https://wa.me/237670546041?text=${encodeURIComponent(
                `NavCamWomen2026-${form.firstName}${form.lastName} — ${lang === 'en' ? 'sending payment screenshot' : 'envoi capture paiement'}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center py-2.5 bg-[#25D366] hover:bg-[#1EB85A] text-white text-sm font-semibold rounded-xl transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              {lang === 'en' ? 'Send payment screenshot on WhatsApp' : 'Envoyer capture paiement sur WhatsApp'}
            </a>
          </div>

          {/* Stay engaged: add to calendar + WhatsApp updates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <a
              href={ICS_HREF}
              download="navcam-women-2026.ics"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white text-sm font-semibold rounded-xl transition-all"
            >
              <span>📅</span>
              {lang === 'en' ? 'Add to Calendar' : 'Ajouter au calendrier'}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_UPDATES}?text=${encodeURIComponent(
                lang === 'en'
                  ? 'Hi! I just registered for NavCamWomen2026 — please keep me posted with conference updates.'
                  : "Bonjour ! Je viens de m'inscrire à NavCamWomen2026 — merci de me tenir informée des actualités de la conférence."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-[#25D366] text-[#1EB85A] hover:bg-[#25D366] hover:text-white text-sm font-semibold rounded-xl transition-all"
            >
              <span>💬</span>
              {lang === 'en' ? 'Get updates on WhatsApp' : 'Recevoir les actualités'}
            </a>
          </div>

          <p className="text-sm text-gray-500 mb-3">
            {lang === 'en' ? 'Spread the word!' : 'Partagez la nouvelle !'}
          </p>
          <div className="flex justify-center">
            <ShareButtons theme="light" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#C9848A] via-[#2D6A4F] to-[#1B3A5C] py-16 px-4 text-center">
        <span className="text-5xl block mb-3">📝</span>
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {t.register.title}
        </h1>
        <p className="text-[#F4C2C2] text-lg">{t.register.subtitle}</p>
        <p className="text-[#C9A84C] text-sm mt-2">{t.conference.dates}</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20">
            <h2
              className="text-lg font-bold text-[#1B3A5C] mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>👤</span>
              {lang === 'en' ? 'Personal Information' : 'Informations Personnelles'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>{t.register.firstName} *</label>
                <input
                  type="text"
                  className={fieldClass('firstName')}
                  value={form.firstName}
                  onChange={(e) => setForm((f) => ({ ...f, firstName: e.target.value }))}
                  placeholder={lang === 'en' ? 'Your first name' : 'Votre prénom'}
                />
                {errors.firstName && <p className="text-[#C9848A] text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className={labelClass}>{t.register.lastName} *</label>
                <input
                  type="text"
                  className={fieldClass('lastName')}
                  value={form.lastName}
                  onChange={(e) => setForm((f) => ({ ...f, lastName: e.target.value }))}
                  placeholder={lang === 'en' ? 'Your last name' : 'Votre nom'}
                />
                {errors.lastName && <p className="text-[#C9848A] text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className={labelClass}>{t.register.email}</label>
                <input
                  type="email"
                  className={fieldClass('email')}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder={t.register.emailPlaceholder}
                />
              </div>
              <div>
                <label className={labelClass}>{t.register.phone} *</label>
                <input
                  type="tel"
                  className={fieldClass('phone')}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="+237 6XX XXX XXX"
                />
                {errors.phone && <p className="text-[#C9848A] text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className={labelClass}>{t.register.city} *</label>
                <input
                  type="text"
                  className={fieldClass('city')}
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  placeholder={lang === 'en' ? 'Your city' : 'Votre ville'}
                />
                {errors.city && <p className="text-[#C9848A] text-xs mt-1">{errors.city}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className={labelClass}>{t.register.maritalStatus} *</label>
                <select
                  className={fieldClass('maritalStatus')}
                  value={form.maritalStatus}
                  onChange={(e) => setForm((f) => ({ ...f, maritalStatus: e.target.value }))}
                >
                  <option value="">{t.register.selectOption}</option>
                  {Object.entries(t.register.maritalOptions).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                {errors.maritalStatus && <p className="text-[#C9848A] text-xs mt-1">{errors.maritalStatus}</p>}
              </div>
            </div>
          </div>

          {/* Dietary & Children */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20">
            <h2
              className="text-lg font-bold text-[#1B3A5C] mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>🍽️</span>
              {lang === 'en' ? 'Additional Details' : 'Détails Supplémentaires'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>{t.register.dietaryNeeds}</label>
                <textarea
                  className={`${fieldClass('dietaryNeeds')} resize-none`}
                  rows={3}
                  value={form.dietaryNeeds}
                  onChange={(e) => setForm((f) => ({ ...f, dietaryNeeds: e.target.value }))}
                  placeholder={t.register.dietaryPlaceholder}
                />
              </div>

              {/* Has Children */}
              <div>
                <label className={`${labelClass} mb-2`}>{t.register.hasChildren} *</label>
                <div className="flex gap-4">
                  {[
                    { val: true, label: t.register.yes },
                    { val: false, label: t.register.no },
                  ].map(({ val, label }) => (
                    <label
                      key={String(val)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                        form.hasChildren === val
                          ? 'border-[#2D6A4F] bg-[#2D6A4F]/5 text-[#2D6A4F] font-semibold'
                          : 'border-[#74C69D]/40 text-gray-600 hover:bg-[#74C69D]/10'
                      }`}
                    >
                      <input
                        type="radio"
                        className="sr-only"
                        checked={form.hasChildren === val}
                        onChange={() =>
                          setForm((f) => ({
                            ...f,
                            hasChildren: val,
                            childrenAges: val && f.childrenAges.length === 0 ? [{ age: '' }] : val ? f.childrenAges : [],
                          }))
                        }
                      />
                      {label}
                    </label>
                  ))}
                </div>
                {errors.hasChildren && <p className="text-[#C9848A] text-xs mt-1">{errors.hasChildren}</p>}
              </div>

              {/* Children Ages */}
              {form.hasChildren && (
                <div className="bg-[#FDF6EC] rounded-xl p-4 space-y-3">
                  <p className="text-sm font-semibold text-[#2D6A4F]">
                    {t.register.numberOfChildren}: {form.childrenAges.length}
                  </p>
                  <p className="text-xs text-[#C9848A] flex items-start gap-1.5">
                    <span className="flex-shrink-0">👧</span>
                    {t.fees.childFee}
                  </p>
                  {form.childrenAges.map((child, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <label className="text-sm text-gray-600 w-28 flex-shrink-0">
                        {t.register.childAge} {idx + 1}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={17}
                        className="flex-1 px-3 py-2 rounded-lg border border-[#74C69D]/40 text-sm text-[#1B3A5C] focus:outline-none focus:border-[#2D6A4F]"
                        value={child.age}
                        onChange={(e) => updateChildAge(idx, e.target.value)}
                        placeholder="0-17"
                      />
                      <button
                        type="button"
                        onClick={() => removeChild(idx)}
                        className="px-3 py-2 text-xs text-[#C9848A] hover:bg-[#F4C2C2]/30 rounded-lg transition-colors"
                      >
                        {t.register.removeChild}
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addChild}
                    className="text-sm text-[#2D6A4F] hover:text-[#40916C] font-medium flex items-center gap-1"
                  >
                    <span>+</span> {t.register.addChild}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Registration Type */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20">
            <h2
              className="text-lg font-bold text-[#1B3A5C] mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>💰</span>
              {t.register.registrationType}
            </h2>

            {!earlyBirdOpen && (
              <div className="mb-4 flex items-center gap-2 bg-[#C9848A]/10 border border-[#C9848A]/30 rounded-xl px-4 py-3 text-sm text-[#C9848A] font-medium">
                <span>⏰</span>
                {lang === 'en'
                  ? 'Early Bird registration closed on June 30, 2026. Standard rate now applies.'
                  : "L'inscription anticipée a fermé le 30 juin 2026. Le tarif standard s'applique désormais."}
              </div>
            )}
            <div className="space-y-3">
              {registrationOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center justify-between gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    form.registrationType === opt.value
                      ? 'border-[#2D6A4F] bg-[#2D6A4F]/5'
                      : 'border-[#74C69D]/30 hover:bg-[#74C69D]/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="registrationType"
                      value={opt.value}
                      checked={form.registrationType === opt.value}
                      onChange={(e) => setForm((f) => ({ ...f, registrationType: e.target.value }))}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.registrationType === opt.value
                          ? 'border-[#2D6A4F] bg-[#2D6A4F]'
                          : 'border-gray-300'
                      }`}
                    >
                      {form.registrationType === opt.value && (
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm font-medium text-[#1B3A5C]">
                      {opt.badge} {opt.label}
                    </span>
                  </div>
                  <span className="text-[#2D6A4F] font-bold text-sm flex-shrink-0">
                    {formatCurrency(opt.amount)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Confirmations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#74C69D]/20">
            <h2
              className="text-lg font-bold text-[#1B3A5C] mb-5 flex items-center gap-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span>✅</span>
              {lang === 'en' ? 'Confirmations' : 'Confirmations'}
            </h2>

            <div className="space-y-4">
              {[
                {
                  key: 'feesConfirmed' as keyof FormData,
                  label: t.register.confirmFees,
                  checked: form.feesConfirmed,
                  onChange: (v: boolean) => setForm((f) => ({ ...f, feesConfirmed: v })),
                },
                {
                  key: 'depositConfirmed' as keyof FormData,
                  label: t.register.confirmDeposit,
                  checked: form.depositConfirmed,
                  onChange: (v: boolean) => setForm((f) => ({ ...f, depositConfirmed: v })),
                },
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    errors[item.key] ? 'border-[#C9848A] bg-[#F4C2C2]/10' : 'border-[#74C69D]/30 hover:bg-[#74C69D]/5'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      item.checked ? 'bg-[#2D6A4F] border-[#2D6A4F]' : 'border-gray-300'
                    }`}
                    onClick={() => item.onChange(!item.checked)}
                  >
                    {item.checked && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>

            {/* Notes */}
            <div className="mt-5">
              <label className={labelClass}>{t.register.notes}</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl border border-[#74C69D]/40 bg-white text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] resize-none"
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder={t.register.notesPlaceholder}
              />
            </div>
          </div>

          {/* Server Error */}
          {serverError && (
            <div className="bg-[#F4C2C2]/30 border border-[#C9848A] rounded-xl p-4 text-sm text-[#C9848A]">
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-60 text-white font-bold rounded-xl text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                {t.register.submitting}
              </>
            ) : (
              <>
                <span>🌿</span>
                {t.register.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
