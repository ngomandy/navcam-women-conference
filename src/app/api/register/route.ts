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

    // Sync to Google Sheets (fire-and-forget — never blocks or fails the registration)
    appendRegistrationToSheet({
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
    }).catch((err) => console.error('[Sheets sync error]', err))

    return NextResponse.json({
      success: true,
      id: attendee.id,
      message: 'Registration submitted successfully',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
