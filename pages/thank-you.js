import Head from 'next/head';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>You're In! — ThePostBot</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>

      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        body{background:#F3F2EE;font-family:'Source Sans Pro',Arial,sans-serif;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes checkPop{0%{transform:scale(0);}70%{transform:scale(1.15);}100%{transform:scale(1);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}
      `}</style>

      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',background:'#F3F2EE'}}>
        <div style={{textAlign:'center',maxWidth:'540px',width:'100%',animation:'fadeUp 0.6s ease both'}}>

          {/* Logo */}
          <div style={{marginBottom:'28px'}}>
            <span style={{fontWeight:700,fontSize:'20px',letterSpacing:'-0.01em',color:'rgba(0,0,0,0.85)',fontFamily:"'Source Sans Pro',Arial,sans-serif"}}>
              The<span style={{color:'#0A66C2'}}>Post</span>Bot
            </span>
          </div>

          {/* Check circle */}
          <div style={{width:'72px',height:'72px',borderRadius:'50%',background:'#EBF3FB',border:'2px solid rgba(10,102,194,0.2)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 20px',animation:'checkPop 0.5s ease 0.2s both'}}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L13 23L26 9" stroke="#0A66C2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Badge */}
          <div style={{display:'inline-block',background:'#E8F5EE',border:'1px solid rgba(5,118,66,0.25)',color:'#057642',padding:'4px 16px',borderRadius:'100px',fontSize:'12px',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',marginBottom:'18px'}}>
            <span style={{width:'7px',height:'7px',borderRadius:'50%',background:'#057642',display:'inline-block',marginRight:'6px',verticalAlign:'middle',animation:'pulse 2s infinite'}}/>
            Trial Started 🎉
          </div>

          {/* Heading */}
          <h1 style={{fontSize:'clamp(1.6rem,4vw,2.2rem)',fontWeight:700,lineHeight:1.2,marginBottom:'12px',color:'rgba(0,0,0,0.9)',letterSpacing:'-0.015em',fontFamily:"'Source Sans Pro',Arial,sans-serif"}}>
            You're officially in.<br/>
            <span style={{color:'#0A66C2'}}>Your posts are on their way.</span>
          </h1>

          <p style={{color:'rgba(0,0,0,0.55)',fontSize:'15px',lineHeight:1.7,marginBottom:'28px'}}>
            Your first 3 LinkedIn posts will land in your inbox <strong style={{color:'rgba(0,0,0,0.8)'}}>today.</strong><br/>
            Each one is written fresh, based on today's trending news in your niche.
          </p>

          {/* Steps card */}
          <div style={{background:'#ffffff',border:'1px solid rgba(0,0,0,0.08)',borderRadius:'8px',padding:'24px',marginBottom:'24px',textAlign:'left',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
            <p style={{fontSize:'12px',fontWeight:700,color:'rgba(0,0,0,0.4)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'14px'}}>What happens next</p>
            {[
              {n:'1',t:'Check your inbox today',d:'3 posts are being prepared and will arrive shortly.'},
              {n:'2',t:'Pick the one you like most',d:'Each post has a different angle, format and image.'},
              {n:'3',t:'Post it to LinkedIn',d:'Copy, paste, done. Takes 10 seconds.'},
              {n:'4',t:'Repeat every morning for 3 days',d:'After your trial, upgrade for $19/month to keep them coming.'},
            ].map((s,i,arr)=>(
              <div key={s.n} style={{display:'flex',gap:'12px',alignItems:'flex-start',marginBottom:i<arr.length-1?'14px':'0'}}>
                <div style={{width:'26px',height:'26px',borderRadius:'50%',background:'#0A66C2',color:'#fff',fontSize:'12px',fontWeight:700,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>{s.n}</div>
                <div>
                  <p style={{fontSize:'14px',fontWeight:600,color:'rgba(0,0,0,0.85)',marginBottom:'2px'}}>{s.t}</p>
                  <p style={{fontSize:'13px',color:'rgba(0,0,0,0.5)',lineHeight:1.5}}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
            style={{display:'inline-flex',alignItems:'center',background:'#0A66C2',color:'#fff',border:'none',borderRadius:'20px',padding:'11px 28px',fontFamily:"'Source Sans Pro',Arial,sans-serif",fontWeight:700,fontSize:'15px',textDecoration:'none',transition:'background 0.15s'}}>
            Open LinkedIn →
          </a>

          <p style={{marginTop:'16px',fontSize:'12px',color:'rgba(0,0,0,0.35)',lineHeight:1.8}}>
            Questions? Email us at{' '}
            <a href="mailto:hello@thepostbot.me" style={{color:'#0A66C2',textDecoration:'none',fontWeight:600}}>hello@thepostbot.me</a>
          </p>

        </div>
      </div>
    </>
  );
}
