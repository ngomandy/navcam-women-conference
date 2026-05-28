'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password / Email ou mot de passe invalide')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D6A4F] via-[#1B3A5C] to-[#40916C] px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="vines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M40 5 Q55 25 40 45 Q25 25 40 5Z" fill="#74C69D" opacity="0.8" />
              <path d="M5 40 Q25 25 45 40 Q25 55 5 40Z" fill="#C9A84C" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#vines)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B3A5C] px-8 py-8 text-center">
            <div className="text-5xl mb-3">🌿</div>
            <h1
              className="text-2xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Admin Portal
            </h1>
            <p className="text-[#74C69D] text-sm">
              NavCam Women&apos;s Conference 2026
            </p>
            <p className="text-white/50 text-xs mt-1">
              Sign in to manage the conference / Connectez-vous pour gérer la conférence
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#1B3A5C] mb-1.5">
                  Email Address / Adresse Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#74C69D]/40 rounded-xl text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                  placeholder="admin@navcam2026.org"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1B3A5C] mb-1.5">
                  Password / Mot de Passe
                </label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full px-4 py-3 border border-[#74C69D]/40 rounded-xl text-[#1B3A5C] text-sm focus:outline-none focus:border-[#2D6A4F] focus:ring-2 focus:ring-[#2D6A4F]/10 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-[#F4C2C2]/30 border border-[#C9848A] rounded-xl px-4 py-3 text-sm text-[#C9848A]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#2D6A4F] hover:bg-[#40916C] disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In / Se Connecter'
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <a
                href="/"
                className="text-sm text-[#40916C] hover:text-[#2D6A4F] transition-colors"
              >
                ← Return to conference site / Retour au site
              </a>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-center text-white/50 text-xs mt-4">
          &ldquo;Rooted in Christ, bearing lasting fruit&rdquo; — John 15:5
        </p>
      </div>
    </div>
  )
}
