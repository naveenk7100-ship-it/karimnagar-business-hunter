async function queryCategories() {
  const query = `[out:json][timeout:25];
(
  node["shop"~"beauty|hairdresser|tattoo|boutique|clothes|furniture|bakery"](18.39,79.09,18.47,79.17);
  node["amenity"~"restaurant|cafe|fast_food|gym"](18.39,79.09,18.47,79.17);
  node["leisure"~"fitness_centre"](18.39,79.09,18.47,79.17);
);
out body 40;`;

  const endpoints = [
    'https://lz4.overpass-api.de/api/interpreter',
    'https://overpass-api.de/api/interpreter'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep + '?data=' + encodeURIComponent(query));
      if (res.ok) {
        const json = await res.json();
        console.log('Received:', json.elements.length, 'elements');
        json.elements.forEach(el => {
          if (el.tags?.name) {
            console.log(JSON.stringify({
              id: el.id,
              name: el.tags.name,
              category: el.tags.shop || el.tags.amenity || el.tags.leisure,
              street: el.tags['addr:street'] || el.tags['addr:full'] || 'Karimnagar',
              phone: el.tags.phone || el.tags['contact:phone'] || null,
              website: el.tags.website || el.tags['contact:website'] || null,
              lat: el.lat,
              lon: el.lon
            }));
          }
        });
        return;
      }
    } catch (e) {
      console.log('Error', ep, e.message);
    }
  }
}

queryCategories();
