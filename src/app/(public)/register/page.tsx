'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'
import { formatCurrency } from '@/lib/utils'

interface ChildAge {
  age: string
}

interface FormData {
  firstName: string
  lastName: string
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

export default function RegisterPage() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    maritalStatus: '',
    city: '',
    dietaryNeeds: '',
    hasChildren: null,
    numberOfChildren: 0,
    childrenAges: [],
    registrationType: 'EARLY_BIRD',
    feesConfirmed: false,
    depositConfirmed: false,
    notes: '',
    language: lang,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState('')

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
    {
      value: 'EARLY_BIRD',
      label: lang === 'en' ? 'Early Bird (before end of June 2026)' : 'Inscription Anticipée (avant fin juin 2026)',
      amount: FEES.EARLY_BIRD,
      badge: '🌟',
    },
    {
      value: 'REGULAR',
      label: lang === 'en' ? 'Regular' : 'Standard',
      amount: FEES.REGULAR,
      badge: '🌿',
    },
    {
      value: 'CORE_TEAM',
      label: lang === 'en' ? 'Core Team Leader' : 'Équipe de Direction',
      amount: FEES.CORE_TEAM,
      badge: '🌳',
    },
  ]

  if (success) {
    return (
      <div className="min-h-screen bg-[#FDF6EC] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full text-center shadow-xl border border-[#74C69D]/20">
          <div className="text-6xl mb-4">🌿</div>
          <h2
            className="text-2xl font-bold text-[#2D6A4F] mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t.register.successTitle}
          </h2>
          <p className="text-gray-600 mb-6">{t.register.successMessage}</p>
          <div className="bg-[#2D6A4F]/5 rounded-xl p-4 text-sm text-[#2D6A4F]">
            <p className="font-semibold">{form.firstName} {form.lastName}</p>
            <p className="text-gray-500 mt-1">
              {registrationOptions.find((o) => o.value === form.registrationType)?.label}
            </p>
            <p className="text-[#C9A84C] font-bold mt-1">
              {formatCurrency(FEES[form.registrationType])}
            </p>
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
