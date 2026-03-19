export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, niche, tone } = req.body;

  if (!name || !email || !niche || !tone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
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
          },
        }),
      }
    );

    const data = await airtableRes.json();

    if (!airtableRes.ok) {
      console.error('Airtable error:', JSON.stringify(data));
      return res.status(500).json({ error: JSON.stringify(data) });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
