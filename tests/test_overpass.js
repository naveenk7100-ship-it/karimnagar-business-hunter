async function testOverpass() {
  const query = `[out:json][timeout:25];
(
  node["shop"](18.38,79.08,18.48,79.18);
  node["amenity"](18.38,79.08,18.48,79.18);
  node["leisure"](18.38,79.08,18.48,79.18);
);
out body 25;`;
  
  const endpoints = [
    'https://overpass-api.de/api/interpreter',
    'https://lz4.overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter'
  ];

  for (const ep of endpoints) {
    try {
      console.log('Querying:', ep);
      const res = await fetch(ep + '?data=' + encodeURIComponent(query), {
        headers: { 'User-Agent': 'KarimnagarLeadHunter/1.0' }
      });
      if (res.ok) {
        const data = await res.json();
        console.log('Success! Element count:', data.elements?.length);
        const named = (data.elements || []).filter(e => e.tags?.name);
        console.log('Named businesses count:', named.length);
        named.slice(0, 10).forEach(e => {
          console.log(`- ${e.tags.name} | ${e.tags.shop || e.tags.amenity || e.tags.leisure} | Phone: ${e.tags.phone || e.tags['contact:phone'] || 'N/A'}`);
        });
        return;
      }
    } catch (e) {
      console.warn('Failed endpoint', ep, e.message);
    }
  }
}

testOverpass();
