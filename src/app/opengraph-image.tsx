import { ImageResponse } from 'next/og'

export const alt = "2026 Navigators National Women's Conference — Rooted in Christ, bearing lasting fruit"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px',
          color: '#FDF6EC',
          backgroundImage:
            'linear-gradient(135deg, #1B3A5C 0%, #2D6A4F 55%, #40916C 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#C9A84C',
            fontWeight: 700,
          }}
        >
          The Navigators · Cameroon
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
            National Women's
          </div>
          <div style={{ display: 'flex', fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
            Conference 2026
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontStyle: 'italic',
            color: '#74C69D',
            marginTop: 28,
          }}
        >
          Rooted in Christ, bearing lasting fruit
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: 40,
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          <span>August 10–14, 2026</span>
          <span style={{ color: '#C9A84C' }}>•</span>
          <span>Yaoundé, Cameroon</span>
        </div>

        <div style={{ display: 'flex', fontSize: 24, color: '#C9A84C', marginTop: 18 }}>
          John 15:5, 8
        </div>
      </div>
    ),
    { ...size }
  )
}
