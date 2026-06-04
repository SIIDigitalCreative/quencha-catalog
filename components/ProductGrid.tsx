'use client'
import type { Product, FilterState } from '@/lib/types'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

const EXT_LABELS: Record<string, string> = { core: 'Quencha Core', kids: 'Quencha Kids', pets: 'Quencha Pets', tech: 'Quencha Tech' }
const CAT_LABELS: Record<string, string> = { sip: 'SIP — Drinkware', savor: 'SAVOR — Lunch & Food', go: 'GO — Bags & Carry', accessories: 'Accessories' }
const EXT_ORDER = ['core', 'kids', 'pets', 'tech'] as const
const CAT_ORDER = ['sip', 'savor', 'go', 'accessories'] as const

interface Props {
  products: Product[]
  allCount: number
  filters: FilterState
  editMode: boolean
  onSortChange: (s: FilterState['sort']) => void
  onViewChange: (v: FilterState['view']) => void
  onCardClick: (p: Product) => void
  onEditClick: (p: Product) => void
  onDeleteClick: (id: string) => void
}

export default function ProductGrid(props: Props) {
  const { products, allCount, filters, editMode, onSortChange, onViewChange, onCardClick, onEditClick, onDeleteClick } = props

  // Group by ext → cat
  const grouped: Partial<Record<string, Partial<Record<string, Product[]>>>> = {}
  for (const p of products) {
    if (!grouped[p.ext]) grouped[p.ext] = {}
    if (!grouped[p.ext]![p.cat]) grouped[p.ext]![p.cat] = []
    grouped[p.ext]![p.cat]!.push(p)
  }

  return (
    <div>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.heroEyebrow}>2024 Product Catalog</div>
          <div className={styles.heroTitle}>Quencha</div>
          <div className={styles.heroSub}>Complete product lineup — drinkware, lunch essentials, bags, accessories, kids, pets & tech.</div>
          <div className={styles.heroChips}>
            {['BPA-Free','Double Wall','UV Printable','Designed in Copenhagen'].map(c => (
              <span key={c} className={styles.heroChip}>{c}</span>
            ))}
          </div>
        </div>
        <div className={styles.heroStat}>
          <div className={styles.heroNum}>{allCount}</div>
          <div className={styles.heroNumLab}>Products</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <span className={styles.resultsLabel}>
          Showing <strong>{products.length}</strong>{products.length !== allCount ? ` of ${allCount}` : ''} products
        </span>
        <select className={styles.sortSelect} value={filters.sort} onChange={e => onSortChange(e.target.value as FilterState['sort'])}>
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
        </select>
        <div className={styles.viewBtns}>
          <button className={`${styles.viewBtn} ${filters.view === 'grid' ? styles.active : ''}`} onClick={() => onViewChange('grid')} title="Grid">⊞</button>
          <button className={`${styles.viewBtn} ${filters.view === 'list' ? styles.active : ''}`} onClick={() => onViewChange('list')} title="List">☰</button>
        </div>
      </div>

      {/* Empty */}
      {products.length === 0 && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No products found</h3>
          <p>Try a different filter or search term.</p>
        </div>
      )}

      {/* Groups */}
      {EXT_ORDER.map(ext => {
        const cats = grouped[ext]
        if (!cats) return null
        return CAT_ORDER.map(cat => {
          const prods = cats[cat]
          if (!prods?.length) return null
          return (
            <div key={`${ext}-${cat}`}>
              <div className={styles.catHeader}>
                <div className={styles.catLine} />
                <span className={styles.catName}>{CAT_LABELS[cat]}</span>
                {ext !== 'core' && <span className={styles.extTag}>{EXT_LABELS[ext]}</span>}
                <span className={styles.catCount}>{prods.length} item{prods.length > 1 ? 's' : ''}</span>
                <div className={styles.catLine} />
              </div>
              <div className={`${styles.grid} ${filters.view === 'list' ? styles.listView : ''}`}>
                {prods.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    editMode={editMode}
                    view={filters.view}
                    onClick={() => onCardClick(p)}
                    onEdit={() => onEditClick(p)}
                    onDelete={() => onDeleteClick(p.id)}
                  />
                ))}
              </div>
            </div>
          )
        })
      })}
    </div>
  )
}
