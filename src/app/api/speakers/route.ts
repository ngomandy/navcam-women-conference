import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const authSession = await auth()
  if (!authSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const speakers = await prisma.speaker.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ speakers })
}

export async function POST(req: Request) {
  const authSession = await auth()
  if (!authSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const speaker = await prisma.speaker.create({ data: body })
    return NextResponse.json({ success: true, speaker })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create speaker', details: error }, { status: 500 })
  }
}
