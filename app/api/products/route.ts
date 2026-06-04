import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  try {
    const raw = await redis.hgetall(KEYS.products)
    if (!raw) return NextResponse.json([])
    const products = Object.values(raw)
      .map(v => typeof v === 'string' ? JSON.parse(v) : v)
      .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    return NextResponse.json(products)
  } catch (e) {
    console.error(e)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    const product = { ...body, id: body.id || uuidv4(), createdAt: body.createdAt || now, updatedAt: now }
    await redis.hset(KEYS.products, { [product.id]: JSON.stringify(product) })
    return NextResponse.json(product, { status: 201 })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
