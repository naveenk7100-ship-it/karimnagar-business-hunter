import { CONFIG } from '../src/config.js';

async function testPlaces() {
  const key = CONFIG.GOOGLE_PLACES_API_KEY;
  if (!key) {
    console.log('No GOOGLE_PLACES_API_KEY found');
    return;
  }
  
  const query = 'salons in Karimnagar Telangana';
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${key}`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Google Places status:', data.status);
    if (data.results) {
      console.log('Results count:', data.results.length);
      data.results.slice(0, 5).forEach(r => {
        console.log(`- ${r.name} | Rating: ${r.rating} (${r.user_ratings_total}) | Address: ${r.formatted_address}`);
      });
    }
  } catch (err) {
    console.error('Places API error:', err.message);
  }
}

testPlaces();
