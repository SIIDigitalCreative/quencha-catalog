'use client'
import { useMemo, useState } from 'react'
import type { Product, FilterState, Extension, Category } from '@/lib/types'
import styles from './Sidebar.module.css'

const EXT_OPTIONS: { value: Extension | 'all'; label: string; color: string }[] = [
  { value: 'all',  label: 'All Products', color: 'var(--cyan)' },
  { value: 'core', label: 'Quencha Core', color: 'var(--teal)' },
  { value: 'kids', label: 'Quencha Kids', color: '#88C4E8' },
  { value: 'pets', label: 'Quencha Pets', color: '#D4894A' },
  { value: 'tech', label: 'Quencha Tech', color: '#2B4C5E' },
]
const CAT_OPTIONS: { value: Category; label: string; icon: string }[] = [
  { value: 'sip',         label: 'SIP — Drinkware',   icon: '💧' },
  { value: 'savor',       label: 'SAVOR — Lunch',      icon: '🍱' },
  { value: 'go',          label: 'GO — Bags',          icon: '👜' },
  { value: 'accessories', label: 'Accessories',         icon: '⚙️' },
]
const PRICE_OPTIONS = [
  { label: 'Under ₱299',  min: 0,    max: 299   },
  { label: '₱300 – 799',  min: 300,  max: 799   },
  { label: '₱800 – 1,299',min: 800,  max: 1299  },
  { label: '₱1,300+',     min: 1300, max: 99999 },
]

interface Props {
  products: Product[]
  filters: FilterState
  onChange: (updates: Partial<FilterState>) => void
}

export default function Sidebar({ products, filters, onChange }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const counts = useMemo(() => {
    const ext: Record<string, number> = { all: products.length }
    const cat: Record<string, number> = {}
    for (const p of products) {
      ext[p.ext] = (ext[p.ext] || 0) + 1
      cat[p.cat] = (cat[p.cat] || 0) + 1
    }
    return { ext, cat }
  }, [products])

  const isPriceActive = (min: number, max: number) =>
    filters.priceMin === min && filters.priceMax === max

  const togglePrice = (min: number, max: number) => {
    if (isPriceActive(min, max)) onChange({ priceMin: null, priceMax: null })
    else onChange({ priceMin: min, priceMax: max })
  }

  const inner = (
    <div className={styles.inner}>
      <div className={styles.hero}>
        <div className={styles.heroLabel}>Catalog</div>
        <div className={styles.heroNum}>{products.length}</div>
        <div className={styles.heroSub}>products</div>
      </div>

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Extension</span>
        {EXT_OPTIONS.map(o => (
          <button
            key={o.value}
            className={`${styles.filterBtn} ${filters.ext === o.value ? styles.active : ''}`}
            onClick={() => onChange({ ext: o.value })}
          >
            <span className={styles.dot} style={{ background: o.color }} />
            <span className={styles.filterLabel}>{o.label}</span>
            <span className={styles.badge}>{counts.ext[o.value] ?? 0}</span>
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Category</span>
        {CAT_OPTIONS.map(o => (
          <button
            key={o.value}
            className={`${styles.filterBtn} ${filters.cat === o.value ? styles.active : ''}`}
            onClick={() => onChange({ cat: filters.cat === o.value ? null : o.value })}
          >
            <span className={styles.icon}>{o.icon}</span>
            <span className={styles.filterLabel}>{o.label}</span>
            <span className={styles.badge}>{counts.cat[o.value] ?? 0}</span>
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.section}>
        <span className={styles.sectionLabel}>Price Range (SRP)</span>
        <div className={styles.priceChips}>
          {PRICE_OPTIONS.map(o => (
            <button
              key={o.label}
              className={`${styles.priceChip} ${isPriceActive(o.min, o.max) ? styles.active : ''}`}
              onClick={() => togglePrice(o.min, o.max)}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {(filters.ext !== 'all' || filters.cat || filters.priceMin !== null) && (
        <button
          className={styles.clearAll}
          onClick={() => onChange({ ext: 'all', cat: null, priceMin: null, priceMax: null })}
        >
          ✕ Clear filters
        </button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar}>{inner}</aside>

      {/* Mobile toggle */}
      <button className={styles.mobileToggle} onClick={() => setMobileOpen(true)}>
        ☰ Filters
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)}>
          <aside className={styles.mobileDrawer} onClick={e => e.stopPropagation()}>
            <button className={styles.drawerClose} onClick={() => setMobileOpen(false)}>✕</button>
            {inner}
          </aside>
        </div>
      )}
    </>
  )
}
