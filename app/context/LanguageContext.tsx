'use client'

import { createContext, useContext, useState } from 'react'
import { translations, Language, TranslationKeys } from '../i18n/translations'

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')
  const [isOpen, setIsOpen] = useState(false)

  const t = (path: string): string => {
    const keys = path.split('.')
    let current: any = translations[currentLanguage]
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path}`)
        return path
      }
      current = current[key]
    }
    
    return current
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: (lang: Language) => {
          setCurrentLanguage(lang)
          setIsOpen(false)
        },
        t,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 