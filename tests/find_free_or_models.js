async function findFreeModels() {
  const res = await fetch('https://openrouter.ai/api/v1/models');
  const data = await res.json();
  const freeModels = data.data.filter(m => m.id.endsWith(':free') || (m.pricing?.prompt === '0' && m.pricing?.completion === '0'));
  console.log('Available free OpenRouter models:', freeModels.length);
  freeModels.slice(0, 10).forEach(m => console.log(`- ${m.id} (${m.name})`));
}

findFreeModels();
