export type Extension = 'core' | 'kids' | 'pets' | 'tech'
export type Category = 'sip' | 'savor' | 'go' | 'accessories'

export interface ColorVariant {
  name: string
  code: string
  hex: string
  sku: string
}

export interface Product {
  id: string
  name: string
  ext: Extension
  cat: Category
  desc: string
  badges: string[]
  srp: number
  packing: number
  colors: ColorVariant[]
  images: string[]          // Vercel Blob URLs
  createdAt: string
  updatedAt: string
}

export interface FilterState {
  ext: Extension | 'all'
  cat: Category | null
  priceMin: number | null
  priceMax: number | null
  search: string
  sort: 'default' | 'price-asc' | 'price-desc' | 'name-asc'
  view: 'grid' | 'list'
}
