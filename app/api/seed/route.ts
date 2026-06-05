import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'
import { SEED_PRODUCTS } from '@/lib/data'

function safeParse(value: unknown) {
  if (!value) return null
  if (typeof value === 'object') return value as any

  try {
    return JSON.parse(String(value))
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const now = new Date().toISOString()

    const existingRaw = await redis.hgetall(KEYS.products)
    const existingById: Record<string, any> = {}

    if (existingRaw) {
      Object.entries(existingRaw).forEach(([id, value]) => {
        const parsed = safeParse(value)
        if (parsed) existingById[id] = parsed
      })
    }

    const entries: Record<string, string> = {}

    SEED_PRODUCTS.forEach((product, index) => {
      const seedProduct = product as any
      const id = seedProduct.id || `qnh-product-${index + 1}`
      const existing = existingById[id]

      const normalized = {
        ...existing,
        ...seedProduct,
        id,

        // Preserve manually edited Extension and Category
        ext: existing?.ext ?? seedProduct.ext ?? 'core',
        cat: existing?.cat ?? seedProduct.cat ?? 'sip',

        // Preserve uploaded images
        images:
          seedProduct.images && seedProduct.images.length > 0
            ? seedProduct.images
            : existing?.images || [],

        // Preserve extra media/codes
        barcode: seedProduct.barcode || existing?.barcode || '',
        barcodeImage: seedProduct.barcodeImage || existing?.barcodeImage || '',
        qrCode: seedProduct.qrCode || existing?.qrCode || '',
        qrImage: seedProduct.qrImage || existing?.qrImage || '',
        youtube: seedProduct.youtube || existing?.youtube || '',

        createdAt: existing?.createdAt || seedProduct.createdAt || now,
        updatedAt: now,
      }

      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: `Seed completed. Added/updated ${SEED_PRODUCTS.length} products while preserving existing images, categories, and extensions.`,
      added: SEED_PRODUCTS.length,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Failed to seed products' },
      { status: 500 }
    )
  }
}
