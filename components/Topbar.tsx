'use client'
import styles from './Topbar.module.css'

interface Props {
  search: string
  onSearch: (s: string) => void
  editMode: boolean
  onToggleEdit: () => void
}

export default function Topbar({ search, onSearch, editMode, onToggleEdit }: Props) {
  return (
    <header className={`${styles.topbar} ${editMode ? styles.editActive : ''}`}>
      <div className={styles.brand}>
        <span className={styles.wordmark}>Quencha</span>
        <span className={styles.tagline}>Sip · Savor · Go</span>
      </div>

      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search products, SKUs…"
          className={styles.searchInput}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => onSearch('')}>✕</button>
        )}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.editToggle} ${editMode ? styles.editOn : ''}`}
          onClick={onToggleEdit}
          title={editMode ? 'Exit edit mode' : 'Enter edit mode'}
        >
          {editMode ? '✕ Exit Edit' : '✏️ Edit Mode'}
        </button>
        <a
          href="https://sunbeamsimpexinc.com"
          target="_blank"
          rel="noreferrer"
          className={styles.btnInquire}
        >
          Bulk Inquiry
        </a>
      </div>
    </header>
  )
}
