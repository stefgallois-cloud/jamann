export async function onRequestPost({ request, env }) {
  try {
    const { imageBase64 } = await request.json();
    if (!imageBase64) {
      return new Response(JSON.stringify({ description: null }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: "Tu décris des photos pour créer du contenu pour Le Manoïre, un restaurant de montagne au Col de Jaman (1512m, Préalpes vaudoises). Décris cette photo en 3-4 phrases concrètes et sensorielles : ce qu'on voit, l'ambiance, les couleurs, les éléments marquants. Reste factuel." },
              { inline_data: { mime_type: 'image/jpeg', data: imageBase64 } }
            ]
          }]
        })
      }
    );

    const data = await resp.json();
    const description = data.candidates?.[0]?.content?.parts?.[0]?.text || null;

    return new Response(JSON.stringify({ description }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ description: null, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
