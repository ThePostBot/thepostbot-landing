import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NICHES = [
  'Marketing & Advertising',
  'Sales & Business Development',
  'Technology & SaaS',
  'Finance & Investing',
  'Entrepreneurship & Startups',
  'Leadership & Management',
  'Human Resources & Talent',
  'Real Estate',
  'Healthcare & Wellness',
  'E-commerce & Retail',
  'Personal Branding',
  'Productivity & Self-Development',
  'Consulting & Coaching',
  'Legal & Compliance',
  'Supply Chain & Logistics',
];

const TONES = [
  'Professional & Authoritative',
  'Conversational & Friendly',
  'Bold & Provocative',
  'Inspirational & Motivating',
  'Data-Driven & Analytical',
  'Storytelling & Personal',
  'Educational & Informative',
  'Witty & Humorous',
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', niche: '', tone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/thank-you');
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${focusedField === field ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: '10px',
    padding: '0.85rem 1rem',
    color: 'var(--text)',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(0,212,255,0.1)' : 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts Delivered to Your Inbox Every Morning</title>
        <meta name="description" content="AI-generated LinkedIn posts delivered to your inbox every morning. Based on today's trending news. Pick one, post it. Done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* Background effects */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 20% 20%, rgba(0,212,255,0.04) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(0,153,204,0.03) 0%, transparent 50%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Noise texture overlay */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: 'none', zIndex: 0, opacity: 0.4,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* NAV */}
          <nav style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '1.25rem 2rem', borderBottom: '1px solid var(--border)',
            backdropFilter: 'blur(12px)', background: 'rgba(8,12,16,0.8)',
            position: 'sticky', top: 0, zIndex: 100,
          }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem', color: '#fff' }}>
              The<span style={{ color: 'var(--accent)' }}>Post</span>Bot
            </div>
            <a href="#signup" style={{
              background: 'var(--accent)', color: 'var(--bg)', padding: '0.5rem 1.25rem',
              borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
              onMouseEnter={e => e.target.style.opacity = '0.85'}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              Start Free Trial
            </a>
          </nav>

          {/* HERO */}
          <section style={{
            maxWidth: '900px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 7rem) 2rem 3rem',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)',
              color: '#00FF88', padding: '0.4rem 1rem', borderRadius: '100px',
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: '2rem',
              animation: 'fadeDown 0.5s ease both',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00FF88', display: 'inline-block', boxShadow: '0 0 6px #00FF88' }} />
              Founding Member — $9/mo forever
            </div>

            <h1 style={{
              fontFamily: 'var(--font-head)', fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
              fontWeight: 800, lineHeight: 1.1, color: '#fff', marginBottom: '1.5rem',
              animation: 'fadeDown 0.5s 0.1s ease both', opacity: 0,
            }}>
              3 LinkedIn posts<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent), #0099CC)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>delivered to your inbox</span><br />
              every morning.
            </h1>

            <p style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--muted)', lineHeight: 1.7,
              maxWidth: '600px', margin: '0 auto 2.5rem',
              animation: 'fadeDown 0.5s 0.2s ease both', opacity: 0,
            }}>
              AI-generated, news-based, image-included. Written in your tone, for your niche.<br />
              Pick one. Post it. Done. <strong style={{ color: 'var(--text)' }}>Zero effort required.</strong>
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeDown 0.5s 0.3s ease both', opacity: 0 }}>
              <a href="#signup" style={{
                background: 'var(--accent)', color: 'var(--bg)', padding: '0.9rem 2.25rem',
                borderRadius: '10px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 0 30px rgba(0,212,255,0.25)', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,212,255,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,212,255,0.25)'; }}
              >
                Start 7-Day Free Trial →
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                <span>✓</span> No credit card required
              </div>
            </div>
          </section>

          {/* STATS BAR */}
          <div style={{
            borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            padding: '1.5rem 2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 'clamp(2rem, 5vw, 5rem)', flexWrap: 'wrap',
          }}>
            {[
              { val: '3', label: 'posts every morning' },
              { val: '7', label: 'days free trial' },
              { val: '$9', label: 'per month founding price' },
              { val: '0', label: 'effort from you' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>{s.val}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <section style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 6rem) 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>How it works</p>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
                Set it once. Get posts forever.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {[
                {
                  step: '01', icon: '⚡',
                  title: 'Tell us your niche & tone',
                  desc: 'One 30-second setup. Your industry, your voice. Never do it again.',
                  color: 'var(--accent)',
                },
                {
                  step: '02', icon: '🤖',
                  title: 'AI works while you sleep',
                  desc: "Every night, we scan today's trending news in your niche and write 3 unique posts — with images.",
                  color: '#A78BFA',
                },
                {
                  step: '03', icon: '📬',
                  title: '3 posts hit your inbox',
                  desc: 'Wake up to ready-to-post content. Different angles, different images, every single day.',
                  color: '#34D399',
                },
                {
                  step: '04', icon: '🚀',
                  title: 'Pick one. Post. Done.',
                  desc: 'Copy your favourite, paste to LinkedIn. Takes 10 seconds. Your audience thinks you work all night.',
                  color: '#F59E0B',
                },
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: '16px', padding: '1.75rem',
                  transition: 'border-color 0.2s, transform 0.2s',
                  cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                    <span style={{ fontFamily: 'var(--font-head)', fontSize: '0.75rem', fontWeight: 800, color: item.color, opacity: 0.5, letterSpacing: '0.1em' }}>{item.step}</span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem' }}>{item.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY THEPOSTBOT */}
          <section style={{
            background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
            padding: 'clamp(4rem, 8vw, 6rem) 2rem',
          }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <p style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Why ThePostBot</p>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>
                  Every other tool makes you do the work.
                </h2>
                <p style={{ color: 'var(--muted)', marginTop: '1rem', maxWidth: '500px', margin: '1rem auto 0' }}>
                  They're writing assistants. You still need to think of ideas, log in, generate, edit, schedule.<br />
                  ThePostBot is the only tool that works for you — not with you.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '📰', title: 'Based on today\'s news', desc: 'Every post is inspired by what\'s actually trending in your industry right now. Not recycled AI fluff.' },
                  { icon: '🎭', title: 'Your tone, your voice', desc: 'Inspirational? Data-driven? Provocative? The AI writes in your style every single time.' },
                  { icon: '🖼️', title: 'Images included', desc: 'Every post comes with a professionally sourced image that matches the content. No stock photo hunting.' },
                  { icon: '🔒', title: 'Uniquely yours', desc: 'Even if two users share the same niche, they never receive the same posts. Every user gets completely unique content.' },
                  { icon: '💸', title: 'Fraction of the cost', desc: 'Competitors charge $60–$200/month. ThePostBot Founding Member price is $9/month. Forever.' },
                  { icon: '📲', title: 'No app to open', desc: 'Posts come straight to your email inbox. The one thing you already check every morning.' },
                ].map((item, i) => (
                  <div key={i} style={{
                    background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '1.5rem',
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>{item.title}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(4rem, 8vw, 6rem) 2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Pricing</p>
            <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
              Simple, honest pricing.
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Lock in the founding price before it's gone.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              {/* Founding */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,153,204,0.04))',
                border: '2px solid var(--accent)', borderRadius: '20px', padding: '2rem',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: 'var(--accent)', color: 'var(--bg)',
                  padding: '0.25rem 0.75rem', borderRadius: '100px',
                  fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Limited — 20 spots</div>
                <p style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Founding Member</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '3rem', fontWeight: 800, color: '#fff' }}>$9</span>
                  <span style={{ color: 'var(--muted)' }}>/month</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>Locked forever — price never increases for you</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.65rem', fontSize: '0.9rem', color: 'var(--text)' }}>
                    <span style={{ color: '#00FF88' }}>✓</span> {f}
                  </div>
                ))}
                <a href="#signup" style={{
                  display: 'block', marginTop: '1.75rem', background: 'var(--accent)', color: 'var(--bg)',
                  textAlign: 'center', padding: '0.85rem', borderRadius: '10px',
                  fontWeight: 700, textDecoration: 'none', fontSize: '0.95rem', transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Start Free Trial
                </a>
              </div>

              {/* Regular */}
              <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2rem' }}>
                <p style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Regular Price</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: 'var(--font-head)', fontSize: '3rem', fontWeight: 800, color: 'var(--muted)' }}>$15</span>
                  <span style={{ color: 'var(--muted)' }}>/month</span>
                </div>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1.75rem' }}>For everyone after founding spots are gone</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.65rem', fontSize: '0.9rem', color: 'var(--muted)' }}>
                    <span style={{ color: 'var(--muted)' }}>✓</span> {f}
                  </div>
                ))}
                <div style={{
                  display: 'block', marginTop: '1.75rem', background: 'var(--border)',
                  textAlign: 'center', padding: '0.85rem', borderRadius: '10px',
                  fontWeight: 600, fontSize: '0.9rem', color: 'var(--muted)',
                }}>
                  Coming soon
                </div>
              </div>
            </div>
          </section>

          {/* SIGNUP FORM */}
          <section id="signup" style={{
            background: 'var(--bg2)', borderTop: '1px solid var(--border)',
            padding: 'clamp(4rem, 8vw, 6rem) 2rem',
          }}>
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <p style={{ color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.75rem' }}>Start Free Trial</p>
                <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
                  Your first posts arrive<br />tomorrow morning.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>7 days free. No credit card needed. Cancel anytime.</p>
              </div>

              <div style={{
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: '20px', padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}>
                <div onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gap: '1rem' }}>

                    <div>
                      <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Full Name</label>
                      <input
                        type="text" placeholder="Your name" value={form.name} required
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('name')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Email Address</label>
                      <input
                        type="email" placeholder="you@company.com" value={form.email} required
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                        style={inputStyle('email')}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Your Niche / Industry</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={form.niche} required
                          onChange={e => setForm({ ...form, niche: e.target.value })}
                          onFocus={() => setFocusedField('niche')} onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('niche'), cursor: 'pointer', color: form.niche ? 'var(--text)' : 'var(--muted)' }}
                        >
                          <option value="" disabled>Select your industry</option>
                          {NICHES.map(n => <option key={n} value={n} style={{ background: 'var(--card)', color: 'var(--text)' }}>{n}</option>)}
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Writing Tone</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          value={form.tone} required
                          onChange={e => setForm({ ...form, tone: e.target.value })}
                          onFocus={() => setFocusedField('tone')} onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle('tone'), cursor: 'pointer', color: form.tone ? 'var(--text)' : 'var(--muted)' }}
                        >
                          <option value="" disabled>Select your tone</option>
                          {TONES.map(t => <option key={t} value={t} style={{ background: 'var(--card)', color: 'var(--text)' }}>{t}</option>)}
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>▾</span>
                      </div>
                    </div>

                    {error && (
                      <div style={{
                        background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                        color: '#FCA5A5', padding: '0.85rem 1rem', borderRadius: '10px', fontSize: '0.9rem',
                      }}>
                        {error}
                      </div>
                    )}

                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      style={{
                        marginTop: '0.5rem',
                        background: loading ? 'var(--border)' : 'var(--accent)',
                        color: loading ? 'var(--muted)' : 'var(--bg)',
                        border: 'none', borderRadius: '10px', padding: '1rem',
                        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%', transition: 'all 0.2s',
                        boxShadow: loading ? 'none' : '0 0 25px rgba(0,212,255,0.2)',
                      }}
                      onMouseEnter={e => { if (!loading) { e.currentTarget.style.boxShadow = '0 0 35px rgba(0,212,255,0.35)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 25px rgba(0,212,255,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {loading ? 'Setting up your account...' : 'Start My Free 7-Day Trial →'}
                    </button>

                    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                      ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ First posts tomorrow morning
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{
            borderTop: '1px solid var(--border)', padding: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
          }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, color: 'var(--muted)' }}>
              The<span style={{ color: 'var(--accent)' }}>Post</span>Bot
            </div>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              Questions? <a href="mailto:hello@thepostbot.me" style={{ color: 'var(--accent)', textDecoration: 'none' }}>hello@thepostbot.me</a>
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>© 2025 ThePostBot. All rights reserved.</p>
          </footer>

        </div>
      </div>

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        input::placeholder, select::placeholder { color: var(--muted); }
        option { background: #111820; }
      `}</style>
    </>
  );
}
