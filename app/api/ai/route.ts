import { NextRequest, NextResponse } from 'next/server';

const OLLAMA_EDGE = process.env.SUPABASE_EDGE_OLLAMA || 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/ai-chat';
const OPENROUTER_EDGE = process.env.SUPABASE_EDGE_OPENROUTER || 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/openrouter-chat';
const NVIDIA_EDGE = process.env.SUPABASE_EDGE_NVIDIA || 'https://lfavawkzvdhdpaaplaiq.supabase.co/functions/v1/nvidia-chat';

export async function POST(req: NextRequest) {
  try {
    const { prompt, model } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    let endpoint = OLLAMA_EDGE;
    if (model?.startsWith('openrouter/')) endpoint = OPENROUTER_EDGE;
    else if (model?.startsWith('nvidia/')) endpoint = NVIDIA_EDGE;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, model: model?.split('/').pop() }),
    });
    const data = await response.json();
    return NextResponse.json({ reply: data.reply || data.message?.content || 'Maaf, tidak ada respons.' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
