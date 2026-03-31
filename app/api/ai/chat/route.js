// app/api/ai/chat/route.js - Next.js App Router ✅
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, spiritual = true } = await request.json();
    
    // 🔐 Ambil key dari env (Vercel auto inject!)
    const apiKey = process.env.OLLAMA_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '🔑 AI not configured' },
        { status: 500 }
      );
    }
    
    const fullPrompt = spiritual 
      ? `Bismillah bi idznillah. ${prompt}` 
      : prompt;
    
    // Call Ollama Cloud
    const res = await fetch('https://ollama.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DreamOS': 'v21'
      },
      body: JSON.stringify({
        model: 'gemma3:4b',
        messages: [{ role: 'user', content: fullPrompt }],
        stream: false,
        temperature: 0.3
      }),
      next: { revalidate: 0 } // No caching for AI responses
    });
    
    if (!res.ok) {
      const error = await res.text();
      console.error('🚫 AI Error:', error);
      return NextResponse.json(
        { error: 'AI unavailable' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json({
      response: data.choices?.[0]?.message?.content,
      model: data.model,
      tokens: data.usage
    });
    
  } catch (err) {
    console.error('💥 API Error:', err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
// app/api/ai/chat/route.js - Next.js App Router ✅
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt, spiritual = true } = await request.json();
    
    // 🔐 Ambil key dari env (Vercel auto inject!)
    const apiKey = process.env.OLLAMA_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: '🔑 AI not configured' },
        { status: 500 }
      );
    }
    
    const fullPrompt = spiritual 
      ? `Bismillah bi idznillah. ${prompt}` 
      : prompt;
    
    // Call Ollama Cloud
    const res = await fetch('https://ollama.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DreamOS': 'v21'
      },
      body: JSON.stringify({
        model: 'gemma3:4b',
        messages: [{ role: 'user', content: fullPrompt }],
        stream: false,
        temperature: 0.3
      }),
      next: { revalidate: 0 } // No caching for AI responses
    });
    
    if (!res.ok) {
      const error = await res.text();
      console.error('🚫 AI Error:', error);
      return NextResponse.json(
        { error: 'AI unavailable' },
        { status: res.status }
      );
    }
    
    const data = await res.json();
    return NextResponse.json({
      response: data.choices?.[0]?.message?.content,
      model: data.model,
      tokens: data.usage
    });
    
  } catch (err) {
    console.error('💥 API Error:', err);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
