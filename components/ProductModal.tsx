'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { Product } from '@/lib/types'
import styles from './ProductModal.module.css'

const EXT_LABELS: Record<string, string> = { core: 'Quencha Core', kids: 'Quencha Kids', pets: 'Quencha Pets', tech: 'Quencha Tech' }
const CAT_LABELS: Record<string, string> = { sip: 'SIP — Drinkware', savor: 'SAVOR — Lunch & Food', go: 'GO — Bags & Carry', accessories: 'Accessories' }

export default function ProductModal({ product: p, onClose, onEdit }: { product: Product; onClose: () => void; onEdit: (p: Product) => void }) {
  const [activeImg, setActiveImg] = useState(0)

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <div className={styles.sub}>{EXT_LABELS[p.ext]} · {CAT_LABELS[p.cat]}</div>
            <h2 className={styles.title}>{p.name}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          {/* Images */}
          {p.images.length > 0 && (
            <div className={styles.imgSection}>
              <div className={styles.imgMain}>
                <Image src={p.images[activeImg]} alt={p.name} fill style={{ objectFit: 'cover' }} />
              </div>
              {p.images.length > 1 && (
                <div className={styles.imgThumbs}>
                  {p.images.map((url, i) => (
                    <div key={url} className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`} onClick={() => setActiveImg(i)}>
                      <Image src={url} alt="" fill style={{ objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Badges */}
          <div className={styles.badges}>
            {p.badges.map(b => <span key={b} className={styles.badge}>{b}</span>)}
          </div>

          {/* Desc */}
          <p className={styles.desc}>{p.desc}</p>

          {/* Price */}
          <div className={styles.priceRow}>
            <div>
              <div className={styles.priceLabel}>SRP</div>
              <div className={styles.price}>₱{p.srp.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</div>
            </div>
            <div>
              <div className={styles.priceLabel}>Packing</div>
              <div className={styles.price}>{p.packing} pcs</div>
            </div>
          </div>

          {/* SKU Table */}
          <div className={styles.tableLabel}>SKU Reference</div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr><th>Color</th><th>Product Code</th><th>Pack</th><th>SRP</th></tr>
              </thead>
              <tbody>
                {p.colors.map(c => (
                  <tr key={c.sku}>
                    <td><span className={styles.swatch} style={{ background: c.hex }} />{c.name}</td>
                    <td><code className={styles.code}>{c.sku}</code></td>
                    <td>{p.packing}</td>
                    <td><strong>₱{p.srp.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.actions}>
            <button className={styles.editBtn} onClick={() => onEdit(p)}>✏️ Edit This Product</button>
            <a href="https://sunbeamsimpexinc.com" target="_blank" rel="noreferrer" className={styles.inquireBtn}>📩 Bulk Inquiry</a>
          </div>
        </div>
      </div>
    </div>
  )
}
