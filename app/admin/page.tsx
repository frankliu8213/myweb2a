'use client'

import { useState } from 'react'
import AdminHeader from '../components/admin/AdminHeader'
import ProductManager from '../components/admin/ProductManager'
import { useLanguage } from '../context/LanguageContext'

export default function AdminPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('products')

  return (
    <div className="min-h-screen bg-[#0A0C0E]">
      <AdminHeader />
      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">
              {t('admin.dashboard')}
            </h1>
          </div>
          
          <div className="mb-8">
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'products'
                    ? 'bg-[#00F5D4] text-[#0A0C0E]'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {t('admin.products')}
              </button>
            </nav>
          </div>

          {activeTab === 'products' && <ProductManager />}
        </div>
      </main>
    </div>
  )
} 