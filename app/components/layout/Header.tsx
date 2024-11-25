'use client'

import { ShoppingCart, Crown, X } from 'lucide-react'
import Link from 'next/link'
import LanguageSelector from '../features/LanguageSelector'
import { useCart } from '../../context/CartContext'
import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'

export default function Header() {
  const { setIsOpen: setCartOpen, items } = useCart()
  const [showMembership, setShowMembership] = useState(false)
  const { t } = useLanguage()
  
  return (
    <>
      <header className="fixed top-0 w-full bg-[#1A1D21]/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Language Selector */}
            <div className="flex items-center space-x-4">
              <LanguageSelector />
            </div>
            
            {/* Logo */}
            <Link href="/" className="text-[#00F5D4] text-2xl font-bold">
              FUTURE CAM
            </Link>
            
            {/* Actions */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setShowMembership(true)}
                className="text-[#FFD700] hover:text-[#FFD700]/80 flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40 transition-colors"
              >
                <Crown className="w-5 h-5" />
                <span className="text-sm font-medium">{t('membership.vip')}</span>
              </button>
              <button 
                className="text-white/80 hover:text-white relative"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 会员计划弹窗 */}
      {showMembership && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowMembership(false)}>
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
          <div 
            className="relative bg-[#1A1D21] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowMembership(false)}
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
      )}
    </>
  )
} 