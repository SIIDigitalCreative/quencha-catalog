import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'

const SEED_SECRET = process.env.SEED_SECRET

const PRODUCTS_TO_ADD = [
  // Paste all product objects here
  // Example:
  /*
  {
    id: 'p20',
    name: 'Product Name',
    ext: 'core',
    cat: 'sip',
    desc: 'Product description.',
    badges: ['BPA-Free'],
    srp: 999.75,
    packing: 12,
    colors: [],
    images: [],
    dimensions: {
      headers: [''],
      rows: [['']]
    },
    barcode: '',
    barcodeImage: '',
    qrCode: '',
    qrImage: '',
    youtube: ''
  }
  */
]

function normalizeProduct(product: any, index: number) {
  const now = new Date().toISOString()

  return {
    id: product.id || `p${Date.now()}-${index}`,
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
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (SEED_SECRET && key !== SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!PRODUCTS_TO_ADD.length) {
      return NextResponse.json({
        message: 'No products in PRODUCTS_TO_ADD yet.',
        added: 0
      })
    }

    const entries: Record<string, string> = {}

    PRODUCTS_TO_ADD.forEach((product, index) => {
      const normalized = normalizeProduct(product, index)
      entries[normalized.id] = JSON.stringify(normalized)
    })

    await redis.hset(KEYS.products, entries)

    return NextResponse.json({
      message: `Seed completed. Added/updated ${PRODUCTS_TO_ADD.length} products.`,
      added: PRODUCTS_TO_ADD.length
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 })
  }
}
