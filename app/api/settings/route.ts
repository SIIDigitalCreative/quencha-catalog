import { NextResponse } from 'next/server'
import { redis, KEYS } from '@/lib/redis'

const DEFAULTS = {
  banners: [],
  bannerAspect: 'custom',
  bannerInterval: 4.5,
  heroTitle: 'Sip, Savor & Go.',
  heroSub: 'Complete product lineup — drinkware, lunch essentials, bags, accessories, kids, pets & tech.',
}

export async function GET() {
  try {
    const raw = await redis.get(KEYS.settings)
    const saved = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : {}
    return NextResponse.json({ ...DEFAULTS, ...saved })
  } catch { return NextResponse.json(DEFAULTS) }
}

export async function PUT(req: Request) {
  try {
    const raw = await redis.get(KEYS.settings)
    const current = raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : {}
    const patch = await req.json()
    const updated = { ...current, ...patch }
    await redis.set(KEYS.settings, JSON.stringify(updated))
    return NextResponse.json(updated)
  } catch { return NextResponse.json({ error: 'Failed' }, { status: 500 }) }
}
