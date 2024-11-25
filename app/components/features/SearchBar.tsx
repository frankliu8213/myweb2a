'use client'

import { Search, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FEATURED_PRODUCTS } from '../../data/products'
import { useLanguage } from '../../context/LanguageContext'

interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export default function SearchBar() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredProducts = FEATURED_PRODUCTS.filter((product: Product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10"
      >
        <Search className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="container mx-auto max-w-3xl pt-20 px-4">
            <div className="bg-[#1A1D21] rounded-2xl shadow-xl">
              <div className="flex items-center p-4 border-b border-white/10">
                <Search className="w-5 h-5 text-white/60" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="flex-1 bg-transparent border-none outline-none px-4 text-white"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {query && filteredProducts.length === 0 ? (
                  <div className="p-4 text-white/60 text-center">
                    {t('common.noProductsFound')}
                  </div>
                ) : (
                  <div className="p-2">
                    {filteredProducts.map((product: Product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="relative w-16 h-16">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{product.name}</h3>
                          <p className="text-white/60 text-sm">{product.description}</p>
                          <p className="text-[#00F5D4] font-medium">${product.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 