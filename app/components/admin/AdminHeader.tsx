'use client'

import { LogOut, Home } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'

export default function AdminHeader() {
  const { t } = useLanguage()

  return (
    <header className="fixed top-0 w-full bg-[#1A1D21] z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-[#00F5D4] text-xl font-bold">
            {t('admin.dashboard')}
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-white/60 hover:text-white flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Home className="w-5 h-5" />
              <span>Front Page</span>
            </Link>
            <button className="text-white/60 hover:text-white flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 