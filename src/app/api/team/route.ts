import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const members = await prisma.committeeMember.findMany({
    orderBy: { createdAt: 'asc' },
  })
  return NextResponse.json({ members })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const member = await prisma.committeeMember.create({ data: body })
    return NextResponse.json({ success: true, member })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create member', details: error }, { status: 500 })
  }
}
