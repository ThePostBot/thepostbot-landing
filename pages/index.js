import Head from 'next/head';
import { useState, useEffect } from 'react';
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

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda',
  'Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain',
  'Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan',
  'Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria',
  'Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada',
  'Central African Republic','Chad','Chile','China','Colombia','Comoros',
  'Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark',
  'Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador',
  'Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji',
  'Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece',
  'Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras',
  'Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel',
  'Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait',
  'Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya',
  'Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia',
  'Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius',
  'Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco',
  'Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand',
  'Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman',
  'Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru',
  'Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda',
  'Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines',
  'Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal',
  'Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia',
  'Solomon Islands','Somalia','South Africa','South Korea','South Sudan',
  'Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria',
  'Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga',
  'Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda',
  'Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay',
  'Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen',
  'Zambia','Zimbabwe',
];

const NOTIFICATIONS = [
  { icon: '🔔', text: 'Your post reached 14,200 impressions', sub: '2 min ago' },
  { icon: '👍', text: '1,247 people reacted to your post', sub: 'Trending in your network' },
  { icon: '👀', text: '380 people viewed your profile', sub: 'Up 420% this week' },
  { icon: '💬', text: '94 comments on your post', sub: '5 min ago' },
  { icon: '🔁', text: '128 reposts in the last hour', sub: 'Content going viral' },
  { icon: '🏆', text: 'You earned Top Voice badge', sub: 'LinkedIn notified you' },
  { icon: '🚀', text: 'Post in Top Content this week', sub: '22,000+ impressions' },
  { icon: '❤️', text: '3,100 reactions this week', sub: 'Best performing week' },
  { icon: '📈', text: 'Profile views up 540% today', sub: 'Keep posting!' },
  { icon: '✨', text: '47 new connection requests', sub: 'From your last post' },
  { icon: '💡', text: 'Your insight was reshared', sub: 'By 3 industry leaders' },
  { icon: '🌍', text: 'Post reached 6 countries', sub: 'Global reach' },
  { icon: '🔥', text: 'On fire — 200 reactions/hour', sub: 'Top post today' },
  { icon: '💼', text: 'Recruiter viewed your profile', sub: '3 min ago' },
  { icon: '🎉', text: '500 likes milestone reached', sub: 'Congratulations!' },
  { icon: '📊', text: 'Engagement rate: 8.4%', sub: '4x the industry average' },
  { icon: '⭐', text: 'New followers from your post', sub: 'Audience growing fast' },
  { icon: '🎯', text: 'Post trending in your niche', sub: 'Top 5% of creators' },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', niche: '', tone: '', country: '', keyword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    setMounted(true);
    const generated = NOTIFICATIONS.map((n, i) => ({
      ...n,
      x: 2 + Math.random() * 94,
      y: 3 + (i / NOTIFICATIONS.length) * 90 + (Math.random() * 8 - 4),
      dur: 5 + Math.random() * 7,
      delay: Math.random() * 5,
      rot: (Math.random() * 6 - 3).toFixed(1),
      side: Math.random() > 0.5 ? 'left' : 'right',
    }));
    setBubbles(generated);
  }, []);

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
      else setError(data.error || 'Something went wrong.');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  const inp = (field) => ({
    width: '100%',
    background: focusedField === field ? 'rgba(10,102,194,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1.5px solid ${focusedField === field ? '#0A66C2' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '12px', padding: '0.9rem 1.1rem', color: '#fff',
    fontSize: '0.95rem', fontFamily: "'DM Sans',sans-serif", outline: 'none',
    transition: 'all 0.2s',
    appearance: 'none', WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts in Your Inbox Every Morning</title>
        <meta name="description" content="Wake up to 3 AI-written LinkedIn posts every morning. Based on today's news. Pick one, post it. Zero effort." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ThePostBot — 3 LinkedIn Posts in Your Inbox Every Morning" />
        <meta property="og:description" content="AI-generated LinkedIn posts delivered daily. Pick one, post it. Done." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05080F; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        ::selection { background: #0A66C2; color: #fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #05080F; }
        ::-webkit-scrollbar-thumb { background: #0A66C2; border-radius: 2px; }

        @keyframes floatBubble {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(-16px) rotate(calc(var(--rot) + 1deg)); }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes revealFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(10,102,194,0.3); }
          50% { box-shadow: 0 0 40px rgba(10,102,194,0.6); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .reveal-1 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .reveal-2 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
        .reveal-3 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .reveal-4 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
        .reveal-5 { animation: revealFade 1s ease 0.7s both; }

        .notif-bubble {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 14px;
          padding: 11px 15px;
          width: 230px;
          pointer-events: none;
          animation: floatBubble var(--dur) ease-in-out var(--delay) infinite;
          z-index: 0;
        }
        .notif-icon { font-size: 20px; flex-shrink: 0; }
        .notif-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85); line-height: 1.3; }
        .notif-sub { font-size: 10.5px; color: rgba(255,255,255,0.4); margin-top: 2px; }

        .center-veil {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 55% 70% at 50% 45%, rgba(5,8,15,0.82) 30%, rgba(5,8,15,0.3) 80%, transparent 100%);
          pointer-events: none;
          z-index: 1;
        }

        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0A66C2; color: #fff;
          border: none; border-radius: 14px;
          padding: 16px 36px;
          font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1.05rem;
          cursor: pointer; text-decoration: none;
          transition: all 0.25s;
          box-shadow: 0 4px 24px rgba(10,102,194,0.4);
          animation: glowPulse 3s ease-in-out infinite;
        }
        .btn-primary:hover { background: #004182; transform: translateY(-3px); box-shadow: 0 8px 36px rgba(10,102,194,0.55); }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 28px;
          transition: all 0.3s;
        }
        .feature-card:hover {
          background: rgba(10,102,194,0.07);
          border-color: rgba(10,102,194,0.35);
          transform: translateY(-5px);
        }

        .step-num {
          width: 44px; height: 44px; border-radius: 50%;
          background: linear-gradient(135deg, #0A66C2, #004182);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 900; font-size: 16px;
          flex-shrink: 0; box-shadow: 0 4px 16px rgba(10,102,194,0.4);
        }

        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #22c55e;
          display: inline-block; margin-right: 7px;
          animation: blink 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
        }

        .founding-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(10,102,194,0.12);
          border: 1px solid rgba(10,102,194,0.3);
          color: #60a5fa; padding: 7px 18px; border-radius: 100px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .section-label {
          display: inline-block;
          background: rgba(10,102,194,0.1);
          border: 1px solid rgba(10,102,194,0.2);
          color: #60a5fa; padding: 5px 16px; border-radius: 100px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 16px;
        }

        .price-card-main {
          background: linear-gradient(145deg, rgba(10,102,194,0.12), rgba(0,65,130,0.06));
          border: 1.5px solid rgba(10,102,194,0.5);
          border-radius: 22px; padding: 38px; position: relative; overflow: hidden;
        }
        .price-card-main::before {
          content: '';
          position: absolute; top: -40px; right: -40px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(10,102,194,0.15), transparent 70%);
        }

        /* Email preview mock */
        .email-mock {
          background: #111820;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px; overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05);
        }
        .email-mock-bar {
          background: #0d1117;
          padding: 12px 16px;
          display: flex; align-items: center; gap: 8px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mock-dot { width: 11px; height: 11px; border-radius: 50%; }
        .mock-subject {
          margin-left: auto;
          font-size: 11px; color: rgba(255,255,255,0.3);
        }
        .email-mock-body { padding: 20px; }
        .mock-post-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 14px 16px; margin-bottom: 10px;
        }
        .mock-post-label {
          display: inline-block;
          padding: 3px 10px; border-radius: 100px;
          font-size: 9px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; margin-bottom: 9px;
        }
        .mock-post-text {
          font-size: 11.5px; color: rgba(255,255,255,0.75);
          line-height: 1.55; margin-bottom: 10px;
        }
        .mock-post-img {
          width: 100%; height: 70px; border-radius: 8px;
          background: linear-gradient(135deg, #1a2535, #0d1117);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; color: rgba(255,255,255,0.2);
        }
        .mock-btn {
          display: block; text-align: center; margin-top: 8px;
          background: #0A66C2; color: #fff; border-radius: 8px;
          padding: 8px; font-size: 11px; font-weight: 700;
        }

        select option { background: #0d1117; color: #fff; }

        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .price-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: clamp(2.4rem, 10vw, 3.6rem) !important; }
        }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* FULL-PAGE BUBBLE LAYER */}
      {mounted && (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {bubbles.map((b, i) => (
            <div
              key={i}
              className={`notif-bubble hide-mobile`}
              style={{
                left: b.x > 50 ? `${b.x}%` : `${b.x}%`,
                top: `${b.y}%`,
                opacity: 0.38 + Math.random() * 0.15,
                '--dur': `${b.dur}s`,
                '--delay': `${b.delay}s`,
                '--rot': `${b.rot}deg`,
                transform: `rotate(${b.rot}deg)`,
              }}
            >
              <span className="notif-icon">{b.icon}</span>
              <div>
                <div className="notif-text">{b.text}</div>
                <div className="notif-sub">{b.sub}</div>
              </div>
            </div>
          ))}
          {/* Veil keeps center readable */}
          <div className="center-veil" />
          {/* Edge darkening */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,8,15,0.7) 0%, transparent 20%, transparent 80%, rgba(5,8,15,0.7) 100%)', pointerEvents: 'none' }} />
        </div>
      )}

      {/* GLOBAL BACKGROUND GLOW */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(10,102,194,0.06) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── NAV ── */}
        <nav style={{
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.1rem 2rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)',
          background: 'rgba(5,8,15,0.88)',
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span className="hide-mobile" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: '#0A66C2', fontWeight: 700 }}>20 spots</span> · $9/mo founding price
            </span>
            <a href="#signup" className="btn-primary" style={{ padding: '0.6rem 1.3rem', fontSize: '0.875rem', animation: 'none', boxShadow: '0 2px 12px rgba(10,102,194,0.35)' }}>
              Start Free →
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: '96vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: '820px', position: 'relative', zIndex: 2 }}>

            <div className="reveal-1" style={{ marginBottom: '1.5rem' }}>
              <span className="founding-badge">
                <span className="live-dot" />
                Founding Member · $9/mo forever · Only 20 spots
              </span>
            </div>

            <h1 className="reveal-2 hero-title" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}>
              Your <span style={{ color: '#0A66C2' }}>LinkedIn posts</span><br />
              wake up before you do.
            </h1>

            <p className="reveal-3" style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.75,
              maxWidth: '540px',
              margin: '0 auto 2.5rem',
            }}>
              Every morning, 3 AI-written posts land in your inbox — based on today's trending news, written in your tone, for your niche.
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}> Pick one. Post it. Done.</strong>
            </p>

            <div className="reveal-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3rem' }}>
              <a href="#signup" className="btn-primary">
                Start My 7-Day Free Trial →
              </a>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>✓ No credit card needed</span>
            </div>

            {/* Social proof row */}
            <div className="reveal-5" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem,4vw,3.5rem)', flexWrap: 'wrap' }}>
              {[
                { v: '3', l: 'posts every morning' },
                { v: '7', l: 'day free trial' },
                { v: '$0', l: 'effort required' },
                { v: '$9', l: 'per month founding price' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '2rem', color: '#0A66C2', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS DIVIDER ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.35)', padding: '1.5rem 2rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '3rem', animation: 'none', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['📰 News-based content','🌍 Country-specific','🎯 Your exact tone','🖼️ Images included','🔄 Fresh every morning','📬 Straight to inbox','⚡ Zero effort','🔒 Your voice only'].map((t, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── EMAIL PREVIEW ── */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">What you receive</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', maxWidth: '600px', margin: '0 auto' }}>
              This lands in your inbox<br />every morning at 7am.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }} className="grid-4" data-cols="3">
            {[
              {
                label: 'POST 1', color: '#0A66C2', border: 'rgba(10,102,194,0.4)',
                bg: 'rgba(10,102,194,0.08)',
                text: 'Most companies say they\'re using AI for HR. They\'re lying to themselves. The gap between companies performing AI theatre vs those actually rebuilding how talent works is enormous...',
                tag: '🔥 Hot Take',
              },
              {
                label: 'POST 2', color: '#a78bfa', border: 'rgba(167,139,250,0.4)',
                bg: 'rgba(167,139,250,0.06)',
                text: '3 things I noticed after 6 months of tracking LinkedIn analytics that nobody talks about: the algorithm rewards consistency more than virality, comments outperform likes 8:1...',
                tag: '📊 Data Insight',
              },
              {
                label: 'POST 3', color: '#34d399', border: 'rgba(52,211,153,0.4)',
                bg: 'rgba(52,211,153,0.06)',
                text: 'The biggest lie in startup culture isn\'t "move fast and break things." It\'s the idea that funding equals progress. I\'ve seen bootstrapped companies outperform VC-backed ones consistently...',
                tag: '💡 Contrarian',
              },
            ].map((p, i) => (
              <div key={i} className="email-mock">
                <div className="email-mock-bar">
                  <div className="mock-dot" style={{ background: '#ff5f57' }} />
                  <div className="mock-dot" style={{ background: '#febc2e' }} />
                  <div className="mock-dot" style={{ background: '#28c840' }} />
                  <span className="mock-subject">ThePostBot.me · 7:00 AM</span>
                </div>
                <div className="email-mock-body">
                  <div className="mock-post-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="mock-post-label" style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}>{p.label}</span>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{p.tag}</span>
                    </div>
                    <div className="mock-post-text">{p.text}</div>
                    <div className="mock-post-img">📷 Matching image included</div>
                    <div className="mock-btn">📤 Post to LinkedIn</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '1.5rem' }}>
            ↑ Real example of what you receive. 3 different formats, 3 different angles, every single day.
          </p>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-label">How it works</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                30 seconds to set up.<br />Posts every morning forever.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                { n: '1', t: 'Tell us about yourself', d: 'Select your niche, tone, country, and an optional topic or keyword. Takes 30 seconds. Never do it again.' },
                { n: '2', t: 'AI works every night', d: 'Every night our AI scans trending news in your country and niche, then writes 3 unique posts — each in a completely different format and style.' },
                { n: '3', t: '3 posts land in your inbox at 7am', d: 'Wake up to ready-to-post content. Hot take, data insight, personal story — all different. All relevant to today.' },
                { n: '4', t: 'Pick one. Post it. Done.', d: 'Copy your favourite, click the LinkedIn button, paste and post. Takes 10 seconds. Your audience thinks you work all night.' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '20px 24px', transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(10,102,194,0.3)'; e.currentTarget.style.background = 'rgba(10,102,194,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}>
                  <div className="step-num">{s.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: '5px' }}>{s.t}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ── */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">Why ThePostBot</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Every other tool makes<br />you do the work.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0' }}>
              They're writing assistants. You still log in, think of ideas, generate, edit, schedule.
              ThePostBot works for you — not with you.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { e: '📰', t: "Today's news, every day", d: "Posts are based on what's actually trending in your country and industry right now. Never recycled, never generic." },
              { e: '🎯', t: 'Your voice, your tone', d: 'Bold? Inspirational? Data-driven? The AI writes in your chosen style every time — not a template.' },
              { e: '🖼️', t: 'Images always included', d: 'Every post comes with a relevant image. No stock photo hunting, no Canva, no extra work.' },
              { e: '🌍', t: 'Country-specific content', d: 'UAE user gets UAE news. Pakistan user gets Pakistan business news. Locally relevant, globally professional.' },
              { e: '💸', t: 'A fraction of the cost', d: 'Taplio charges $65/month. MagicPost $39/month. Your founding price: $9/month locked forever.' },
              { e: '📲', t: 'Zero apps to open', d: 'Everything arrives in your email inbox — the one place you already check every morning anyway.' },
            ].map((f, i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{f.e}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.95rem', fontWeight: 700, marginBottom: '7px' }}>{f.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON ── */}
        <section style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="section-label">The difference</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Before vs After ThePostBot
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-2">
              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#f87171', fontWeight: 700, fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>❌ Before</p>
                {['Staring at blank page every morning','No idea what to write about','Writing takes 30-60 minutes','Post feels generic and AI-ish','Sometimes skip posting entirely','LinkedIn presence: inconsistent'].map((t, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '10px', paddingLeft: '4px' }}>{t}</p>
                ))}
              </div>
              <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✅ After</p>
                {['3 posts ready before you wake up','Based on today\'s real trending news','Takes 10 seconds to post','Different format, angle, style daily','Post every single day consistently','LinkedIn presence: unstoppable'].map((t, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px', paddingLeft: '4px' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem', textAlign: 'center' }}>
          <div className="section-label">Pricing</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            One price. No surprises.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3.5rem' }}>Lock in $9/month forever before all 20 founding spots are gone.</p>
          <div className="price-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
            <div className="price-card-main">
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#0A66C2', color: '#fff', padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>20 spots only</div>
              <p style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Founding Member</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.8rem', fontWeight: 900, lineHeight: 1 }}>$9</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: '2rem' }}>Price locked forever — never increases for you</p>
              {['3 unique AI posts daily','News-based, country-specific content','Different format every day','Matching images included','7-day free trial','Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ color: '#0A66C2', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <a href="#signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', width: '100%', justifyContent: 'center' }}>
                Start Free Trial
              </a>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '22px', padding: '38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Regular Price</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.18)', lineHeight: 1 }}>$15</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginBottom: '2rem' }}>Available after founding spots are taken</p>
              {['3 unique AI posts daily','News-based, country-specific content','Different format every day','Matching images included','7-day free trial','Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.2)' }}>
                  <span>✓</span> {f}
                </div>
              ))}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px', marginTop: '2rem' }}>Coming soon</div>
            </div>
          </div>
        </section>

        {/* ── SIGNUP ── */}
        <section id="signup" style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="section-label">Get Started</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem,5vw,2.8rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
                Your first posts arrive<br />tomorrow morning.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>7 days free. No credit card. Cancel anytime.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '22px', padding: 'clamp(1.5rem,5vw,2.5rem)' }}>
              <div style={{ display: 'grid', gap: '1rem' }}>

                {[
                  { k: 'name', l: 'Full Name', t: 'text', p: 'Your name' },
                  { k: 'email', l: 'Email Address', t: 'email', p: 'you@company.com' },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} value={form[f.k]} required
                      onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      onFocus={() => setFocusedField(f.k)} onBlur={() => setFocusedField(null)}
                      style={inp(f.k)} />
                  </div>
                ))}

                {/* Country */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Country</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.country} required onChange={e => setForm({ ...form, country: e.target.value })}
                      onFocus={() => setFocusedField('country')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('country'), cursor: 'pointer', color: form.country ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                      <option value="" disabled>Select your country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Niche */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Niche / Industry</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.niche} required onChange={e => setForm({ ...form, niche: e.target.value })}
                      onFocus={() => setFocusedField('niche')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('niche'), cursor: 'pointer', color: form.niche ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                      <option value="" disabled>Select your industry</option>
                      {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Tone */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Writing Tone</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.tone} required onChange={e => setForm({ ...form, tone: e.target.value })}
                      onFocus={() => setFocusedField('tone')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('tone'), cursor: 'pointer', color: form.tone ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                      <option value="" disabled>Select your tone</option>
                      {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Optional Keyword */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Topic / Keyword <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>— optional</span>
                  </label>
                  <input type="text" placeholder="e.g. AI, Tesla, Dubai real estate, remote work..."
                    value={form.keyword}
                    onChange={e => setForm({ ...form, keyword: e.target.value })}
                    onFocus={() => setFocusedField('keyword')} onBlur={() => setFocusedField(null)}
                    style={inp('keyword')} />
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginTop: '5px' }}>Leave empty — we use today's trending news automatically</p>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#fca5a5', padding: '12px 16px', borderRadius: '10px', fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading} style={{
                  marginTop: '6px',
                  background: loading ? 'rgba(255,255,255,0.07)' : '#0A66C2',
                  color: loading ? 'rgba(255,255,255,0.3)' : '#fff',
                  border: 'none', borderRadius: '12px', padding: '1.05rem',
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%', transition: 'all 0.25s',
                  boxShadow: loading ? 'none' : '0 4px 24px rgba(10,102,194,0.35)',
                }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#004182'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
                  {loading ? 'Setting up your account...' : 'Start My Free 7-Day Trial →'}
                </button>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.22)', fontSize: '12px', marginTop: '6px', lineHeight: 1.8 }}>
                  ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime<br />
                  ✓ First posts arrive tomorrow morning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, color: 'rgba(255,255,255,0.25)', fontSize: '1.15rem' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '13px' }}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px' }}>© 2025 ThePostBot. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
