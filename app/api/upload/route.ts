import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
    }

    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type || 'unknown'}. Use JPG, PNG, WebP, GIF, or SVG.` },
        { status: 400 }
      )
    }

    const maxSize = 12 * 1024 * 1024 // 12MB after client-side compression

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File is still too large after compression. Max upload size is 12MB; received ${(file.size / 1024 / 1024).toFixed(2)}MB.` },
        { status: 400 }
      )
    }

    const extensionFromType =
      file.type === 'image/jpeg' || file.type === 'image/jpg' ? 'jpg' :
      file.type === 'image/png' ? 'png' :
      file.type === 'image/webp' ? 'webp' :
      file.type === 'image/gif' ? 'gif' :
      file.type === 'image/svg+xml' ? 'svg' :
      'img'

    const originalName = file.name || `image.${extensionFromType}`
    const cleanBase = originalName
      .toLowerCase()
      .replace(/\.[^.]+$/, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9._-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'image'

    const pathname = `quencha/uploads/${Date.now()}-${cleanBase}.${extensionFromType}`

    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error: any) {
    console.error('Upload error:', error)

    const message =
      error?.message?.includes('BLOB_READ_WRITE_TOKEN')
        ? 'Upload failed because BLOB_READ_WRITE_TOKEN is missing in Vercel Environment Variables.'
        : error?.message || 'Upload failed on server.'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
