'use client'
import Image from 'next/image'
import type { Product } from '@/lib/types'
import styles from './ProductCard.module.css'

interface Props {
  product: Product
  editMode: boolean
  view: 'grid' | 'list'
  onClick: () => void
  onEdit: () => void
  onDelete: () => void
}

const EXT_CLASS: Record<string, string> = { kids: 'kids', pets: 'pets', tech: 'tech' }
const EXT_LABEL: Record<string, string> = { kids: 'Kids', pets: 'Pets', tech: 'Tech' }

export default function ProductCard({ product: p, editMode, view, onClick, onEdit, onDelete }: Props) {
  const mainImage = p.images?.[0]
  const colors = p.colors.slice(0, 6)
  const extra = p.colors.length > 6 ? p.colors.length - 6 : 0
  const extClass = EXT_CLASS[p.ext]
  const isListView = view === 'list'

  return (
    <div className={`${styles.card} ${isListView ? styles.listCard : ''} ${editMode ? styles.editMode : ''}`}>
      {/* Image */}
      <div className={styles.imgWrap} onClick={editMode ? undefined : onClick}>
        {mainImage ? (
          <Image src={mainImage} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:600px) 50vw, 320px" />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span>📦</span>
            {editMode && <span className={styles.uploadHint}>Click edit to add image</span>}
          </div>
        )}
        {extClass && <span className={`${styles.extTag} ${styles[extClass]}`}>{EXT_LABEL[p.ext]}</span>}
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.name} onClick={editMode ? undefined : onClick}>{p.name}</div>
        <div className={styles.desc}>{p.desc}</div>

        {p.badges.length > 0 && (
          <div className={styles.badges}>
            {p.badges.slice(0, 3).map(b => <span key={b} className={styles.badge}>{b}</span>)}
          </div>
        )}

        <div className={styles.colorRow}>
          {colors.map(c => (
            <span key={c.code} className={styles.colorDot} style={{ background: c.hex }} title={c.name} />
          ))}
          {extra > 0 && <span className={styles.colorExtra}>+{extra}</span>}
        </div>

        <div className={styles.footer}>
          <div className={styles.priceWrap}>
            <div className={styles.price}>₱{p.srp.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
            <div className={styles.priceSub}>SRP · Pack {p.packing}</div>
          </div>
          <span className={styles.sku}>{p.colors[0]?.sku.split('-').slice(0, 2).join('-')}</span>
        </div>

        {/* Edit controls */}
        {editMode && (
          <div className={styles.editControls}>
            <button className={styles.editBtn} onClick={onEdit}>✏️ Edit</button>
            <button className={styles.deleteBtn} onClick={onDelete}>🗑</button>
          </div>
        )}
      </div>
    </div>
  )
}
