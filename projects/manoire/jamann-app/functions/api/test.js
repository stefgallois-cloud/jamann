// functions/api/test.js — endpoint de diagnostic (à supprimer après debug)
export async function onRequestGet(context) {
  const { env } = context;
  return Response.json({
    anthropic: !!env.ANTHROPIC_API_KEY,
    gemini:    !!env.GEMINI_API_KEY,
    openrouter: !!env.OPENROUTER_API_KEY,
    env_keys: Object.keys(env),
  });
}
