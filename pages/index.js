import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const COUNTRIES = ['Afghanistan','Albania','Algeria','Andorra','Angola','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Central African Republic','Chad','Chile','China','Colombia','Comoros','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Eswatini','Ethiopia','Fiji','Finland','France','Gabon','Gambia','Georgia','Germany','Ghana','Greece','Grenada','Guatemala','Guinea','Guinea-Bissau','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Mauritania','Mauritius','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Rwanda','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'];
const NICHES = ['Marketing & Advertising','Sales & Business Development','Technology & SaaS','Finance & Investing','Entrepreneurship & Startups','Leadership & Management','Human Resources & Talent','Real Estate','Healthcare & Wellness','E-commerce & Retail','Personal Branding','Productivity & Self-Development','Consulting & Coaching','Legal & Compliance','Supply Chain & Logistics'];
const TONES = ['Professional & Authoritative','Conversational & Friendly','Bold & Provocative','Inspirational & Motivating','Data-Driven & Analytical','Storytelling & Personal','Educational & Informative','Witty & Humorous'];
const FAQS = [
  {q:'What happens after the 3-day free trial?',a:'Your posts pause automatically. You receive an email with a link to subscribe. No credit card is taken during the trial — ever.'},
  {q:'How do I post to LinkedIn?',a:'You receive 3 posts in your email inbox each morning. Copy the post you like most and paste it directly into LinkedIn. That is your entire workflow — no app, no login, no scheduling tool needed.'},
  {q:'Can I change my niche or tone after signing up?',a:'Yes. Reply to any email with your updated niche or tone and we will update your profile within 24 hours.'},
  {q:'What if I do not like a post?',a:'Simply ignore it. You get 3 every morning — pick the one that resonates. If none of the 3 work consistently, email us and we will tune your profile.'},
  {q:'What is the difference between monthly and yearly?',a:'Monthly gives you full flexibility at $19/month. Yearly saves you over 20% — paying $180/year instead of $228. Both plans include identical features.'},
  {q:'Is the founding price locked forever?',a:'Yes. Founding members who join now lock in the founding price for the lifetime of their subscription. After the 20 founding spots are gone the standard price applies.'},
];

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({name:'',email:'',country:'',niche:'',tone:'',keyword:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [visible, setVisible] = useState({});
  const [billing, setBilling] = useState('monthly');
  const refs = useRef({});

  useEffect(() => {
    const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setVisible(v=>({...v,[e.target.dataset.id]:true}));}),{threshold:0.08});
    Object.values(refs.current).forEach(el=>el&&obs.observe(el));
    return ()=>obs.disconnect();
  },[]);

  const r = id=>el=>{refs.current[id]=el;if(el)el.dataset.id=id;};
  const fade = id=>({opacity:visible[id]?1:0,transform:visible[id]?'translateY(0)':'translateY(20px)',transition:'opacity 0.55s ease,transform 0.55s ease'});

  const submit = async e=>{
    e.preventDefault();setError('');
    if(!form.name||!form.email||!form.country||!form.niche||!form.tone){setError('Please fill in all required fields.');return;}
    setLoading(true);
    try{
      const res=await fetch('/api/signup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,billing})});
      const data=await res.json();
      if(data.success)router.push('/thank-you');
      else setError(data.error||'Something went wrong. Please try again.');
    }catch{setError('Connection error. Please try again.');}
    setLoading(false);
  };

  const inp=k=>({width:'100%',background:focused===k?'#fff':'#F9F8F5',border:`1px solid ${focused===k?'#0A66C2':'rgba(0,0,0,0.2)'}`,borderRadius:'4px',padding:'10px 12px',color:'rgba(0,0,0,0.9)',fontSize:'14px',fontFamily:"'Source Sans Pro',sans-serif",outline:'none',transition:'all 0.15s',appearance:'none',WebkitAppearance:'none',boxSizing:'border-box',boxShadow:focused===k?'0 0 0 1px #0A66C2':'none'});

  const mp=19,yp=180,ym=Math.round(yp/12),yd=Math.round((1-yp/(mp*12))*100);

  return(<>
    <Head>
      <title>ThePostBot — 3 LinkedIn Posts in Your Inbox Every Morning</title>
      <meta name="description" content="AI-written LinkedIn posts delivered to your inbox every morning." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
    </Head>
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
      html{scroll-behavior:smooth;}
      body{background:#F3F2EE;color:rgba(0,0,0,0.9);font-family:'Source Sans Pro',sans-serif;overflow-x:hidden;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.5;}
      ::selection{background:rgba(10,102,194,0.2);}
      ::-webkit-scrollbar{width:4px;}
      ::-webkit-scrollbar-thumb{background:#0A66C2;border-radius:2px;}
      @keyframes fadeUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
      @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.35;}}
      @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);}}
      @keyframes liGlow{0%,100%{box-shadow:0 1px 4px rgba(10,102,194,0.25);}50%{box-shadow:0 2px 14px rgba(10,102,194,0.45);}}
      .a1{animation:fadeUp 0.55s ease 0.05s both;}.a2{animation:fadeUp 0.55s ease 0.15s both;}.a3{animation:fadeUp 0.55s ease 0.25s both;}.a4{animation:fadeUp 0.55s ease 0.35s both;}.a5{animation:fadeUp 0.55s ease 0.45s both;}
      .float{animation:float 4s ease-in-out infinite;}
      .li-card{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;box-shadow:0 0 0 1px rgba(0,0,0,0.04);transition:box-shadow 0.2s;}
      .li-btn{display:inline-flex;align-items:center;gap:6px;background:#0A66C2;color:#fff;border:1.5px solid #0A66C2;border-radius:20px;padding:10px 24px;font-family:'Source Sans Pro',sans-serif;font-weight:600;font-size:15px;cursor:pointer;text-decoration:none;transition:all 0.15s;animation:liGlow 3s ease-in-out infinite;}
      .li-btn:hover{background:#004182;border-color:#004182;animation:none;box-shadow:0 4px 14px rgba(10,102,194,0.3);}
      .li-btn-outline{display:inline-flex;align-items:center;gap:6px;background:transparent;color:#0A66C2;border:1.5px solid #0A66C2;border-radius:20px;padding:9px 24px;font-family:'Source Sans Pro',sans-serif;font-weight:600;font-size:15px;cursor:pointer;text-decoration:none;transition:all 0.15s;}
      .li-btn-outline:hover{background:#EBF3FB;}
      .li-label{font-size:12px;font-weight:600;color:rgba(0,0,0,0.5);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;}
      .h1{font-size:clamp(2rem,4.5vw,3.2rem);font-weight:700;line-height:1.12;letter-spacing:-0.015em;}
      .h2{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;line-height:1.15;letter-spacing:-0.01em;}
      .blue{color:#0A66C2;}.text-sec{color:rgba(0,0,0,0.6);}.text-mut{color:rgba(0,0,0,0.42);}
      .container{max-width:1080px;margin:0 auto;padding:0 24px;}
      .container-sm{max-width:720px;margin:0 auto;padding:0 24px;}
      .container-xs{max-width:560px;margin:0 auto;padding:0 24px;}
      .section{padding:64px 0;}.section-alt{padding:64px 0;background:#fff;border-top:1px solid rgba(0,0,0,0.08);border-bottom:1px solid rgba(0,0,0,0.08);}
      .live-dot{width:7px;height:7px;border-radius:50%;background:#057642;box-shadow:0 0 6px rgba(5,118,66,0.6);animation:pulse 2s infinite;display:inline-block;margin-right:5px;}
      .feat-card{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:20px;transition:all 0.2s;}
      .feat-card:hover{box-shadow:0 0 0 1px rgba(10,102,194,0.2),0 4px 12px rgba(0,0,0,0.08);border-color:rgba(10,102,194,0.3);}
      .step-card{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:18px 20px;display:flex;gap:14px;align-items:flex-start;transition:all 0.2s;}
      .step-card:hover{border-color:#0A66C2;box-shadow:0 0 0 1px rgba(10,102,194,0.15);}
      .step-num{width:32px;height:32px;border-radius:50%;flex-shrink:0;background:#0A66C2;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;}
      .price-main{background:#fff;border:2px solid #0A66C2;border-radius:8px;padding:28px;position:relative;box-shadow:0 0 0 4px rgba(10,102,194,0.07);}
      .price-reg{background:#fff;border:1px solid rgba(0,0,0,0.12);border-radius:8px;padding:28px;}
      .faq-item{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;margin-bottom:8px;overflow:hidden;transition:border-color 0.2s;}
      .faq-item.open{border-color:#0A66C2;box-shadow:0 0 0 1px rgba(10,102,194,0.12);}
      .faq-q{display:flex;justify-content:space-between;align-items:center;padding:15px 18px;cursor:pointer;font-weight:600;font-size:14px;gap:12px;}
      .faq-a{padding:0 18px 15px;font-size:14px;color:rgba(0,0,0,0.6);line-height:1.65;}
      .faq-icon{width:20px;height:20px;border-radius:50%;border:1.5px solid rgba(0,0,0,0.28);display:flex;align-items:center;justify-content:center;font-size:12px;transition:all 0.2s;flex-shrink:0;color:rgba(0,0,0,0.45);}
      .faq-item.open .faq-icon{background:#0A66C2;border-color:#0A66C2;color:#fff;}
      .email-mock{background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:8px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.1);}
      .mock-topbar{background:#F3F2EE;padding:10px 14px;display:flex;align-items:center;gap:7px;border-bottom:1px solid rgba(0,0,0,0.08);}
      .mock-dot{width:10px;height:10px;border-radius:50%;}
      .mock-from{margin-left:10px;font-size:12px;color:rgba(0,0,0,0.55);overflow:hidden;white-space:nowrap;text-overflow:ellipsis;flex:1;}
      .mock-body{padding:14px;display:flex;gap:10px;}
      .mock-post{flex:1;background:#F9F8F5;border:1px solid rgba(0,0,0,0.08);border-radius:6px;padding:12px;display:flex;flex-direction:column;}
      .mock-tag{display:inline-block;padding:2px 8px;border-radius:100px;font-size:9px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;margin-bottom:7px;}
      .mock-text{font-size:11px;color:rgba(0,0,0,0.6);line-height:1.5;margin-bottom:8px;flex:1;}
      .mock-img{width:100%;height:44px;border-radius:4px;background:#E8E6E1;display:flex;align-items:center;justify-content:center;font-size:9px;color:rgba(0,0,0,0.32);margin-bottom:8px;}
      .mock-cta{display:block;width:100%;text-align:center;background:#0A66C2;color:#fff;border-radius:14px;padding:7px 10px;font-size:10px;font-weight:700;font-family:'Source Sans Pro',sans-serif;box-sizing:border-box;margin-top:auto;}
      .ba-card{background:#fff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:22px;}
      .li-check{width:18px;height:18px;border-radius:50%;background:#EBF3FB;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
      .billing-toggle{display:inline-flex;background:#F3F2EE;border:1px solid rgba(0,0,0,0.1);border-radius:20px;padding:3px;}
      .billing-opt{padding:6px 18px;border-radius:16px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.15s;border:none;background:transparent;font-family:'Source Sans Pro',sans-serif;color:rgba(0,0,0,0.5);}
      .billing-opt.active{background:#fff;color:#0A66C2;box-shadow:0 1px 4px rgba(0,0,0,0.1);}
      select option{background:#fff;color:rgba(0,0,0,0.9);}
      @media(max-width:768px){
        .hide-mob{display:none!important;}
        .grid-2{grid-template-columns:1fr!important;}
        .feat-grid{grid-template-columns:1fr 1fr!important;}
        .grid-price{grid-template-columns:1fr!important;}
        .mock-body{flex-direction:column!important;}
        .steps-grid{grid-template-columns:1fr!important;}
      }
      @media(max-width:480px){.stats-grid{grid-template-columns:1fr 1fr!important;}}
    `}</style>

    <div style={{background:'#F3F2EE',minHeight:'100vh'}}>

      {/* NAV — Change 1: wordmark only, "Post" in blue */}
      <nav style={{position:'sticky',top:0,zIndex:100,background:'#fff',borderBottom:'1px solid rgba(0,0,0,0.08)',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
        <div style={{maxWidth:'1080px',margin:'0 auto',padding:'0 24px',height:'56px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <a href="/" style={{textDecoration:'none'}}>
            <span style={{fontWeight:700,fontSize:'18px',letterSpacing:'-0.01em',color:'rgba(0,0,0,0.85)'}}>
              The<span style={{color:'#0A66C2'}}>Post</span>Bot
            </span>
          </a>
          <nav className="hide-mob" style={{display:'flex',gap:'4px'}}>
            {[['#how','How it works'],['#why','Why us'],['#pricing','Pricing']].map(([h,l])=>(
              <a key={h} href={h} style={{padding:'8px 14px',borderRadius:'4px',color:'rgba(0,0,0,0.6)',textDecoration:'none',fontSize:'14px',fontWeight:600,transition:'all 0.15s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='#F3F2EE';e.currentTarget.style.color='rgba(0,0,0,0.9)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.color='rgba(0,0,0,0.6)';}}>{l}</a>
            ))}
          </nav>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            {/* Change 1: kept but minimal */}
            <span className="hide-mob" style={{fontSize:'11.5px',color:'rgba(0,0,0,0.42)'}}>
              <span style={{color:'#0A66C2',fontWeight:700}}>20 founding spots</span> · $15/mo
            </span>
            <a href="#signup" className="li-btn" style={{padding:'8px 18px',fontSize:'14px',animation:'none',boxShadow:'none'}}>Start free</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{padding:'64px 24px 52px'}}>
        <div className="container" style={{textAlign:'center'}}>
          <div className="a1" style={{marginBottom:'20px'}}>
            <div style={{display:'inline-flex',alignItems:'center',background:'#fff',border:'1px solid rgba(0,0,0,0.1)',borderRadius:'100px',padding:'6px 16px 6px 10px',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
              <span className="live-dot"/>
              <span style={{fontSize:'13px',fontWeight:600,color:'rgba(0,0,0,0.65)'}}>Founding Member &nbsp;·&nbsp;</span>
              <span style={{fontSize:'13px',fontWeight:700,color:'#0A66C2'}}>&nbsp;$15/mo locked · Only 20 spots</span>
            </div>
          </div>
          <h1 className="h1 a2" style={{maxWidth:'760px',margin:'0 auto 16px',color:'rgba(0,0,0,0.9)'}}>
            Your LinkedIn posts<br/><span className="blue">wake up before you do</span>
          </h1>
          <p className="a3 text-sec" style={{fontSize:'18px',lineHeight:1.65,maxWidth:'520px',margin:'0 auto 32px',fontWeight:400}}>
            Every morning, 3 AI-written posts land in your inbox — based on today's news, in your tone, for your niche.{' '}
            <strong style={{color:'rgba(0,0,0,0.8)',fontWeight:600}}>Pick one. Paste. Done.</strong>
          </p>
          <div className="a4" style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap',marginBottom:'12px'}}>
            <a href="#signup" className="li-btn">Start My Free Trial →</a>
            <a href="#how" className="li-btn-outline">See how it works</a>
          </div>
          <p className="a4 text-mut" style={{fontSize:'13px',marginBottom:'48px'}}>No credit card required · Cancel anytime</p>

          {/* Change 2: improved email mock — bigger header text, aligned CTA button */}
          <div className="a5 float" style={{maxWidth:'820px',margin:'0 auto'}}>
            <div className="email-mock">
              <div className="mock-topbar">
                <div className="mock-dot" style={{background:'#ff5f57'}}/>
                <div className="mock-dot" style={{background:'#febc2e'}}/>
                <div className="mock-dot" style={{background:'#28c840'}}/>
                <span className="mock-from">
                  <strong style={{color:'rgba(0,0,0,0.72)',fontWeight:700}}>ThePostBot</strong>
                  <span style={{color:'rgba(0,0,0,0.4)',fontSize:'11px'}}> &lt;posts@thepostbot.me&gt;</span>
                  <span style={{color:'rgba(0,0,0,0.58)',fontWeight:600}}> · Your 3 posts for today ✨</span>
                </span>
              </div>
              <div className="mock-body">
                {[
                  {tag:'Post 1 · Provoke',tc:'#0A66C2',bg:'#EBF3FB',bc:'rgba(10,102,194,0.2)',text:'Most SaaS roadmaps are fantasy novels. You plan 18 months out when customer needs changed 3 times last quarter. The Gulf market moves faster than your product council meets...'},
                  {tag:'Post 2 · Inspire',tc:'#057642',bg:'#E8F5EE',bc:'rgba(5,118,66,0.2)',text:"Gen Z's AI skepticism is a signal. Across UAE tech teams, younger engineers ask harder questions than executives. McKinsey: 63% of orgs struggle past the pilot stage..."},
                  {tag:'Post 3 · Connect',tc:'#B24020',bg:'#FDF0EB',bc:'rgba(178,64,32,0.2)',text:'2:47 AM. Production down. Phone buzzing. Every SaaS professional in the Gulf has been there. Nobody talks about this in the LinkedIn success stories. But this builds you...'},
                ].map((p,i)=>(
                  <div key={i} className="mock-post">
                    <div className="mock-tag" style={{background:p.bg,border:`1px solid ${p.bc}`,color:p.tc}}>{p.tag}</div>
                    <div className="mock-text">{p.text}</div>
                    <div className="mock-img">📸 AI image generated</div>
                    <div className="mock-cta">📤 Copy &amp; Post to LinkedIn</div>
                  </div>
                ))}
              </div>
            </div>
            <p style={{fontSize:'12px',color:'rgba(0,0,0,0.35)',marginTop:'10px'}}>↑ This arrives in your inbox every morning. 3 formats, 3 angles, every day.</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{background:'#fff',borderTop:'1px solid rgba(0,0,0,0.08)',borderBottom:'1px solid rgba(0,0,0,0.08)',padding:'20px 24px'}}>
        <div className="container">
          <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',textAlign:'center'}}>
            {[['3','posts every morning'],['3 days','free trial — no card'],['$15','founding price / month'],['0','effort from you']].map(([v,l])=>(
              <div key={l}>
                <div style={{fontWeight:700,fontSize:'1.7rem',color:'#0A66C2',lineHeight:1}}>{v}</div>
                <div style={{fontSize:'12px',color:'rgba(0,0,0,0.5)',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS — Change 3: 2x2 grid */}
      <section id="how" className="section">
        <div className="container" ref={r('how')}>
          <div style={{textAlign:'center',marginBottom:'36px',...fade('how')}}>
            <div className="li-label">How it works</div>
            <h2 className="h2">Set up once. Posts arrive every morning.</h2>
          </div>
          <div className="steps-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',maxWidth:'720px',margin:'0 auto'}}>
            {[
              {n:'1',t:'Tell us about yourself',d:'Select your niche, tone, and country. Add an optional keyword. 30 seconds. You never do it again.'},
              {n:'2',t:'AI writes while you sleep',d:'Every night our AI scans trending news in your industry and country, then writes 3 posts in your exact tone.'},
              {n:'3',t:'3 posts land in your inbox',d:'Wake up to 3 ready-to-use LinkedIn posts — a hot take, a data insight, and a personal story. All fresh, all different.'},
              {n:'4',t:'Copy. Paste. Done.',d:'Open your email, pick the post you like, copy it, paste to LinkedIn. Your whole workflow is 10 seconds.'},
            ].map(s=>(
              <div key={s.n} className="step-card">
                <div className="step-num">{s.n}</div>
                <div>
                  <div style={{fontSize:'14px',fontWeight:600,color:'rgba(0,0,0,0.9)',marginBottom:'4px'}}>{s.t}</div>
                  <div className="text-sec" style={{fontSize:'13.5px',lineHeight:1.6}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER */}
      <section className="section-alt">
        <div className="container" ref={r('ba')}>
          <div style={{textAlign:'center',marginBottom:'36px',...fade('ba')}}>
            <div className="li-label">The difference</div>
            <h2 className="h2">Before vs After ThePostBot</h2>
          </div>
          <div className="grid-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',maxWidth:'700px',margin:'0 auto'}}>
            {[
              {label:'✗ Without ThePostBot',lc:'#B24020',items:['Staring at a blank page every morning','No idea what to write about today','Writing takes 30–60 minutes per post','Posts feel generic and forgettable','Skip posting some days entirely','LinkedIn presence: inconsistent']},
              {label:'✓ With ThePostBot',lc:'#057642',items:['3 posts ready before you open your eyes',"Based on today's real trending news",'10 seconds to choose and post','Different format and angle every day','Post every single day consistently','LinkedIn presence: unstoppable']},
            ].map(col=>(
              <div key={col.label} className="ba-card" style={{borderLeft:`3px solid ${col.lc}`}}>
                <p style={{color:col.lc,fontWeight:700,fontSize:'12px',marginBottom:'14px',textTransform:'uppercase',letterSpacing:'0.06em'}}>{col.label}</p>
                {col.items.map(t=>(
                  <div key={t} style={{display:'flex',gap:'8px',marginBottom:'10px',alignItems:'flex-start'}}>
                    <span style={{color:col.lc,fontWeight:700,flexShrink:0,fontSize:'13px'}}>{col.lc==='#057642'?'✓':'✗'}</span>
                    <p style={{fontSize:'14px',color:'rgba(0,0,0,0.65)',lineHeight:1.45}}>{t}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why" className="section">
        <div className="container" ref={r('why')}>
          <div style={{textAlign:'center',marginBottom:'40px',...fade('why')}}>
            <div className="li-label">Why ThePostBot</div>
            <h2 className="h2">Every other tool makes you do the work.</h2>
            <p className="text-sec" style={{marginTop:'10px',maxWidth:'420px',margin:'10px auto 0',fontSize:'15px',lineHeight:1.6}}>They are writing assistants. You still log in, prompt, edit, schedule. ThePostBot just works.</p>
          </div>
          <div className="feat-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'10px'}}>
            {[
              {e:'📬',t:'Arrives before you wake up',d:'3 posts in your inbox every morning. No app to open, no prompts to write.'},
              {e:'🎯',t:'Sounds exactly like you',d:'Set your tone once — professional, bold, witty — and every post matches it.'},
              {e:'📰',t:"Today's news, every day",d:"Posts based on what's trending in your country and niche. Never recycled."},
              {e:'🌍',t:'Country-specific content',d:'UAE gets UAE news. Pakistan gets Pakistan business news. Locally relevant.'},
              {e:'🖼️',t:'Images always included',d:'Every post comes with a matching AI-generated image. No extra steps needed.'},
              {e:'💸',t:'A fraction of the cost',d:'Taplio charges $65/month. Your founding price: $15/month locked forever.'},
            ].map(f=>(
              <div key={f.t} className="feat-card">
                <div style={{fontSize:'1.5rem',marginBottom:'10px'}}>{f.e}</div>
                <div style={{fontSize:'14px',fontWeight:600,color:'rgba(0,0,0,0.9)',marginBottom:'6px'}}>{f.t}</div>
                <div className="text-sec" style={{fontSize:'13px',lineHeight:1.6}}>{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Change 4: Pull quote in one line */}
      <div style={{background:'#EBF3FB',borderTop:'1px solid rgba(10,102,194,0.15)',borderBottom:'1px solid rgba(10,102,194,0.15)',padding:'44px 24px',textAlign:'center'}}>
        <div className="container">
          <p style={{fontWeight:700,fontSize:'clamp(1.1rem,2.4vw,1.7rem)',letterSpacing:'-0.01em',color:'rgba(0,0,0,0.85)'}}>
            "Stop staring at a blank page. <span className="blue">Your posts are already written."</span>
          </p>
        </div>
      </div>

      {/* PRICING — Change 5: Monthly $19, Yearly $180, toggle */}
      <section id="pricing" className="section-alt">
        <div className="container" ref={r('pricing')}>
          <div style={{textAlign:'center',marginBottom:'32px',...fade('pricing')}}>
            <div className="li-label">Pricing</div>
            <h2 className="h2">Simple pricing. No surprises.</h2>
            <p className="text-sec" style={{marginTop:'8px',fontSize:'15px',marginBottom:'22px'}}>Cancel anytime. No setup fees. Ever.</p>
            <div className="billing-toggle">
              <button className={`billing-opt ${billing==='monthly'?'active':''}`} onClick={()=>setBilling('monthly')}>Monthly</button>
              <button className={`billing-opt ${billing==='yearly'?'active':''}`} onClick={()=>setBilling('yearly')}>
                Yearly &nbsp;<span style={{background:'#057642',color:'#fff',padding:'1px 7px',borderRadius:'100px',fontSize:'10px',fontWeight:700}}>Save {yd}%</span>
              </button>
            </div>
          </div>
          <div className="grid-price" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px',maxWidth:'620px',margin:'0 auto'}}>
            <div className="price-main">
              <div style={{position:'absolute',top:'-1px',left:'50%',transform:'translateX(-50%)',background:'#0A66C2',color:'#fff',padding:'3px 16px',borderRadius:'0 0 8px 8px',fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.07em',whiteSpace:'nowrap'}}>✦ Founding member</div>
              <div style={{marginTop:'16px'}}>
                <p style={{color:'#0A66C2',fontWeight:700,fontSize:'13px',marginBottom:'4px'}}>{billing==='monthly'?'Monthly Plan':'Yearly Plan'}</p>
                <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
                  <span style={{fontWeight:700,fontSize:'3rem',color:'rgba(0,0,0,0.9)',lineHeight:1}}>${billing==='monthly'?mp:ym}</span>
                  <span className="text-sec">/month</span>
                </div>
                {billing==='yearly'&&<p style={{color:'#057642',fontSize:'13px',fontWeight:600,marginBottom:'4px'}}>Billed ${yp}/year · Save ${mp*12-yp}/year</p>}
                <p className="text-mut" style={{fontSize:'12px',marginBottom:'18px'}}>{billing==='monthly'?'Billed monthly · Cancel anytime':'Billed once per year · Cancel anytime'}</p>
                <a href="#signup" className="li-btn" style={{display:'flex',justifyContent:'center',width:'100%',marginBottom:'20px',animation:'none'}}>
                  {billing==='monthly'?'Claim founding price':'Claim yearly deal'}
                </a>
                {['3 AI posts in your inbox daily','News-based & country-specific','Different format every day','Matching images included','Price locked for founding members','3-day free trial to start'].map(f=>(
                  <div key={f} style={{display:'flex',gap:'8px',marginBottom:'9px',alignItems:'flex-start'}}>
                    <div className="li-check"><span style={{fontSize:'10px',color:'#0A66C2',fontWeight:700}}>✓</span></div>
                    <span style={{fontSize:'14px',color:'rgba(0,0,0,0.75)'}}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="price-reg">
              <p style={{color:'rgba(0,0,0,0.38)',fontWeight:700,fontSize:'13px',marginBottom:'4px'}}>Regular Price</p>
              <div style={{display:'flex',alignItems:'baseline',gap:'4px',marginBottom:'4px'}}>
                <span style={{fontWeight:700,fontSize:'3rem',color:'rgba(0,0,0,0.2)',lineHeight:1}}>${billing==='monthly'?'29':'24'}</span>
                <span style={{color:'rgba(0,0,0,0.2)'}}>/month</span>
              </div>
              {billing==='yearly'&&<p style={{color:'rgba(0,0,0,0.25)',fontSize:'13px',marginBottom:'4px'}}>Billed $288/year</p>}
              <p style={{color:'rgba(0,0,0,0.25)',fontSize:'12px',marginBottom:'18px'}}>Available after founding spots fill</p>
              <div style={{background:'#F3F2EE',border:'1px solid rgba(0,0,0,0.08)',borderRadius:'20px',padding:'10px',textAlign:'center',color:'rgba(0,0,0,0.3)',fontSize:'13px',fontWeight:600,marginBottom:'20px'}}>Coming after founding spots fill</div>
              {['3 AI posts in your inbox daily','News-based & country-specific','Different format every day','Matching images included','Standard support','3-day free trial to start'].map(f=>(
                <div key={f} style={{display:'flex',gap:'8px',marginBottom:'9px',alignItems:'flex-start'}}>
                  <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#F3F2EE',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                    <span style={{fontSize:'10px',color:'rgba(0,0,0,0.22)',fontWeight:700}}>✓</span>
                  </div>
                  <span style={{fontSize:'14px',color:'rgba(0,0,0,0.25)'}}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — Change 6: stays before form */}
      <section className="section">
        <div className="container-sm" ref={r('faq')}>
          <div style={{textAlign:'center',marginBottom:'32px',...fade('faq')}}>
            <div className="li-label">FAQ</div>
            <h2 className="h2">Questions answered</h2>
          </div>
          {FAQS.map((f,i)=>(
            <div key={i} className={`faq-item ${openFaq===i?'open':''}`}>
              <div className="faq-q" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                <span>{f.q}</span>
                <div className="faq-icon">{openFaq===i?'−':'+'}</div>
              </div>
              {openFaq===i&&<div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-alt">
        <div className="container-sm" style={{textAlign:'center'}} ref={r('cta')}>
          <div style={fade('cta')}>
            <div className="li-label">Still thinking?</div>
            <h2 className="h2" style={{marginBottom:'12px'}}>Your first posts arrive tomorrow morning.</h2>
            <p className="text-sec" style={{fontSize:'15px',marginBottom:'28px',lineHeight:1.6}}>3 days free. No credit card. 20 founding spots at $15/month forever.</p>
            <a href="#signup" className="li-btn" style={{fontSize:'16px',padding:'12px 32px'}}>Start My Free 3-Day Trial →</a>
          </div>
        </div>
      </section>

      {/* SIGNUP */}
      <section id="signup" className="section">
        <div className="container-xs" ref={r('signup')}>
          <div style={{textAlign:'center',marginBottom:'28px',...fade('signup')}}>
            <div className="li-label">Start Free Trial</div>
            <h2 className="h2" style={{marginBottom:'8px'}}>Wake up to a better feed</h2>
            <p className="text-sec" style={{fontSize:'15px'}}>Tell us about you. Your first posts land tomorrow morning.</p>
          </div>
          <div className="li-card" style={{padding:'clamp(20px,5vw,36px)',boxShadow:'0 0 0 1px rgba(0,0,0,0.08),0 4px 20px rgba(0,0,0,0.08)'}}>
            <div style={{display:'grid',gap:'16px'}}>
              <div className="grid-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                {[['name','Full Name','text','Your name'],['email','Email','email','you@company.com']].map(([k,l,t,p])=>(
                  <div key={k}>
                    <label style={{display:'block',color:'rgba(0,0,0,0.6)',fontSize:'13px',fontWeight:600,marginBottom:'5px'}}>{l}</label>
                    <input type={t} placeholder={p} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} onFocus={()=>setFocused(k)} onBlur={()=>setFocused(null)} style={inp(k)}/>
                  </div>
                ))}
              </div>
              <div>
                <label style={{display:'block',color:'rgba(0,0,0,0.6)',fontSize:'13px',fontWeight:600,marginBottom:'5px'}}>Your Country</label>
                <div style={{position:'relative'}}>
                  <select value={form.country} onChange={e=>setForm({...form,country:e.target.value})} onFocus={()=>setFocused('country')} onBlur={()=>setFocused(null)} style={{...inp('country'),cursor:'pointer',color:form.country?'rgba(0,0,0,0.9)':'rgba(0,0,0,0.38)'}}>
                    <option value="" disabled>Select your country</option>
                    {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                  <span style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',color:'rgba(0,0,0,0.3)',pointerEvents:'none',fontSize:'10px'}}>▾</span>
                </div>
              </div>
              <div className="grid-2" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                {[['niche','Your Niche',NICHES,'Select your industry'],['tone','Writing Tone',TONES,'Select your tone']].map(([k,l,opts,p])=>(
                  <div key={k}>
                    <label style={{display:'block',color:'rgba(0,0,0,0.6)',fontSize:'13px',fontWeight:600,marginBottom:'5px'}}>{l}</label>
                    <div style={{position:'relative'}}>
                      <select value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} onFocus={()=>setFocused(k)} onBlur={()=>setFocused(null)} style={{...inp(k),cursor:'pointer',color:form[k]?'rgba(0,0,0,0.9)':'rgba(0,0,0,0.38)'}}>
                        <option value="" disabled>{p}</option>
                        {opts.map(o=><option key={o} value={o}>{o}</option>)}
                      </select>
                      <span style={{position:'absolute',right:'10px',top:'50%',transform:'translateY(-50%)',color:'rgba(0,0,0,0.3)',pointerEvents:'none',fontSize:'10px'}}>▾</span>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <label style={{display:'block',color:'rgba(0,0,0,0.6)',fontSize:'13px',fontWeight:600,marginBottom:'5px'}}>
                  Topic / Keyword <span style={{color:'rgba(0,0,0,0.35)',fontWeight:400}}>— optional</span>
                </label>
                <input type="text" placeholder="e.g. AI, Dubai real estate, remote work..." value={form.keyword} onChange={e=>setForm({...form,keyword:e.target.value})} onFocus={()=>setFocused('keyword')} onBlur={()=>setFocused(null)} style={inp('keyword')}/>
                <p style={{color:'rgba(0,0,0,0.35)',fontSize:'12px',marginTop:'4px'}}>Leave empty — we use today's trending news automatically</p>
              </div>
              {error&&<div style={{background:'#FDF0EB',border:'1px solid rgba(178,64,32,0.25)',color:'#B24020',padding:'10px 14px',borderRadius:'4px',fontSize:'14px'}}>{error}</div>}
              <button onClick={submit} disabled={loading} style={{marginTop:'4px',background:loading?'#F3F2EE':'#0A66C2',color:loading?'rgba(0,0,0,0.35)':'#fff',border:`1.5px solid ${loading?'rgba(0,0,0,0.12)':'#0A66C2'}`,borderRadius:'20px',padding:'12px',fontFamily:"'Source Sans Pro',sans-serif",fontWeight:700,fontSize:'15px',cursor:loading?'not-allowed':'pointer',width:'100%',transition:'all 0.15s'}}
                onMouseEnter={e=>{if(!loading)e.currentTarget.style.background='#004182';}}
                onMouseLeave={e=>{if(!loading)e.currentTarget.style.background='#0A66C2';}}>
                {loading?'Setting up your account…':'Start My Free 3-Day Trial →'}
              </button>
              <p style={{textAlign:'center',color:'rgba(0,0,0,0.38)',fontSize:'12px',lineHeight:1.8}}>
                ✓ No credit card required &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Posts arrive tomorrow morning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:'#fff',borderTop:'1px solid rgba(0,0,0,0.08)',padding:'24px'}}>
        <div style={{maxWidth:'1080px',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
          <span style={{fontWeight:700,fontSize:'15px',letterSpacing:'-0.01em',color:'rgba(0,0,0,0.45)'}}>
            The<span style={{color:'#0A66C2'}}>Post</span>Bot
          </span>
          <p style={{color:'rgba(0,0,0,0.4)',fontSize:'12px'}}>
            Questions? <a href="mailto:hello@thepostbot.me" style={{color:'#0A66C2',textDecoration:'none',fontWeight:600}}>hello@thepostbot.me</a>
          </p>
          <p style={{color:'rgba(0,0,0,0.28)',fontSize:'12px'}}>© 2026 ThePostBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </>);
}
