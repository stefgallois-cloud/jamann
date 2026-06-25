// functions/api/claude.js
// Cloudflare Pages Function — proxy serverless multi-fournisseur (OpenRouter/Llama3, Gemini, ou Claude).
// Détecte automatiquement les clés d'environnement configurées sur Cloudflare
// et utilise le meilleur modèle disponible.
// Routing automatique : ce fichier expose l'endpoint POST /api/claude

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'JSON invalide' }, { status: 400 });
  }

  // Accepte { systemPrompt, userPrompt } (split pour caching) ou { prompt } (legacy)
  const { prompt, systemPrompt, userPrompt } = body || {};
  const userContent = userPrompt || prompt;
  const fullPrompt = systemPrompt ? `${systemPrompt}\n\n---\n\n${userContent}` : userContent;

  if (!userContent) {
    return Response.json({ error: 'prompt ou userPrompt (string) requis' }, { status: 400 });
  }

  const openRouterKey = env.OPENROUTER_API_KEY;
  const geminiKey     = env.GEMINI_API_KEY;
  const anthropicKey  = env.ANTHROPIC_API_KEY;
  let debugAnthropicError = null;
  let debugGeminiError    = null;

  console.log("--- Routeur multi-modèles Jamann ---");
  console.log("Clés : Anthropic:", !!anthropicKey, "| Gemini:", !!geminiKey, "| OpenRouter:", !!openRouterKey);

  // --- STRATÉGIE 1 : ANTHROPIC Claude Haiku 4.5 (priorité — voix fine, prompt caching) ---
  if (anthropicKey) {
    console.log("Mode : Anthropic Claude Haiku 4.5");
    try {
      const reqBody = {
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2000,
        messages: [{ role: 'user', content: userContent }],
      };
      if (systemPrompt) {
        reqBody.system = [{ type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } }];
      }

      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'anthropic-beta': 'prompt-caching-2024-07-31',
          'content-type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });

      const data = await r.json();
      console.log("Anthropic HTTP Status:", r.status, "| Cache:", data?.usage?.cache_read_input_tokens > 0 ? 'HIT' : 'MISS');

      if (!r.ok) {
        console.error("Erreur Anthropic:", data);
        throw new Error(`Anthropic API Error: ${r.status} - ${JSON.stringify(data)}`);
      }

      const text = data?.content?.[0]?.text || '';
      if (!text) throw new Error("Réponse vide reçue de Claude");

      console.log("Génération Claude réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      debugAnthropicError = String(e);
      console.error("Échec Anthropic. Fallback vers Gemini...", e);
    }
  }

  // --- STRATÉGIE 2 : GEMINI (fallback gratuit — 1500 req/jour) ---
  if (geminiKey) {
    console.log("Mode : Google Gemini (fallback)");
    try {
      const model    = 'gemini-1.5-flash-latest';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiKey)}`;

      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 4000,
            responseMimeType: 'application/json',
          },
        }),
      });

      const data = await r.json();
      console.log("Gemini HTTP Status:", r.status);

      if (!r.ok) {
        console.error("Erreur Gemini:", data);
        throw new Error(`Gemini API Error: ${r.status} - ${JSON.stringify(data)}`);
      }

      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!text) throw new Error("Réponse vide reçue de Gemini");

      console.log("Génération Gemini réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      debugGeminiError = String(e);
      console.error("Échec Gemini. Fallback vers OpenRouter...", e);
    }
  }

  // --- STRATÉGIE 3 : OPENROUTER (dernier recours gratuit) ---
  if (openRouterKey && !openRouterKey.startsWith('AIzaSy') && !openRouterKey.startsWith('sk-ant')) {
    console.log("Mode : OpenRouter");
    try {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://jamann.pages.dev',
          'X-Title': 'Jamann Le Manoire',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3.3-70b-instruct:free',
          messages: [{ role: 'user', content: fullPrompt }],
          temperature: 0.8,
        }),
      });

      const data = await r.json();
      if (!r.ok) throw new Error(`OpenRouter API Error: ${r.status} - ${JSON.stringify(data)}`);

      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) throw new Error("Réponse vide reçue d'OpenRouter");

      console.log("Génération OpenRouter réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      console.error("Échec OpenRouter.", e);
    }
  }

  console.error("Erreur critique : toutes les stratégies ont échoué.");
  return Response.json(
    {
      error: 'Toutes les clés API ont échoué ou sont absentes.',
      detail: 'Vérifie ANTHROPIC_API_KEY, GEMINI_API_KEY ou OPENROUTER_API_KEY dans Cloudflare Pages → Settings → Environment variables.',
      debug_anthropic: debugAnthropicError,
      debug_gemini: debugGeminiError,
    },
    { status: 502 },
  );
}

// Refuser les autres méthodes
export async function onRequest() {
  return new Response('Method not allowed', { status: 405 });
}
