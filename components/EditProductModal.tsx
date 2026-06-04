'use client'
import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import type { Product, Extension, Category, ColorVariant } from '@/lib/types'
import styles from './EditProductModal.module.css'

const EXT_OPTIONS: Extension[] = ['core', 'kids', 'pets', 'tech']
const CAT_OPTIONS: Category[] = ['sip', 'savor', 'go', 'accessories']

const BLANK: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '', ext: 'core', cat: 'sip', desc: '',
  badges: [], srp: 0, packing: 0, colors: [], images: [],
}

interface Props {
  product: Product | null
  isNew: boolean
  saving: boolean
  onSave: (data: Partial<Product> & { id?: string }) => void
  onDelete?: () => void
  onClose: () => void
}

export default function EditProductModal({ product, isNew, saving, onSave, onDelete, onClose }: Props) {
  const [form, setForm] = useState<typeof BLANK>(
    product ? { name: product.name, ext: product.ext, cat: product.cat, desc: product.desc, badges: [...product.badges], srp: product.srp, packing: product.packing, colors: product.colors.map(c => ({ ...c })), images: [...(product.images || [])] }
    : { ...BLANK, badges: [], colors: [], images: [] }
  )
  const [badgeInput, setBadgeInput] = useState('')
  const [newColor, setNewColor] = useState<Partial<ColorVariant>>({ name: '', code: '', hex: '#B9DCD2', sku: '' })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [activeTab, setActiveTab] = useState<'details' | 'colors' | 'images'>('details')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof typeof BLANK>(key: K, value: (typeof BLANK)[K]) =>
    setForm(f => ({ ...f, [key]: value }))

  // Badges
  const addBadge = () => {
    const b = badgeInput.trim()
    if (b && !form.badges.includes(b)) { set('badges', [...form.badges, b]); setBadgeInput('') }
  }
  const removeBadge = (b: string) => set('badges', form.badges.filter(x => x !== b))

  // Colors
  const addColor = () => {
    const { name, code, hex, sku } = newColor
    if (!name || !code || !sku) return
    set('colors', [...form.colors, { name: name!, code: code!, hex: hex || '#B9DCD2', sku: sku! }])
    setNewColor({ name: '', code: '', hex: '#B9DCD2', sku: '' })
  }
  const removeColor = (idx: number) => set('colors', form.colors.filter((_, i) => i !== idx))
  const updateColorField = (idx: number, field: keyof ColorVariant, value: string) => {
    const updated = form.colors.map((c, i) => i === idx ? { ...c, [field]: value } : c)
    set('colors', updated)
  }

  // Images
  const uploadImage = useCallback(async (file: File) => {
    setUploading(true); setUploadError('')
    const fd = new FormData(); fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const { url } = await res.json()
      set('images', [...form.images, url])
    } catch {
      setUploadError('Upload failed. Check file size and type (JPG, PNG, WebP).')
    } finally { setUploading(false) }
  }, [form.images])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadImage(file)
    e.target.value = ''
  }
  const removeImage = (idx: number) => set('images', form.images.filter((_, i) => i !== idx))
  const moveImage = (from: number, to: number) => {
    const imgs = [...form.images]
    const [item] = imgs.splice(from, 1); imgs.splice(to, 0, item)
    set('images', imgs)
  }

  const handleSubmit = () => {
    if (!form.name.trim()) { alert('Product name is required.'); return }
    if (form.srp <= 0) { alert('Price must be greater than 0.'); return }
    onSave({ ...form, ...(product ? { id: product.id } : {}) })
  }

  return (
    <div className={styles.overlay} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <div className={styles.editBadge}>{isNew ? '+ New Product' : '✏️ Editing'}</div>
            <h2 className={styles.title}>{form.name || (isNew ? 'New Product' : 'Edit Product')}</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {(['details', 'colors', 'images'] as const).map(t => (
            <button key={t} className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`} onClick={() => setActiveTab(t)}>
              {t === 'details' && '📋 Details'}
              {t === 'colors' && `🎨 Colors (${form.colors.length})`}
              {t === 'images' && `🖼 Images (${form.images.length})`}
            </button>
          ))}
        </div>

        <div className={styles.body}>
          {/* ── DETAILS TAB ── */}
          {activeTab === 'details' && (
            <div className={styles.section}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Product Name *</label>
                  <input className={styles.input} value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Insulated Tumbler 550ml" />
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Extension</label>
                  <select className={styles.select} value={form.ext} onChange={e => set('ext', e.target.value as Extension)}>
                    {EXT_OPTIONS.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select} value={form.cat} onChange={e => set('cat', e.target.value as Category)}>
                    {CAT_OPTIONS.map(o => <option key={o} value={o}>{o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>SRP (₱) *</label>
                  <input className={styles.input} type="number" step="0.01" min="0" value={form.srp || ''} onChange={e => set('srp', parseFloat(e.target.value) || 0)} placeholder="799.75" />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Packing Qty</label>
                  <input className={styles.input} type="number" min="1" value={form.packing || ''} onChange={e => set('packing', parseInt(e.target.value) || 0)} placeholder="16" />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} value={form.desc} onChange={e => set('desc', e.target.value)} placeholder="Describe the product…" rows={4} />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Feature Badges</label>
                <div className={styles.badgeList}>
                  {form.badges.map(b => (
                    <span key={b} className={styles.badgeTag}>
                      {b} <button onClick={() => removeBadge(b)}>✕</button>
                    </span>
                  ))}
                </div>
                <div className={styles.addRow}>
                  <input className={styles.input} value={badgeInput} onChange={e => setBadgeInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addBadge() } }} placeholder="e.g. BPA-Free, Double Wall…" />
                  <button className={styles.addBtn} onClick={addBadge}>Add</button>
                </div>
              </div>
            </div>
          )}

          {/* ── COLORS TAB ── */}
          {activeTab === 'colors' && (
            <div className={styles.section}>
              <p className={styles.hint}>Each color variant gets its own SKU code. Format: BASE-COLORCODE (e.g. QNH-IT550-WT)</p>

              {form.colors.length > 0 && (
                <div className={styles.colorTable}>
                  <div className={styles.colorTableHead}>
                    <span>Swatch</span><span>Color Name</span><span>Code</span><span>SKU</span><span></span>
                  </div>
                  {form.colors.map((c, i) => (
                    <div key={i} className={styles.colorRow}>
                      <input type="color" className={styles.colorPicker} value={c.hex} onChange={e => updateColorField(i, 'hex', e.target.value)} />
                      <input className={styles.inputSm} value={c.name} onChange={e => updateColorField(i, 'name', e.target.value)} placeholder="Color name" />
                      <input className={styles.inputSm} value={c.code} onChange={e => updateColorField(i, 'code', e.target.value.toUpperCase())} placeholder="Code" maxLength={4} />
                      <input className={styles.inputSm} value={c.sku} onChange={e => updateColorField(i, 'sku', e.target.value.toUpperCase())} placeholder="Full SKU" />
                      <button className={styles.removeBtn} onClick={() => removeColor(i)}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.addColorForm}>
                <h4 className={styles.subheading}>Add Color Variant</h4>
                <div className={styles.colorRow}>
                  <input type="color" className={styles.colorPicker} value={newColor.hex || '#B9DCD2'} onChange={e => setNewColor(n => ({ ...n, hex: e.target.value }))} />
                  <input className={styles.inputSm} value={newColor.name || ''} onChange={e => setNewColor(n => ({ ...n, name: e.target.value }))} placeholder="Name (e.g. Snow)" />
                  <input className={styles.inputSm} value={newColor.code || ''} onChange={e => setNewColor(n => ({ ...n, code: e.target.value.toUpperCase() }))} placeholder="Code (e.g. WT)" maxLength={4} />
                  <input className={styles.inputSm} value={newColor.sku || ''} onChange={e => setNewColor(n => ({ ...n, sku: e.target.value.toUpperCase() }))} placeholder="SKU (e.g. QNH-IT550-WT)" />
                  <button className={styles.addBtn} onClick={addColor}>Add</button>
                </div>
              </div>
            </div>
          )}

          {/* ── IMAGES TAB ── */}
          {activeTab === 'images' && (
            <div className={styles.section}>
              <p className={styles.hint}>Upload product images. The first image is the main card photo. Drag to reorder.</p>

              <div className={styles.imageGrid}>
                {form.images.map((url, i) => (
                  <div key={url} className={styles.imageThumb}>
                    {i === 0 && <span className={styles.mainTag}>Main</span>}
                    <Image src={url} alt={`Product ${i + 1}`} fill style={{ objectFit: 'cover' }} />
                    <div className={styles.imageActions}>
                      {i > 0 && <button onClick={() => moveImage(i, i - 1)}>←</button>}
                      {i < form.images.length - 1 && <button onClick={() => moveImage(i, i + 1)}>→</button>}
                      <button className={styles.removeImageBtn} onClick={() => removeImage(i)}>✕</button>
                    </div>
                  </div>
                ))}

                <button className={styles.uploadZone} onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                  <span className={styles.uploadIcon}>{uploading ? '⏳' : '+'}</span>
                  <span className={styles.uploadLabel}>{uploading ? 'Uploading…' : 'Upload Image'}</span>
                  <span className={styles.uploadSub}>JPG, PNG, WebP</span>
                </button>
              </div>

              {uploadError && <div className={styles.error}>{uploadError}</div>}
              <input ref={fileInputRef} type="file" accept="image/*" className={styles.hiddenFile} onChange={handleFileChange} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {onDelete && (
            <button className={styles.deleteBtn} onClick={onDelete} disabled={saving}>🗑 Delete Product</button>
          )}
          <div className={styles.footerRight}>
            <button className={styles.cancelBtn} onClick={onClose} disabled={saving}>Cancel</button>
            <button className={styles.saveBtn} onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving…' : (isNew ? '+ Add Product' : '✓ Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
