'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

export function NewsletterSignup() {
  const { lang } = useLanguage()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), name: name.trim(), language: lang }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-6">
        <div className="text-4xl mb-3">🌿</div>
        <p className="font-bold text-[#2D6A4F] text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
          {lang === 'en' ? "You're on the list!" : 'Vous êtes sur la liste !'}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {lang === 'en'
            ? "We'll keep you updated on all conference news."
            : "Nous vous tiendrons informée de toutes les actualités."}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={lang === 'en' ? 'Your name (optional)' : 'Votre prénom (optionnel)'}
        className="flex-1 px-4 py-3 rounded-xl border border-[#74C69D]/40 bg-white text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
      />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={lang === 'en' ? 'Your email address *' : 'Votre adresse email *'}
        className="flex-1 px-4 py-3 rounded-xl border border-[#74C69D]/40 bg-white text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 justify-center whitespace-nowrap"
      >
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span>🌿</span>
            {lang === 'en' ? 'Stay Updated' : 'Rester Informée'}
          </>
        )}
      </button>
      {status === 'error' && (
        <p className="text-[#C9848A] text-xs mt-1 sm:col-span-3 text-center">
          {lang === 'en' ? 'Something went wrong. Please try again.' : 'Une erreur est survenue. Réessayez.'}
        </p>
      )}
    </form>
  )
}
