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

  const prompt = body?.prompt;
  if (!prompt || typeof prompt !== 'string') {
    return Response.json({ error: 'prompt (string) requis' }, { status: 400 });
  }

  // 1. Détection des clés disponibles
  const openRouterKey = env.OPENROUTER_API_KEY;
  const geminiKey = env.GEMINI_API_KEY;
  const anthropicKey = env.ANTHROPIC_API_KEY;

  console.log("--- Initialisation du routeur multi-modèles ---");
  console.log("Clés détectées : OpenRouter:", !!openRouterKey, " | Gemini:", !!geminiKey, " | Anthropic:", !!anthropicKey);

  // --- STRATÉGIE 1 : OPENROUTER (Llama 3 8B / 70B - Modèles Open Source Gratuits) ---
  if (openRouterKey && !openRouterKey.startsWith('AIzaSy') && !openRouterKey.startsWith('sk-ant')) {
    console.log("Mode : OpenRouter (Llama 3 Open-Source Gratuit)");
    try {
      const model = 'meta-llama/llama-3.3-70b-instruct:free';
      console.log("Appel OpenRouter avec le modèle :", model);

      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://jamann.pages.dev',
          'X-Title': 'Jamann Le Manoire'
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
        }),
      });

      const data = await r.json();
      console.log("OpenRouter HTTP Status:", r.status);

      if (!r.ok) {
        console.error("Erreur OpenRouter:", data);
        throw new Error(`OpenRouter API Error: ${r.status} - ${JSON.stringify(data)}`);
      }

      const text = data?.choices?.[0]?.message?.content || '';
      if (!text) {
        throw new Error("Réponse vide reçue de Llama 3 via OpenRouter");
      }

      console.log("Génération Llama 3 réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      console.error("Échec de la tentative OpenRouter. Passage aux autres clés si disponibles...", e);
    }
  }

  // --- STRATÉGIE 2 : GEMINI (Google - Gratuite 1500 req/jour) ---
  if (geminiKey) {
    console.log("Mode : Google Gemini");
    try {
      const model = 'gemini-2.5-flash-lite';
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(geminiKey)}`;
      console.log("Appel Gemini avec le modèle :", model);

      const r = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
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
      if (!text) {
        throw new Error("Réponse vide reçue de Gemini");
      }

      console.log("Génération Gemini réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      console.error("Échec de la tentative Gemini. Passage aux autres clés si disponibles...", e);
    }
  }

  // --- STRATÉGIE 3 : ANTHROPIC CLAUDE (Payant) ---
  if (anthropicKey) {
    console.log("Mode : Anthropic Claude");
    try {
      const model = 'claude-haiku-4-5-20251001';
      console.log("Appel Anthropic avec le modèle :", model);

      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 4000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      const data = await r.json();
      console.log("Anthropic HTTP Status:", r.status);

      if (!r.ok) {
        console.error("Erreur Anthropic:", data);
        throw new Error(`Anthropic API Error: ${r.status} - ${JSON.stringify(data)}`);
      }

      const text = data?.content?.[0]?.text || '';
      if (!text) {
        throw new Error("Réponse vide reçue de Claude 3.5");
      }

      console.log("Génération Claude réussie. Longueur :", text.length);
      return Response.json({ text });
    } catch (e) {
      console.error("Échec de la tentative Anthropic.", e);
    }
  }

  // 4. Si aucun modèle n'a fonctionné ou si aucune clé n'est configurée
  console.error("Erreur critique : Toutes les clés API ont échoué ou aucune clé n'est valide.");
  return Response.json(
    {
      error: 'Toutes les clés API configurées sur Cloudflare sont invalides, expirées ou absentes.',
      detail: 'Vérifie OPENROUTER_API_KEY, GEMINI_API_KEY ou ANTHROPIC_API_KEY dans les variables Cloudflare Pages.'
    },
    { status: 502 },
  );
}

// Refuser les autres méthodes
export async function onRequest() {
  return new Response('Method not allowed', { status: 405 });
}
