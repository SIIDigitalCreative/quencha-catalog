'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import type { Product, FilterState, Extension, Category } from '@/lib/types'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ProductGrid from './ProductGrid'
import ProductModal from './ProductModal'
import EditProductModal from './EditProductModal'
import EditBar from './EditBar'
import styles from './catalog.module.css'

const DEFAULT_FILTERS: FilterState = {
  ext: 'all', cat: null, priceMin: null, priceMax: null,
  search: '', sort: 'default', view: 'grid',
}

export default function CatalogClient({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [editMode, setEditMode] = useState(false)
  const [viewProduct, setViewProduct] = useState<Product | null>(null)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [saving, setSaving] = useState(false)

  // Apply edit-mode class to body
  useEffect(() => {
    document.body.classList.toggle('edit-mode', editMode)
  }, [editMode])

  // Filtered + sorted products
  const filtered = useMemo(() => {
    let list = [...products]
    if (filters.ext !== 'all') list = list.filter(p => p.ext === filters.ext)
    if (filters.cat) list = list.filter(p => p.cat === filters.cat)
    if (filters.priceMin !== null) list = list.filter(p => p.srp >= filters.priceMin!)
    if (filters.priceMax !== null) list = list.filter(p => p.srp <= filters.priceMax!)
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.colors.some(c => c.sku.toLowerCase().includes(q))
      )
    }
    if (filters.sort === 'price-asc') list.sort((a, b) => a.srp - b.srp)
    if (filters.sort === 'price-desc') list.sort((a, b) => b.srp - a.srp)
    if (filters.sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, filters])

  // Save product (create or update)
  const saveProduct = useCallback(async (data: Partial<Product> & { id?: string }) => {
    setSaving(true)
    try {
      const isNew = !data.id
      const url = isNew ? '/api/products' : `/api/products/${data.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Save failed')
      const saved: Product = await res.json()
      setProducts(prev =>
        isNew ? [...prev, saved] : prev.map(p => (p.id === saved.id ? saved : p))
      )
      setEditProduct(null)
      setIsAddingNew(false)
    } catch (e) {
      alert('Error saving product. Please try again.')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }, [])

  // Delete product
  const deleteProduct = useCallback(async (id: string) => {
    if (!confirm('Delete this product? This cannot be undone.')) return
    setSaving(true)
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' })
      setProducts(prev => prev.filter(p => p.id !== id))
      setViewProduct(null)
      setEditProduct(null)
    } catch (e) {
      alert('Error deleting product.')
      console.error(e)
    } finally {
      setSaving(false)
    }
  }, [])

  const handleCardClick = (p: Product) => {
    if (editMode) { setEditProduct(p); setIsAddingNew(false) }
    else setViewProduct(p)
  }

  return (
    <div className={styles.appRoot}>
      <Topbar
        search={filters.search}
        onSearch={s => setFilters(f => ({ ...f, search: s }))}
        editMode={editMode}
        onToggleEdit={() => setEditMode(e => !e)}
      />

      <div className={styles.layout}>
        <Sidebar
          products={products}
          filters={filters}
          onChange={update => setFilters(f => ({ ...f, ...update }))}
        />

        <main className={styles.main}>
          <ProductGrid
            products={filtered}
            allCount={products.length}
            filters={filters}
            editMode={editMode}
            onSortChange={sort => setFilters(f => ({ ...f, sort }))}
            onViewChange={view => setFilters(f => ({ ...f, view }))}
            onCardClick={handleCardClick}
            onEditClick={p => { setEditProduct(p); setIsAddingNew(false) }}
            onDeleteClick={deleteProduct}
          />
        </main>
      </div>

      {/* View modal */}
      {viewProduct && !editMode && (
        <ProductModal
          product={viewProduct}
          onClose={() => setViewProduct(null)}
          onEdit={p => { setViewProduct(null); setEditProduct(p) }}
        />
      )}

      {/* Edit modal */}
      {(editProduct || isAddingNew) && (
        <EditProductModal
          product={editProduct}
          isNew={isAddingNew}
          saving={saving}
          onSave={saveProduct}
          onDelete={editProduct ? () => deleteProduct(editProduct.id) : undefined}
          onClose={() => { setEditProduct(null); setIsAddingNew(false) }}
        />
      )}

      {/* Edit bar */}
      {editMode && (
        <EditBar
          onAddProduct={() => { setEditProduct(null); setIsAddingNew(true) }}
          onExitEdit={() => setEditMode(false)}
          count={products.length}
        />
      )}
    </div>
  )
}
