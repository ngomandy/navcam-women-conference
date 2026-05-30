import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, name, language } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Valid email required' }, { status: 400 })
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email: email.trim().toLowerCase() },
      update: { name: name?.trim() || null },
      create: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        language: language || 'fr',
      },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
