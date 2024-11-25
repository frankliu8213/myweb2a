'use client'

import { Cpu, Zap, Camera, Maximize } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

export default function TechSpecs() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-[#0A0C0E]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          {t('techSpecs.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-[#1A1D21] rounded-2xl">
            <Cpu className="w-8 h-8 text-[#00F5D4] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {t('techSpecs.aiProcessing.title')}
            </h3>
            <p className="text-white/60">
              {t('techSpecs.aiProcessing.description')}
            </p>
          </div>
          <div className="p-6 bg-[#1A1D21] rounded-2xl">
            <Zap className="w-8 h-8 text-[#00F5D4] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {t('techSpecs.fastCharging.title')}
            </h3>
            <p className="text-white/60">
              {t('techSpecs.fastCharging.description')}
            </p>
          </div>
          <div className="p-6 bg-[#1A1D21] rounded-2xl">
            <Camera className="w-8 h-8 text-[#00F5D4] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {t('techSpecs.videoCapture.title')}
            </h3>
            <p className="text-white/60">
              {t('techSpecs.videoCapture.description')}
            </p>
          </div>
          <div className="p-6 bg-[#1A1D21] rounded-2xl">
            <Maximize className="w-8 h-8 text-[#00F5D4] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              {t('techSpecs.stabilization.title')}
            </h3>
            <p className="text-white/60">
              {t('techSpecs.stabilization.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 