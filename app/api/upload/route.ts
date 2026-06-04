import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    if (!['jpg','jpeg','png','webp','gif'].includes(ext))
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 })
    const filename = `quencha/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const blob = await put(filename, file, { access: 'public' })
    return NextResponse.json({ url: blob.url })
  } catch { return NextResponse.json({ error: 'Upload failed' }, { status: 500 }) }
}
