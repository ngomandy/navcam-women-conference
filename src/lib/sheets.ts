import { google } from 'googleapis'

interface RegistrationRow {
  firstName: string
  lastName: string
  email?: string | null
  phone: string
  city: string
  maritalStatus: string
  registrationType: string
  hasChildren: boolean
  numberOfChildren: number
  childrenAges?: string | null
  dietaryNeeds?: string | null
  language: string
  notes?: string | null
}

const HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'City',
  'Marital Status',
  'Registration Type',
  'Has Children',
  'Number of Children',
  'Children Ages',
  'Dietary Needs',
  'Language',
  'Notes',
  'Status',
]

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const key = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!email || !key) return null

  return new google.auth.JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
}

export async function appendRegistrationToSheet(data: RegistrationRow): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const auth = getClient()

  if (!sheetId || !auth) {
    // Credentials not configured — skip silently
    return
  }

  const sheets = google.sheets({ version: 'v4', auth })

  // Check if the sheet already has a header row
  const check = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'A1',
  })

  const rows: string[][] = []

  if (!check.data.values || check.data.values.length === 0) {
    rows.push(HEADERS)
  }

  rows.push([
    new Date().toLocaleString('fr-CM', { timeZone: 'Africa/Douala' }),
    data.firstName,
    data.lastName,
    data.email ?? '',
    data.phone,
    data.city,
    data.maritalStatus,
    data.registrationType,
    data.hasChildren ? 'Yes' : 'No',
    String(data.numberOfChildren ?? 0),
    data.childrenAges ?? '',
    data.dietaryNeeds ?? '',
    data.language,
    data.notes ?? '',
    'PENDING',
  ])

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A:O',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: rows },
  })
}
