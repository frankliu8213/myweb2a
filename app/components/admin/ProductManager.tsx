'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import ProductForm from '@/app/components/admin/ProductForm'
import type { Product } from '../../types'
import { FEATURED_PRODUCTS } from '../../data/products'
import { toast } from 'react-hot-toast'

export default function ProductManager() {
  const { t } = useLanguage()
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
      setProducts(FEATURED_PRODUCTS.map(p => ({
        ...p,
        featured: p.featured ?? false
      })))
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleSubmit = async (formData: FormData) => {
    try {
      setSubmitting(true)
      const imageFile = formData.get('image') as File
      let imageUrl = ''

      if (imageFile && imageFile.size > 0) {
        const formDataWithImage = new FormData()
        formDataWithImage.append('file', imageFile)
        
        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
          method: 'POST',
          body: formDataWithImage,
        })

        if (!uploadResponse.ok) {
          const error = await uploadResponse.json()
          throw new Error(error.message || 'Failed to upload image')
        }
        
        const { url } = await uploadResponse.json()
        imageUrl = url
      }

      const productData = {
        id: editingProduct?.id,
        name: formData.get('name'),
        price: Number(formData.get('price')),
        rating: Number(formData.get('rating')),
        description: formData.get('description'),
        featured: formData.get('featured') === 'true',
        image: imageUrl || editingProduct?.image || "https://picsum.photos/id/252/800/600",
        specs: JSON.parse(formData.get('specs') as string)
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save product')
      }

      await fetchProducts()
      setShowForm(false)
      setEditingProduct(null)
      toast.success(editingProduct ? 'Product updated successfully' : 'Product created successfully')
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggleVisibility = async (productId: number) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          featured: !product.featured
        }),
      })

      if (!response.ok) throw new Error('Failed to update product')
      await fetchProducts()
    } catch (error) {
      console.error('Error updating product:', error)
    }
  }

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm(t('admin.confirmDelete'))) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      })

      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return <div className="text-white text-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <button
          onClick={handleAddProduct}
          className="flex items-center space-x-2 bg-[#00F5D4] text-[#0A0C0E] px-4 py-2 rounded-lg"
          disabled={submitting}
        >
          <Plus className="w-5 h-5" />
          <span>{t('admin.addProduct')}</span>
        </button>
      </div>

      <div className="bg-[#1A1D21] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4 text-white/60">{t('admin.product')}</th>
              <th className="text-left p-4 text-white/60">{t('admin.price')}</th>
              <th className="text-left p-4 text-white/60">{t('admin.featured')}</th>
              <th className="text-right p-4 text-white/60">{t('admin.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-white/10">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-white font-medium">{product.name}</div>
                      <div className="text-white/60 text-sm">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-white">${product.price}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleToggleVisibility(product.id)}
                    className={`p-2 rounded-lg ${
                      product.featured
                        ? 'text-[#00F5D4]'
                        : 'text-white/60'
                    }`}
                  >
                    {product.featured ? <Eye /> : <EyeOff />}
                  </button>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="p-2 text-white/60 hover:text-white rounded-lg"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-white/60 hover:text-red-500 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />
      )}
    </div>
  )
} 