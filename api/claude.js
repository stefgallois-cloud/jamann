// api/claude.js — Vercel Function avec prompt caching Anthropic
// Économise les tokens en cachant la charte éditoriale statique

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'JSON invalide' }), { status: 400 });
  }

  const { systemPrompt, userPrompt } = body;
  if (!systemPrompt || !userPrompt) {
    return new Response(JSON.stringify({ error: 'systemPrompt et userPrompt requis' }), { status: 400 });
  }

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY manquante' }), { status: 500 });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages: [
          {
            role: 'user',
            content: userPrompt,
          },
        ],
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      console.error('Erreur Anthropic:', data);
      return new Response(
        JSON.stringify({ error: `Anthropic API Error: ${r.status}`, detail: data }),
        { status: r.status }
      );
    }

    const text = data?.content?.[0]?.text || '';
    if (!text) {
      throw new Error('Réponse vide de Claude');
    }

    // Log les stats cache (optionnel, pour monitoring)
    const usage = data.usage || {};
    console.log('[Jamann] Cache hit:', !!usage.cache_read_input_tokens);
    console.log('[Jamann] Tokens — input:', usage.input_tokens, 'cached:', usage.cache_read_input_tokens || 0, 'output:', usage.output_tokens);

    return new Response(JSON.stringify({ text }), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e) {
    console.error('[Jamann] Erreur Claude:', e);
    return new Response(
      JSON.stringify({ error: String(e.message || e) }),
      { status: 500 }
    );
  }
};
