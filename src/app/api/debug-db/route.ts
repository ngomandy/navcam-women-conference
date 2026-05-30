import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.DATABASE_URL ?? 'NOT SET'
  const token = process.env.TURSO_AUTH_TOKEN ?? 'NOT SET'

  // Test raw LibSQL HTTP connection (same as what Prisma uses underneath)
  let httpStatus: number | string = 'not tested'
  try {
    const res = await fetch(`${url.replace('libsql://', 'https://')}/v2/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT 1' } },
          { type: 'close' },
        ],
      }),
    })
    httpStatus = res.status
  } catch (e) {
    httpStatus = e instanceof Error ? e.message : String(e)
  }

  return NextResponse.json({
    urlPrefix: url.substring(0, 30) + '…',
    urlScheme: url.split('://')[0],
    tokenLength: token.length,
    tokenStart: token.substring(0, 12) + '…',
    tokenHasNewline: token.includes('\n'),
    tokenHasQuote: token.includes('"') || token.includes("'"),
    httpConnectionResult: httpStatus,
  })
}
