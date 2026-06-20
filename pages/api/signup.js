import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, niche, tone, country, keyword, salutation, role, experience, audience, postStyle, opinion } = req.body;

  if (!name || !email || !niche || !tone || !country) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!role || !audience || !postStyle) {
    return res.status(400).json({ error: 'Please complete all fields in step 2.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const cleanName = name.trim().slice(0, 100);
  const cleanEmail = email.trim().toLowerCase();
  const cleanKeyword = keyword ? keyword.trim().slice(0, 100) : '';
  const cleanOpinion = opinion ? opinion.trim().slice(0, 300) : '';

  try {
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Subscribers?filterByFormula=${encodeURIComponent(`{Email}="${cleanEmail}"`)}`,
      { headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}` } }
    );

    if (!searchRes.ok) {
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }

    const searchData = await searchRes.json();

    if (searchData.records && searchData.records.length > 0) {
      const status = searchData.records[0].fields.Status;
      if (status === 'trial') return res.status(400).json({ error: 'You already have an active free trial! Check your inbox for your posts. They arrive daily.' });
      if (status === 'active') return res.status(400).json({ error: 'You already have an active subscription. Check your inbox every day for your posts!' });
      if (status === 'expired') return res.status(400).json({ error: 'Your free trial has ended. To continue, please subscribe at $19/month. Check your trial expired email for the upgrade link, or email hello@thepostbot.me' });
      if (status === 'cancelled') return res.status(400).json({ error: 'Your subscription was cancelled. To reactivate, please email hello@thepostbot.me' });
      return res.status(400).json({ error: 'An account with this email already exists. Please email hello@thepostbot.me if you need help.' });
    }

    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
    const trialEnd = new Date(today);
    trialEnd.setDate(today.getDate() + 3);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const fields = {
      Name: cleanName,
      Email: cleanEmail,
      Niche: niche,
      Tone: tone,
      Country: country,
      Status: 'trial',
      'Signup Date': formatDate(today),
      'Trial Start Date': formatDate(today),
      'Trial End Date': formatDate(trialEnd),
    };

    if (salutation) fields['Salutation'] = salutation;
    if (cleanKeyword) fields['Keyword'] = cleanKeyword;
    if (role) fields['Role'] = role;
    if (experience) fields['Experience'] = experience;
    if (audience) fields['Target Audience'] = audience;
    if (postStyle) fields['Post Style'] = postStyle;
    if (cleanOpinion) fields['Opinion'] = cleanOpinion;

    const createRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Subscribers`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      }
    );

    if (!createRes.ok) {
      const createData = await createRes.json();
      console.error('Airtable create error:', JSON.stringify(createData));
      return res.status(500).json({ error: 'Failed to create your account. Please try again.' });
    }

    // TRIGGER INSTANT POST GENERATION
    if (process.env.MAKE_INSTANT_WEBHOOK_URL) {
      try {
        await fetch(process.env.MAKE_INSTANT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, name: cleanName, niche, tone, country, keyword: cleanKeyword, role, experience, audience, postStyle, opinion: cleanOpinion }),
        });
      } catch (webhookErr) {
        console.error('Instant webhook error (non-fatal):', webhookErr);
      }
    }

    // SEND WELCOME EMAIL
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com', port: 465, secure: true,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const greeting = salutation && salutation !== 'Prefer not to say' ? `${salutation} ${cleanName}` : cleanName;

    await transporter.sendMail({
      from: '"ThePostBot" <hello@thepostbot.me>',
      to: cleanEmail,
      subject: `Welcome to ThePostBot! Your first posts arrive today 🚀`,
      html: `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#F3F2EE;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <div style="text-align:center;margin-bottom:20px;">
    <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:16px 24px;display:inline-block;">
      <span style="font-size:22px;font-weight:700;color:rgba(0,0,0,0.85);font-family:Arial,sans-serif;">The<span style="color:#0A66C2;">Post</span>Bot</span>
    </div>
  </div>
  <div style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:36px;box-shadow:0 1px 4px rgba(0,0,0,0.04);">
    <div style="text-align:center;font-size:40px;margin-bottom:16px;">🎉</div>
    <h2 style="color:rgba(0,0,0,0.9);font-size:22px;text-align:center;margin:0 0 10px;font-family:Arial,sans-serif;font-weight:700;">Welcome, ${greeting}!</h2>
    <p style="color:rgba(0,0,0,0.55);font-size:15px;text-align:center;line-height:1.7;margin:0 0 24px;font-family:Arial,sans-serif;">You are officially a ThePostBot Founding Member.<br/>Your 3-day free trial has started. Your first posts arrive <strong style="color:rgba(0,0,0,0.85);">today.</strong></p>
    <div style="background:#F9F8F5;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:20px;margin-bottom:20px;">
      <p style="color:#0A66C2;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 14px;font-family:Arial,sans-serif;">What happens next</p>
      <div style="display:flex;margin-bottom:14px;"><span style="font-size:20px;margin-right:12px;">📬</span><div><p style="color:rgba(0,0,0,0.85);font-weight:600;margin:0 0 3px;font-family:Arial,sans-serif;font-size:14px;">Today — your first posts</p><p style="color:rgba(0,0,0,0.5);font-size:13px;margin:0;font-family:Arial,sans-serif;">3 LinkedIn posts written for your niche, in your voice, arriving soon.</p></div></div>
      <div style="display:flex;margin-bottom:14px;"><span style="font-size:20px;margin-right:12px;">👆</span><div><p style="color:rgba(0,0,0,0.85);font-weight:600;margin:0 0 3px;font-family:Arial,sans-serif;font-size:14px;">Pick your favourite</p><p style="color:rgba(0,0,0,0.5);font-size:13px;margin:0;font-family:Arial,sans-serif;">Each post covers a different angle with a matching AI image.</p></div></div>
      <div style="display:flex;"><span style="font-size:20px;margin-right:12px;">🚀</span><div><p style="color:rgba(0,0,0,0.85);font-weight:600;margin:0 0 3px;font-family:Arial,sans-serif;font-size:14px;">Copy. Paste. Post to LinkedIn.</p><p style="color:rgba(0,0,0,0.5);font-size:13px;margin:0;font-family:Arial,sans-serif;">10 seconds. Done.</p></div></div>
    </div>
    <div style="background:#EBF3FB;border:1px solid rgba(10,102,194,0.2);border-radius:8px;padding:18px;margin-bottom:24px;text-align:center;">
      <p style="color:rgba(0,0,0,0.5);font-size:12px;margin:0 0 6px;font-family:Arial,sans-serif;">Your personalisation</p>
      <p style="color:rgba(0,0,0,0.85);font-size:14px;margin:0;font-family:Arial,sans-serif;line-height:1.8;">
        <strong style="color:#0A66C2;">Niche:</strong> ${niche} &nbsp;·&nbsp; <strong style="color:#0A66C2;">Tone:</strong> ${tone}<br/>
        <strong style="color:#0A66C2;">Country:</strong> ${country} &nbsp;·&nbsp; <strong style="color:#0A66C2;">Audience:</strong> ${audience}${cleanKeyword ? `<br/><strong style="color:#0A66C2;">Topic:</strong> ${cleanKeyword}` : ''}
      </p>
    </div>
    <p style="color:rgba(0,0,0,0.4);font-size:13px;text-align:center;margin:0;font-family:Arial,sans-serif;">Questions? Reply to this email — I read every message personally.<br/><a href="mailto:hello@thepostbot.me" style="color:#0A66C2;text-decoration:none;">hello@thepostbot.me</a></p>
  </div>
  <p style="color:rgba(0,0,0,0.28);font-size:11px;text-align:center;margin-top:20px;font-family:Arial,sans-serif;">© 2026 ThePostBot · <a href="https://thepostbot.me" style="color:rgba(0,0,0,0.28);text-decoration:none;">thepostbot.me</a></p>
</div>
</body>
</html>`,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error. Please try again in a moment.' });
  }
}
