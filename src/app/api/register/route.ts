import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { appendRegistrationToSheet } from '@/lib/sheets'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      maritalStatus,
      city,
      dietaryNeeds,
      hasChildren,
      numberOfChildren,
      childrenAges,
      registrationType,
      feesConfirmed,
      depositConfirmed,
      notes,
      language,
    } = body

    // Validate required fields
    const required: Record<string, unknown> = {
      firstName,
      lastName,
      phone,
      maritalStatus,
      city,
    }

    for (const [key, val] of Object.entries(required)) {
      if (!val || (typeof val === 'string' && !val.trim())) {
        return NextResponse.json(
          { success: false, message: `Field '${key}' is required` },
          { status: 400 }
        )
      }
    }

    const attendee = await prisma.attendee.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email?.trim() || null,
        phone: phone.trim(),
        maritalStatus,
        city: city.trim(),
        dietaryNeeds: dietaryNeeds?.trim() || null,
        hasChildren: Boolean(hasChildren),
        numberOfChildren: numberOfChildren || 0,
        childrenAges: childrenAges || null,
        registrationType: registrationType || 'REGULAR',
        feesConfirmed: Boolean(feesConfirmed),
        depositPaid: Boolean(depositConfirmed),
        notes: notes?.trim() || null,
        status: 'PENDING',
        language: language || 'fr',
      },
    })

    const sheetsEnv = {
      hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      hasEmail: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      hasKey: !!process.env.GOOGLE_PRIVATE_KEY,
      sheetIdPreview: process.env.GOOGLE_SHEET_ID?.substring(0, 15) ?? 'MISSING',
    }

    let sheetsResult = 'skipped'
    try {
      await appendRegistrationToSheet({
        firstName: attendee.firstName,
        lastName: attendee.lastName,
        email: attendee.email,
        phone: attendee.phone,
        city: attendee.city,
        maritalStatus: attendee.maritalStatus,
        registrationType: attendee.registrationType,
        hasChildren: attendee.hasChildren,
        numberOfChildren: attendee.numberOfChildren ?? 0,
        childrenAges: attendee.childrenAges,
        dietaryNeeds: attendee.dietaryNeeds,
        language: attendee.language,
        notes: attendee.notes,
      })
      sheetsResult = 'ok'
    } catch (sheetsErr) {
      sheetsResult = sheetsErr instanceof Error ? sheetsErr.message : String(sheetsErr)
    }

    return NextResponse.json({
      success: true,
      id: attendee.id,
      message: 'Registration submitted successfully',
      _sheets: { ...sheetsEnv, result: sheetsResult },
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
