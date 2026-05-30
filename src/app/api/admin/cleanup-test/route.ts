import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { google } from 'googleapis'

const TEST_EMAILS = [
  'test@navcam.test',
  'test.sheets@navcam.test',
  'diag@navcam.test',
  'envtest@navcam.test',
  'diag2@navcam.test',
]
const TEST_PHONES = [
  '+237600000000',
  '+237600000001',
  '+237600000002',
  '+237600000003',
  '+237600000004',
  '+237600000005',
]

export async function DELETE() {
  // ── Database ────────────────────────────────────────────────────────────────
  const dbResult = await prisma.attendee.deleteMany({
    where: { OR: [{ email: { in: TEST_EMAILS } }, { phone: { in: TEST_PHONES } }] },
  })

  // ── Google Sheet ────────────────────────────────────────────────────────────
  let sheetResult = 'skipped'
  try {
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheets = google.sheets({ version: 'v4', auth })
    const sheetId = process.env.GOOGLE_SHEET_ID!

    const res = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: 'A:E' })
    const rows = res.data.values ?? []

    const toDelete: number[] = []
    rows.forEach((row, i) => {
      if (i === 0) return
      const email = (row[3] ?? '').toLowerCase()
      const phone = row[4] ?? ''
      const firstName = (row[1] ?? '').toLowerCase()
      const lastName  = (row[2] ?? '').toLowerCase()
      if (
        TEST_EMAILS.includes(email) ||
        TEST_PHONES.includes(phone) ||
        firstName === 'x' ||
        ['registration', 'diagtest', 'envtest', 'diagfinal', 'sheets'].includes(lastName)
      ) toDelete.push(i + 1)
    })

    if (toDelete.length > 0) {
      const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
      const numericSheetId = meta.data.sheets?.[0].properties?.sheetId ?? 0
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: sheetId,
        requestBody: {
          requests: toDelete.sort((a, b) => b - a).map((row) => ({
            deleteDimension: {
              range: { sheetId: numericSheetId, dimension: 'ROWS', startIndex: row - 1, endIndex: row },
            },
          })),
        },
      })
      sheetResult = `deleted ${toDelete.length} row(s)`
    } else {
      sheetResult = 'no test rows found'
    }
  } catch (e) {
    sheetResult = `error: ${e instanceof Error ? e.message : String(e)}`
  }

  return NextResponse.json({ db: `deleted ${dbResult.count}`, sheet: sheetResult })
}
