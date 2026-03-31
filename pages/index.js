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

// 36 notifications — dense enough to fill entire page background
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
  { icon: '💬', text: '31 people commented today', sub: 'Conversation is growing' },
  { icon: '👏', text: 'Post saved by 22 professionals', sub: 'High-value content' },
  { icon: '🔔', text: '9 people mentioned you', sub: 'You\'re being talked about' },
  { icon: '📣', text: 'Your post was featured', sub: 'In 4 LinkedIn newsletters' },
  { icon: '🤝', text: 'CEO liked your post', sub: 'From a Fortune 500 company' },
  { icon: '💰', text: 'Inbound DM from a prospect', sub: 'Saw your post today' },
  { icon: '🌟', text: 'You\'re a top creator today', sub: 'In Entrepreneurship' },
  { icon: '📱', text: '67% mobile engagement', sub: 'Posts optimised perfectly' },
  { icon: '🎖️', text: 'Weekly goal achieved', sub: '5 posts this week ✓' },
  { icon: '👁️', text: '2,400 post views today', sub: 'Best day this month' },
  { icon: '🔗', text: '18 link clicks from your post', sub: 'High CTR content' },
  { icon: '📩', text: 'New newsletter subscribers', sub: 'From your LinkedIn posts' },
  { icon: '🏅', text: 'Top 1% post this week', sub: 'In your industry' },
  { icon: '💎', text: 'Premium profile badge earned', sub: 'Keep it up!' },
  { icon: '🗣️', text: '156 people saw your comment', sub: 'On a viral post' },
  { icon: '⚡', text: 'Post going viral right now', sub: 'Share rate 3x normal' },
  { icon: '🎊', text: '1,000 followers milestone!', sub: 'Thanks to consistent posting' },
  { icon: '📰', text: 'Journalist viewed your profile', sub: 'After reading your post' },
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
    // Distribute bubbles across the full page height — more density
    const generated = NOTIFICATIONS.map((n, i) => {
      const col = i % 3; // 0=left, 1=center-ish, 2=right
      let xBase;
      if (col === 0) xBase = 1 + Math.random() * 14;       // far left
      else if (col === 2) xBase = 82 + Math.random() * 14; // far right
      else xBase = 20 + Math.random() * 58;                 // spread middle (mostly covered by veil)
      return {
        ...n,
        x: xBase,
        y: (i / NOTIFICATIONS.length) * 95 + (Math.random() * 6 - 3),
        dur: 4 + Math.random() * 8,
        delay: -(Math.random() * 8), // negative delay = already mid-animation on load
        rot: (Math.random() * 8 - 4).toFixed(1),
        floatDist: 12 + Math.random() * 18, // varied float distance
        opacity: 0.42 + Math.random() * 0.22,
      };
    });
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
    fontSize: '0.95rem', fontFamily: "'DM Sans', sans-serif", outline: 'none',
    transition: 'all 0.2s', appearance: 'none', WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts in Your Inbox Every Day</title>
        <meta name="description" content="Wake up to 3 AI-written LinkedIn posts every day. Based on today's news. Pick one, post it. Zero effort." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ThePostBot — 3 LinkedIn Posts in Your Inbox Every Day" />
        <meta property="og:description" content="AI-generated LinkedIn posts delivered daily. Pick one, post it. Done." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Clash+Display:wght@500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&f[]=cabinet-grotesk@400,500,700,800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #05080F; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        ::selection { background: #0A66C2; color: #fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #05080F; }
        ::-webkit-scrollbar-thumb { background: #0A66C2; border-radius: 2px; }

        /* Headline font — Syne 900 for maximum impact */
        .font-hero { font-family: 'Syne', sans-serif; font-weight: 900; }
        /* Section headings */
        .font-heading { font-family: 'Syne', sans-serif; font-weight: 800; }
        /* Body */
        .font-body { font-family: 'DM Sans', sans-serif; }

        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          50% { transform: translateY(calc(-1 * var(--dist))) rotate(calc(var(--rot) + 1.5deg)); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(var(--rot)); }
          33% { transform: translateY(calc(-0.7 * var(--dist))) rotate(calc(var(--rot) - 1deg)); }
          66% { transform: translateY(calc(-0.4 * var(--dist))) rotate(calc(var(--rot) + 2deg)); }
        }
        @keyframes floatC {
          0% { transform: translateY(0) rotate(var(--rot)); }
          25% { transform: translateY(calc(-0.5 * var(--dist))) rotate(calc(var(--rot) + 1deg)); }
          75% { transform: translateY(calc(-0.9 * var(--dist))) rotate(calc(var(--rot) - 0.5deg)); }
          100% { transform: translateY(0) rotate(var(--rot)); }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowBtn {
          0%, 100% { box-shadow: 0 4px 24px rgba(10,102,194,0.4); }
          50% { box-shadow: 0 4px 40px rgba(10,102,194,0.7); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }

        .r1 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .r2 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .r3 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.35s both; }
        .r4 { animation: revealUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both; }
        .r5 { animation: revealUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both; }

        .notif {
          position: absolute;
          display: flex; align-items: center; gap: 10px;
          background: rgba(10,20,40,0.72);
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          border-radius: 14px; padding: 11px 14px; width: 226px;
          pointer-events: none; z-index: 0;
        }
        .notif-icon { font-size: 19px; flex-shrink: 0; }
        .notif-text { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.88); line-height: 1.3; }
        .notif-sub { font-size: 10px; color: rgba(255,255,255,0.42); margin-top: 2px; }

        .veil-center {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(ellipse 52% 65% at 50% 42%, rgba(5,8,15,0.88) 25%, rgba(5,8,15,0.55) 60%, rgba(5,8,15,0.15) 85%, transparent 100%);
        }
        .veil-edges {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: linear-gradient(to right, rgba(5,8,15,0.55) 0%, transparent 18%, transparent 82%, rgba(5,8,15,0.55) 100%);
        }

        .btn-cta {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0A66C2; color: #fff; border: none; border-radius: 14px;
          padding: 16px 36px; font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 1.05rem;
          cursor: pointer; text-decoration: none; transition: all 0.25s;
          animation: glowBtn 3s ease-in-out infinite;
        }
        .btn-cta:hover { background: #004182; transform: translateY(-3px); animation: none; box-shadow: 0 10px 40px rgba(10,102,194,0.6); }

        .card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 26px; transition: all 0.3s;
        }
        .card:hover { background: rgba(10,102,194,0.07); border-color: rgba(10,102,194,0.35); transform: translateY(-5px); }

        .step-row {
          display: flex; gap: 1.25rem; align-items: flex-start;
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 20px 24px; transition: all 0.25s; cursor: default;
        }
        .step-row:hover { border-color: rgba(10,102,194,0.35); background: rgba(10,102,194,0.05); }

        .step-circle {
          width: 44px; height: 44px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #0A66C2, #004182);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-weight: 900; font-size: 16px;
          box-shadow: 0 4px 16px rgba(10,102,194,0.4);
        }

        .lbl {
          display: inline-block; background: rgba(10,102,194,0.1);
          border: 1px solid rgba(10,102,194,0.22); color: #60a5fa;
          padding: 5px 16px; border-radius: 100px; font-size: 11px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 16px;
        }

        .badge-founding {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(10,102,194,0.12); border: 1px solid rgba(10,102,194,0.3);
          color: #60a5fa; padding: 7px 18px; border-radius: 100px;
          font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
        }
        .live { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; display: inline-block; animation: blink 2s infinite; box-shadow: 0 0 8px rgba(34,197,94,0.6); }

        .price-main {
          background: linear-gradient(145deg, rgba(10,102,194,0.12), rgba(0,65,130,0.06));
          border: 1.5px solid rgba(10,102,194,0.5); border-radius: 22px; padding: 38px; position: relative; overflow: hidden;
        }
        .price-main::before { content:''; position:absolute; top:-50px; right:-50px; width:180px; height:180px; background: radial-gradient(circle, rgba(10,102,194,0.14), transparent 70%); }

        .email-mock { background: #0d1520; border: 1px solid rgba(255,255,255,0.1); border-radius: 18px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
        .mock-bar { background: #080e18; padding: 10px 14px; display: flex; align-items: center; gap: 7px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mock-dot { width: 10px; height: 10px; border-radius: 50%; }
        .mock-time { margin-left: auto; font-size: 10px; color: rgba(255,255,255,0.3); }
        .mock-body { padding: 18px; }
        .mock-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px; }
        .mock-lbl { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
        .mock-text { font-size: 11px; color: rgba(255,255,255,0.72); line-height: 1.55; margin-bottom: 10px; }
        .mock-img { width: 100%; height: 64px; border-radius: 8px; background: linear-gradient(135deg, #162030, #0a1220); display: flex; align-items: center; justify-content: center; font-size: 10px; color: rgba(255,255,255,0.2); }
        .mock-postbtn { display: block; text-align: center; margin-top: 8px; background: #0A66C2; color: #fff; border-radius: 8px; padding: 7px; font-size: 10px; font-weight: 700; }

        select option { background: #0d1117; color: #fff; }

        @media (max-width: 900px) { .hide-mob { display: none !important; } }
        @media (max-width: 768px) {
          .g2 { grid-template-columns: 1fr !important; }
          .g3 { grid-template-columns: 1fr !important; }
          .g4 { grid-template-columns: 1fr 1fr !important; }
          .pgrid { grid-template-columns: 1fr !important; }
          .hero-h { font-size: clamp(2.6rem, 10vw, 3.8rem) !important; }
        }
        @media (max-width: 480px) { .g4 { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ─── BUBBLE LAYER ─── */}
      {mounted && (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {bubbles.map((b, i) => {
            const animClass = i % 3 === 0 ? 'floatA' : i % 3 === 1 ? 'floatB' : 'floatC';
            return (
              <div key={i} className="notif hide-mob" style={{
                left: `${b.x}%`, top: `${b.y}%`,
                opacity: b.opacity,
                '--rot': `${b.rot}deg`,
                '--dist': `${b.floatDist}px`,
                animation: `${animClass} ${b.dur}s ease-in-out ${b.delay}s infinite`,
              }}>
                <span className="notif-icon">{b.icon}</span>
                <div>
                  <div className="notif-text">{b.text}</div>
                  <div className="notif-sub">{b.sub}</div>
                </div>
              </div>
            );
          })}
          <div className="veil-center" />
          <div className="veil-edges" />
        </div>
      )}

      {/* ─── GLOBAL GLOW ─── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '1000px', height: '700px', background: 'radial-gradient(ellipse, rgba(10,102,194,0.055) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ─── NAV ─── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(28px)', background: 'rgba(5,8,15,0.9)' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <span className="hide-mob" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: '#0A66C2', fontWeight: 700 }}>20 spots</span> · $9/mo founding price
            </span>
            <a href="#signup" className="btn-cta" style={{ padding: '0.6rem 1.3rem', fontSize: '0.875rem', animation: 'none', boxShadow: '0 2px 12px rgba(10,102,194,0.35)' }}>
              Start Free →
            </a>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section style={{ minHeight: '96vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: '860px', position: 'relative', zIndex: 2 }}>

            <div className="r1" style={{ marginBottom: '1.5rem' }}>
              <span className="badge-founding">
                <span className="live" />
                Founding Member · $9/mo forever · Only 20 spots
              </span>
            </div>

            <h1 className="r2 hero-h" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(3.2rem, 8.5vw, 6rem)',
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              marginBottom: '1.5rem',
            }}>
              Your <span style={{ color: '#0A66C2' }}>LinkedIn posts</span><br />
              wake up before you do.
            </h1>

            <p className="r3" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, maxWidth: '560px', margin: '0 auto 2.5rem' }}>
              Every day, 3 AI-written posts land in your inbox — based on today's trending news, written in your tone, for your niche.
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}> Pick one. Post it. Done.</strong>
            </p>

            <div className="r4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3rem' }}>
              <a href="#signup" className="btn-cta">Start My 7-Day Free Trial →</a>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>✓ No credit card needed</span>
            </div>

            <div className="r5" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem,4vw,3.5rem)', flexWrap: 'wrap' }}>
              {[{ v: '3', l: 'posts every day' }, { v: '7', l: 'day free trial' }, { v: '$0', l: 'effort required' }, { v: '$9', l: 'per month founding price' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '2.1rem', color: '#0A66C2', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURES TICKER ─── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.35)', padding: '1.4rem 2rem' }}>
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['📰 News-based content', '🌍 Country-specific', '🎯 Your exact tone', '🖼️ Images included', '🔄 Fresh every day', '📬 Straight to inbox', '⚡ Zero effort', '🔒 Your voice only'].map((t, i) => (
              <span key={i} style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ─── EMAIL PREVIEW ─── */}
        <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="lbl">What you receive</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em', maxWidth: '580px', margin: '0 auto' }}>
              This lands in your inbox<br />every day.
            </h2>
          </div>
          <div className="g3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {[
              { lbl: 'POST 1', color: '#0A66C2', border: 'rgba(10,102,194,0.4)', bg: 'rgba(10,102,194,0.1)', tag: '🔥 Hot Take', text: 'Most companies say they\'re using AI for HR. They\'re lying to themselves. The gap between AI theatre vs actually rebuilding how talent works is enormous...' },
              { lbl: 'POST 2', color: '#a78bfa', border: 'rgba(167,139,250,0.4)', bg: 'rgba(167,139,250,0.08)', tag: '📊 Data Insight', text: '3 things nobody talks about after 6 months tracking LinkedIn analytics: consistency beats virality, comments outperform likes 8:1, short posts win reach...' },
              { lbl: 'POST 3', color: '#34d399', border: 'rgba(52,211,153,0.4)', bg: 'rgba(52,211,153,0.07)', tag: '💡 Contrarian', text: 'The biggest lie in startup culture isn\'t "move fast and break things." It\'s that funding equals progress. Bootstrapped companies consistently outperform VC-backed ones...' },
            ].map((p, i) => (
              <div key={i} className="email-mock">
                <div className="mock-bar">
                  <div className="mock-dot" style={{ background: '#ff5f57' }} />
                  <div className="mock-dot" style={{ background: '#febc2e' }} />
                  <div className="mock-dot" style={{ background: '#28c840' }} />
                  <span className="mock-time">ThePostBot.me</span>
                </div>
                <div className="mock-body">
                  <div className="mock-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span className="mock-lbl" style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}>{p.lbl}</span>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.32)' }}>{p.tag}</span>
                    </div>
                    <div className="mock-text">{p.text}</div>
                    <div className="mock-img">📷 Matching image included</div>
                    <div className="mock-postbtn">📤 Post to LinkedIn</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '1.5rem' }}>
            3 different formats · 3 different angles · every single day
          </p>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="lbl">How it works</div>
              <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em' }}>
                30 seconds to set up.<br />Posts every day forever.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { n: '1', t: 'Tell us about yourself', d: 'Select your niche, tone, country, and an optional topic or keyword. 30 seconds. Never do it again.' },
                { n: '2', t: 'AI works every night', d: 'Every night our AI scans trending news in your country and niche, then writes 3 posts — each in a completely different format and style.' },
                { n: '3', t: '3 posts land in your inbox daily', d: 'Ready-to-post content delivered every day. Hot take, data insight, personal story — all different, all relevant to today.' },
                { n: '4', t: 'Pick one. Post it. Done.', d: 'Copy your favourite, click the LinkedIn button, paste and post. 10 seconds. Your audience is impressed.' },
              ].map((s, i) => (
                <div key={i} className="step-row">
                  <div className="step-circle">{s.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', marginBottom: '5px' }}>{s.t}</h3>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY ─── */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="lbl">Why ThePostBot</div>
            <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em' }}>
              Every other tool makes<br />you do the work.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem', maxWidth: '480px', margin: '1rem auto 0' }}>
              They're writing assistants. You still log in, think of ideas, generate, edit, schedule. ThePostBot works for you — not with you.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              { e: '📰', t: "Today's news, every day", d: "Posts based on what's actually trending in your country and industry right now. Never recycled." },
              { e: '🎯', t: 'Your voice, your tone', d: 'Bold? Inspirational? Data-driven? Written in your chosen style every time — not a template.' },
              { e: '🖼️', t: 'Images always included', d: 'Every post comes with a relevant image. No stock photo hunting, no Canva, no extra work.' },
              { e: '🌍', t: 'Country-specific content', d: 'UAE gets UAE news. Pakistan gets Pakistan business news. Locally relevant, globally professional.' },
              { e: '💸', t: 'A fraction of the cost', d: 'Taplio charges $65/month. MagicPost $39/month. Your founding price: $9/month locked forever.' },
              { e: '📲', t: 'Zero apps to open', d: 'Everything arrives in your email inbox — the one place you already check every day.' },
            ].map((f, i) => (
              <div key={i} className="card">
                <div style={{ fontSize: '1.6rem', marginBottom: '12px' }}>{f.e}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.95rem', marginBottom: '7px' }}>{f.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.65 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BEFORE / AFTER ─── */}
        <section style={{ background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div className="lbl">The difference</div>
              <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em' }}>Before vs After ThePostBot</h2>
            </div>
            <div className="g2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#f87171', fontWeight: 700, fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>❌ Before</p>
                {['Staring at a blank page daily', 'No idea what to write about', 'Writing takes 30–60 minutes', 'Post feels generic or AI-ish', 'Skip posting some days', 'LinkedIn presence: inconsistent'].map((t, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', marginBottom: '10px' }}>{t}</p>
                ))}
              </div>
              <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '16px', padding: '24px' }}>
                <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '12px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✅ After</p>
                {['3 posts ready before you open your eyes', 'Based on today\'s real trending news', 'Takes 10 seconds to post', 'Different format, angle, style daily', 'Post every single day consistently', 'LinkedIn presence: unstoppable'].map((t, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.72)', fontSize: '14px', marginBottom: '10px' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRICING ─── */}
        <section style={{ maxWidth: '740px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem', textAlign: 'center' }}>
          <div className="lbl">Pricing</div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>One price. No surprises.</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '3.5rem' }}>Lock in $9/month forever before all 20 founding spots are gone.</p>
          <div className="pgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
            <div className="price-main">
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#0A66C2', color: '#fff', padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>20 spots only</div>
              <p style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Founding Member</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.8rem', fontWeight: 900, lineHeight: 1 }}>$9</span>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginBottom: '2rem' }}>Price locked forever — never increases for you</p>
              {['3 unique AI posts daily', 'News-based, country-specific content', 'Different format every day', 'Matching images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                  <span style={{ color: '#0A66C2', fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <a href="#signup" className="btn-cta" style={{ display: 'block', textAlign: 'center', marginTop: '2rem', width: '100%', justifyContent: 'center' }}>Start Free Trial</a>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '22px', padding: '38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px' }}>Regular Price</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.18)', lineHeight: 1 }}>$15</span>
                <span style={{ color: 'rgba(255,255,255,0.2)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginBottom: '2rem' }}>Available after founding spots are taken</p>
              {['3 unique AI posts daily', 'News-based, country-specific content', 'Different format every day', 'Matching images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.2)' }}>
                  <span>✓</span> {f}
                </div>
              ))}
              <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '14px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '14px', marginTop: '2rem' }}>Coming soon</div>
            </div>
          </div>
        </section>

        {/* ─── SIGNUP ─── */}
        <section id="signup" style={{ background: 'rgba(0,0,0,0.35)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="lbl">Get Started</div>
              <h2 className="font-heading" style={{ fontSize: 'clamp(2rem,5vw,2.8rem)', letterSpacing: '-0.025em', marginBottom: '0.75rem' }}>
                Your first posts arrive<br />with your next day.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>7 days free. No credit card. Cancel anytime.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '22px', padding: 'clamp(1.5rem,5vw,2.5rem)' }}>
              <div style={{ display: 'grid', gap: '1rem' }}>

                {[{ k: 'name', l: 'Full Name', t: 'text', p: 'Your name' }, { k: 'email', l: 'Email Address', t: 'email', p: 'you@company.com' }].map(f => (
                  <div key={f.k}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.l}</label>
                    <input type={f.t} placeholder={f.p} value={form[f.k]} required
                      onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                      onFocus={() => setFocusedField(f.k)} onBlur={() => setFocusedField(null)}
                      style={inp(f.k)} />
                  </div>
                ))}

                {[
                  { k: 'country', l: 'Your Country', p: 'Select your country', opts: COUNTRIES },
                  { k: 'niche', l: 'Your Niche / Industry', p: 'Select your industry', opts: NICHES },
                  { k: 'tone', l: 'Writing Tone', p: 'Select your tone', opts: TONES },
                ].map(f => (
                  <div key={f.k}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.l}</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form[f.k]} required onChange={e => setForm({ ...form, [f.k]: e.target.value })}
                        onFocus={() => setFocusedField(f.k)} onBlur={() => setFocusedField(null)}
                        style={{ ...inp(f.k), cursor: 'pointer', color: form[f.k] ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        <option value="" disabled>{f.p}</option>
                        {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>▾</span>
                    </div>
                  </div>
                ))}

                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '11px', fontWeight: 700, marginBottom: '7px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Topic / Keyword <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: '11px' }}>— optional</span>
                  </label>
                  <input type="text" placeholder="e.g. AI, Tesla, Dubai real estate, remote work..."
                    value={form.keyword} onChange={e => setForm({ ...form, keyword: e.target.value })}
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
                  marginTop: '6px', background: loading ? 'rgba(255,255,255,0.07)' : '#0A66C2',
                  color: loading ? 'rgba(255,255,255,0.3)' : '#fff', border: 'none',
                  borderRadius: '12px', padding: '1.05rem',
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.25s',
                  boxShadow: loading ? 'none' : '0 4px 24px rgba(10,102,194,0.35)',
                }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#004182'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
                  {loading ? 'Setting up your account...' : 'Start My Free 7-Day Trial →'}
                </button>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.22)', fontSize: '12px', marginTop: '6px', lineHeight: 1.9 }}>
                  ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Posts start with your next day
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, color: 'rgba(255,255,255,0.22)', fontSize: '1.15rem' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '13px' }}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '12px' }}>© 2026 ThePostBot. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
