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

    // Get existing products first so we can preserve uploaded images
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
      const existing = existingById[product.id]

      const normalized = {
        ...existing,
        ...product,
        id: product.id || `qnh-product-${index + 1}`,

        // IMPORTANT: preserve existing images if seed has no images
        images:
          product.images && product.images.length > 0
            ? product.images
            : existing?.images || [],

        // Preserve these too, unless seed has values
        barcodeImage: product.barcodeImage || existing?.barcodeImage || '',
        qrImage: product.qrImage || existing?.qrImage || '',

        createdAt: existing?.createdAt || product.createdAt || now,
        updatedAt: now,
      }

      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: `Seed completed. Added/updated ${SEED_PRODUCTS.length} products while preserving existing images.`,
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
