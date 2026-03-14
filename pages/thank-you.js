import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>You're In! — ThePostBot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          textAlign: 'center',
          maxWidth: '560px',
          position: 'relative',
          zIndex: 1,
          animation: 'fadeUp 0.6s ease both',
        }}>
          {/* Checkmark */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(0,255,136,0.1)',
            border: '2px solid rgba(0,255,136,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem',
            fontSize: '2rem',
          }}>
            ✓
          </div>

          <div style={{
            display: 'inline-block',
            background: 'rgba(0,255,136,0.1)',
            border: '1px solid rgba(0,255,136,0.25)',
            color: '#00FF88',
            padding: '0.35rem 1rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            Trial Started 🎉
          </div>

          <h1 style={{
            fontFamily: 'var(--font-head)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '1.25rem',
            color: '#fff',
          }}>
            You're officially in.<br />
            <span style={{ color: 'var(--accent)' }}>Check your inbox tomorrow.</span>
          </h1>

          <p style={{
            color: 'var(--muted)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}>
            Your first 3 LinkedIn posts will land in your inbox tomorrow morning.<br />
            Each one is written fresh, based on today's trending news in your niche.
          </p>

          {/* Steps */}
          <div style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            padding: '1.75rem',
            marginBottom: '2.5rem',
            textAlign: 'left',
          }}>
            {[
              { icon: '📬', title: 'Check your inbox tomorrow morning', desc: '3 posts waiting for you — no login needed' },
              { icon: '👆', title: 'Pick the one you like most', desc: 'Each post has a different angle and image' },
              { icon: '🚀', title: 'Post it to LinkedIn', desc: 'Copy, paste, done. Takes 10 seconds.' },
            ].map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                marginBottom: i < 2 ? '1.25rem' : 0,
              }}>
                <span style={{ fontSize: '1.5rem', marginTop: '2px' }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '0.2rem' }}>{step.title}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Questions? Email us at{' '}
            <a href="mailto:hello@thepostbot.me" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              hello@thepostbot.me
            </a>
          </p>
        </div>

        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}
