import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, niche, tone } = req.body;

  if (!name || !email || !niche || !tone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Dubai"}));
  const trialEnd = new Date();
  trialEnd.setDate(today.getDate() + 7);
  const formatDate = (d) => d.toISOString().split('T')[0];

  try {
    // Save to Airtable
    const airtableRes = await fetch(
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

    const data = await airtableRes.json();
    if (!airtableRes.ok) {
      console.error('Airtable error:', JSON.stringify(data));
      return res.status(500).json({ error: 'Failed to save signup.' });
    }

    // Send welcome email via Hostinger SMTP
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
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#080C10;font-family:'Helvetica Neue',Arial,sans-serif;">
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
            
            <div style="text-align:center;margin-bottom:32px;">
              <h1 style="color:#fff;font-size:28px;margin:0;">
                The<span style="color:#00D4FF;">Post</span>Bot
              </h1>
            </div>

            <div style="background:#111820;border:1px solid #1E2A36;border-radius:16px;padding:40px;">
              
              <div style="text-align:center;margin-bottom:28px;">
                <div style="width:60px;height:60px;background:rgba(0,255,136,0.1);border:2px solid rgba(0,255,136,0.3);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:24px;">
                  🎉
                </div>
              </div>

              <h2 style="color:#fff;font-size:24px;text-align:center;margin:0 0 12px;">
                Welcome to the family, ${name}!
              </h2>
              
              <p style="color:#6B8099;font-size:16px;text-align:center;line-height:1.6;margin:0 0 32px;">
                You're officially a ThePostBot Founding Member.<br/>
                Your 7-day free trial has started today.
              </p>

              <div style="background:#0D1117;border:1px solid #1E2A36;border-radius:12px;padding:24px;margin-bottom:28px;">
                <p style="color:#00D4FF;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">What happens next</p>
                
                <div style="display:flex;margin-bottom:16px;">
                  <span style="font-size:20px;margin-right:12px;">📬</span>
                  <div>
                    <p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">Tomorrow morning</p>
                    <p style="color:#6B8099;font-size:14px;margin:0;">3 LinkedIn posts land in this inbox — written for your niche in your tone</p>
                  </div>
                </div>
                
                <div style="display:flex;margin-bottom:16px;">
                  <span style="font-size:20px;margin-right:12px;">👆</span>
                  <div>
                    <p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">You pick one</p>
                    <p style="color:#6B8099;font-size:14px;margin:0;">Each post covers a different angle with a matching image included</p>
                  </div>
                </div>
                
                <div style="display:flex;">
                  <span style="font-size:20px;margin-right:12px;">🚀</span>
                  <div>
                    <p style="color:#E8F0F8;font-weight:600;margin:0 0 4px;">Post to LinkedIn</p>
                    <p style="color:#6B8099;font-size:14px;margin:0;">Copy, paste, done. Your audience thinks you work all night.</p>
                  </div>
                </div>
              </div>

              <div style="background:rgba(0,212,255,0.06);border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:20px;margin-bottom:28px;text-align:center;">
                <p style="color:#6B8099;font-size:13px;margin:0 0 4px;">Your setup</p>
                <p style="color:#E8F0F8;font-size:15px;margin:0;">
                  <strong style="color:#00D4FF;">Niche:</strong> ${niche} &nbsp;·&nbsp; 
                  <strong style="color:#00D4FF;">Tone:</strong> ${tone}
                </p>
              </div>

              <p style="color:#6B8099;font-size:14px;text-align:center;line-height:1.6;margin:0;">
                Questions? Just reply to this email or reach us at<br/>
                <a href="mailto:hello@thepostbot.me" style="color:#00D4FF;">hello@thepostbot.me</a>
              </p>

            </div>

            <p style="color:#1E2A36;font-size:12px;text-align:center;margin-top:24px;">
              © 2025 ThePostBot · <a href="https://thepostbot.me" style="color:#1E2A36;">thepostbot.me</a>
            </p>

          </div>
        </body>
        </html>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
