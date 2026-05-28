import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || ''
  const status = searchParams.get('status') || ''

  const where: Record<string, unknown> = {}
  if (type) where.type = type
  if (status) where.status = status

  const items = await prisma.budgetItem.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  const income = items.filter((i) => i.type === 'INCOME').reduce((s, i) => s + i.amount, 0)
  const expenses = items.filter((i) => i.type === 'EXPENSE').reduce((s, i) => s + i.amount, 0)

  return NextResponse.json({ items, summary: { income, expenses, balance: income - expenses } })
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const item = await prisma.budgetItem.create({ data: body })
    return NextResponse.json({ success: true, item })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create budget item', details: error }, { status: 500 })
  }
}
