import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

const NICHES = [
  'Marketing & Advertising','Sales & Business Development','Technology & SaaS',
  'Finance & Investing','Entrepreneurship & Startups','Leadership & Management',
  'Human Resources & Talent','Real Estate','Healthcare & Wellness',
  'E-commerce & Retail','Personal Branding','Productivity & Self-Development',
  'Consulting & Coaching','Legal & Compliance','Supply Chain & Logistics',
];

const TONES = [
  'Professional & Authoritative','Conversational & Friendly','Bold & Provocative',
  'Inspirational & Motivating','Data-Driven & Analytical','Storytelling & Personal',
  'Educational & Informative','Witty & Humorous',
];

// LinkedIn-style floating engagement elements — no real names, pure engagement signals
const FLOATING_ELEMENTS = [
  { type: 'notification', icon: '🔔', text: 'Your post reached 12,400 impressions', sub: '3 minutes ago', anim: 'f1', pos: { top: '6%', left: '1%' }, opacity: 0.22 },
  { type: 'reaction', icon: '👍', text: '847 people liked your post', sub: 'Trending in Entrepreneurship', anim: 'f3', pos: { top: '22%', left: '-1%' }, opacity: 0.18 },
  { type: 'notification', icon: '👀', text: '231 people viewed your profile', sub: 'Up 380% this week', anim: 'f5', pos: { top: '52%', left: '0%' }, opacity: 0.15 },
  { type: 'reaction', icon: '🔁', text: '94 reposts in the last hour', sub: 'Your content is going viral', anim: 'f2', pos: { bottom: '15%', left: '1%' }, opacity: 0.13 },
  { type: 'notification', icon: '💬', text: '156 comments on your post', sub: 'People are talking about you', anim: 'f4', pos: { top: '5%', right: '0%' }, opacity: 0.22 },
  { type: 'reaction', icon: '🚀', text: 'Your post is in Top Content', sub: '14,000+ impressions today', anim: 'f1', pos: { top: '28%', right: '-1%' }, opacity: 0.18 },
  { type: 'notification', icon: '⭐', text: 'New follower from your post', sub: 'Your audience is growing fast', anim: 'f6', pos: { top: '55%', right: '0%' }, opacity: 0.15 },
  { type: 'reaction', icon: '❤️', text: '2,300 reactions this week', sub: 'Best performing week ever', anim: 'f3', pos: { bottom: '12%', right: '1%' }, opacity: 0.13 },
];

