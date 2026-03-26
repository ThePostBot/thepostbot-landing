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

const BUBBLES = [
  { icon: '🔔', text: 'Your post reached 14,200 impressions', sub: '2 min ago' },
  { icon: '👍', text: '1,247 reactions on your post', sub: 'Trending now' },
  { icon: '👀', text: '380 people viewed your profile', sub: 'Up 420% this week' },
  { icon: '💬', text: '94 comments — people love this!', sub: '5 min ago' },
  { icon: '🔁', text: '128 reposts in the last hour', sub: 'Going viral' },
  { icon: '⭐', text: 'New followers from your post', sub: 'Audience growing' },
  { icon: '🚀', text: 'Top Content this week', sub: '22K+ impressions' },
  { icon: '❤️', text: '3,100 reactions this week', sub: 'Best week ever' },
  { icon: '🎯', text: 'Your post is trending in Finance', sub: 'Top 5% of creators' },
  { icon: '📈', text: 'Profile views up 540% today', sub: 'Keep posting!' },
  { icon: '🏆', text: 'You earned Top Voice badge', sub: 'LinkedIn notified you' },
  { icon: '✨', text: '47 new connection requests', sub: 'From your last post' },
  { icon: '💡', text: 'Your insight was reshared', sub: 'By 3 industry leaders' },
  { icon: '📣', text: '12 people saved your post', sub: 'Just now' },
  { icon: '🌍', text: 'Your post reached 6 countries', sub: 'Global reach' },
  { icon: '🔥', text: 'On fire — 200 reactions/hour', sub: 'Top post today' },
  { icon: '💼', text: 'Recruiter viewed your profile', sub: '3 min ago' },
  { icon: '🎉', text: '500 likes milestone reached!', sub: 'Keep it up' },
  { icon: '📊', text: 'Engagement rate: 8.4%', sub: '4x industry average' },
  { icon: '🤝', text: 'CEO liked your post', sub: 'From Fortune 500 co.' },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', niche: '', tone: '', country: '', keyword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    setMounted(true);
    const pos = BUBBLES.map(() => ({
      left: Math.random() * 92,
      top: Math.random() * 900,
      duration: 5 + Math.random() * 6,
      delay: Math.random() * 4,
      scale: 0.75 + Math.random() * 0.35,
    }));
    setPositions(pos);
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
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focusedField === field ? '#0A66C2' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px', padding: '0.875rem 1rem', color: '#fff',
    fontSize: '0.95rem', fontFamily: 'DM Sans,sans-serif', outline: 'none',
    transition: 'all 0.2s', boxShadow: focusedField === field ? '0 0 0 3px rgba(10,102,194,0.12)' : 'none',
    appearance: 'none', WebkitAppearance: 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts Delivered to Your Inbox Every Morning</title>
        <meta name="description" content="AI-generated LinkedIn posts delivered daily. Pick one, post it. Done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:#060A12;color:#fff;font-family:DM Sans,sans-serif;overflow-x:hidden;}
        ::selection{background:#0A66C2;color:#fff;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#060A12;}
        ::-webkit-scrollbar-thumb{background:#1a2535;border-radius:2px;}
        @keyframes floatUp{0%{transform:translateY(0px) rotate(var(--r));}50%{transform:translateY(-20px) rotate(calc(var(--r) + 1deg));}100%{transform:translateY(0px) rotate(var(--r));}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        .bubble{position:absolute;background:rgba(255,255,255,0.035);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:10px 13px;display:flex;align-items:flex-start;gap:9px;width:210px;animation:floatUp var(--dur) ease-in-out infinite var(--delay);pointer-events:none;z-index:0;}
        .bi{font-size:18px;line-height:1;margin-top:1px;flex-shrink:0;}
        .bt{font-size:11px;font-weight:600;color:rgba(255,255,255,0.7);line-height:1.35;}
        .bs{font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px;}
        .fu1{animation:fadeIn 0.7s ease both;}
        .fu2{animation:fadeIn 0.7s 0.15s ease both;opacity:0;}
        .fu3{animation:fadeIn 0.7s 0.3s ease both;opacity:0;}
        .fu4{animation:fadeIn 0.7s 0.45s ease both;opacity:0;}
        .fu5{animation:fadeIn 0.7s 0.6s ease both;opacity:0;}
        .btn{background:#0A66C2;color:#fff;border:none;border-radius:10px;padding:14px 32px;font-family:DM Sans,sans-serif;font-weight:600;font-size:1rem;cursor:pointer;transition:all 0.2s;display:inline-flex;align-items:center;gap:8px;text-decoration:none;box-shadow:0 4px 24px rgba(10,102,194,0.3);}
        .btn:hover{background:#004182;transform:translateY(-2px);box-shadow:0 8px 30px rgba(10,102,194,0.4);}
        .card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:26px;transition:all 0.25s;}
        .card:hover{background:rgba(10,102,194,0.07);border-color:rgba(10,102,194,0.3);transform:translateY(-4px);}
        .chip{display:inline-block;background:rgba(10,102,194,0.1);border:1px solid rgba(10,102,194,0.2);color:#5B9BD5;padding:5px 14px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:14px;}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
        .dot{width:7px;height:7px;border-radius:50%;background:#0A66C2;display:inline-block;animation:pulse 2s infinite;margin-right:6px;}
        select option{background:#0d1117;color:#fff;}
        @media(max-width:768px){.hide-mob{display:none!important;}.grid2{grid-template-columns:1fr!important;}.grid4{grid-template-columns:1fr 1fr!important;}.pgrid{grid-template-columns:1fr!important;}.nav-spot{display:none!important;}}
        @media(max-width:480px){.grid4{grid-template-columns:1fr!important;}}
      `}</style>

      {/* Full page floating bubbles */}
      {mounted && (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {BUBBLES.map((b, i) => {
            const pos = positions[i];
            if (!pos) return null;
            const rot = (Math.random() * 4 - 2).toFixed(1);
            return (
              <div key={i} className="bubble hide-mob" style={{
                left: `${pos.left}%`, top: `${pos.top}%`,
                opacity: 0.22 + Math.random() * 0.1,
                '--dur': `${pos.duration}s`, '--delay': `${pos.delay}s`, '--r': `${rot}deg`,
                transform: `scale(${pos.scale}) rotate(${rot}deg)`,
              }}>
                <span className="bi">{b.icon}</span>
                <div><div className="bt">{b.text}</div><div className="bs">{b.sub}</div></div>
              </div>
            );
          })}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(6,10,18,0.5) 0%, rgba(6,10,18,0.88) 100%)' }} />
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* NAV */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', background: 'rgba(6,10,18,0.88)', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-0.01em' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <span className="nav-spot" style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem' }}>
              <span style={{ color: '#0A66C2', fontWeight: 600 }}>20 spots</span> left at $9/mo
            </span>
            <a href="#signup" className="btn" style={{ padding: '0.55rem 1.2rem', fontSize: '0.875rem' }}>Start Free Trial</a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '94vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px' }}>
            <div className="fu1" style={{ marginBottom: '1.75rem' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.22)', color: '#5B9BD5', padding: '6px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <span className="dot" />Founding Member · $9/mo forever · Only 20 spots left
              </span>
            </div>
            <div className="fu2">
              <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, lineHeight: 1.06, letterSpacing: '-0.025em', marginBottom: '1.75rem' }}>
                <span style={{ display: 'block', fontSize: 'clamp(1.3rem,3vw,1.8rem)', color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginBottom: '0.3rem' }}>Stop staring at a blank LinkedIn box.</span>
                <span style={{ display: 'block', fontSize: 'clamp(2.8rem,7vw,5rem)', color: '#fff' }}>Get <span style={{ color: '#0A66C2' }}>3 posts</span> delivered<br />to your inbox.</span>
                <span style={{ display: 'block', fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: '0.4rem' }}>Every single morning. Automatically.</span>
              </h1>
            </div>
            <p className="fu3" style={{ fontSize: 'clamp(1rem,2.5vw,1.15rem)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
              AI-written, news-based, image-included — in your tone, for your niche, relevant to your country.
              Pick one, post it. <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Zero effort. Real results.</strong>
            </p>
            <div className="fu4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}>
              <a href="#signup" className="btn" style={{ fontSize: '1.05rem', padding: '15px 36px' }}>Start My Free 7-Day Trial →</a>
              <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.875rem' }}>✓ No credit card needed</span>
            </div>
            <div className="fu5" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {[{ icon: '👍', val: '2,300+', label: 'reactions/week avg' }, { icon: '👀', val: '12,400', label: 'impressions per post' }, { icon: '🔁', val: '94', label: 'reposts per post avg' }].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{s.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#0A66C2', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', justifyContent: 'center', gap: 'clamp(2.5rem,6vw,7rem)', flexWrap: 'wrap', background: 'rgba(0,0,0,0.3)' }}>
          {[{ v: '3', l: 'posts every morning' }, { v: '7', l: 'days free trial' }, { v: '$9', l: 'per month founding price' }, { v: '0', l: 'effort required' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne,sans-serif', fontSize: '2.6rem', fontWeight: 800, color: '#0A66C2', lineHeight: 1 }}>{s.v}</div>
              <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.78rem', marginTop: '5px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* HOW IT WORKS */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="chip">How it works</div>
            <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>Set it once. Get posts forever.</h2>
          </div>
          <div className="grid4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.25rem' }}>
            {[
              { n: '01', e: '⚡', t: 'Tell us your niche & tone', d: '30-second setup. Your industry, your voice, your country. Never repeat it.' },
              { n: '02', e: '🤖', t: 'AI works while you sleep', d: "Every night we scan today's trending news in your country and niche and write 3 unique posts." },
              { n: '03', e: '📬', t: '3 posts hit your inbox', d: 'Wake up to ready-to-post content. Different formats, different angles, every single day.' },
              { n: '04', e: '🚀', t: 'Pick one. Post. Done.', d: 'Copy, paste to LinkedIn. 10 seconds. Your audience is amazed.' },
            ].map((s, i) => (
              <div key={i} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '1.6rem' }}>{s.e}</span>
                  <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '11px', fontWeight: 800, color: '#0A66C2', opacity: 0.4, letterSpacing: '0.1em' }}>{s.n}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{s.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.84rem', lineHeight: 1.65 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="chip">Why ThePostBot</div>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>Every other tool makes you do the work.</h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', marginTop: '1rem', maxWidth: '460px', margin: '1rem auto 0', lineHeight: 1.7 }}>They're writing assistants. You still log in, think of ideas, generate, edit, schedule. ThePostBot works for you — not with you.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1rem' }}>
              {[
                { e: '📰', t: "Based on today's news", d: "Every post is inspired by what's actually trending in your country and industry right now." },
                { e: '🎯', t: 'Your tone, your voice', d: 'Inspirational? Data-driven? Provocative? Written in your exact style every single time.' },
                { e: '🖼️', t: 'Images included', d: 'Every post comes with a professionally sourced matching image. No hunting required.' },
                { e: '🌍', t: 'Country-specific content', d: 'Posts are tailored to your country and region — not generic global content.' },
                { e: '💸', t: 'Fraction of the cost', d: 'Competitors charge $60–$200/month. Your founding price: $9/month. Forever.' },
                { e: '📲', t: 'No app to open', d: 'Straight to your email inbox — the one thing you already check every morning.' },
              ].map((f, i) => (
                <div key={i} className="card">
                  <div style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{f.e}</div>
                  <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: '0.93rem', fontWeight: 700, marginBottom: '6px' }}>{f.t}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.84rem', lineHeight: 1.65 }}>{f.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(5rem,10vw,8rem) 2rem', textAlign: 'center' }}>
          <div className="chip">Pricing</div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Simple, honest pricing.</h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', marginBottom: '3.5rem' }}>Lock in the founding price before it's gone.</p>
          <div className="pgrid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
            <div style={{ background: 'linear-gradient(145deg,rgba(10,102,194,0.1),rgba(0,65,130,0.05))', border: '1.5px solid rgba(10,102,194,0.45)', borderRadius: '20px', padding: '36px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: '#0A66C2', color: '#fff', padding: '3px 12px', borderRadius: '100px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>20 spots only</div>
              <p style={{ color: '#5B9BD5', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Founding Member</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '3.5rem', fontWeight: 800 }}>$9</span>
                <span style={{ color: 'rgba(255,255,255,0.38)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.82rem', marginBottom: '1.75rem' }}>Locked forever — price never increases</p>
              {['3 unique AI posts daily', 'Country-specific news', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.72)' }}>
                  <span style={{ color: '#0A66C2' }}>✓</span> {f}
                </div>
              ))}
              <a href="#signup" className="btn" style={{ display: 'block', textAlign: 'center', marginTop: '1.75rem', width: '100%' }}>Start Free Trial</a>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px', padding: '36px' }}>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>Regular Price</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                <span style={{ fontFamily: 'Syne,sans-serif', fontSize: '3.5rem', fontWeight: 800, color: 'rgba(255,255,255,0.18)' }}>$15</span>
                <span style={{ color: 'rgba(255,255,255,0.18)' }}>/month</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem', marginBottom: '1.75rem' }}>For everyone after founding spots are gone</p>
              {['3 unique AI posts daily', 'Country-specific news', 'Images included', '7-day free trial', 'Cancel anytime'].map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.2)' }}>
                  <span>✓</span> {f}
                </div>
              ))}
              <div style={{ display: 'block', marginTop: '1.75rem', background: 'rgba(255,255,255,0.03)', textAlign: 'center', padding: '14px', borderRadius: '10px', color: 'rgba(255,255,255,0.18)', fontSize: '0.875rem' }}>Coming soon</div>
            </div>
          </div>
        </section>

        {/* SIGNUP */}
        <section id="signup" style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: 'clamp(5rem,10vw,8rem) 2rem' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="chip">Start Free Trial</div>
              <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(1.9rem,5vw,2.75rem)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>Your first posts arrive<br />tomorrow morning.</h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.95rem' }}>7 days free. No credit card. Cancel anytime.</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: 'clamp(1.5rem,5vw,2.5rem)' }}>
              <div style={{ display: 'grid', gap: '1rem' }}>

                {/* Name */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                  <input type="text" placeholder="Your name" value={form.name} required
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                    style={inp('name')} />
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={form.email} required
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                    style={inp('email')} />
                </div>

                {/* Country */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Country</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.country} required
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      onFocus={() => setFocusedField('country')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('country'), cursor: 'pointer', color: form.country ? '#fff' : 'rgba(255,255,255,0.28)' }}>
                      <option value="" disabled>Select your country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Niche */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Niche / Industry</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.niche} required
                      onChange={e => setForm({ ...form, niche: e.target.value })}
                      onFocus={() => setFocusedField('niche')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('niche'), cursor: 'pointer', color: form.niche ? '#fff' : 'rgba(255,255,255,0.28)' }}>
                      <option value="" disabled>Select your industry</option>
                      {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Tone */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Writing Tone</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.tone} required
                      onChange={e => setForm({ ...form, tone: e.target.value })}
                      onFocus={() => setFocusedField('tone')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('tone'), cursor: 'pointer', color: form.tone ? '#fff' : 'rgba(255,255,255,0.28)' }}>
                      <option value="" disabled>Select your tone</option>
                      {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.28)', pointerEvents: 'none' }}>▾</span>
                  </div>
                </div>

                {/* Optional Keyword */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.32)', fontSize: '11px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Specific Topic or Keyword <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                  </label>
                  <input type="text" placeholder="e.g. AI in healthcare, Tesla, remote work, Dubai real estate"
                    value={form.keyword}
                    onChange={e => setForm({ ...form, keyword: e.target.value })}
                    onFocus={() => setFocusedField('keyword')} onBlur={() => setFocusedField(null)}
                    style={inp('keyword')} />
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px', marginTop: '5px' }}>Leave empty to use today's trending news automatically</p>
                </div>

                {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.22)', color: '#FCA5A5', padding: '12px 16px', borderRadius: '10px', fontSize: '0.875rem' }}>{error}</div>}

                <button onClick={handleSubmit} disabled={loading}
                  style={{ marginTop: '6px', background: loading ? 'rgba(255,255,255,0.07)' : '#0A66C2', color: loading ? 'rgba(255,255,255,0.3)' : '#fff', border: 'none', borderRadius: '10px', padding: '1rem', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 20px rgba(10,102,194,0.28)' }}
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
          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, color: 'rgba(255,255,255,0.22)', fontSize: '1.1rem' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '0.82rem' }}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.16)', fontSize: '0.78rem' }}>© 2025 ThePostBot. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
