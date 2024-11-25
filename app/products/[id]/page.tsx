'use client'

import { use, useEffect, useState } from 'react'
import { FEATURED_PRODUCTS } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import ProductGallery from '../../components/features/ProductGallery'
import RelatedProducts from '../../components/features/RelatedProducts'
import type { Product } from '../../types'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: PageProps) {
  const { t } = useLanguage()
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  
  // 使用 React.use() 来解包 params
  const resolvedParams = use(params)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // 先从 API 获取所有产品
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch')
        const products = await response.json()
        
        // 查找指定 ID 的产品
        const foundProduct = products.find((p: Product) => p.id === parseInt(resolvedParams.id))
        
        if (foundProduct) {
          setProduct(foundProduct)
        } else {
          // 如果 API 中找不到，尝试从本地数据中查找
          const localProduct = FEATURED_PRODUCTS.find(p => p.id === parseInt(resolvedParams.id))
          if (localProduct) {
            setProduct({
              ...localProduct,
              featured: localProduct.featured || false
            })
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        // 如果 API 失败，尝试从本地数据中查找
        const localProduct = FEATURED_PRODUCTS.find(p => p.id === parseInt(resolvedParams.id))
        if (localProduct) {
          setProduct({
            ...localProduct,
            featured: localProduct.featured || false
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0C0E]">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center text-white/60">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A0C0E]">
        <Header />
        <main className="pt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center text-white">Product not found</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <ProductGallery product={product} />

            {/* Product Info */}
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-[#00F5D4] fill-current" />
                  <span className="ml-2">{product.rating}</span>
                </div>
                <span className="text-2xl font-bold text-[#00F5D4]">
                  ${product.price}
                </span>
              </div>

              <p className="text-white/60 mb-8">{product.description}</p>

              {/* Specifications */}
              <div className="bg-[#1A1D21] rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">{t('common.specifications')}</h3>
                <dl className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <dt className="text-white/60 capitalize">{key}</dt>
                      <dd className="text-white font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={() => addItem(product)}
                  className="flex-1 bg-[#00F5D4] text-[#0A0C0E] py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-[#00F5D4]/90 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>{t('common.addToCart')}</span>
                </button>
                <button className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts currentProductId={product.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
} 