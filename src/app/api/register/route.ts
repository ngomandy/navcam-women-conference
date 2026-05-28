import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
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
