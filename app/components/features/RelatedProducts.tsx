'use client'

import { FEATURED_PRODUCTS } from '@/app/data/products'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  currentProductId: number
}

export default function RelatedProducts({ currentProductId }: RelatedProductsProps) {
  const relatedProducts = FEATURED_PRODUCTS.filter(
    product => product.id !== currentProductId
  ).slice(0, 2)

  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
} 