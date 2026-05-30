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

export async function appendRegistrationToSheet(data: RegistrationRow): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_PRIVATE_KEY

  if (!sheetId || !email || !rawKey) return

  // Dynamic import — keeps googleapis out of the Next.js bundle entirely
  const { google } = await import('googleapis')

  const auth = new google.auth.JWT({
    email,
    key: rawKey.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

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
