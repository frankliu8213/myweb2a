import Header from './components/layout/Header'
import Hero from './components/features/Hero'
import ProductGrid from './components/features/ProductGrid'
import TechSpecs from './components/features/TechSpecs'
import BrandShowcase from './components/features/BrandShowcase'
import Footer from './components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <Header />
      <Hero />
      <ProductGrid />
      <TechSpecs />
      <BrandShowcase />
      <Footer />
    </div>
  )
}
