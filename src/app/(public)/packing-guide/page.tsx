'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/components/LanguageContext'

const GUIDE_SRC = '/packing-guide.html'

export default function PackingGuidePage() {
  const { lang } = useLanguage()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [height, setHeight] = useState(2000)

  // Keep the embedded guide in sync with the site's EN/FR toggle (no reload).
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'setLang', lang }, '*')
  }, [lang])

  // Size the iframe to its content so the page scrolls naturally (no inner bar).
  useEffect(() => {
    const onMessage = (ev: MessageEvent) => {
      const d = ev.data
      if (d && d.type === 'packingGuideHeight' && typeof d.height === 'number') {
        setHeight(d.height)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // On (re)load, push the current language immediately.
  const handleLoad = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: 'setLang', lang }, '*')
  }

  return (
    <div className="min-h-screen bg-[#FDF6EC]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2D6A4F] to-[#1B3A5C] py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="leaves-pg" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M40 5 Q55 25 40 45 Q25 25 40 5Z" fill="#74C69D" opacity="0.8" />
                <path d="M5 40 Q25 25 45 40 Q25 55 5 40Z" fill="#74C69D" opacity="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#leaves-pg)" />
          </svg>
        </div>
        <div className="relative z-10">
          <span className="text-5xl block mb-3">👜</span>
          <h1
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {lang === 'en' ? 'Outfits & Packing Guide' : 'Guide des Tenues & Bagages'}
          </h1>
          <p className="text-[#74C69D] text-lg">
            {lang === 'en'
              ? 'Pack with peace of mind for the week'
              : 'Préparez votre valise en toute sérénité'}
          </p>
          <p className="text-[#C9A84C] text-sm mt-2">
            {lang === 'en'
              ? 'August 10 – 14, 2026 · Yaoundé'
              : '10 – 14 août 2026 · Yaoundé'}
          </p>
        </div>
      </div>

      {/* Embedded guide document */}
      <div className="max-w-5xl mx-auto">
        <iframe
          ref={iframeRef}
          src={`${GUIDE_SRC}?lang=${lang}`}
          onLoad={handleLoad}
          title={lang === 'en' ? 'Outfits & Packing Guide' : 'Guide des Tenues & Bagages'}
          className="w-full block border-0"
          style={{ height }}
          scrolling="no"
        />
      </div>
    </div>
  )
}
