'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  product: {
    image: string
    name: string
  }
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  // 模拟多张产品图片
  const images = [
    product.image,
    product.image.replace(/\d+(?=\/800)/, (n) => String(Number(n) + 1)),
    product.image.replace(/\d+(?=\/800)/, (n) => String(Number(n) + 2)),
    product.image.replace(/\d+(?=\/800)/, (n) => String(Number(n) + 3)),
  ]

  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-2xl overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden ${
              selectedImage === index ? 'ring-2 ring-[#00F5D4]' : ''
            }`}
          >
            <Image
              src={image}
              alt={`${product.name} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
} 