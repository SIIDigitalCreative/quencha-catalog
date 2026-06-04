import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'
import { SEED_PRODUCTS } from '@/lib/data'

export async function GET() {
  try {
    const now = new Date().toISOString()
    const entries: Record<string, string> = {}

    SEED_PRODUCTS.forEach((product, index) => {
      const normalized = {
        ...product,
        id: product.id || `qnh-product-${index + 1}`,
        images: product.images || [],
        createdAt: product.createdAt || now,
        updatedAt: now,
      }

      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: `Seed completed. Added/updated ${SEED_PRODUCTS.length} products.`,
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
