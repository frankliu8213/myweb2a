'use client'

import Link from 'next/link'
import ProductCard from './ProductCard'
import { FEATURED_PRODUCTS } from '../../data/products'
import { useLanguage } from '../../context/LanguageContext'
import { ArrowRight, Crown, X } from 'lucide-react'
import { useState, useCallback, useEffect } from 'react'
import type { Product } from '../../types'

export default function ProductGrid() {
  const { t } = useLanguage()
  const [showMembership, setShowMembership] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // 获取产品数据
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 使用相对路径，避免环境变量问题
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        // 只显示标记为 featured 的产品
        const featuredProducts = data.filter((product: Product) => product.featured)
        setProducts(featuredProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
        // 如果 API 失败，使用本地数据并过滤
        const defaultProducts = FEATURED_PRODUCTS.map(product => ({
          ...product,
          featured: product.featured || false
        })) as Product[]
        const featuredProducts = defaultProducts.filter(product => product.featured)
        setProducts(featuredProducts)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleOpenMembership = useCallback(() => {
    setShowMembership(true)
  }, [])

  const handleCloseMembership = useCallback(() => {
    setShowMembership(false)
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-[#1A1D21]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center text-white/60">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#1A1D21]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">
            {t('common.featuredProducts')}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleOpenMembership}
              className="flex items-center space-x-2 text-[#FFD700] hover:text-[#FFD700]/80 transition-colors px-4 py-2 rounded-full border border-[#FFD700]/20 hover:border-[#FFD700]/40"
            >
              <Crown className="w-4 h-4" />
              <span>{t('membership.joinNow')}</span>
            </button>
            <Link 
              href="/products" 
              className="flex items-center space-x-2 text-[#00F5D4] hover:text-[#00F5D4]/80 transition-colors"
            >
              <span>{t('common.viewAll')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* 会员计划弹窗 */}
        {showMembership && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleCloseMembership}>
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
            <div 
              className="relative bg-[#1A1D21] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={handleCloseMembership}
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

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-[#00F5D4] text-[#0A0C0E] px-8 py-4 rounded-full hover:bg-[#00F5D4]/90 transition-colors"
          >
            <span>{t('common.exploreMore')}</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
} 