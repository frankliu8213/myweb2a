'use client'

import { X, Crown } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div 
        className="relative bg-[#1A1D21] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-[#FFD700]" />
            <h3 className="text-2xl font-bold text-white">{t('membership.title')}</h3>
          </div>
          <p className="text-white/60 text-center mb-8 max-w-xl mx-auto">
            {t('membership.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['basic', 'pro', 'enterprise'].map((plan) => (
              <div key={plan} className="bg-[#0A0C0E] p-6 rounded-lg">
                <h4 className="text-[#00F5D4] font-bold mb-2">
                  {t(`membership.plans.${plan}.name`)}
                </h4>
                <div className="text-2xl font-bold text-white mb-2">
                  {t(`membership.plans.${plan}.price`)}
                </div>
                <p className="text-white/60 text-sm mb-4">
                  {t(`membership.plans.${plan}.description`)}
                </p>
                <button className="w-full bg-[#00F5D4] text-[#0A0C0E] py-2 rounded-full hover:bg-[#00F5D4]/90 transition-colors">
                  {t('membership.select')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 