'use client'
import styles from './EditBar.module.css'

interface Props {
  count: number
  onAddProduct: () => void
  onExitEdit: () => void
}

export default function EditBar({ count, onAddProduct, onExitEdit }: Props) {
  return (
    <div className={styles.bar}>
      <div className={styles.indicator}>
        <span className={styles.dot} />
        <span className={styles.label}>Edit Mode</span>
        <span className={styles.count}>{count} products</span>
      </div>
      <div className={styles.actions}>
        <button className={styles.addBtn} onClick={onAddProduct}>+ Add Product</button>
        <button className={styles.exitBtn} onClick={onExitEdit}>✕ Exit Edit</button>
      </div>
    </div>
  )
}
