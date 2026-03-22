export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, niche, tone } = req.body;

  if (!name || !email || !niche || !tone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {

    // CHECK — Does this email already exist in Airtable?
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Subscribers?filterByFormula=${encodeURIComponent(`{Email}="${email}"`)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
        },
      }
    );

    const searchData = await searchRes.json();

    if (searchData.records && searchData.records.length > 0) {
      const status = searchData.records[0].fields.Status;

      // Still on free trial
      if (status === 'trial') {
        return res.status(400).json({
          error: 'You already have an active free trial. Check your inbox every morning for your 3 posts!'
        });
      }

      // Already a paying subscriber
      if (status === 'active') {
        return res.status(400).json({
          error: 'You already have an active subscription. Your posts are delivered every morning — check your inbox!'
        });
      }

      // Trial was used — expired or cancelled
      if (status === 'expired' || status === 'cancelled') {
        return res.status(400).json({
          error: 'You have already used your free trial. To continue receiving your daily LinkedIn posts, please subscribe at $9/month. Email us at hello@thepostbot.me to get started.'
        });
      }
    }

    // NEW USER — Save to Airtable
    const today = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" }));
    const trialEnd = new Date(today);
    trialEnd.setDate(today.getDate() + 7);
    const formatDate = (d) => d.toISOString().split('T')[0];

    const createRes = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Subscribers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Niche: niche,
            Tone: tone,
            Status: 'trial',
            'Signup Date': formatDate(today),
            'Trial Start Date': formatDate(today),
            'Trial End Date': formatDate(trialEnd),
          },
        }),
      }
    );

    const createData = await createRes.json();

    if (!createRes.ok) {
      console.error('Airtable error:', JSON.stringify(createData));
      return res.status(500).json({ error: 'Failed to save signup. Please try again.' });
    }

    // SEND WELCOME EMAIL
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"ThePostBot" <hello@thepostbot.me>',
      to: email,
      subject: 'Welcome to ThePostBot! 🚀 Your first posts arrive tomorrow',
      html: `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#080C10;font-family:Arial,sans-serif;"><div style="max-width:600px;margin:0 auto;padding:40px 20px;"><div style="text-align:center;margin-bottom:24px;"><h1 style="color:#fff;font-size:26px;margin:0;font-weight:800;">The<span style="color:#0A66C2;">Post</span>Bot</h1></div><div style="background:#111820;border:1px solid #1E2A36;border-radius:16px;padding:36px;"><div style="text-align:center;font-size:40px;margin-bottom:16px;">🎉</div><h2 style="color:#fff;font-size:22px;text-align:center;margin:0 0 12px;">Welcome to the family, ${name}!</h2><p style="color:#6B8099;font-size:15px;text-align:center;line-height:1.7;margin:0 0 24px;">You are officially a ThePostBot Founding Member.<br/>Your 7-day free trial has started today.</p><div style="background:#0D1117;border:1px solid #1E2A36;border-radius:12px;padding:24px;margin-bottom:28px;"><p style="color:#0A66C2;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">What happens next</p><div style="display:flex;margin-bottom:16px;"><span style="font-size:20px;margin-right:12px;">📬</span><div><p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">Tomorrow morning</p><p style="color:#6B8099;font-size:14px;margin:0;">3 LinkedIn posts land in your inbox — written for your niche in your tone</p></div></div><div style="display:flex;margin-bottom:16px;"><span style="font-size:20px;margin-right:12px;">👆</span><div><p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">You pick one</p><p style="color:#6B8099;font-size:14px;margin:0;">Each post covers a different angle with a matching image included</p></div></div><div style="display:flex;"><span style="font-size:20px;margin-right:12px;">🚀</span><div><p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">Post to LinkedIn</p><p style="color:#6B8099;font-size:14px;margin:0;">Copy, paste, done. Your audience thinks you work all night.</p></div></div></div><div style="background:rgba(10,102,194,0.06);border:1px solid rgba(10,102,194,0.2);border-radius:12px;padding:20px;margin-bottom:28px;text-align:center;"><p style="color:#6B8099;font-size:13px;margin:0 0 4px;">Your setup</p><p style="color:#E8F0F8;font-size:15px;margin:0;"><strong style="color:#0A66C2;">Niche:</strong> ${niche} &nbsp;·&nbsp; <strong style="color:#0A66C2;">Tone:</strong> ${tone}</p></div><p style="color:#6B8099;font-size:14px;text-align:center;line-height:1.6;margin:0;">Questions? Reply to this email or reach us at<br/><a href="mailto:hello@thepostbot.me" style="color:#0A66C2;">hello@thepostbot.me</a></p></div><p style="color:#1E2A36;font-size:12px;text-align:center;margin-top:24px;">© 2025 ThePostBot · thepostbot.me</p></div></body></html>`,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
```
