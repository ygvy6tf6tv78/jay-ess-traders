import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '76px 84px',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #075A9C 0%, #0A8FC7 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: 236,
            height: 236,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 118,
            border: '3px solid rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.16)',
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: '-4px',
          }}
        >
          JES
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 64 }}>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: '-2px' }}>
            Jay Ess Traders
          </div>
          <div style={{ marginTop: 22, fontSize: 34, fontWeight: 600 }}>
            Exclusive Dealer of Simpolo Tiles and Bath
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: 'rgba(255,255,255,0.88)' }}>
            Tiles • Bathware • Switches • Paints
          </div>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              marginTop: 34,
              padding: '12px 22px',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.16)',
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            Akhnoor, Jammu &amp; Kashmir
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
