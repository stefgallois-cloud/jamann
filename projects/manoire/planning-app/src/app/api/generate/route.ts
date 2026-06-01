import { NextResponse } from 'next/server';
import { MOCK_SHIFTS } from '@/lib/mock-data';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Simuler le délai d'appel à un LLM (ex: Claude ou OpenAI)
    // En production, nous utiliserions ici le prompt défini dans la note de cadrage.
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Pour le prototype, nous retournons les données statiques
    // L'architecture est prête pour brancher le vrai SDK LLM ici.
    return NextResponse.json({
      success: true,
      message: "Planning généré avec succès par l'IA",
      data: MOCK_SHIFTS
    });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la génération" }, { status: 500 });
  }
}
