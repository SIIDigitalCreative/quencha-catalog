import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'
import { SEED_PRODUCTS } from '@/lib/data'

export async function GET() {
  try {
    if (!SEED_PRODUCTS.length) {
      return NextResponse.json({
        message: 'No products found in SEED_PRODUCTS.',
        added: 0
      })
    }

    const now = new Date().toISOString()
    const entries: Record<string, string> = {}

    SEED_PRODUCTS.forEach((product: any, index: number) => {
      const normalized = {
        id: product.id || `qnh-product-${index + 1}`,
        name: product.name || '',
        ext: product.ext || 'core',
        cat: product.cat || 'sip',
        desc: product.desc || '',
        badges: product.badges || [],
        srp: Number(product.srp) || 0,
        packing: Number(product.packing) || 0,
        colors: product.colors || [],
        images: product.images || [],
        dimensions: product.dimensions || {
          headers: [''],
          rows: [['']]
        },
        barcode: product.barcode || '',
        barcodeImage: product.barcodeImage || '',
        qrCode: product.qrCode || '',
        qrImage: product.qrImage || '',
        youtube: product.youtube || '',
        createdAt: product.createdAt || now,
        updatedAt: now
      }

      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: `Seed completed. Added/updated ${SEED_PRODUCTS.length} products.`,
      added: SEED_PRODUCTS.length
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 })
  }
}
