const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/generate', async (req, res) => {
  const answers = req.body;

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const prompt = buildPrompt(answers);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.content.map(i => i.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();
    const report = JSON.parse(clean);
    res.json(report);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

function buildDigitalPresence(a) {
  const lines = [];
  if (a.website) lines.push(`Website: ${a.website}`);
  if (a.linkedin) lines.push(`LinkedIn: ${a.linkedin}`);
  if (a.instagram) lines.push(`Instagram: ${a.instagram}`);
  if (a.facebook) lines.push(`Facebook: ${a.facebook}`);
  if (a.youtube) lines.push(`YouTube: ${a.youtube}`);
  if (a.otherPlatform) lines.push(`Other: ${a.otherPlatform}`);
  return lines.length > 0 ? lines.join('\n') : 'No digital presence provided';
}

function buildPrompt(a) {
  return `You are an expert brand positioning strategist trained in the B.R.A.N.D. framework (Breakthrough Clarity, Refine Audience, Authority Positioning, Nurture Relationships, Deliver Results) and the B.E.S.P.O.K.E. framework for building global authority brands.

A client has completed a Brand Positioning Audit. Based on their answers, generate a personalized Brand Audit + Positioning Report.

DIGITAL PRESENCE:
${buildDigitalPresence(a)}

CLIENT ANSWERS:
1. What they do and who for: ${a.whatYouDo || 'Not provided'}
2. Years in business: ${a.yearsInBusiness || 'Not provided'}
3. Best client description: ${a.bestClientDescription || 'Not provided'}
4. Online presence: ${a.onlinePresence || 'Not provided'}
5. Price point: ${a.pricePoint || 'Not provided'}
6. Main buying barrier: ${a.buyingBarrier || 'Not provided'}
7. Competitors & differentiators: ${a.competitors || 'Not provided'}
8. Unique result they create: ${a.uniqueResult || 'Not provided'}
9. How clients find them: ${a.clientSource || 'Not provided'}
10. Brand personality: ${a.brandPersonality || 'Not provided'}
11. What they wish people knew: ${a.wishPeopleKnew || 'Not provided'}
12. Location: ${a.location || 'Not provided'}

KEY PRINCIPLE: The market is not missing this person because they are not good enough. The market is missing them because their POSITIONING has not caught up with their capability. This is not a marketing problem. This is not a social media problem. This is a positioning problem — and it is the only one worth solving first.

Use their digital presence as context. Be specific, honest, and direct — not generic. Work with whatever information was provided.

Respond with JSON only, no markdown, no preamble:

{
  "positioningScore": <number 1-100>,
  "visibilityScore": <number 1-100>,
  "authorityScore": <number 1-100>,
  "currentStateAnalysis": "<2-3 sentences: honest assessment of where they are now and the gap between their real value and how the market sees them>",
  "corePositioningGap": "<1-2 sentences: the single most important positioning problem — specific and direct>",
  "topGaps": [
    "<specific gap 1>",
    "<specific gap 2>",
    "<specific gap 3>"
  ],
  "uniquePositioningOpportunity": "<2-3 sentences: what makes them genuinely different and how to leverage it>",
  "immediateActions": [
    "<action 1 — specific, doable this week>",
    "<action 2>",
    "<action 3>"
  ],
  "positioningStatement": "<Draft: 'For [audience], [brand] is the [category] that [unique benefit] because [proof]'>",
  "finalMessage": "<1-2 sentences of direct encouragement — what becomes possible when they fix the positioning>"
}`;
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Brand Audit running on port ${PORT}`);
});
