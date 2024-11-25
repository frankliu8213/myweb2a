export interface Product {
  id: number
  name: string
  price: number
  rating: number
  image: string
  description: string
  featured: boolean
  specs: {
    [key: string]: string
  }
}

export interface FormData {
  name: string
  price: number
  description: string
  featured: boolean
  specs: {
    sensor: string
    processor: string
    iso: string
    stabilization: string
  }
} 