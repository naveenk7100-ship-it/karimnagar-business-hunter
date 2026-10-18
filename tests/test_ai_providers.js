import { CONFIG } from '../src/config.js';

async function testGemini() {
  console.log('Testing Gemini API...');
  if (!CONFIG.GEMINI_API_KEY) {
    console.log('Gemini API key is not set');
    return false;
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent?key=${CONFIG.GEMINI_API_KEY}`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Return JSON: {"status": "ok", "city": "Karimnagar"}' }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });
    const dur = Date.now() - start;
    if (res.ok) {
      const data = await res.json();
      console.log(`Gemini SUCCESS in ${dur}ms:`, data.candidates?.[0]?.content?.parts?.[0]?.text);
      return true;
    } else {
      const txt = await res.text();
      console.warn(`Gemini HTTP ${res.status}:`, txt);
      return false;
    }
  } catch (err) {
    console.error('Gemini error:', err.message);
    return false;
  }
}

async function testOpenRouter() {
  console.log('Testing OpenRouter API...');
  if (!CONFIG.OPENROUTER_API_KEY) {
    console.log('OpenRouter API key is not set');
    return false;
  }
  const start = Date.now();
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.OPENROUTER_MODEL,
        messages: [{ role: 'user', content: 'Say hello in 5 words' }],
        max_tokens: 20
      })
    });
    const dur = Date.now() - start;
    if (res.ok) {
      const data = await res.json();
      console.log(`OpenRouter SUCCESS in ${dur}ms:`, data.choices?.[0]?.message?.content);
      return true;
    } else {
      const txt = await res.text();
      console.warn(`OpenRouter HTTP ${res.status}:`, txt);
      return false;
    }
  } catch (err) {
    console.error('OpenRouter error:', err.message);
    return false;
  }
}

async function main() {
  await testGemini();
  await testOpenRouter();
}

main();
