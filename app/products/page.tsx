'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/features/ProductCard'
import { Search, SlidersHorizontal, X } from 'lucide-react'

interface FilterState {
  minPrice: number
  maxPrice: number
  categories: string[]
  rating: number | null
  sortBy: 'price_asc' | 'price_desc' | 'rating' | 'newest'
}

export default function ProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 5000,
    categories: [],
    rating: null,
    sortBy: 'newest'
  })
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice
    const matchesRating = !filters.rating || product.rating >= filters.rating
    return matchesSearch && matchesPrice && matchesRating
  })

  const sortProducts = (products: any[]) => {
    switch (filters.sortBy) {
      case 'price_asc':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price_desc':
        return [...products].sort((a, b) => b.price - a.price)
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating)
      case 'newest':
        return [...products].sort((a, b) => b.id - a.id)
      default:
        return products
    }
  }

  const processedProducts = sortProducts(filteredProducts)

  const totalPages = Math.ceil(processedProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = processedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Header />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              {t('common.allProducts')}
            </h1>
          </div>

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
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-[#1A1D21] text-white px-6 rounded-lg flex items-center gap-2 hover:bg-[#1A1D21]/80"
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>{t('common.filters')}</span>
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-[#1A1D21] rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="text-white font-medium mb-4">Price Range</h3>
                    <div className="flex gap-4">
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                        className="w-full bg-[#0A0C0E] text-white px-3 py-2 rounded"
                        placeholder="Min"
                      />
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                        className="w-full bg-[#0A0C0E] text-white px-3 py-2 rounded"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <h3 className="text-white font-medium mb-4">Minimum Rating</h3>
                    <select
                      value={filters.rating || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) || null }))}
                      className="w-full bg-[#0A0C0E] text-white px-3 py-2 rounded"
                    >
                      <option value="">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>

                  {/* Reset Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilters({
                        minPrice: 0,
                        maxPrice: 5000,
                        categories: [],
                        rating: null,
                        sortBy: 'newest'
                      })}
                      className="text-white/60 hover:text-white flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Reset Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="mb-8">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="bg-[#1A1D21] text-white px-4 py-2 rounded-lg"
            >
              <option value="newest">{t('products.sort.newest')}</option>
              <option value="price_asc">{t('products.sort.priceAsc')}</option>
              <option value="price_desc">{t('products.sort.priceDesc')}</option>
              <option value="rating">{t('products.sort.rating')}</option>
            </select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center text-white/60 py-12">Loading...</div>
          ) : paginatedProducts.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              {t('common.noProductsFound')}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {paginatedProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12 flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === i + 1
                        ? 'bg-[#00F5D4] text-[#0A0C0E]'
                        : 'bg-[#1A1D21] text-white hover:bg-[#1A1D21]/80'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 