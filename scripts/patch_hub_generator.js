import fs from 'node:fs';
import path from 'node:path';

const regenPath = path.resolve('scripts/regenerate_all_demos.js');
let regenContent = fs.readFileSync(regenPath, 'utf8');

const targetOld = `  // Generate Hub Index in git_staging
  console.log('[HUB] Generating public showcase directory in data/git_staging/index.html...');
  const hubHtml = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Karimnagar Commercial Showcase | Premier Business Directory</title>
  <meta name="description" content="Discover verified premium local businesses, artisan studios, restaurants, and educational centres across Karimnagar, Telangana.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f17;
      --surface: #131b2a;
      --surface-hover: #1c273c;
      --primary: #38bdf8;
      --accent: #f59e0b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
      --radius: 14px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
      padding: 60px 20px 100px;
    }
    .container { max-width: 1140px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 56px; }
    .badge {
      display: inline-block;
      font-size: 0.8rem;
      background: rgba(56, 189, 248, 0.12);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 6px 16px;
      border-radius: 30px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      font-size: clamp(2.2rem, 4vw, 3.2rem);
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.5px;
      margin-bottom: 16px;
    }
    p.subtitle {
      color: var(--text-muted);
      font-size: 1.15rem;
      max-width: 680px;
      margin: 0 auto;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 28px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
      background: var(--surface-hover);
    }
    .card-cat {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--accent);
      margin-bottom: 10px;
    }
    .card h3 {
      color: #fff;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.92rem;
      margin-bottom: 22px;
      flex: 1;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      padding-top: 16px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary);
    }
    footer {
      text-align: center;
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.88rem;
      border-top: 1px solid var(--border);
      padding-top: 32px;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">Karimnagar, Telangana</div>
      <h1>Premier Commercial Directory & Showcase</h1>
      <p class="subtitle">Curated verified businesses, high-craft digital portfolios, and seamless direct customer communication.</p>
    </header>

    <div class="grid">
      \${leads.map(lead => {
        const cat = categoryRegistry.resolveCategory(lead);
        return \`
        <a href="./\${lead.slug}/" class="card">
          <div>
            <div class="card-cat">\${cat.displayName}</div>
            <h3>\${lead.name}</h3>
            <p>\${lead.websiteGapDetails || 'Serving Karimnagar with verified craftsmanship, transparent offerings, and direct WhatsApp booking.'}</p>
          </div>
          <div class="card-footer">
            <span>Explore Experience</span>
            <span>→</span>
          </div>
        </a>
        \`;
      }).join('')}
    </div>

    <footer>
      <p>© \${new Date().getFullYear()} Karimnagar Commercial Showcase. All rights reserved.</p>
      <p style="margin-top: 6px; font-size: 0.82rem;">Telangana Verified Local Business Ecosystem</p>
    </footer>
  </div>
</body>
</html>\`;`;