// Post preview cards — generic, no real names
const POST_CARDS = [
  { initials: '🎯', role: 'Marketing Leader', hook: 'The biggest lie in B2B marketing? More content = more leads.', tags: ['#Marketing', '#Growth'], anim: 'f2', pos: { top: '38%', left: '0%' }, opacity: 0.12 },
  { initials: '💡', role: 'Tech Founder', hook: 'We closed $2M with an 8-slide deck. Here\'s what mattered.', tags: ['#Startups', '#Funding'], anim: 'f4', pos: { bottom: '32%', right: '0%' }, opacity: 0.12 },
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
      if (data.success) router.push('/thank-you');
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focusedField === field ? '#0A66C2' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px', padding: '0.875rem 1rem', color: '#fff',
    fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'all 0.2s', boxShadow: focusedField === field ? '0 0 0 3px rgba(10,102,194,0.12)' : 'none',
    appearance: 'none', WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts Delivered to Your Inbox Every Morning</title>
        <meta name="description" content="AI-generated LinkedIn posts delivered to your inbox every morning. Based on today's trending news. Pick one, post it. Done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#060A12;color:#fff;font-family:'DM Sans',sans-serif;overflow-x:hidden;}
        ::selection{background:#0A66C2;color:#fff;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#060A12;}
        ::-webkit-scrollbar-thumb{background:#1a2535;border-radius:2px;}

        @keyframes f1{0%,100%{transform:translateY(0) rotate(-1.5deg);}50%{transform:translateY(-18px) rotate(-0.5deg);}}
        @keyframes f2{0%,100%{transform:translateY(0) rotate(1deg);}50%{transform:translateY(-22px) rotate(2deg);}}
        @keyframes f3{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-14px) rotate(-2deg);}}
        @keyframes f4{0%,100%{transform:translateY(0) rotate(2deg);}50%{transform:translateY(-20px) rotate(1deg);}}
        @keyframes f5{0%,100%{transform:translateY(0) rotate(-0.5deg);}50%{transform:translateY(-16px) rotate(-1.5deg);}}
        @keyframes f6{0%,100%{transform:translateY(0) rotate(1.5deg);}50%{transform:translateY(-24px) rotate(0.5deg);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:0.7;}}

        .fu1{animation:fadeUp 0.7s ease both;}
        .fu2{animation:fadeUp 0.7s 0.15s ease both;opacity:0;}
        .fu3{animation:fadeUp 0.7s 0.3s ease both;opacity:0;}
        .fu4{animation:fadeUp 0.7s 0.45s ease both;opacity:0;}

        .notif-card{background:rgba(6,10,18,0.75);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:12px 14px;width:240px;position:absolute;}
        .post-card{background:rgba(6,10,18,0.75);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px;width:220px;position:absolute;}

        .feature-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;transition:all 0.25s;cursor:default;}
        .feature-card:hover{background:rgba(10,102,194,0.07);border-color:rgba(10,102,194,0.3);transform:translateY(-4px);}

        .btn-primary{background:#0A66C2;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:'DM Sans',sans-serif;font-weight:600;font-size:1rem;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 4px 24px rgba(10,102,194,0.3);}
        .btn-primary:hover{background:#004182;transform:translateY(-2px);box-shadow:0 8px 30px rgba(10,102,194,0.4);}

        .step-card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:28px;transition:all 0.25s;}
        .step-card:hover{border-color:rgba(10,102,194,0.35);background:rgba(10,102,194,0.05);}

        .pricing-main{background:linear-gradient(145deg,rgba(10,102,194,0.1),rgba(0,65,130,0.05));border:1.5px solid rgba(10,102,194,0.45);border-radius:20px;padding:36px;position:relative;overflow:hidden;}
        .pricing-main::after{content:'';position:absolute;top:-60px;right:-60px;width:180px;height:180px;background:radial-gradient(circle,rgba(10,102,194,0.1),transparent 70%);pointer-events:none;}

        .section-chip{display:inline-block;background:rgba(10,102,194,0.1);border:1px solid rgba(10,102,194,0.2);color:#5B9BD5;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:14px;}

        select option{background:#0d1117;color:#fff;}

        @media(max-width:768px){
          .hide-mobile{display:none!important;}
          .hero-text h1{font-size:2.4rem!important;}
          .hero-text p{font-size:1rem!important;}
          .stats-bar{gap:2rem!important;}
          .grid-2{grid-template-columns:1fr!important;}
          .grid-4{grid-template-columns:1fr 1fr!important;}
          nav .nav-spots{display:none!important;}
        }
        @media(max-width:480px){
          .grid-4{grid-template-columns:1fr!important;}
          .pricing-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#060A12' }}>

        {/* Background glow */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(10,102,194,0.06) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(10,102,194,0.05) 0%, transparent 60%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>

          {/* NAV */}
          <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', background: 'rgba(6,10,18,0.85)', position: 'sticky', top: 0, zIndex: 100 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.01em' }}>
              The<span style={{ color: '#0A66C2' }}>Post</span>Bot
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span className="nav-spots" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                <span style={{ color: '#0A66C2', fontWeight: 600 }}>20 spots</span> left at $9/mo
              </span>
              <a href="#signup" className="btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.875rem' }}>
                Start Free Trial
              </a>
            </div>
          </nav>

          {/* HERO */}
          <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '4rem 2rem' }}>

            {/* Floating notification & engagement elements */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
              {FLOATING_ELEMENTS.map((el, i) => (
                <div key={i} className={`notif-card hide-mobile`} style={{ ...el.pos, opacity: el.opacity, animation: `${el.anim} ${6 + i * 0.8}s ease-in-out infinite ${i * 0.4}s` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <span style={{ fontSize: '20px', lineHeight: 1, marginTop: '1px' }}>{el.icon}</span>
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{el.text}</div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '3px' }}>{el.sub}</div>
                    </div>
                  </div>
                </div>
              ))}
              {POST_CARDS.map((card, i) => (
                <div key={i} className={`post-card hide-mobile`} style={{ ...card.pos, opacity: card.opacity, animation: `${card.anim} ${7 + i}s ease-in-out infinite ${i * 0.6}s` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(10,102,194,0.2)', border: '1px solid rgba(10,102,194,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>{card.initials}</div>
                    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{card.role}</div>
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '8px' }}>{card.hook}</div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {card.tags.map(t => <span key={t} style={{ fontSize: '9px', color: 'rgba(10,102,194,0.8)', background: 'rgba(10,102,194,0.08)', padding: '2px 6px', borderRadius: '100px', border: '1px solid rgba(10,102,194,0.15)' }}>{t}</span>)}
                  </div>
                </div>
              ))}

              {/* Center radial fade */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 15%, rgba(6,10,18,0.65) 55%, rgba(6,10,18,0.97) 85%)' }} />
            </div>

            {/* Hero content */}
            <div style={{ maxWidth: '820px', textAlign: 'center', position: 'relative', zIndex: 2 }} className="hero-text">
              <div className="fu1" style={{ marginBottom: '1.5rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.22)', color: '#5B9BD5', padding: '6px 16px', borderRadius: '100px', fontSize: '11.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0A66C2', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                  Founding Member · $9/mo forever · Only 20 spots
                </span>
              </div>

              <h1 className="fu2" style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2.8rem,7vw,5rem)', fontWeight: 800, lineHeight: 1.07, marginBottom: '1.5rem', letterSpacing: '-0.025em' }}>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.9)' }}>Wake up to</span>
                <span style={{ display: 'block' }}>
                  <span style={{ color: '#0A66C2' }}>3 LinkedIn posts</span>
                </span>
                <span style={{ display: 'block', color: 'rgba(255,255,255,0.9)' }}>ready to go.</span>
              </h1>

              <p className="fu3" style={{ fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '540px', margin: '0 auto 2.5rem' }}>
                AI-generated, news-based, image-included — written in your tone, for your niche.
                Delivered to your inbox every morning.{' '}
                <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Zero effort required.</strong>
              </p>

              <div className="fu4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#signup" className="btn-primary">
                  Start 7-Day Free Trial →
                </a>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
                  ✓ No credit card needed
                </span>
              </div>

              {/* Mini social proof */}
              <div className="fu4" style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                {['👍 2,300+ reactions/week', '👀 12,400 avg impressions', '🔁 94 avg reposts/post'].map((s, i) => (
                  <span key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', gap: '4px' }}>{s}</span>
                ))}
              </div>
            </div>
          </section>

          {/* STATS BAR */}
          <div className="stats-bar" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'clamp(2.5rem,6vw,6rem)', flexWrap: 'wrap', background: 'rgba(255,255,255,0.01)' }}>
            {[{ val: '3', label: 'posts every morning' }, { val: '7', label: 'days free trial' }, { val: '$9', label: '/month founding price' }, { val: '0', label: 'effort from you' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: '2.5rem', fontWeight: 800, color: '#0A66C2', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* HOW IT WORKS */}
          <section style={{ maxWidth: '980px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-chip">How it works</div>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Set it once. Get posts forever.
              </h2>
            </div>
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
              {[
                { n: '01', icon: '⚡', title: 'Tell us your niche & tone', desc: '30-second setup. Your industry, your voice. Never repeat it.' },
                { n: '02', icon: '🤖', title: 'AI works while you sleep', desc: "Every night we scan today's trending news and write 3 unique posts with images." },
                { n: '03', icon: '📬', title: '3 posts hit your inbox', desc: 'Wake up to ready-to-post content. Different angles, different images, every day.' },
                { n: '04', icon: '🚀', title: 'Pick one. Post. Done.', desc: 'Copy your favourite, paste to LinkedIn. 10 seconds. Your audience is impressed.' },
              ].map((s, i) => (
                <div key={i} className="step-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '1.6rem' }}>{s.icon}</span>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '11px', fontWeight: 800, color: '#0A66C2', opacity: 0.45, letterSpacing: '0.1em' }}>{s.n}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY */}
          <section style={{ background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div className="section-chip">Why ThePostBot</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Every other tool makes you do the work.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.38)', marginTop: '1rem', maxWidth: '460px', margin: '1rem auto 0', lineHeight: 1.7 }}>
                  They're writing assistants. You still need to log in, think of ideas, generate, edit, schedule. ThePostBot works for you — not with you.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
                {[
                  { icon: '📰', t: "Based on today's news", d: "Every post is inspired by what's actually trending in your industry right now. Not recycled AI fluff." },
                  { icon: '🎯', t: 'Your tone, your voice', d: 'Inspirational? Data-driven? Provocative? The AI writes in your style every single time.' },
                  { icon: '🖼️', t: 'Images included', d: 'Every post comes with a professionally sourced image matching the content. No stock photo hunting.' },
                  { icon: '🔒', t: 'Uniquely yours', d: 'Even if two users share the same niche, they never receive the same posts. Guaranteed unique content.' },
                  { icon: '💸', t: 'Fraction of the cost', d: 'Competitors charge $60–$200/month. ThePostBot Founding Member price is $9/month. Forever.' },
                  { icon: '📲', t: 'No app to open', d: 'Posts come straight to your email inbox — the one thing you already check every morning.' },
                ].map((f, i) => (
                  <div key={i} className="feature-card">
                    <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{f.icon}</div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: '0.93rem', fontWeight: 700, marginBottom: '6px' }}>{f.t}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.84rem', lineHeight: 1.65 }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem', textAlign: 'center' }}>
            <div className="section-chip">Pricing</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Simple, honest pricing.</h2>
            <p style={{ color: 'rgba(255,255,255,0.38)', marginBottom: '3.5rem' }}>Lock in the founding price before it's gone.</p>
            <div className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
              <div className="pricing-main">
                <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: '#0A66C2', color: '#fff', padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>20 spots only</div>
                <p style={{ color: '#5B9BD5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Founding Member</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '3.5rem', fontWeight: 800 }}>$9</span>
                  <span style={{ color: 'rgba(255,255,255,0.38)' }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.82rem', marginBottom: '1.75rem' }}>Locked forever — price never increases for you</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)' }}>
                    <span style={{ color: '#0A66C2' }}>✓</span> {f}
                  </div>
                ))}
                <a href="#signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '1.75rem', width: '100%' }}>Start Free Trial</a>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '36px' }}>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Regular Price</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '3.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.2)' }}>$15</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.82rem', marginBottom: '1.75rem' }}>For everyone after founding spots are gone</p>
                {['3 unique AI posts daily', 'News-based content', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.22)' }}>
                    <span>✓</span> {f}
                  </div>
                ))}
                <div style={{ display: 'block', marginTop: '1.75rem', background: 'rgba(255,255,255,0.04)', textAlign: 'center', padding: '14px', borderRadius: '10px', color: 'rgba(255,255,255,0.2)', fontSize: '0.875rem' }}>Coming soon</div>
              </div>
            </div>
          </section>

          {/* SIGNUP */}
          <section id="signup" style={{ background: 'rgba(255,255,255,0.012)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
            <div style={{ maxWidth: '540px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div className="section-chip">Start Free Trial</div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(1.9rem,5vw,2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                  Your first posts arrive<br />tomorrow morning.
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem' }}>7 days free. No credit card. Cancel anytime.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: 'clamp(1.5rem,5vw,2.5rem)' }}>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} value={form[f.key]} required
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        onFocus={() => setFocusedField(f.key)} onBlur={() => setFocusedField(null)}
                        style={inputStyle(f.key)} />
                    </div>
                  ))}
                  {[
                    { key: 'niche', label: 'Your Niche / Industry', placeholder: 'Select your industry', options: NICHES },
                    { key: 'tone', label: 'Writing Tone', placeholder: 'Select your tone', options: TONES },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.label}</label>
                      <div style={{ position: 'relative' }}>
                        <select value={form[f.key]} required
                          onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                          onFocus={() => setFocusedField(f.key)} onBlur={() => setFocusedField(null)}
                          style={{ ...inputStyle(f.key), cursor: 'pointer', color: form[f.key] ? '#fff' : 'rgba(255,255,255,0.28)' }}>
                          <option value="" disabled>{f.placeholder}</option>
                          {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}>▾</span>
                      </div>
                    </div>
                  ))}
                  {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', color: '#FCA5A5', padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem' }}>{error}</div>}
                  <button onClick={handleSubmit} disabled={loading}
                    style={{ marginTop: '6px', background: loading ? 'rgba(255,255,255,0.07)' : '#0A66C2', color: loading ? 'rgba(255,255,255,0.3)' : '#fff', border: 'none', borderRadius: '10px', padding: '1rem', fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(10,102,194,0.28)' }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#004182'; }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.background = '#0A66C2'; }}>
                    {loading ? 'Setting up your account...' : 'Start My Free 7-Day Trial →'}
                  </button>
                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.22)', fontSize: '0.8rem', marginTop: '4px' }}>✓ No credit card &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Posts tomorrow morning</p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>
              The<span style={{ color: '#0A66C2' }}>Post</span>Bot
            </div>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.82rem' }}>
              Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
            </p>
            <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.78rem' }}>© 2025 ThePostBot. All rights reserved.</p>
          </footer>

        </div>
      </div>
    </>
  );
}
