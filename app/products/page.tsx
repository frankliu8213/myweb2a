'use client'

import { useState } from 'react'
import { FEATURED_PRODUCTS } from '../data/products'
import { useLanguage } from '../context/LanguageContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/features/ProductCard'
import { Search, SlidersHorizontal } from 'lucide-react'

export default function ProductsPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredProducts = FEATURED_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesPrice
  })

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search and Filters */}
          <div className="mb-12">
            <div className="flex gap-4 mb-8">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder={t('common.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1A1D21] text-white px-4 py-3 rounded-lg pl-12 focus:outline-none focus:ring-2 focus:ring-[#00F5D4]"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
              </div>
              <button className="bg-[#1A1D21] text-white px-6 rounded-lg flex items-center gap-2 hover:bg-[#1A1D21]/80">
                <SlidersHorizontal className="w-5 h-5" />
                <span>{t('common.filters')}</span>
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center text-white/60 py-12">
              {t('common.noProductsFound')}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 