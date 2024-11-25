'use client'

import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total } = useCart()
  const { t } = useLanguage()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-[#1A1D21] shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h2 className="text-xl font-bold text-white">{t('common.cart')}</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/60">
                <ShoppingBag className="h-12 w-12 mb-4" />
                <p>{t('common.emptyCart')}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-[#0A0C0E] p-4 rounded-lg"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-[#00F5D4]">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-white/60 hover:text-white"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-white/60 hover:text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-6">
            <div className="flex justify-between text-white mb-4">
              <span>{t('common.total')}</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#00F5D4] text-[#0A0C0E] py-3 rounded-full hover:bg-[#00F5D4]/90 transition-colors">
              {t('common.checkout')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 