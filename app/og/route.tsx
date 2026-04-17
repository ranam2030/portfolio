import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0b1326 0%, #111827 50%, #0b1326 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid dot pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(152,203,255,0.07) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #98cbff, #bdc2ff, transparent)',
          }}
        />

        {/* Glow blob */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(152,203,255,0.08) 0%, transparent 70%)',
          }}
        />

        {/* Header: logo mark + availability badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#98cbff',
              }}
            />
            <span style={{ color: '#98cbff', fontSize: '14px', letterSpacing: '0.2em', fontWeight: 700, textTransform: 'uppercase' }}>
              masudrana.dev
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '999px',
              border: '1px solid rgba(74,222,128,0.3)',
              background: 'rgba(74,222,128,0.08)',
            }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ color: '#4ade80', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>
              OPEN TO OPPORTUNITIES
            </span>
          </div>
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 10 }}>
          {/* Avatar + name row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #98cbff 0%, #bdc2ff 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                fontWeight: 900,
                color: '#0b1326',
                letterSpacing: '-0.02em',
                flexShrink: 0,
              }}
            >
              MR
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ color: '#dae2fd', fontSize: '48px', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>
                Masud Rana
              </span>
              <span style={{ color: '#98cbff', fontSize: '20px', fontWeight: 500, letterSpacing: '0.01em' }}>
                Senior QA Automation Engineer
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: 'rgba(194,198,212,0.7)', fontSize: '16px', lineHeight: 1.6, maxWidth: '680px', margin: 0 }}>
            6+ years building scalable test automation frameworks · Playwright · Selenium · CI/CD · Dhaka, Bangladesh
          </p>

          {/* Skill chips */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {['Playwright', 'Selenium', 'TypeScript', 'k6', 'GitHub Actions', 'Docker'].map(skill => (
              <div
                key={skill}
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(152,203,255,0.08)',
                  border: '1px solid rgba(152,203,255,0.2)',
                  color: '#98cbff',
                  fontSize: '13px',
                  fontWeight: 500,
                  fontFamily: 'monospace',
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Footer stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px', position: 'relative', zIndex: 10 }}>
          {[
            { value: '70%', label: 'Regression Reduced' },
            { value: '1.2k+', label: 'Automated Tests' },
            { value: '6+', label: 'Years Experience' },
            { value: '0', label: 'Critical Bugs in Prod' },
          ].map(stat => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ color: '#98cbff', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                {stat.value}
              </span>
              <span style={{ color: 'rgba(194,198,212,0.5)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {stat.label}
              </span>
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <span style={{ color: 'rgba(194,198,212,0.25)', fontSize: '12px', fontFamily: 'monospace' }}>
            github.com/ranam2030
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
