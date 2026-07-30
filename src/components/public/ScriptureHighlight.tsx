'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/components/LanguageContext'

export function ScriptureHighlight() {
  const { lang } = useLanguage()
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const el = bgRef.current
      if (!el) return
      const section = el.closest('section') as HTMLElement
      if (!section) return
      const rect = section.getBoundingClientRect()
      const progress = -rect.top / section.offsetHeight
      el.style.transform = `translateY(${progress * 36}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative py-28 overflow-hidden bg-[#0D1F2D]">
      {/* Parallax background layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 -top-10 -bottom-10 will-change-transform"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(45,106,79,0.35) 0%, rgba(27,58,92,0.5) 50%, rgba(13,31,45,0) 100%)',
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-12 left-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{
          background: 'rgba(64,145,108,0.12)',
          animation: 'scripture-glow 7s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-12 right-1/4 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: 'rgba(201,168,76,0.08)',
          animation: 'scripture-glow 9s ease-in-out 2s infinite',
        }}
      />

      {/* Vine pattern overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="vine-scripture" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 10 Q80 30 60 60 Q40 30 60 10Z" fill="#74C69D" />
            <path d="M10 60 Q30 40 60 60 Q30 80 10 60Z" fill="#74C69D" />
            <path d="M110 60 Q90 40 60 60 Q90 80 110 60Z" fill="#74C69D" />
            <path d="M60 110 Q80 90 60 60 Q40 90 60 110Z" fill="#74C69D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vine-scripture)" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Decorative leaf */}
        <div className="text-4xl mb-6" style={{ filter: 'drop-shadow(0 0 12px rgba(116,198,157,0.4))' }}>
          🌿
        </div>

        {/* Label */}
        <p className="text-[#C9A84C] text-xs font-bold uppercase tracking-[0.25em] mb-6">
          {lang === 'en' ? 'Our Foundation' : 'Notre Fondement'} · John 15:5, 8
        </p>

        {/* Large decorative quote mark */}
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 text-[220px] leading-none text-white/[0.03] select-none pointer-events-none"
          style={{ fontFamily: "'Playfair Display', serif" }}
          aria-hidden="true"
        >
          "
        </div>

        {/* Verse */}
        <blockquote
          className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-white leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif", textShadow: '0 2px 40px rgba(116,198,157,0.15)' }}
        >
          {lang === 'en' ? (
            <>
              "I am the vine; you are the branches.
              <br className="hidden sm:block" />{' '}
              If you remain in me and I in you, you will bear much fruit;
              <br className="hidden sm:block" />{' '}
              apart from me you can do nothing.
              <br className="hidden sm:block" />{' '}
              This is to my Father&apos;s glory, that you bear much fruit,
              <br className="hidden sm:block" />{' '}
              showing yourselves to be my disciples."
            </>
          ) : (
            <>
              « Je suis le cep, vous êtes les sarments.
              <br className="hidden sm:block" />{' '}
              Celui qui demeure en moi et en qui je demeure
              <br className="hidden sm:block" />{' '}
              porte beaucoup de fruit,
              <br className="hidden sm:block" />{' '}
              car sans moi vous ne pouvez rien faire.
              <br className="hidden sm:block" />{' '}
              C&apos;est en ceci que mon Père est glorifié :
              <br className="hidden sm:block" />{' '}
              que vous portiez beaucoup de fruit,
              <br className="hidden sm:block" />{' '}
              et que vous soyez ainsi mes disciples. »
            </>
          )}
        </blockquote>

        {/* Reference */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-[#C9A84C]/50" />
          <p className="text-[#C9A84C] text-sm font-semibold tracking-wider">John 15:5, 8</p>
          <div className="h-px w-12 bg-[#C9A84C]/50" />
        </div>

        {/* Conference theme */}
        <p className="mt-5 text-[#74C69D] text-sm italic">
          {lang === 'en'
            ? '"Rooted in Christ, Bearing Lasting Fruit"'
            : '"Enracinées en Christ, Portant du Fruit qui Demeure"'}
        </p>
      </div>
    </section>
  )
}
