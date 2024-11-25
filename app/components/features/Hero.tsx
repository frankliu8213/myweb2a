'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-[#0A0C0E]">
      <Image
        src="https://picsum.photos/id/250/1920/1080"
        alt="Hero camera"
        fill
        className="object-cover opacity-70"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C0E] to-transparent">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-white/80 text-lg mb-8">
              {t('hero.subtitle')}
            </p>
            <button className="bg-[#00F5D4] text-[#0A0C0E] px-8 py-4 rounded-full flex items-center space-x-2 hover:bg-[#00F5D4]/90 transition-colors">
              <span>{t('hero.cta')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 