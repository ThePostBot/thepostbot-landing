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

const FAKE_POSTS = [
  { name: 'Sarah K.', title: 'Marketing Director', content: 'The biggest lie in B2B marketing? That more content equals more leads. Quality beats quantity every single time.\n\n- 3 targeted posts > 30 generic ones\n- Engagement rate matters more than follower count\n- Your niche audience is worth 10x a broad one\n\nWhat\'s your content strategy for 2025?\n\n#Marketing #B2BMarketing #ContentStrategy', avatar: 'S' },
  { name: 'James R.', title: 'Tech Founder', content: 'We raised $2M with a deck that had only 8 slides.\n\nInvestors don\'t fund ideas. They fund execution.\n\n- Problem clarity beats market size slides\n- Show traction, not projections\n- Your team slide is your most important slide\n\nWhat\'s the one thing VCs actually look for?\n\n#StartupLife #Fundraising #VentureCapital', avatar: 'J' },
  { name: 'Priya M.', title: 'Sales Leader', content: 'Cold outreach is dead. Warm outreach is thriving.\n\nI closed $500K last quarter without a single cold call.\n\n- LinkedIn DMs converted at 23%\n- Referrals from existing clients = 60% of pipeline\n- Content-led inbound = 17% of new business\n\nHow are you building pipeline in 2025?\n\n#Sales #SalesStrategy #RevenueGrowth', avatar: 'P' },
  { name: 'Ahmed H.', title: 'Finance Consultant', content: 'Most startups fail not because of bad products, but bad unit economics.\n\nI\'ve analyzed 200+ pitch decks. The pattern is clear.\n\n- CAC payback > 18 months = danger zone\n- Gross margins below 60% = scaling trap\n- Churn above 5% monthly = leaky bucket\n\nWhat metric do you watch most closely?\n\n#Finance #Startups #UnitEconomics', avatar: 'A' },
  { name: 'Lisa T.', title: 'HR Director', content: 'The Great Resignation wasn\'t about money. It was about meaning.\n\nWe cut turnover by 40% with one change: radical transparency.\n\n- Weekly all-hands with real numbers\n- Managers trained to have hard conversations\n- Career paths mapped for every role\n\nWhat drives retention at your company?\n\n#HR #PeopleOps #EmployeeRetention', avatar: 'L' },
  { name: 'Carlos B.', title: 'Real Estate Investor', content: 'The Dubai real estate market is shifting. Here\'s what nobody is talking about.\n\nOff-plan sales are up 67% YoY while ready properties stagnate.\n\n- Payment plans beating mortgage rates\n- New communities outperforming established areas\n- International buyers now 43% of transactions\n\nWhere are you investing in 2025?\n\n#RealEstate #Dubai #PropertyInvestment', avatar: 'C' },
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
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focusedField === field ? '#0A66C2' : 'rgba(255,255,255,0.12)'}`,
    borderRadius: '10px',
    padding: '0.875rem 1rem',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'all 0.2s',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(10,102,194,0.15)' : 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts Delivered to Your Inbox Every Morning</title>
        <meta name="description" content="AI-generated LinkedIn posts delivered to your inbox every morning. Based on today's trending news. Pick one, post it. Done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050810; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        ::selection { background: #0A66C2; color: #fff; }

        @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(-2deg); } 50% { transform: translateY(-18px) rotate(-1deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(1.5deg); } 50% { transform: translateY(-22px) rotate(2deg); } }
        @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(-1deg); } 50% { transform: translateY(-14px) rotate(-2deg); } }
        @keyframes float4 { 0%,100% { transform: translateY(0px) rotate(2deg); } 50% { transform: translateY(-20px) rotate(1deg); } }
        @keyframes float5 { 0%,100% { transform: translateY(0px) rotate(-1.5deg); } 50% { transform: translateY(-16px) rotate(-0.5deg); } }
        @keyframes float6 { 0%,100% { transform: translateY(0px) rotate(1deg); } 50% { transform: translateY(-24px) rotate(2deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }

        .hero-card { background: rgba(255,255,255,0.04); backdrop-filter: blur(2px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; width: 260px; position: absolute; }
        .hero-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .hero-card-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #0A66C2, #004182); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; color: #fff; flex-shrink: 0; }
        .hero-card-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.9); }
        .hero-card-title { font-size: 11px; color: rgba(255,255,255,0.45); }
        .hero-card-content { font-size: 11.5px; color: rgba(255,255,255,0.55); line-height: 1.55; }
        .hero-card-tag { display: inline-block; background: rgba(10,102,194,0.15); color: rgba(10,102,194,0.9); font-size: 10px; padding: 2px 8px; border-radius: 100px; margin-top: 8px; border: 1px solid rgba(10,102,194,0.2); }

        .anim-1 { animation: float1 6s ease-in-out infinite; }
        .anim-2 { animation: float2 7s ease-in-out infinite 0.5s; }
        .anim-3 { animation: float3 8s ease-in-out infinite 1s; }
        .anim-4 { animation: float4 6.5s ease-in-out infinite 1.5s; }
        .anim-5 { animation: float5 7.5s ease-in-out infinite 0.8s; }
        .anim-6 { animation: float6 9s ease-in-out infinite 0.3s; }

        .fade-up-1 { animation: fadeUp 0.7s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.15s ease both; opacity: 0; }
        .fade-up-3 { animation: fadeUp 0.7s 0.3s ease both; opacity: 0; }
        .fade-up-4 { animation: fadeUp 0.7s 0.45s ease both; opacity: 0; }

        .feature-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; transition: all 0.25s; cursor: default; }
        .feature-card:hover { background: rgba(10,102,194,0.06); border-color: rgba(10,102,194,0.3); transform: translateY(-4px); }

        .pricing-card-main { background: linear-gradient(135deg, rgba(10,102,194,0.12), rgba(0,65,130,0.06)); border: 2px solid rgba(10,102,194,0.5); border-radius: 20px; padding: 36px; position: relative; overflow: hidden; }
        .pricing-card-main::before { content: ''; position: absolute; top: -50%; right: -50%; width: 200px; height: 200px; background: radial-gradient(circle, rgba(10,102,194,0.12), transparent 70%); }

        .step-number { width: 48px; height: 48px; border-radius: 50%; background: rgba(10,102,194,0.12); border: 1px solid rgba(10,102,194,0.3); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px; color: #0A66C2; flex-shrink: 0; }

        .btn-primary { background: #0A66C2; color: #fff; border: none; border-radius: 10px; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 1rem; cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; box-shadow: 0 4px 24px rgba(10,102,194,0.35); }
        .btn-primary:hover { background: #004182; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(10,102,194,0.45); }

        select option { background: #0d1117; color: #fff; }

        .section-label { display: inline-block; background: rgba(10,102,194,0.1); border: 1px solid rgba(10,102,194,0.25); color: #4A9EE8; padding: 5px 14px; border-radius: 100px; font-size: 11px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px; }
      `}</style>

      <div style={{ minHeight: '100vh', position: 'relative' }}>

        {/* Background gradient mesh */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(10,102,194,0.08) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(10,102,194,0.06) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(10,102,194,0.04) 0%, transparent 70%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', background: 'rgba(5,8,16,0.8)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff', letterSpacing: '-0.01em' }}>
              The<span style={{ color: '#0A66C2' }}>Post</span>Bot
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }}>
                <span style={{ color: '#0A66C2', fontWeight: 600 }}>20 spots</span> left at $9/mo
              </span>
              <a href="#signup" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
                Start Free Trial
              </a>
            </div>
          </nav>

          {/* HERO */}
          <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '4rem 2rem' }}>

            {/* Floating LinkedIn-style post cards in background */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>

              {/* Left cards */}
              <div className="hero-card anim-1" style={{ top: '8%', left: '-2%', opacity: 0.18 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">S</div>
                  <div><div className="hero-card-name">Sarah K.</div><div className="hero-card-title">Marketing Director</div></div>
                </div>
                <div className="hero-card-content">The biggest lie in B2B marketing? That more content equals more leads...</div>
                <div className="hero-card-tag">#Marketing</div>
              </div>

              <div className="hero-card anim-3" style={{ top: '48%', left: '-4%', opacity: 0.13 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">A</div>
                  <div><div className="hero-card-name">Ahmed H.</div><div className="hero-card-title">Finance Consultant</div></div>
                </div>
                <div className="hero-card-content">Most startups fail not because of bad products, but bad unit economics...</div>
                <div className="hero-card-tag">#Finance</div>
              </div>

              <div className="hero-card anim-5" style={{ bottom: '5%', left: '2%', opacity: 0.1 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">L</div>
                  <div><div className="hero-card-name">Lisa T.</div><div className="hero-card-title">HR Director</div></div>
                </div>
                <div className="hero-card-content">The Great Resignation wasn't about money. It was about meaning...</div>
                <div className="hero-card-tag">#HumanResources</div>
              </div>

              {/* Right cards */}
              <div className="hero-card anim-2" style={{ top: '6%', right: '-1%', opacity: 0.18 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">J</div>
                  <div><div className="hero-card-name">James R.</div><div className="hero-card-title">Tech Founder</div></div>
                </div>
                <div className="hero-card-content">We raised $2M with a deck that had only 8 slides. Investors don't fund ideas...</div>
                <div className="hero-card-tag">#StartupLife</div>
              </div>

              <div className="hero-card anim-4" style={{ top: '42%', right: '-2%', opacity: 0.14 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">P</div>
                  <div><div className="hero-card-name">Priya M.</div><div className="hero-card-title">Sales Leader</div></div>
                </div>
                <div className="hero-card-content">Cold outreach is dead. Warm outreach is thriving. I closed $500K last quarter...</div>
                <div className="hero-card-tag">#Sales</div>
              </div>

              <div className="hero-card anim-6" style={{ bottom: '8%', right: '0%', opacity: 0.1 }}>
                <div className="hero-card-header">
                  <div className="hero-card-avatar">C</div>
                  <div><div className="hero-card-name">Carlos B.</div><div className="hero-card-title">Real Estate Investor</div></div>
                </div>
                <div className="hero-card-content">The Dubai real estate market is shifting. Here's what nobody is talking about...</div>
                <div className="hero-card-tag">#RealEstate</div>
              </div>

              {/* Center fade overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 20%, rgba(5,8,16,0.7) 60%, rgba(5,8,16,0.95) 100%)' }} />
            </div>

            {/* Hero Content */}
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>

              <div className="fade-up-1" style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.25)', color: '#4A9EE8', padding: '6px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A66C2', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  Founding Member — $9/mo forever · Only 20 spots
                </span>
              </div>

              <h1 className="fade-up-2" style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.6rem, 6.5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.08, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                3 LinkedIn posts<br />
                <span style={{ color: '#0A66C2' }}>delivered to your inbox</span><br />
                every morning.
              </h1>

              <p className="fade-up-3" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.75, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
                AI-generated, news-based, image-included. Written in your tone, for your niche.
                Pick one. Post it. <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Zero effort required.</strong>
              </p>

              <div className="fade-up-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#signup" className="btn-primary">
                  Start 7-Day Free Trial →
                </a>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.875rem' }}>
                  ✓ No credit card required
                </span>
              </div>
            </div>
          </section>

          {/* STATS */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2rem,6vw,6rem)', flexWrap: 'wrap', background: 'rgba(255,255,255,0.015)' }}>
            {[
              { val: '3', label: 'posts every morning' },
              { val: '7', label: 'days free trial' },
              { val: '$9', label: 'per month founding price' },
              { val: '0', label: 'effort from you' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', fontWeight: 800, color: '#0A66C2', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <section style={{ maxWidth: '960px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-label">How it works</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Set it once.<br />Get posts forever.
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { step: '01', icon: '⚡', title: 'Tell us your niche & tone', desc: 'One 30-second setup. Your industry, your voice. Never do it again.', color: '#0A66C2' },
                { step: '02', icon: '🤖', title: 'AI works while you sleep', desc: "Every night we scan today's trending news in your niche and write 3 unique posts with images.", color: '#4A9EE8' },
                { step: '03', icon: '📬', title: '3 posts hit your inbox', desc: 'Wake up to ready-to-post content. Different angles, different images, every single day.', color: '#0A66C2' },
                { step: '04', icon: '🚀', title: 'Pick one. Post. Done.', desc: 'Copy your favourite, paste to LinkedIn. Takes 10 seconds. Your audience thinks you work all night.', color: '#4A9EE8' },
              ].map((item, i) => (
                <div key={i} className="feature-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.75rem' }}>{item.icon}</span>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '11px', fontWeight: 800, color: item.color, opacity: 0.5, letterSpacing: '0.1em' }}>{item.step}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY THEPOSTBOT */}
          <section style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div className="section-label">Why ThePostBot</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '600px', margin: '0 auto' }}>
                  Every other tool makes you do the work.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0', fontSize: '1rem', lineHeight: 1.7 }}>
                  They're writing assistants. You still need to think, log in, generate, edit, schedule. ThePostBot works for you — not with you.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { icon: '📰', title: "Based on today's news", desc: "Every post is inspired by what's actually trending in your industry right now. Not recycled AI fluff." },
                  { icon: '🎯', title: 'Your tone, your voice', desc: 'Inspirational? Data-driven? Provocative? The AI writes in your style every single time.' },
                  { icon: '🖼️', title: 'Images included', desc: 'Every post comes with a professionally sourced image that matches the content. No stock photo hunting.' },
                  { icon: '🔒', title: 'Uniquely yours', desc: 'Even if two users share the same niche, they never receive the same posts. Every user gets completely unique content.' },
                  { icon: '💸', title: 'Fraction of the cost', desc: 'Competitors charge $60–$200/month. ThePostBot Founding Member price is $9/month. Forever.' },
                  { icon: '📲', title: 'No app to open', desc: 'Posts come straight to your email inbox — the one thing you already check every morning.' },
                ].map((item, i) => (
                  <div key={i} className="feature-card">
                    <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{item.icon}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px', color: '#fff' }}>{item.title}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem', textAlign: 'center' }}>
            <div className="section-label">Pricing</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,4.5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Simple, honest pricing.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3.5rem' }}>Lock in the founding price before it's gone.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', textAlign: 'left' }}>
              {/* Founding */}
              <div className="pricing-card-main">
                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#0A66C2', color: '#fff', padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  20 spots only
                </div>
                <p style={{ color: '#4A9EE8', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Founding Member</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.5rem', fontWeight: 800, color: '#fff' }}>$9</span>
                  <span style={{ color: 'rgba(255,255,255,0.4)' }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', marginBottom: '2rem' }}>Locked forever — price never increases for you</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
                    <span style={{ color: '#0A66C2' }}>✓</span> {f}
                  </div>
                ))}
                <a href="#signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', width: '100%' }}>
                  Start Free Trial
                </a>
              </div>

              {/* Regular */}
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '36px' }}>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Regular Price</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.25)' }}>$15</span>
                  <span style={{ color: 'rgba(255,255,255,0.25)' }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem', marginBottom: '2rem' }}>For everyone after founding spots are gone</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>
                    <span>✓</span> {f}
                  </div>
                ))}
                <div style={{ display: 'block', marginTop: '2rem', background: 'rgba(255,255,255,0.05)', textAlign: 'center', padding: '14px', borderRadius: '10px', color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
                  Coming soon
                </div>
              </div>
            </div>
          </section>

          {/* SIGNUP FORM */}
          <section id="signup" style={{ background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ maxWidth: '560px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div className="section-label">Start Free Trial</div>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,4.5vw,2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                  Your first posts arrive<br />tomorrow morning.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>7 days free. No credit card. Cancel anytime.</p>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: 'clamp(1.5rem,5vw,2.5rem)' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                    <input type="text" placeholder="Your name" value={form.name} required
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      style={inputStyle('name')} />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                    <input type="email" placeholder="you@company.com" value={form.email} required
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      style={inputStyle('email')} />
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Niche / Industry</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.niche} required
                        onChange={e => setForm({ ...form, niche: e.target.value })}
                        onFocus={() => setFocusedField('niche')} onBlur={() => setFocusedField(null)}
                        style={{ ...inputStyle('niche'), cursor: 'pointer', color: form.niche ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        <option value="" disabled>Select your industry</option>
                        {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.4)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Writing Tone</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.tone} required
                        onChange={e => setForm({ ...form, tone: e.target.value })}
                        onFocus={() => setFocusedField('tone')} onBlur={() => setFocusedField(null)}
                        style={{ ...inputStyle('tone'), cursor: 'pointer', color: form.tone ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        <option value="" disabled>Select your tone</option>
                        {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                    </div>
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem' }}>
                      {error}
                    </div>
                  )}

                  <button onClick={handleSubmit} disabled={loading}
                    style={{ marginTop: '0.5rem', background: loading ? 'rgba(255,255,255,0.08)' : '#0A66C2', color: loading ? 'rgba(255,255,255,0.3)' : '#fff', border: 'none', borderRadius: '10px', padding: '1rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(10,102,194,0.3)' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#004182'; }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0A66C2'; }}>
                    {loading ? 'Setting up your account...' : 'Start My Free 7-Day Trial →'}
                  </button>

                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.25)', fontSize: '0.8rem', marginTop: '4px' }}>
                    ✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ First posts tomorrow morning
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: 'rgba(255,255,255,0.3)', fontSize: '1.1rem' }}>
              The<span style={{ color: '#0A66C2' }}>Post</span>Bot
            </div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.85rem' }}>
              Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>© 2025 ThePostBot. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </>
  );
}
