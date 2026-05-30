import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const items = await prisma.budgetItem.findMany({
    where: { type: 'INCOME' },
    select: { amount: true },
  })

  const total = items.reduce((sum, item) => sum + item.amount, 0)

  return NextResponse.json({ total })
}
