import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const existing = await redis.hget(KEYS.products, id)
    const prev = existing ? (typeof existing === 'string' ? JSON.parse(existing) : existing) : {}
    const updates = await req.json()
    const updated = { ...prev, ...updates, id, updatedAt: new Date().toISOString() }
    await redis.hset(KEYS.products, { [id]: JSON.stringify(updated) })
    return NextResponse.json(updated)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await redis.hdel(KEYS.products, id)
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
