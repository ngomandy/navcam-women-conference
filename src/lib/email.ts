interface RegistrationEmailData {
  firstName: string
  lastName: string
  email: string
  registrationType: string
  amount: number
  lang: string
}

const TYPE_LABELS: Record<string, { en: string; fr: string }> = {
  EARLY_BIRD: { en: 'Early Bird', fr: 'Inscription Anticipée' },
  REGULAR:    { en: 'Regular',    fr: 'Standard' },
  CORE_TEAM:  { en: 'Core Team Leader', fr: 'Leader Équipe Centrale' },
}

function buildHtml(data: RegistrationEmailData): string {
  const isEn = data.lang !== 'fr'
  const typeLabel = isEn
    ? (TYPE_LABELS[data.registrationType]?.en ?? data.registrationType)
    : (TYPE_LABELS[data.registrationType]?.fr ?? data.registrationType)
  const amount = data.amount.toLocaleString('fr-FR') + ' FCFA'
  const ref = `NavCamWomen2026-${data.firstName}${data.lastName}`.replace(/\s/g, '')

  return `<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'fr'}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FDF6EC;font-family:'Segoe UI',Arial,sans-serif;color:#1B3A5C">
<table width="100%" cellpadding="0" cellspacing="0">
  <tr><td align="center" style="padding:32px 16px">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,106,79,0.10)">

      <!-- Header -->
      <tr><td style="background:linear-gradient(135deg,#2D6A4F,#1B3A5C);padding:32px 32px 24px;text-align:center">
        <p style="margin:0 0 8px;font-size:28px">🌿</p>
        <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">
          ${isEn ? "2026 Navigators of Cameroon National Women's Conference" : 'Conférence Nationale des Femmes Navigateurs du Cameroun 2026'}
        </h1>
        <p style="margin:8px 0 0;color:#74C69D;font-size:14px;font-style:italic">
          "${isEn ? 'Rooted in Christ, Bearing Lasting Fruit' : 'Enracinées en Christ, Portant des Fruits Durables'}"
        </p>
      </td></tr>

      <!-- Success banner -->
      <tr><td style="background:#40916C;padding:12px 32px;text-align:center">
        <p style="margin:0;color:#fff;font-size:15px;font-weight:600">
          ✅ ${isEn ? 'Registration Received!' : 'Inscription Reçue !'}
        </p>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:32px">
        <p style="margin:0 0 16px;font-size:16px">
          ${isEn ? `Dear ${data.firstName},` : `Chère ${data.firstName},`}
        </p>
        <p style="margin:0 0 24px;font-size:15px;color:#555;line-height:1.6">
          ${isEn
            ? 'Thank you for registering for the 2026 Navigators National Women\'s Conference. We are excited to welcome you!'
            : 'Merci de vous être inscrite à la Conférence Nationale des Femmes Navigateurs 2026. Nous sommes ravies de vous accueillir !'}
        </p>

        <!-- Registration summary -->
        <table width="100%" cellpadding="12" cellspacing="0" style="background:#F4F9F6;border-radius:12px;margin-bottom:24px">
          <tr><td style="border-bottom:1px solid #d1e8dc">
            <span style="color:#888;font-size:13px">${isEn ? 'Name' : 'Nom'}</span><br>
            <strong style="font-size:15px">${data.firstName} ${data.lastName}</strong>
          </td></tr>
          <tr><td style="border-bottom:1px solid #d1e8dc">
            <span style="color:#888;font-size:13px">${isEn ? 'Registration Type' : "Type d'Inscription"}</span><br>
            <strong style="font-size:15px">${typeLabel}</strong>
          </td></tr>
          <tr><td style="border-bottom:1px solid #d1e8dc">
            <span style="color:#888;font-size:13px">${isEn ? 'Amount Due' : 'Montant Dû'}</span><br>
            <strong style="font-size:16px;color:#C9A84C">${amount}</strong>
          </td></tr>
          <tr><td>
            <span style="color:#888;font-size:13px">${isEn ? 'Event' : 'Événement'}</span><br>
            <strong style="font-size:15px">${isEn ? 'August 10–14, 2026 · Care & Hope Center, Yaoundé' : '10–14 Août 2026 · Care & Hope Center, Yaoundé'}</strong>
          </td></tr>
        </table>

        <!-- Payment instructions -->
        <table width="100%" cellpadding="16" cellspacing="0" style="background:#FFF8E7;border:1px solid #F0D080;border-radius:12px;margin-bottom:24px">
          <tr><td>
            <p style="margin:0 0 12px;font-weight:700;font-size:15px;color:#1B3A5C">
              💳 ${isEn ? 'How to Pay' : 'Comment Payer'}
            </p>
            <p style="margin:0 0 8px;font-size:14px;color:#555">
              ${isEn ? 'Send your payment via Mobile Money:' : 'Envoyez votre paiement via Mobile Money :'}
            </p>
            <p style="margin:0 0 4px;font-size:14px"><strong>MTN Mobile Money:</strong> +237 670 546 041</p>
            <p style="margin:0 0 12px;font-size:14px"><strong>Orange Money:</strong> +237 694 756 099</p>
            <p style="margin:0 0 8px;font-size:13px;color:#555">
              ${isEn ? 'Use this reference:' : 'Utilisez cette référence :'}
            </p>
            <p style="margin:0 0 12px;padding:8px 12px;background:#fff;border-radius:8px;font-size:14px;font-weight:700;color:#2D6A4F;letter-spacing:0.5px">
              ${ref}
            </p>
            <p style="margin:0;font-size:13px;color:#888">
              ${isEn
                ? '📤 Then send the payment screenshot to the finance team on WhatsApp: +237 670 546 041'
                : '📤 Ensuite, envoyez la capture d\'écran du paiement à l\'équipe finance sur WhatsApp : +237 670 546 041'}
            </p>
          </td></tr>
        </table>

        <p style="margin:0;font-size:14px;color:#888;line-height:1.6">
          ${isEn
            ? 'If you have any questions, contact us on WhatsApp at +237 670 546 041.'
            : 'Pour toute question, contactez-nous sur WhatsApp au +237 670 546 041.'}
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#1B3A5C;padding:20px 32px;text-align:center">
        <p style="margin:0;color:#74C69D;font-size:12px">
          ${isEn ? 'The Navigators Cameroon — Women\'s Ministry' : 'Les Navigateurs Cameroun — Ministère des Femmes'}
        </p>
        <p style="margin:4px 0 0;color:#fff3;font-size:11px">navcam-women-conference.vercel.app</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function sendRegistrationConfirmation(data: RegistrationEmailData): Promise<void> {
  if (!process.env.RESEND_API_KEY || !data.email) return

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const isEn = data.lang !== 'fr'

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'NavCam Women Conference <onboarding@resend.dev>',
    to: data.email,
    subject: isEn
      ? `✅ Registration Confirmed — 2026 NavCam Women's Conference`
      : `✅ Inscription Confirmée — Conférence Femmes NavCam 2026`,
    html: buildHtml(data),
  })
}
