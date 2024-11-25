'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLanguage } from '../../context/LanguageContext'

interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { t } = useLanguage()

  return (
    <div className="bg-[#0A0C0E] rounded-2xl overflow-hidden group">
      <Link href={`/products/${product.id}`} className="block relative h-64 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 hover:text-[#00F5D4] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-white/60 text-sm mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-[#00F5D4] fill-current" />
            <span className="text-white">{product.rating}</span>
          </div>
          <span className="text-[#00F5D4] font-bold">${product.price}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full mt-4 bg-[#FF3366] text-white py-3 rounded-full flex items-center justify-center space-x-2 hover:bg-[#FF3366]/90 transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>{t('common.addToCart')}</span>
        </button>
      </div>
    </div>
  )
} 