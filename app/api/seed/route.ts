import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'

// Minimal seed — full data lives in QuenchaCatalog.jsx SEED constant
// This just ensures Redis has the default settings entry
export async function GET() {
  try {
    const count = await redis.hlen(KEYS.products)
    if (count > 0) return NextResponse.json({ message: `Already has ${count} products` })
    // Signal the client to seed from its SEED constant via POST /api/products
    return NextResponse.json({ message: 'Ready to seed', empty: true })
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
