import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const [attendees, budgetItems] = await Promise.all([
    prisma.attendee.findMany({
      select: {
        id: true,
        status: true,
        registrationType: true,
        depositPaid: true,
        createdAt: true,
        firstName: true,
        lastName: true,
        city: true,
        phone: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.budgetItem.findMany(),
  ])

  const total = attendees.length
  const confirmed = attendees.filter((a) => a.status === 'CONFIRMED').length
  const pending = attendees.filter((a) => a.status === 'PENDING').length
  const cancelled = attendees.filter((a) => a.status === 'CANCELLED').length
  const earlyBirds = attendees.filter((a) => a.registrationType === 'EARLY_BIRD').length
  const regular = attendees.filter((a) => a.registrationType === 'REGULAR').length
  const coreTeam = attendees.filter((a) => a.registrationType === 'CORE_TEAM').length
  const depositPaid = attendees.filter((a) => a.depositPaid).length

  // Revenue estimate based on registration types
  const FEES: Record<string, number> = {
    EARLY_BIRD: 30000,
    REGULAR: 35000,
    CORE_TEAM: 50000,
  }

  const estimatedRevenue = attendees.reduce((sum, a) => {
    return sum + (FEES[a.registrationType] || 35000)
  }, 0)

  const budgetIncome = budgetItems.filter((i) => i.type === 'INCOME').reduce((s, i) => s + i.amount, 0)
  const budgetExpenses = budgetItems.filter((i) => i.type === 'EXPENSE').reduce((s, i) => s + i.amount, 0)

  const recentRegistrations = attendees.slice(0, 10)

  return NextResponse.json({
    attendees: {
      total,
      confirmed,
      pending,
      cancelled,
      earlyBirds,
      regular,
      coreTeam,
      depositPaid,
    },
    revenue: {
      estimated: estimatedRevenue,
      budgetIncome,
      budgetExpenses,
      budgetBalance: budgetIncome - budgetExpenses,
    },
    recentRegistrations,
  })
}
