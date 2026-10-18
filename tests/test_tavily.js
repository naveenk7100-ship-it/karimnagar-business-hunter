import { CONFIG } from '../src/config.js';

async function testTavily() {
  const key = CONFIG.TAVILY_API_KEY;
  if (!key) {
    console.log('No TAVILY_API_KEY found');
    return;
  }
  
  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: key,
        query: 'salons tattoo gym Karimnagar Telangana phone address',
        search_depth: 'basic',
        include_domains: [],
        max_results: 5
      })
    });
    const data = await res.json();
    console.log('Tavily response status:', res.status);
    if (data.results) {
      console.log('Tavily results count:', data.results.length);
      data.results.forEach(r => console.log(`- ${r.title}: ${r.url}`));
    } else {
      console.log('Tavily response:', data);
    }
  } catch (err) {
    console.error('Tavily error:', err.message);
  }
}

testTavily();
