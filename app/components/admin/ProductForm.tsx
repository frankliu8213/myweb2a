'use client'

import { useState } from 'react'
import { X, Upload } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import type { Product } from '../../types'

interface ProductFormProps {
  product: Product | null
  onClose: () => void
  onSubmit: (formData: FormData) => void
  isSubmitting: boolean
}

export default function ProductForm({ product, onClose, onSubmit, isSubmitting }: ProductFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || 0,
    description: product?.description || '',
    rating: product?.rating || 4.5,
    featured: product?.featured || false,
    specs: product?.specs || {
      sensor: '',
      processor: '',
      iso: '',
      stabilization: ''
    }
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(product?.image || '')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'object') {
        data.append(key, JSON.stringify(value))
      } else {
        data.append(key, String(value))
      }
    })
    if (selectedImage) {
      data.append('image', selectedImage)
    }
    onSubmit(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div 
        className="relative bg-[#1A1D21] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {product ? t('admin.editProduct') : t('admin.addProduct')}
          </h2>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-white mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={e => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
                className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg h-24"
                required
              />
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-white font-bold mb-4">Specifications</h3>
              <div className="space-y-4">
                {Object.entries(formData.specs).map(([key]) => (
                  <div key={key}>
                    <label className="block text-white mb-2 capitalize">{key}</label>
                    <input
                      type="text"
                      value={formData.specs[key]}
                      onChange={e => setFormData(prev => ({
                        ...prev,
                        specs: { ...prev.specs, [key]: e.target.value }
                      }))}
                      className="w-full bg-[#0A0C0E] text-white px-4 py-2 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-white mb-2">Product Image</label>
              <div 
                className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer"
                onClick={() => document.getElementById('imageInput')?.click()}
              >
                {previewUrl ? (
                  <div className="relative w-full h-48 mb-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-white/60 mx-auto mb-2" />
                    <p className="text-white/60">Drag and drop or click to upload</p>
                  </>
                )}
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={e => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4"
              />
              <label className="text-white">Show on Homepage</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-[#00F5D4] text-[#0A0C0E] hover:bg-[#00F5D4]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : (product ? 'Update' : 'Create')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 