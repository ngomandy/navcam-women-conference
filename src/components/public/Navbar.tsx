'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/components/LanguageContext'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/',         label: t.nav.home },
    { href: '/about',    label: t.nav.about },
    { href: '/schedule',  label: t.nav.schedule },
    { href: '/breakouts',   label: t.nav.breakouts },
    { href: '/prayer-wall', label: t.nav.prayerWall },
    { href: '/venue',       label: t.nav.venue },
    { href: '/2025',     label: '2025' },
    { href: '/fees',     label: t.nav.fees },
    { href: '/donate',   label: t.nav.donate },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDF6EC]/95 backdrop-blur-md shadow-lg border-b border-[#74C69D]/30'
          : 'bg-[#FDF6EC]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <img
              src="/nav_women_conference_2026_C.svg"
              alt="2026 Navigators of Cameroon National Women's Conference"
              className="h-10 md:h-12 w-auto rounded-md"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? 'bg-[#2D6A4F] text-white shadow-sm'
                    : 'text-[#1B3A5C] hover:bg-[#74C69D]/20 hover:text-[#2D6A4F]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language toggle + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <div className="flex items-center bg-white border border-[#74C69D]/40 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === 'en'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#1B3A5C] hover:bg-[#74C69D]/20'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                  lang === 'fr'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#1B3A5C] hover:bg-[#74C69D]/20'
                }`}
                aria-label="Passer en Français"
              >
                FR
              </button>
            </div>

            {/* Register CTA — Desktop */}
            <Link
              href="/register"
              className="hidden md:inline-flex items-center px-4 py-2 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              {t.hero.cta}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#2D6A4F] hover:bg-[#74C69D]/20 rounded-lg transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
    </nav>

    {isOpen && (
      <>
        <div
          className="fixed inset-0 z-[55] bg-black/50 backdrop-blur-sm md:hidden animate-backdrop-in"
          onClick={() => setIsOpen(false)}
        />
        <div className="fixed top-0 right-0 bottom-0 z-[60] w-[300px] max-w-[85vw] bg-[#FDF6EC] md:hidden shadow-2xl flex flex-col animate-drawer-in">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#74C69D]/30">
            <img src="/nav_women_conference_2026_C.svg" alt="" className="h-10 w-auto rounded-md" />
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-[#2D6A4F] hover:bg-[#74C69D]/20 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 px-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center px-4 py-3.5 text-sm font-medium rounded-xl mb-1 transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#1B3A5C] hover:bg-[#74C69D]/20'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="px-4 py-5 border-t border-[#74C69D]/20 space-y-3">
            <div className="flex bg-white border border-[#74C69D]/40 rounded-full overflow-hidden shadow-sm">
              <button
                onClick={() => setLang('en')}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${lang === 'en' ? 'bg-[#2D6A4F] text-white' : 'text-[#1B3A5C] hover:bg-[#74C69D]/10'}`}
              >EN</button>
              <button
                onClick={() => setLang('fr')}
                className={`flex-1 py-2 text-xs font-semibold transition-colors ${lang === 'fr' ? 'bg-[#2D6A4F] text-white' : 'text-[#1B3A5C] hover:bg-[#74C69D]/10'}`}
              >FR</button>
            </div>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block w-full py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-full text-center transition-colors shadow-sm"
            >
              {t.hero.cta}
            </Link>
          </div>
        </div>
      </>
    )}
    </>
  )
}
