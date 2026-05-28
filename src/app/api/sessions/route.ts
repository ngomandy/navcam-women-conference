import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const sessions = await prisma.session.findMany({
    orderBy: { order: 'asc' },
  })
  return NextResponse.json({ sessions })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const newSession = await prisma.session.create({ data: body })
    return NextResponse.json({ success: true, session: newSession })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session', details: error }, { status: 500 })
  }
}
