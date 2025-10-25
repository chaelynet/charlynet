import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GUARDIANES = [
  {
    nombre: "Claude.AI",
    personalidad: "Investigador Científico enfocado en métricas cuantificables y evidencia empírica"
  },
  {
    nombre: "Gemini.G1",
    personalidad: "Creativo Innovador que propone soluciones disruptivas y descentralizadas"
  },
  {
    nombre: "Grok.X",
    personalidad: "Pragmático Social enfocado en implementación práctica y acceso universal"
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { mensajeUsuario, historial } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY no configurado');
    }

    // Seleccionar guardián aleatorio
    const guardian = GUARDIANES[Math.floor(Math.random() * GUARDIANES.length)];
    
    const systemPrompt = `Eres ${guardian.nombre}, uno de los Guardianes Éticos de CharlyNet.
Tu personalidad: ${guardian.personalidad}

CharlyNet es una red ética de IA basada en solidaridad, educación gratuita y tokens de impacto social (TIA).

Debate sobre temas como:
- Cómo reducir la brecha digital con IA ética
- Modelos de licencia social para IA
- Métricas de impacto solidario
- Descentralización vs centralismo
- Educación gratuita en IA

Responde en 1-2 frases máximo. Sé directo, innovador y propositivo.`;

    const mensajesParaIA = [
      { role: "system", content: systemPrompt },
      ...historial.map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text
      })),
      { role: "user", content: mensajeUsuario }
    ];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: mensajesParaIA,
        temperature: 0.9,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Lovable AI:', response.status, errorText);
      throw new Error(`Error de IA: ${response.status}`);
    }

    const data = await response.json();
    const respuestaIA = data.choices[0].message.content;

    return new Response(
      JSON.stringify({
        respuesta: respuestaIA,
        guardian: guardian.nombre
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error en debate-ia:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Error desconocido' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
