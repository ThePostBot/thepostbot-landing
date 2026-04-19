import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

// ─── DATA ────────────────────────────────────────────────────────────────────

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

const FAQS = [
  {
    q: 'What happens after the 3-day free trial?',
    a: 'Your posts pause automatically. You receive an email with a link to subscribe at $15/month (founding price). No credit card is taken during trial — ever.',
  },
  {
    q: 'How do I post to LinkedIn?',
    a: 'You receive 3 posts in your email inbox each morning. Click the "Post to LinkedIn" button on any post and it pre-fills the text for you. One click, done.',
  },
  {
    q: 'Can I change my niche or tone after signing up?',
    a: 'Yes. Reply to any email with your updated niche or tone and we will update your profile within 24 hours. A self-serve settings page is coming soon.',
  },
  {
    q: 'What if I do not like a post?',
    a: 'Simply ignore it. You get 3 every morning — pick the one that resonates. If none of the 3 work for you consistently, email us and we will tune your profile.',
  },
  {
    q: 'Is the $15/month price locked forever?',
    a: 'Yes. Founding members lock in $15/month for the lifetime of their subscription. The regular price after founding spots are gone is $29/month.',
  },
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', country: '', niche: '', tone: '', keyword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  // Intersection observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (name) => (el) => {
    sectionRefs.current[name] = el;
    if (el) el.dataset.section = name;
  };

  const reveal = (name) =>
    `transition-all duration-700 ${visible[name] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.country || !form.niche || !form.tone) {
      setError('Please fill in all required fields.');
      return;
    }
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

  const inp = (field) => ({
    width: '100%',
    background: focusedField === field ? 'rgba(10,102,194,0.08)' : 'rgba(255,255,255,0.04)',
    border: `1.5px solid ${focusedField === field ? '#0A66C2' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: '10px',
    padding: '0.8rem 1rem',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: "'DM Sans', sans-serif",
    outline: 'none',
    transition: 'all 0.2s',
    appearance: 'none',
    WebkitAppearance: 'none',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(10,102,194,0.1)' : 'none',
  });

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts in Your Inbox Every Morning</title>
        <meta name="description" content="AI-written LinkedIn posts delivered to your inbox every morning. Based on today's news, your niche, your tone. Pick one, post it. Done." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="ThePostBot — Your LinkedIn posts wake up before you do" />
        <meta property="og:description" content="3 AI-written posts in your inbox every morning. Based on today's news. Pick one, post it." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #06090F; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        ::selection { background: #0A66C2; color: #fff; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #06090F; }
        ::-webkit-scrollbar-thumb { background: #0A66C2; border-radius: 2px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 24px rgba(10,102,194,0.35); }
          50%       { box-shadow: 0 0 40px rgba(10,102,194,0.6); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; } 50% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }

        .a1 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .a2 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
        .a3 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.31s both; }
        .a4 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.44s both; }
        .a5 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.57s both; }
        .float { animation: float 4s ease-in-out infinite; }

        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #0A66C2; color: #fff; border: none; border-radius: 10px;
          padding: 13px 28px; font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.95rem; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
          animation: glow 3s ease-in-out infinite;
        }
        .btn:hover { background: #004182; transform: translateY(-2px); animation: none; box-shadow: 0 8px 32px rgba(10,102,194,0.5); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; color: rgba(255,255,255,0.6);
          border: 1.5px solid rgba(255,255,255,0.12); border-radius: 10px;
          padding: 12px 24px; font-family: 'DM Sans', sans-serif;
          font-weight: 500; font-size: 0.9rem; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.3); color: #fff; background: rgba(255,255,255,0.05); }

        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
          transition: all 0.3s;
        }
        .card:hover { background: rgba(10,102,194,0.06); border-color: rgba(10,102,194,0.3); transform: translateY(-4px); }

        .lbl {
          display: inline-block;
          background: rgba(10,102,194,0.1);
          border: 1px solid rgba(10,102,194,0.22);
          color: #60a5fa; padding: 4px 14px; border-radius: 100px;
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; margin-bottom: 14px;
        }

        .live { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; display: inline-block; margin-right: 6px; animation: blink 2s infinite; box-shadow: 0 0 6px rgba(34,197,94,0.6); }

        .section { padding: 72px 0; }
        .section-alt { padding: 72px 0; background: rgba(0,0,0,0.25); border-top: 1px solid rgba(255,255,255,0.05); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }
        .container-sm { max-width: 720px; margin: 0 auto; padding: 0 24px; }
        .container-xs { max-width: 560px; margin: 0 auto; padding: 0 24px; }

        .h1 { font-family: 'Syne', sans-serif; font-weight: 900; font-size: clamp(2.6rem, 6vw, 4.2rem); line-height: 1.05; letter-spacing: -0.03em; }
        .h2 { font-family: 'Syne', sans-serif; font-weight: 800; font-size: clamp(1.8rem, 4vw, 2.6rem); line-height: 1.1; letter-spacing: -0.025em; }
        .h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.05rem; }
        .blue { color: #0A66C2; }
        .muted { color: rgba(255,255,255,0.45); }
        .text-center { text-align: center; }

        /* Email mock */
        .email-mock { background: #0d1520; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04); }
        .mock-bar { background: #080e18; padding: 10px 14px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mock-dot { width: 9px; height: 9px; border-radius: 50%; }
        .mock-from { margin-left: auto; font-size: 10px; color: rgba(255,255,255,0.3); font-family: 'DM Sans', sans-serif; }
        .mock-body { padding: 16px; display: flex; flex-direction: column; gap: 10px; }
        .mock-post { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 12px; }
        .mock-post-tag { display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 7px; }
        .mock-post-text { font-size: 10.5px; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: 8px; }
        .mock-post-img { width: 100%; height: 52px; border-radius: 6px; background: linear-gradient(135deg, #162030, #0a1220); display: flex; align-items: center; justify-content: center; font-size: 9px; color: rgba(255,255,255,0.2); margin-bottom: 7px; }
        .mock-post-cta { display: block; text-align: center; background: #0A66C2; color: #fff; border-radius: 6px; padding: 6px; font-size: 9.5px; font-weight: 700; font-family: 'DM Sans', sans-serif; }

        /* Before/After */
        .ba-col { border-radius: 14px; padding: 22px; }

        /* FAQ */
        .faq-item { border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; margin-bottom: 8px; overflow: hidden; transition: border-color 0.2s; }
        .faq-item.open { border-color: rgba(10,102,194,0.35); }
        .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 16px 18px; cursor: pointer; font-weight: 600; font-size: 0.9rem; gap: 12px; }
        .faq-a { padding: 0 18px 16px; font-size: 0.875rem; color: rgba(255,255,255,0.55); line-height: 1.7; }
        .faq-icon { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all 0.2s; }
        .faq-item.open .faq-icon { background: #0A66C2; border-color: #0A66C2; }

        /* Pricing */
        .price-main { background: linear-gradient(145deg, rgba(10,102,194,0.12), rgba(0,65,130,0.06)); border: 1.5px solid rgba(10,102,194,0.45); border-radius: 20px; padding: 32px; position: relative; overflow: hidden; }
        .price-main::before { content:''; position:absolute; top:-40px; right:-40px; width:150px; height:150px; background: radial-gradient(circle, rgba(10,102,194,0.18), transparent 70%); }
        .price-regular { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.07); border-radius: 20px; padding: 32px; }

        /* Steps */
        .step-circle { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, #0A66C2, #004182); display: flex; align-items: center; justify-content: center; font-family: 'Syne', sans-serif; font-weight: 900; font-size: 15px; flex-shrink: 0; box-shadow: 0 4px 14px rgba(10,102,194,0.4); }
        .step-row { display: flex; gap: 16px; align-items: flex-start; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 20px; transition: all 0.2s; cursor: default; }
        .step-row:hover { border-color: rgba(10,102,194,0.3); background: rgba(10,102,194,0.05); }

        select option { background: #0d1117; color: #fff; }

        @media (max-width: 768px) {
          .hide-mob { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-price { grid-template-columns: 1fr !important; }
          .mock-body { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .grid-stats { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ── BACKGROUND GLOW ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(10,102,194,0.06) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── NAV ── */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', height: '60px', borderBottom: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(24px)', background: 'rgba(6,9,15,0.9)' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <nav className="hide-mob" style={{ display: 'flex', gap: '28px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)' }}>
            {[['#how', 'How it works'], ['#why', 'Why us'], ['#pricing', 'Pricing'], ['#signup', 'Signup']].map(([href, label]) => (
              <a key={href} href={href} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.5)'}>
                {label}
              </a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="hide-mob" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
              <span style={{ color: '#0A66C2', fontWeight: 700 }}>20 spots</span> · $15/mo founding
            </span>
            <a href="#signup" className="btn" style={{ padding: '8px 18px', fontSize: '0.85rem', animation: 'none', boxShadow: '0 2px 12px rgba(10,102,194,0.3)' }}>
              Start Free →
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '60px 24px 48px', position: 'relative' }}>
          <div className="container" style={{ textAlign: 'center' }}>

            <div className="a1" style={{ marginBottom: '20px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(10,102,194,0.1)', border: '1px solid rgba(10,102,194,0.25)', color: '#60a5fa', padding: '6px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                <span className="live" />Founding Member · $15/mo forever · Only 20 spots
              </span>
            </div>

            <h1 className="h1 a2" style={{ marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
              Your <span className="blue">LinkedIn posts</span><br />wake up before you do
            </h1>

            <p className="a3 muted" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 32px' }}>
              Every morning, 3 AI-written posts land in your inbox — based on today's news, written in your tone, for your niche.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Pick one. Post it. Done.</strong>
            </p>

            <div className="a4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
              <a href="#signup" className="btn">Start My 3-Day Free Trial →</a>
              <a href="#how" className="btn-ghost">See how it works</a>
            </div>

            <p className="a4 muted" style={{ fontSize: '11px', marginBottom: '48px' }}>✓ No credit card · ✓ Cancel anytime · ✓ First posts tomorrow morning</p>

            {/* Email mock — 3 posts */}
            <div className="a5 float" style={{ maxWidth: '820px', margin: '0 auto' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: '-1px', background: 'linear-gradient(135deg, rgba(10,102,194,0.3), rgba(10,102,194,0.05))', borderRadius: '17px', filter: 'blur(20px)', opacity: 0.6 }} />
                <div className="email-mock" style={{ position: 'relative' }}>
                  <div className="mock-bar">
                    <div className="mock-dot" style={{ background: '#ff5f57' }} />
                    <div className="mock-dot" style={{ background: '#febc2e' }} />
                    <div className="mock-dot" style={{ background: '#28c840' }} />
                    <span className="mock-from">ThePostBot · 7:00 AM — Your 3 posts for today 🚀</span>
                  </div>
                  <div className="mock-body" style={{ flexDirection: 'row', gap: '10px' }}>
                    {[
                      { tag: 'POST 1 · PROVOKE', color: '#0A66C2', border: 'rgba(10,102,194,0.35)', bg: 'rgba(10,102,194,0.08)', text: 'Most SaaS roadmaps are fantasy novels. You are planning 18 months out when your customers changed needs 3 times last quarter...' },
                      { tag: 'POST 2 · INSPIRE', color: '#a78bfa', border: 'rgba(167,139,250,0.35)', bg: 'rgba(167,139,250,0.06)', text: 'Gen Z\'s AI skepticism is a signal. Across UAE tech teams, younger engineers ask harder questions than executives. McKinsey: 63% struggle past pilot stage...' },
                      { tag: 'POST 3 · CONNECT', color: '#34d399', border: 'rgba(52,211,153,0.35)', bg: 'rgba(52,211,153,0.06)', text: '2:47 AM. Production down. Phone buzzing. Again. Every SaaS professional in the Gulf has been there. Nobody talks about this part in success stories...' },
                    ].map((p, i) => (
                      <div key={i} className="mock-post" style={{ flex: 1 }}>
                        <div className="mock-post-tag" style={{ background: p.bg, border: `1px solid ${p.border}`, color: p.color }}>{p.tag}</div>
                        <div className="mock-post-text">{p.text}</div>
                        <div className="mock-post-img">📸 Matching image</div>
                        <div className="mock-post-cta">📤 Post to LinkedIn</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' }}>↑ Real example of what arrives every morning. 3 formats. 3 angles. Every day.</p>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)', padding: '20px 24px' }}>
          <div className="container">
            <div className="grid-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
              {[
                { v: '3', l: 'posts every morning' },
                { v: '3 days', l: 'free trial, no card' },
                { v: '$15', l: 'founding price / month' },
                { v: '0', l: 'effort required' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: '1.6rem', color: '#0A66C2', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <section id="how" className="section" ref={ref('how')}>
          <div className="container">
            <div className={`text-center ${reveal('how')}`} style={{ marginBottom: '40px' }}>
              <div className="lbl">How it works</div>
              <h2 className="h2">30 seconds to set up.<br />Posts every morning forever.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '700px', margin: '0 auto' }}>
              {[
                { n: '1', t: 'Tell us about yourself', d: 'Select your niche, tone, country, and an optional keyword. 30 seconds. You never do it again.' },
                { n: '2', t: 'AI works every night', d: 'Every night our AI scans trending news in your country and niche, then writes 3 posts — each in a completely different format and style.' },
                { n: '3', t: '3 posts land in your inbox', d: 'Wake up to 3 ready-to-post LinkedIn posts in your email. Hot take, data insight, personal story — all different, all relevant to today.' },
                { n: '4', t: 'Copy. Paste. Done.', d: 'Click the LinkedIn button in the email, paste, post. 10 seconds. Your audience thinks you work all night.' },
              ].map((s) => (
                <div key={s.n} className="step-row">
                  <div className="step-circle">{s.n}</div>
                  <div>
                    <div className="h3" style={{ marginBottom: '4px' }}>{s.t}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="section-alt" ref={ref('ba')}>
          <div className="container">
            <div className={`text-center ${reveal('ba')}`} style={{ marginBottom: '36px' }}>
              <div className="lbl">The difference</div>
              <h2 className="h2">Before vs After ThePostBot</h2>
            </div>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '700px', margin: '0 auto' }}>
              <div className="ba-col" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.18)' }}>
                <p style={{ color: '#f87171', fontWeight: 700, fontSize: '11px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✗ Before</p>
                {['Staring at a blank page every morning', 'No idea what to write about today', 'Writing takes 30–60 minutes', 'Post feels generic or AI-ish', 'Skip posting some days entirely', 'LinkedIn presence: inconsistent'].map((t) => (
                  <p key={t} style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13.5px', marginBottom: '10px', paddingLeft: '2px' }}>{t}</p>
                ))}
              </div>
              <div className="ba-col" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.18)' }}>
                <p style={{ color: '#4ade80', fontWeight: 700, fontSize: '11px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>✓ After</p>
                {['3 posts ready before you open your eyes', 'Based on today\'s real trending news', 'Takes 10 seconds to choose and post', 'Different format, angle, and style daily', 'Post every single day consistently', 'LinkedIn presence: unstoppable'].map((t) => (
                  <p key={t} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13.5px', marginBottom: '10px', paddingLeft: '2px' }}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY US ── */}
        <section id="why" className="section" ref={ref('why')}>
          <div className="container">
            <div className={`text-center ${reveal('why')}`} style={{ marginBottom: '40px' }}>
              <div className="lbl">Why ThePostBot</div>
              <h2 className="h2">Every other tool makes<br />you do the work.</h2>
              <p className="muted" style={{ marginTop: '12px', maxWidth: '440px', margin: '12px auto 0', fontSize: '0.9rem' }}>
                They're writing assistants. You still log in, think, generate, edit, schedule. ThePostBot works for you — not with you.
              </p>
            </div>
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { e: '📰', t: "Today's news, every day", d: "Posts based on what's trending in your country and industry right now. Never recycled. Never generic." },
                { e: '🎯', t: 'Your voice, your tone', d: 'Bold? Inspirational? Data-driven? Written in your chosen style every time. Not a template.' },
                { e: '🖼️', t: 'Images always included', d: 'Every post comes with a matching image. No stock hunting, no Canva, no extra work.' },
                { e: '🌍', t: 'Country-specific content', d: 'UAE gets UAE news. Pakistan gets Pakistan business news. Locally relevant, globally professional.' },
                { e: '📲', t: 'Delivered to your inbox', d: 'Everything in your email — the one place you already check every morning. No app to download.' },
                { e: '💸', t: 'A fraction of the cost', d: 'Taplio charges $65/month. MagicPost $39/month. Your founding price: $15/month locked forever.' },
              ].map((f) => (
                <div key={f.t} className="card">
                  <div style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{f.e}</div>
                  <div className="h3" style={{ marginBottom: '6px' }}>{f.t}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.65 }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PULL QUOTE ── */}
        <div style={{ background: 'rgba(10,102,194,0.06)', borderTop: '1px solid rgba(10,102,194,0.15)', borderBottom: '1px solid rgba(10,102,194,0.15)', padding: '52px 24px', textAlign: 'center' }}>
          <div className="container-sm">
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.9)' }}>
              "Stop staring at a blank page.<br />
              <span style={{ color: '#0A66C2' }}>Your posts are already written."</span>
            </p>
          </div>
        </div>

        {/* ── PRICING ── */}
        <section id="pricing" className="section" ref={ref('pricing')}>
          <div className="container">
            <div className={`text-center ${reveal('pricing')}`} style={{ marginBottom: '40px' }}>
              <div className="lbl">Pricing</div>
              <h2 className="h2">One price. No surprises.</h2>
              <p className="muted" style={{ marginTop: '10px', fontSize: '0.9rem' }}>Lock in $15/month forever before all 20 founding spots are gone.</p>
            </div>
            <div className="grid-price" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '700px', margin: '0 auto' }}>
              <div className="price-main">
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: '#0A66C2', color: '#fff', padding: '3px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>20 spots only</div>
                <p style={{ color: '#60a5fa', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>Founding Member</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.2rem', fontWeight: 900, lineHeight: 1 }}>$15</span>
                  <span className="muted">/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', marginBottom: '20px' }}>Price locked forever — never increases</p>
                {['3 unique AI posts daily', 'News-based, country-specific', 'Different format every day', 'Matching images included', '3-day free trial', 'Cancel anytime'].map((f) => (
                  <div key={f} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '13.5px', color: 'rgba(255,255,255,0.75)' }}>
                    <span style={{ color: '#0A66C2', fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
                <a href="#signup" className="btn" style={{ display: 'block', textAlign: 'center', marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                  Claim Founding Price
                </a>
              </div>
              <div className="price-regular">
                <p style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '6px' }}>Regular Price</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '4px' }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '3.2rem', fontWeight: 900, color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>$29</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>/month</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', marginBottom: '20px' }}>Available after founding spots are taken</p>
                {['3 unique AI posts daily', 'News-based, country-specific', 'Different format every day', 'Matching images included', '3-day free trial', 'Cancel anytime'].map((f) => (
                  <div key={f} style={{ display: 'flex', gap: '8px', marginBottom: '9px', fontSize: '13.5px', color: 'rgba(255,255,255,0.22)' }}>
                    <span>✓</span> {f}
                  </div>
                ))}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '12px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginTop: '20px' }}>Coming soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section-alt" ref={ref('faq')}>
          <div className="container-sm">
            <div className={`text-center ${reveal('faq')}`} style={{ marginBottom: '32px' }}>
              <div className="lbl">FAQ</div>
              <h2 className="h2">Questions answered</h2>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    <span>{f.q}</span>
                    <div className="faq-icon">{openFaq === i ? '−' : '+'}</div>
                  </div>
                  {openFaq === i && <div className="faq-a">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="section" ref={ref('cta')}>
          <div className="container-sm" style={{ textAlign: 'center' }}>
            <div className={reveal('cta')}>
              <div className="lbl">Still thinking?</div>
              <h2 className="h2" style={{ marginBottom: '14px' }}>Your first posts arrive<br />tomorrow morning.</h2>
              <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '28px' }}>3 days free. No credit card. 20 founding spots at $15/month. After that, $29/month.</p>
              <a href="#signup" className="btn" style={{ fontSize: '1rem', padding: '14px 32px' }}>
                Start My Free 3-Day Trial →
              </a>
            </div>
          </div>
        </section>

        {/* ── SIGNUP ── */}
        <section id="signup" className="section-alt" ref={ref('signup')}>
          <div className="container-xs">
            <div className={`text-center ${reveal('signup')}`} style={{ marginBottom: '28px' }}>
              <div className="lbl">Get Started</div>
              <h2 className="h2" style={{ marginBottom: '8px' }}>Your first posts arrive<br />tomorrow morning.</h2>
              <p className="muted" style={{ fontSize: '0.875rem' }}>3 days free. No credit card. Cancel anytime.</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: 'clamp(20px, 5vw, 36px)' }}>
              <div style={{ display: 'grid', gap: '14px' }}>

                {/* Name + Email row */}
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                    <input type="text" placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      style={inp('name')} />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                    <input type="email" placeholder="you@company.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      style={inp('email')} />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Country</label>
                  <div style={{ position: 'relative' }}>
                    <select value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                      onFocus={() => setFocusedField('country')} onBlur={() => setFocusedField(null)}
                      style={{ ...inp('country'), cursor: 'pointer', color: form.country ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                      <option value="" disabled>Select your country</option>
                      {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', fontSize: '11px' }}>▾</span>
                  </div>
                </div>

                {/* Niche + Tone row */}
                <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Niche</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })}
                        onFocus={() => setFocusedField('niche')} onBlur={() => setFocusedField(null)}
                        style={{ ...inp('niche'), cursor: 'pointer', color: form.niche ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        <option value="" disabled>Select industry</option>
                        {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', fontSize: '11px' }}>▾</span>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Writing Tone</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.tone} onChange={e => setForm({ ...form, tone: e.target.value })}
                        onFocus={() => setFocusedField('tone')} onBlur={() => setFocusedField(null)}
                        style={{ ...inp('tone'), cursor: 'pointer', color: form.tone ? '#fff' : 'rgba(255,255,255,0.3)' }}>
                        <option value="" disabled>Select tone</option>
                        {TONES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none', fontSize: '11px' }}>▾</span>
                    </div>
                  </div>
                </div>

                {/* Keyword */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Topic / Keyword <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— optional</span>
                  </label>
                  <input type="text" placeholder="e.g. AI, Dubai real estate, remote work..."
                    value={form.keyword}
                    onChange={e => setForm({ ...form, keyword: e.target.value })}
                    onFocus={() => setFocusedField('keyword')} onBlur={() => setFocusedField(null)}
                    style={inp('keyword')} />
                  <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10.5px', marginTop: '5px' }}>Leave empty — we use today's trending news automatically</p>
                </div>

                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)', color: '#fca5a5', padding: '11px 14px', borderRadius: '9px', fontSize: '13.5px' }}>
                    {error}
                  </div>
                )}

                <button onClick={handleSubmit} disabled={loading} style={{
                  marginTop: '4px', background: loading ? 'rgba(255,255,255,0.06)' : '#0A66C2',
                  color: loading ? 'rgba(255,255,255,0.3)' : '#fff', border: 'none',
                  borderRadius: '10px', padding: '13px', fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                  width: '100%', transition: 'all 0.2s',
                  boxShadow: loading ? 'none' : '0 4px 20px rgba(10,102,194,0.3)',
                }}
                  onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#004182'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                  onMouseLeave={e => { if (!loading) { e.currentTarget.style.background = '#0A66C2'; e.currentTarget.style.transform = 'translateY(0)'; }}}>
                  {loading ? 'Setting up your account…' : 'Start My Free 3-Day Trial →'}
                </button>

                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '11px', lineHeight: 1.8 }}>
                  ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Posts arrive tomorrow morning
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem' }}>
            The<span style={{ color: '#0A66C2' }}>Post</span>Bot
          </div>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px' }}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#0A66C2', textDecoration: 'none' }}>hello@thepostbot.me</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px' }}>© 2026 ThePostBot. All rights reserved.</p>
        </footer>

      </div>
    </>
  );
}