const targetNew = `  // Generate Hub Index in git_staging
  console.log('[HUB] Generating public showcase directory in data/git_staging/index.html...');

  const CONCEPT_SUMMARIES = {
    'hair-lounge-salon-tattoos': 'Luxury salon styling, precision beard grooming, and custom tattoo consultations with direct WhatsApp booking.',
    'star-fitness-gym-karimnagar': 'Unisex air-conditioned gym featuring Olympic lifting platforms, personalized transformation coaching, and interactive BMI tools.',
    'yashika-photography-karimnagar': 'Cinematic 4K wedding films, authentic candid muhurtham moments, and interactive season date availability checker.',
    'pavan-furniture-world': 'Kiln-seasoned solid teak living collections, hydraulic storage beds, and showroom catalogue requests via WhatsApp.',
    'sri-chaitanya-coaching-karimnagar': 'Integrated IIT-JEE, NEET Medical entrance curriculum tracks, and personalized academic counseling sessions.',
    'peacock-restaurant-karimnagar': 'Authentic Hyderabadi dum biryani, tandoori clay oven delicacies, and advance family dining table reservations.',
    'famous-tattoos-fathepura': 'Custom fine-line tattoo art, clinical sterile single-use equipment protocol, and direct reference consultations.',
    'sumasri-digital-photo-karimnagar': 'Studio portraiture, traditional milestone family portraits, and digital restoration of damaged heirloom photographs.',
    'la-delicious-bakery-karimnagar': 'Oven-fresh pastries, artisanal celebration cakes, and interactive custom cake weight price estimator.'
  };

  const hubHtml = \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Karimnagar Commercial Showcase | Digital Demonstration Hub</title>
  <meta name="description" content="Independent concept showcase featuring bespoke modern digital experiences for local businesses in Karimnagar, Telangana.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b0f17;
      --surface: #131b2a;
      --surface-hover: #1c273c;
      --primary: #38bdf8;
      --accent: #f59e0b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.08);
      --radius: 14px;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.6;
      padding: clamp(40px, 6vw, 70px) clamp(20px, 4vw, 40px) 100px;
    }
    .container { max-width: 1320px; margin: 0 auto; }
    header { text-align: center; margin-bottom: 48px; }
    .badge {
      display: inline-block;
      font-size: 0.8rem;
      background: rgba(56, 189, 248, 0.12);
      color: var(--primary);
      border: 1px solid rgba(56, 189, 248, 0.25);
      padding: 6px 18px;
      border-radius: 30px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      font-size: clamp(2.2rem, 3.8vw, 3.2rem);
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.5px;
      margin-bottom: 16px;
      text-wrap: balance;
    }
    p.subtitle {
      color: var(--text-muted);
      font-size: clamp(1rem, 1.2vw, 1.2rem);
      max-width: 740px;
      margin: 0 auto;
    }
    .disclaimer-banner {
      max-width: 820px;
      margin: 24px auto 0;
      padding: 14px 22px;
      background: rgba(56, 189, 248, 0.07);
      border: 1px solid rgba(56, 189, 248, 0.22);
      border-radius: 10px;
      font-size: 0.85rem;
      color: #94a3b8;
      line-height: 1.5;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 360px), 1fr));
      gap: clamp(20px, 2.5vw, 32px);
      margin-top: 48px;
    }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      text-decoration: none;
      color: inherit;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
    }
    .card:hover {
      transform: translateY(-5px);
      border-color: rgba(56, 189, 248, 0.4);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
      background: var(--surface-hover);
    }
    .card-cat {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .card h3 {
      color: #fff;
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .card-location {
      font-size: 0.82rem;
      color: var(--primary);
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .card p {
      color: var(--text-muted);
      font-size: 0.92rem;
      margin-bottom: 22px;
      flex: 1;
      line-height: 1.55;
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid var(--border);
      padding-top: 16px;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--primary);
    }
    footer {
      text-align: center;
      margin-top: 80px;
      color: var(--text-muted);
      font-size: 0.85rem;
      border-top: 1px solid var(--border);
      padding-top: 32px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">Concept Design Showcase</div>
      <h1>Karimnagar Commercial Experience Hub</h1>
      <p class="subtitle">Independent concept prototypes and interactive digital demonstrations developed for premier local businesses across Karimnagar, Telangana.</p>
      <div class="disclaimer-banner">
        ℹ️ <strong>Demonstration Showcase:</strong> These pages are independent digital design concepts created to showcase modern responsive layouts, bespoke category typography, and interactive WhatsApp communication. All brand names and trademarks belong to their respective local business owners.
      </div>
    </header>

    <div class="grid">
      \${leads.map(lead => {
        const cat = categoryRegistry.resolveCategory(lead);
        const summary = CONCEPT_SUMMARIES[lead.slug] || 'Interactive digital experience demonstrating bespoke category layout, verified visual curation, and direct WhatsApp communication.';
        return \`
        <a href="./\${lead.slug}/" class="card">
          <div>
            <div class="card-cat">\${cat.displayName}</div>
            <h3>\${lead.name}</h3>
            <div class="card-location">📍 \${lead.landmark || lead.address || 'Karimnagar, Telangana'}</div>
            <p>\${summary}</p>
          </div>
          <div class="card-footer">
            <span>View Concept Demo</span>
            <span>→</span>
          </div>
        </a>
        \`;
      }).join('')}
    </div>

    <footer>
      <p>© \${new Date().getFullYear()} Karimnagar Commercial Showcase. Independent digital design concept portfolio.</p>
      <p style="margin-top: 6px; font-size: 0.8rem; color: #64748b;">Built with modern responsive web standards, high-resolution visual curation, and direct client communication channels.</p>
    </footer>
  </div>
</body>
</html>\`;`;

let norm = regenContent.replace(/\r\n/g, '\n');
if (norm.includes(targetOld)) {
  norm = norm.replace(targetOld, targetNew);
  fs.writeFileSync(regenPath, norm, 'utf8');
  console.log('✅ scripts/regenerate_all_demos.js Hub generator updated!');
} else {
  console.warn('⚠️ targetOld still not found. Let us inspect target snippet');
}
