'use client'

import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#0A0C0E] text-white/80">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-[#00F5D4] text-xl font-bold mb-4">FUTURE CAM</h3>
            <p className="text-sm mb-4">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-[#00F5D4]">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#00F5D4]">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#00F5D4]">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="hover:text-[#00F5D4]">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.about')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.products')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.support')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.contact')}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.faqs')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.shipping')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.returns')}</Link></li>
              <li><Link href="#" className="hover:text-[#00F5D4]">{t('footer.links.privacy')}</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-4">{t('footer.newsletter.title')}</h4>
            <p className="text-sm mb-4">{t('footer.newsletter.description')}</p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className="bg-[#1A1D21] px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00F5D4]"
              />
              <button
                type="submit"
                className="bg-[#00F5D4] text-[#0A0C0E] px-4 py-2 rounded-lg hover:bg-[#00F5D4]/90 transition-colors flex items-center justify-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>{t('footer.newsletter.button')}</span>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
} 