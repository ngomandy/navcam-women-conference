import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const CAPACITY = 100

export async function GET() {
  try {
    const registered = await prisma.attendee.count({
      where: { status: { not: 'CANCELLED' } },
    })
    return NextResponse.json({ registered, capacity: CAPACITY })
  } catch {
    return NextResponse.json({ registered: 0, capacity: CAPACITY })
  }
}
