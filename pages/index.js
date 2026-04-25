import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

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
  { q: 'What happens after the 3-day free trial?', a: 'Your posts pause automatically. You receive an email with a link to subscribe at $15/month (founding price). No credit card is taken during trial — ever.' },
  { q: 'How do I post to LinkedIn?', a: 'You receive 3 posts in your email inbox each morning. Click the "Post to LinkedIn" button on any post and it pre-fills the text for you. One click, done.' },
  { q: 'Can I change my niche or tone after signing up?', a: 'Yes. Reply to any email with your updated niche or tone and we will update your profile within 24 hours.' },
  { q: 'What if I do not like a post?', a: 'Simply ignore it. You get 3 every morning — pick the one that resonates. If none of the 3 work consistently, email us and we will tune your profile.' },
  { q: 'Is the $15/month price locked forever?', a: 'Yes. Founding members lock in $15/month for the lifetime of their subscription. The regular price after founding spots are gone is $29/month.' },
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', country: '', niche: '', tone: '', keyword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState({});
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true })); }),
      { threshold: 0.1 }
    );
    Object.values(refs.current).forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const r = id => el => { refs.current[id] = el; if (el) el.dataset.id = id; };
  const fade = id => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? 'translateY(0)' : 'translateY(24px)',
    transition: 'opacity 0.6s ease, transform 0.6s ease',
  });

  const submit = async e => {
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
      if (data.success) router.push('/thank-you');
      else setError(data.error || 'Something went wrong. Please try again.');
    } catch { setError('Connection error. Please try again.'); }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>ThePostBot — 3 LinkedIn Posts in Your Inbox Every Morning</title>
        <meta name="description" content="AI-written LinkedIn posts delivered to your inbox every morning. Based on today's news, your niche, your tone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          background: #0A0F1A;
          color: #E8F0F8;
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
        }
        ::selection { background: rgba(99,102,241,0.35); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 2px; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes glow { 0%,100%{ box-shadow:0 0 20px rgba(99,102,241,0.3); } 50%{ box-shadow:0 0 40px rgba(99,102,241,0.55); } }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        @keyframes shimmer { 0%{background-position:-400% center;} 100%{background-position:400% center;} }

        .a1{animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.05s both;}
        .a2{animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s both;}
        .a3{animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s both;}
        .a4{animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s both;}
        .a5{animation:fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both;}
        .float{animation:float 4s ease-in-out infinite;}

        /* Lovable-style gradient card */
        .card-gradient {
          background: linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 20px;
        }

        .pill {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          color: #a5b4fc;
          padding: 5px 14px; border-radius: 100px;
          font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
          margin-bottom: 16px;
        }
        .dot { width:6px; height:6px; border-radius:50%; background:#22c55e; box-shadow:0 0 8px rgba(34,197,94,0.7); animation:pulse 2s infinite; }

        .h1 { font-size: clamp(2.4rem, 5vw, 3.8rem); font-weight: 800; line-height: 1.08; letter-spacing: -0.025em; }
        .h2 { font-size: clamp(1.7rem, 3.2vw, 2.5rem); font-weight: 700; line-height: 1.12; letter-spacing: -0.02em; }
        .h3 { font-size: 1.05rem; font-weight: 600; line-height: 1.3; }

        /* Gradient text */
        .text-gradient {
          background: linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        /* Gradient shimmer for CTA text */
        .text-shimmer {
          background: linear-gradient(90deg, #818cf8, #c4b5fd, #818cf8);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          color: #fff; border: none; border-radius: 12px;
          padding: 13px 28px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700; font-size: 0.95rem; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
          animation: glow 3s ease-in-out infinite;
        }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.55); animation: none; }

        .btn-ghost {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.12); border-radius: 12px;
          padding: 12px 24px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 500; font-size: 0.9rem; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .btn-ghost:hover { border-color: rgba(255,255,255,0.28); color: #fff; background: rgba(255,255,255,0.04); }

        .feature-card {
          background: rgba(255,255,255,0.03);
          border-right: 1px solid rgba(255,255,255,0.07);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          padding: 28px;
          transition: background 0.25s;
        }
        .feature-card:hover { background: rgba(99,102,241,0.06); }

        .step-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 20px 22px;
          display: flex; gap: 16px; align-items: flex-start;
          transition: all 0.25s; cursor: default;
        }
        .step-card:hover { border-color: rgba(99,102,241,0.3); background: rgba(99,102,241,0.04); }
        .step-num {
          width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #6366f1, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 13px;
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
        }

        .price-main {
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(79,70,229,0.05));
          border: 1.5px solid rgba(99,102,241,0.4);
          border-radius: 22px; padding: 32px; position: relative; overflow: hidden;
        }
        .price-main::before {
          content:''; position:absolute; top:-50px; right:-50px;
          width:160px; height:160px;
          background: radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%);
          pointer-events: none;
        }
        .price-reg {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px; padding: 32px;
        }

        .faq-item { border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; margin-bottom: 8px; overflow: hidden; transition: border-color 0.2s; }
        .faq-item.open { border-color: rgba(99,102,241,0.4); }
        .faq-q { display: flex; justify-content: space-between; align-items: center; padding: 17px 20px; cursor: pointer; font-weight: 500; font-size: 0.9rem; gap: 12px; line-height: 1.5; }
        .faq-a { padding: 0 20px 17px; font-size: 0.875rem; color: rgba(255,255,255,0.48); line-height: 1.75; }
        .faq-icon { width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid rgba(255,255,255,0.18); display: flex; align-items: center; justify-content: center; font-size: 13px; transition: all 0.2s; flex-shrink: 0; }
        .faq-item.open .faq-icon { background: #6366f1; border-color: #6366f1; }

        /* Form inputs - Lovable style */
        .form-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 11px 13px;
          color: #E8F0F8; font-size: 0.9rem; font-family: 'Plus Jakarta Sans', sans-serif;
          outline: none; transition: all 0.2s; appearance: none; -webkit-appearance: none;
        }
        .form-input:focus { border-color: #6366f1; background: rgba(99,102,241,0.07); box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
        .form-label { display: block; color: rgba(255,255,255,0.38); font-size: 10px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.1em; }

        /* Email mock - Lovable inspired */
        .mock-wrap { background: linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; }
        .mock-bar { background: rgba(255,255,255,0.03); padding: 10px 16px; display: flex; align-items: center; gap: 7px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .mock-dot { width: 9px; height: 9px; border-radius: 50%; }
        .mock-from { margin-left: auto; font-size: 10px; color: rgba(255,255,255,0.28); }
        .mock-body { padding: 14px; display: flex; gap: 10px; }
        .mock-post { flex: 1; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 12px; }
        .mock-tag { display: inline-block; padding: 3px 9px; border-radius: 100px; font-size: 8px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px; }
        .mock-text { font-size: 10px; color: rgba(255,255,255,0.6); line-height: 1.55; margin-bottom: 8px; }
        .mock-img { width: 100%; height: 44px; border-radius: 7px; background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.12); display: flex; align-items: center; justify-content: center; font-size: 9px; color: rgba(255,255,255,0.2); margin-bottom: 7px; }
        .mock-cta { display: block; text-align: center; background: linear-gradient(135deg,#6366f1,#4f46e5); color: #fff; border-radius: 6px; padding: 6px; font-size: 9px; font-weight: 700; }

        .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }
        .container-sm { max-width: 740px; margin: 0 auto; padding: 0 24px; }
        .container-xs { max-width: 580px; margin: 0 auto; padding: 0 24px; }
        .section { padding: 80px 0; }
        .section-alt { padding: 80px 0; background: rgba(255,255,255,0.015); border-top: 1px solid rgba(255,255,255,0.045); border-bottom: 1px solid rgba(255,255,255,0.045); }

        select option { background: #111827; color: #E8F0F8; }

        @media(max-width: 768px) {
          .hide-mob { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-price { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .mock-body { flex-direction: column !important; }
        }
        @media(max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* Ambient background glow */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: '900px', height: '600px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 65%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.04) 0%, transparent 65%)', borderRadius: '50%' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* NAV */}
        <nav style={{ position: 'sticky', top: 0, zIndex: 100, height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(10,15,26,0.85)' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em', color: '#E8F0F8' }}>
              The<span className="text-gradient">Post</span>Bot
            </div>
          </a>
          <nav className="hide-mob" style={{ display: 'flex', gap: '28px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>
            {[['#how','How it works'],['#why','Why us'],['#pricing','Pricing']].map(([h,l]) => (
              <a key={h} href={h} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e=>e.target.style.color='#E8F0F8'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.45)'}>{l}</a>
            ))}
          </nav>
          <a href="#signup" className="btn" style={{ padding: '8px 18px', fontSize: '0.85rem', animation: 'none', boxShadow: '0 2px 12px rgba(99,102,241,0.3)' }}>
            Get started
          </a>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '64px 24px 52px', position: 'relative', overflow: 'hidden' }}>
          {/* Grid background */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
          {/* Glow orb */}
          <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

          <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
            <div className="a1" style={{ marginBottom: '20px' }}>
              <span className="pill"><span className="dot" />Founding Member &nbsp;·&nbsp; $15/mo forever &nbsp;·&nbsp; Only 20 spots</span>
            </div>

            <h1 className="h1 a2" style={{ maxWidth: '800px', margin: '0 auto 20px' }}>
              Your LinkedIn posts{' '}
              <span className="text-gradient">wake up</span>{' '}
              before you do
            </h1>

            <p className="a3" style={{ fontSize: 'clamp(0.95rem,2vw,1.08rem)', color: 'rgba(255,255,255,0.48)', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 34px', fontWeight: 400 }}>
              Every morning, 3 AI-written posts land in your inbox — based on today's news, in your tone, for your niche.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>Pick one. Paste. Done.</strong>
            </p>

            <div className="a4" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
              <a href="#signup" className="btn">Start My Free Trial →</a>
              <a href="#how" className="btn-ghost">See how it works</a>
            </div>

            <p className="a4" style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.25)', marginBottom: '52px' }}>
              No credit card required &nbsp;·&nbsp; Cancel anytime
            </p>

            {/* Mock email preview — Lovable style floating card */}
            <div className="a5 float" style={{ maxWidth: '840px', margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(167,139,250,0.1), transparent)', borderRadius: '22px', filter: 'blur(18px)', opacity: 0.6 }} />
              <div className="mock-wrap" style={{ position: 'relative', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
                <div className="mock-bar">
                  <div className="mock-dot" style={{ background: '#ff5f57' }} />
                  <div className="mock-dot" style={{ background: '#febc2e' }} />
                  <div className="mock-dot" style={{ background: '#28c840' }} />
                  <span className="mock-from">ThePostBot · 7:00 AM · Your 3 posts for today ✨</span>
                </div>
                <div className="mock-body">
                  {[
                    { tag:'Post 1 · Provoke', tc:'#818cf8', bg:'rgba(99,102,241,0.1)', bc:'rgba(99,102,241,0.3)', text:'Most SaaS roadmaps are fantasy novels. You plan 18 months out when your customers changed needs 3 times last quarter. The Gulf market moves faster than your product council meets...' },
                    { tag:'Post 2 · Inspire', tc:'#a78bfa', bg:'rgba(167,139,250,0.08)', bc:'rgba(167,139,250,0.25)', text:"Gen Z's AI skepticism is a signal the whole industry should decode. Across UAE tech teams, younger engineers ask harder questions than executives. McKinsey: 63% struggle past the pilot stage..." },
                    { tag:'Post 3 · Connect', tc:'#34d399', bg:'rgba(52,211,153,0.07)', bc:'rgba(52,211,153,0.25)', text:'2:47 AM. Production down. Phone buzzing. Again. Every SaaS professional in the Gulf has been there. Nobody talks about this part in the LinkedIn success stories. But this is the part that builds you...' },
                  ].map((p, i) => (
                    <div key={i} className="mock-post">
                      <div className="mock-tag" style={{ background: p.bg, border: `1px solid ${p.bc}`, color: p.tc }}>{p.tag}</div>
                      <div className="mock-text">{p.text}</div>
                      <div className="mock-img">📸 AI image generated</div>
                      <div className="mock-cta">📤 Post to LinkedIn</div>
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginTop: '12px' }}>↑ Real example of what arrives in your inbox every morning</p>
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.25)', padding: '20px 24px' }}>
          <div className="container">
            <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', textAlign: 'center' }}>
              {[['3','posts every morning'],['3 days','free trial — no card'],['$15','founding price/month'],['0','effort required']].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontWeight: 800, fontSize: '1.6rem', color: '#818cf8', lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.32)', marginTop: '4px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <section id="how" className="section">
          <div className="container" ref={r('how')}>
            <div style={{ textAlign: 'center', marginBottom: '44px', ...fade('how') }}>
              <div className="pill">How it works</div>
              <h2 className="h2">Set up once.<br />Posts arrive every morning.</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '700px', margin: '0 auto' }}>
              {[
                { n:'1', t:'Tell us about yourself', d:'Select your niche, tone, and country. Add an optional keyword. 30 seconds. You never do it again.' },
                { n:'2', t:'AI writes while you sleep', d:'Every night our AI scans trending news in your industry and country, then writes 3 posts in your tone and style.' },
                { n:'3', t:'3 posts land in your inbox', d:'Wake up to 3 ready-to-post LinkedIn posts — a hot take, a data insight, and a personal story. All different, all relevant to today.' },
                { n:'4', t:'Copy. Paste. Done.', d:'Click the LinkedIn button in the email. Paste it. Post it. Your audience thinks you work all night. Takes 10 seconds.' },
              ].map(s => (
                <div key={s.n} className="step-card">
                  <div className="step-num">{s.n}</div>
                  <div>
                    <div className="h3" style={{ marginBottom: '5px' }}>{s.t}</div>
                    <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.7 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="section-alt">
          <div className="container" ref={r('ba')}>
            <div style={{ textAlign: 'center', marginBottom: '38px', ...fade('ba') }}>
              <div className="pill">The difference</div>
              <h2 className="h2">Before vs After</h2>
            </div>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '700px', margin: '0 auto' }}>
              {[
                { label:'✗ Before', lc:'#f87171', bc:'rgba(239,68,68,0.12)', items:['Staring at a blank page every morning','No idea what to write about today','Writing takes 30–60 minutes per post','Posts feel generic and forgettable','Skip posting some days entirely','LinkedIn presence: inconsistent'] },
                { label:'✓ After', lc:'#4ade80', bc:'rgba(34,197,94,0.1)', items:['3 posts ready before you open your eyes',"Based on today's real trending news",'10 seconds to choose and post','Different format and style daily','Post every single day consistently','LinkedIn presence: unstoppable'] },
              ].map(col => (
                <div key={col.label} style={{ background: col.bc, border: `1px solid ${col.lc}25`, borderRadius: '16px', padding: '24px' }}>
                  <p style={{ color: col.lc, fontWeight: 700, fontSize: '10.5px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{col.label}</p>
                  {col.items.map(t => <p key={t} style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.52)', marginBottom: '11px', lineHeight: 1.5 }}>{t}</p>)}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US — Lovable's grid border style */}
        <section id="why" className="section">
          <div className="container" ref={r('why')}>
            <div style={{ textAlign: 'center', marginBottom: '44px', ...fade('why') }}>
              <div className="pill">Why ThePostBot</div>
              <h2 className="h2">Built for professionals who'd rather{' '}
                <span className="text-gradient">build than write</span>
              </h2>
            </div>
            <div className="feat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', overflow: 'hidden' }}>
              {[
                { e:'📬', t:'Arrives before you wake up', d:'3 posts in your inbox every morning. No app to open, no prompts to write.' },
                { e:'🎯', t:'Sounds like you', d:'Set your tone once — professional, bold, funny — and every post matches it.' },
                { e:'📰', t:"Today's news, daily", d:"Posts based on what's trending in your country and niche right now. Never recycled." },
                { e:'🌍', t:'Country-specific', d:'UAE gets UAE news. Pakistan gets Pakistan business news. Locally relevant.' },
                { e:'🖼️', t:'Images included', d:'Every post comes with a matching AI-generated image. No extra work needed.' },
                { e:'💸', t:'Fraction of the cost', d:'Taplio charges $65/month. Your founding price: $15/month locked forever.' },
              ].map((f, i) => (
                <div key={f.t} className="feature-card" style={{ borderRight: i % 3 === 2 ? 'none' : undefined, borderBottom: i >= 3 ? 'none' : undefined }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{f.e}</div>
                  <div className="h3" style={{ marginBottom: '7px' }}>{f.t}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PULL QUOTE */}
        <div style={{ background: 'rgba(99,102,241,0.06)', borderTop: '1px solid rgba(99,102,241,0.12)', borderBottom: '1px solid rgba(99,102,241,0.12)', padding: '60px 24px', textAlign: 'center' }}>
          <div className="container-sm">
            <p style={{ fontWeight: 800, fontSize: 'clamp(1.4rem,3.2vw,2.2rem)', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.9)' }}>
              "Stop staring at a blank page.<br />
              <span className="text-gradient">Your posts are already written."</span>
            </p>
          </div>
        </div>

        {/* PRICING */}
        <section id="pricing" className="section">
          <div className="container" ref={r('pricing')}>
            <div style={{ textAlign: 'center', marginBottom: '44px', ...fade('pricing') }}>
              <div className="pill">Pricing</div>
              <h2 className="h2">Simple pricing. Serious leverage.</h2>
              <p style={{ marginTop: '10px', color: 'rgba(255,255,255,0.38)', fontSize: '0.9rem' }}>Cancel anytime. No setup fees. Ever.</p>
            </div>
            <div className="grid-price" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '720px', margin: '0 auto' }}>

              <div className="price-main">
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', padding: '3px 10px', borderRadius: '100px', fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', zIndex: 1, display: 'flex', alignItems: 'center', gap: '5px' }}>
                  ✦ Limited spots
                </div>
                <p style={{ color: '#a5b4fc', fontWeight: 600, fontSize: '0.78rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Founding Member</p>
                <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '13px', marginBottom: '16px' }}>For early believers. Locked-in pricing forever.</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '20px' }}>
                  <span style={{ fontWeight: 800, fontSize: '3.2rem', lineHeight: 1 }}>$15</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>/month</span>
                </div>
                <a href="#signup" className="btn" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '22px' }}>
                  Claim founding price
                </a>
                {['3 AI posts in your inbox daily','News-based, niche-specific','Different format every day','Matching images included','Price locked forever','3-day free trial'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '13.5px', color: 'rgba(255,255,255,0.7)', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(99,102,241,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <span style={{ fontSize: '9px', color: '#818cf8' }}>✓</span>
                    </div>{f}
                  </div>
                ))}
              </div>

              <div className="price-reg">
                <p style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 600, fontSize: '0.78rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Regular</p>
                <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '13px', marginBottom: '16px' }}>Standard plan after founding spots fill.</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px', marginBottom: '20px' }}>
                  <span style={{ fontWeight: 800, fontSize: '3.2rem', color: 'rgba(255,255,255,0.2)', lineHeight: 1 }}>$29</span>
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>/month</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '13px', textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '13px', marginBottom: '22px' }}>
                  Available after founding spots fill
                </div>
                {['3 AI posts in your inbox daily','News-based, niche-specific','Different format every day','Matching images included','Standard support','3-day free trial'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: '10px', marginBottom: '10px', fontSize: '13.5px', color: 'rgba(255,255,255,0.22)', alignItems: 'flex-start' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)' }}>✓</span>
                    </div>{f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section-alt">
          <div className="container-sm" ref={r('faq')}>
            <div style={{ textAlign: 'center', marginBottom: '36px', ...fade('faq') }}>
              <div className="pill">FAQ</div>
              <h2 className="h2">Questions answered</h2>
            </div>
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
        </section>

        {/* FINAL CTA */}
        <section className="section">
          <div className="container-sm" style={{ textAlign: 'center' }} ref={r('cta')}>
            <div style={fade('cta')}>
              <div className="pill">Still thinking?</div>
              <h2 className="h2" style={{ marginBottom: '14px' }}>Your first posts arrive<br />tomorrow morning.</h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.9rem', marginBottom: '30px', lineHeight: 1.7 }}>
                3 days free. No credit card. 20 founding spots at $15/month forever.
              </p>
              <a href="#signup" className="btn" style={{ fontSize: '1rem', padding: '14px 34px' }}>
                Start My Free 3-Day Trial →
              </a>
            </div>
          </div>
        </section>

        {/* SIGNUP — Lovable card style */}
        <section id="signup" className="section-alt">
          <div className="container-xs" ref={r('signup')}>
            <div style={{ textAlign: 'center', marginBottom: '30px', ...fade('signup') }}>
              <div className="pill">Start Free Trial</div>
              <h2 className="h2" style={{ marginBottom: '10px' }}>Wake up to a better feed</h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.875rem' }}>
                Tell us about you. Your first posts land tomorrow morning.
              </p>
            </div>

            {/* Lovable's gradient glow card */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-2px', background: 'linear-gradient(135deg, rgba(99,102,241,0.25), rgba(167,139,250,0.1), transparent)', borderRadius: '24px', filter: 'blur(16px)', opacity: 0.6 }} />
              <div className="card-gradient" style={{ position: 'relative', padding: 'clamp(22px,5vw,36px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'grid', gap: '16px' }}>

                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {[['name','Name','text','Jane Doe'],['email','Email','email','jane@company.com']].map(([k,l,t,p]) => (
                      <div key={k}>
                        <label className="form-label">{l}</label>
                        <input type={t} placeholder={p} value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                          onFocus={() => setFocused(k)} onBlur={() => setFocused(null)}
                          className="form-input" style={{ borderColor: focused === k ? '#6366f1' : undefined, background: focused === k ? 'rgba(99,102,241,0.07)' : undefined }} />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="form-label">Country</label>
                    <div style={{ position: 'relative' }}>
                      <select value={form.country} onChange={e => setForm({...form,country:e.target.value})}
                        onFocus={() => setFocused('country')} onBlur={() => setFocused(null)}
                        className="form-input" style={{ cursor: 'pointer', color: form.country ? '#E8F0F8' : 'rgba(255,255,255,0.3)', borderColor: focused === 'country' ? '#6366f1' : undefined }}>
                        <option value="" disabled>Select your country</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none', fontSize: '10px' }}>▾</span>
                    </div>
                  </div>

                  <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    {[['niche','Niche',NICHES,'Pick a niche'],['tone','Tone',TONES,'Pick a tone']].map(([k,l,opts,p]) => (
                      <div key={k}>
                        <label className="form-label">{l}</label>
                        <div style={{ position: 'relative' }}>
                          <select value={form[k]} onChange={e => setForm({...form,[k]:e.target.value})}
                            onFocus={() => setFocused(k)} onBlur={() => setFocused(null)}
                            className="form-input" style={{ cursor: 'pointer', color: form[k] ? '#E8F0F8' : 'rgba(255,255,255,0.3)', borderColor: focused === k ? '#6366f1' : undefined }}>
                            <option value="" disabled>{p}</option>
                            {opts.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none', fontSize: '10px' }}>▾</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="form-label">
                      Keyword <span style={{ color: 'rgba(255,255,255,0.2)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>— optional</span>
                    </label>
                    <input type="text" placeholder="e.g. fintech, productivity, B2B" value={form.keyword}
                      onChange={e => setForm({...form,keyword:e.target.value})}
                      onFocus={() => setFocused('keyword')} onBlur={() => setFocused(null)}
                      className="form-input" style={{ borderColor: focused === 'keyword' ? '#6366f1' : undefined }} />
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', padding: '11px 14px', borderRadius: '10px', fontSize: '13.5px' }}>
                      {error}
                    </div>
                  )}

                  <button onClick={submit} disabled={loading} style={{
                    marginTop: '4px',
                    background: loading ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    color: loading ? 'rgba(255,255,255,0.25)' : '#fff',
                    border: 'none', borderRadius: '10px', padding: '13px',
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                    cursor: loading ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.2s',
                    boxShadow: loading ? 'none' : '0 4px 20px rgba(99,102,241,0.35)',
                  }}
                    onMouseEnter={e => { if (!loading) { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
                    onMouseLeave={e => { if (!loading) { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}}>
                    {loading ? 'Setting up your account…' : 'Claim my founding spot →'}
                  </button>

                  <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.22)', fontSize: '11.5px', lineHeight: 1.8 }}>
                    We'll never spam you. &nbsp;·&nbsp; No credit card required. &nbsp;·&nbsp; Cancel anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.045)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontWeight: 800, color: 'rgba(255,255,255,0.25)', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
            The<span className="text-gradient">Post</span>Bot
          </div>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: '12px' }}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{ color: '#818cf8', textDecoration: 'none' }}>hello@thepostbot.me</a>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px' }}>© 2026 ThePostBot. Built for operators.</p>
        </footer>

      </div>
    </>
  );
}
