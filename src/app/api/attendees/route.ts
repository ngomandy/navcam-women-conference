import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const status = searchParams.get('status') || ''
  const registrationType = searchParams.get('registrationType') || ''
  const hasChildren = searchParams.get('hasChildren')
  const city = searchParams.get('city') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { phone: { contains: search } },
      { city: { contains: search } },
    ]
  }
  if (status) where.status = status
  if (registrationType) where.registrationType = registrationType
  if (hasChildren !== null && hasChildren !== '') {
    where.hasChildren = hasChildren === 'true'
  }
  if (city) where.city = { contains: city }

  const [attendees, total] = await Promise.all([
    prisma.attendee.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.attendee.count({ where }),
  ])

  return NextResponse.json({
    attendees,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const attendee = await prisma.attendee.create({ data: body })
    return NextResponse.json({ success: true, attendee })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create attendee', details: error }, { status: 500 })
  }
}
