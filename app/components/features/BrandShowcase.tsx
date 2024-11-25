'use client'

import Image from 'next/image'
import { useLanguage } from '../../context/LanguageContext'

interface Brand {
  id: number
  name: string
  image: string
  link: string
}

export default function BrandShowcase() {
  const { t } = useLanguage()

  const BRAND_LOGOS: Brand[] = [
    {
      id: 1,
      name: "Sony",
      image: "https://picsum.photos/id/1/128/48",
      link: "#"
    },
    {
      id: 2,
      name: "Canon",
      image: "https://picsum.photos/id/2/128/48",
      link: "#"
    },
    {
      id: 3,
      name: "Nikon",
      image: "https://picsum.photos/id/3/128/48",
      link: "#"
    },
    {
      id: 4,
      name: "Leica",
      image: "https://picsum.photos/id/4/128/48",
      link: "#"
    }
  ]

  const getLogoAlt = (brandName: string) => {
    return t('brands.logoAlt').replace('{name}', brandName)
  }

  return (
    <section className="py-16 bg-[#1A1D21]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white text-center mb-12">
          {t('brands.title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {BRAND_LOGOS.map((brand) => (
            <a 
              key={brand.id}
              href={brand.link}
              className="relative w-32 h-12 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={brand.image}
                alt={getLogoAlt(brand.name)}
                fill
                className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
} 