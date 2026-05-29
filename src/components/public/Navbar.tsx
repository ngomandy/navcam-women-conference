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
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/schedule', label: t.nav.schedule },
    { href: '/register', label: t.nav.register },
    { href: '/fees', label: t.nav.fees },
    { href: '/donate', label: t.nav.donate },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
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
              alt="Navigators National Women's Conference 2026"
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

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 pb-4 border-t border-[#74C69D]/30 bg-[#FDF6EC]/95 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg mx-2 mb-1 transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#1B3A5C] hover:bg-[#74C69D]/20 hover:text-[#2D6A4F]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block mx-2 mt-3 px-4 py-3 bg-[#C9A84C] hover:bg-[#B8963A] text-white text-sm font-semibold rounded-lg text-center transition-colors"
            >
              {t.hero.cta}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
