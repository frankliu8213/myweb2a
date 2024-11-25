import { CartProvider } from './context/CartContext'
import { LanguageProvider } from './context/LanguageContext'
import CartDrawer from './components/features/CartDrawer'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
