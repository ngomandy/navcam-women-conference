'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, type Lang } from '@/lib/i18n'

type AnyTranslations = typeof translations.en | typeof translations.fr

interface LanguageContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: AnyTranslations
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('navcam-lang') as Lang | null
    if (saved === 'en' || saved === 'fr') {
      setLangState(saved)
    }
  }, [])

  const setLang = (newLang: Lang) => {
    setLangState(newLang)
    localStorage.setItem('navcam-lang', newLang)
    document.documentElement.lang = newLang
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}
