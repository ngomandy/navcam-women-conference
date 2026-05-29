import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const dbUrl = process.env.DATABASE_URL
  const hasToken = !!process.env.TURSO_AUTH_TOKEN
  const hasSecret = !!process.env.AUTH_SECRET

  let dbStatus = 'unknown'
  let adminCount = 0
  try {
    adminCount = await prisma.adminUser.count()
    dbStatus = 'connected'
  } catch (e) {
    dbStatus = `error: ${(e as Error).message}`
  }

  return NextResponse.json({
    dbUrlPrefix: dbUrl ? dbUrl.slice(0, 30) + '...' : 'NOT SET',
    hasTursoToken: hasToken,
    hasAuthSecret: hasSecret,
    dbStatus,
    adminCount,
  })
}
