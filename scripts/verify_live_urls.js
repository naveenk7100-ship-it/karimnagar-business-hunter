const urls = [
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/famous-tattoos-fathepura/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/hair-lounge-salon-tattoos/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/la-delicious-bakery-karimnagar/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/pavan-furniture-world/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/peacock-restaurant-karimnagar/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/sri-chaitanya-coaching-karimnagar/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/star-fitness-gym-karimnagar/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/sumasri-digital-photo-karimnagar/',
  'https://naveenk7100-ship-it.github.io/karimnagar-business-demos/yashika-photography-karimnagar/'
];

async function check() {
  console.log('=== VERIFYING LIVE HTTP STATUS FOR ALL DEPLOYED URLS ===\n');
  const results = [];
  for (const u of urls) {
    try {
      const res = await fetch(u, { method: 'GET', signal: AbortSignal.timeout(10000) });
      const text = await res.text();
      const titleMatch = /<title>(.*?)<\/title>/i.exec(text);
      const title = titleMatch ? titleMatch[1] : 'No title';
      const hasPhotography = text.includes('images.unsplash.com');
      results.push({
        url: u,
        status: res.status,
        live: res.status === 200,
        title,
        hasPhotography
      });
    } catch (err) {
      results.push({
        url: u,
        status: 'ERR',
        live: false,
        error: err.message
      });
    }
  }
  console.table(results);
}
check();
