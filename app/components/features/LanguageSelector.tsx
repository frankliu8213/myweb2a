'use client'

import { useLanguage } from '../../context/LanguageContext'
import { Globe, ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Language } from '../../i18n/translations'

interface LanguageOption {
  code: Language
  name: string
  flag: string
}

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
]

export default function LanguageSelector() {
  const { currentLanguage, setLanguage, isOpen, setIsOpen } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLangOption = LANGUAGE_OPTIONS.find(lang => lang.code === currentLanguage)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [setIsOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{currentLangOption?.flag}</span>
        <span>{currentLangOption?.code.toUpperCase()}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-[#1A1D21] rounded-lg shadow-xl border border-white/10 py-2 z-50">
          {LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-[#00F5D4]/10 transition-colors ${
                currentLanguage === lang.code ? 'text-[#00F5D4]' : 'text-white/80'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 