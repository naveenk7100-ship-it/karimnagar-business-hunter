import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../src/config.js';
import { websiteGenerator } from '../src/services/generator.js';
import { qaEngine } from '../src/services/qa.js';
import { categoryRegistry } from '../src/services/categoryRegistry.js';
import { gitHubPagesDeployer } from '../src/services/deployer.js';

async function main() {
  console.log('=== KARIMNAGAR BUSINESS HUNTER: BATCH DEMO REGENERATION ===');
  const leadsPath = path.join(CONFIG.DATA_DIR, 'discovered_leads.json');
  if (!fs.existsSync(leadsPath)) {
    throw new Error(`Leads file not found at ${leadsPath}`);
  }

  const leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  console.log(`Found ${leads.length} business leads to process.\n`);

  const stagingDir = path.join(CONFIG.DATA_DIR, 'git_staging');
  if (!fs.existsSync(stagingDir)) {
    fs.mkdirSync(stagingDir, { recursive: true });
  }

  const results = [];

  for (const lead of leads) {
    const resolvedCat = categoryRegistry.resolveCategory(lead);
    console.log(`[GENERATE] Processing ${lead.name} (${lead.slug})...`);
    console.log(`           Category: ${resolvedCat.displayName}`);

    // Generate fresh tailored concept website
    const gen = await websiteGenerator.generateWebsite(lead);

    // QA Audit & Automated Repair
    const qa = await qaEngine.auditAndRepair(gen.filePath, lead);
    console.log(`           QA Score: ${qa.score}/100 (Pass: ${qa.pass})`);

    // Verify category safety
    const html = fs.readFileSync(gen.filePath, 'utf8');
    const safety = categoryRegistry.validateContentSafety(resolvedCat.id, html);
    if (!safety.safe) {
      console.error(`           ❌ Category Contamination Detected: ${safety.violations.join(', ')}`);
    } else {
      console.log(`           ✅ Category Safety Verified (Zero contamination)`);
    }

    // Mirror to staging directory
    const stagingSubdir = path.join(stagingDir, lead.slug);
    if (!fs.existsSync(stagingSubdir)) fs.mkdirSync(stagingSubdir, { recursive: true });
    fs.copyFileSync(gen.filePath, path.join(stagingSubdir, 'index.html'));

    // Also mirror to public/demos
    const publicSubdir = path.join(CONFIG.DEMOS_DIR, lead.slug);
    if (!fs.existsSync(publicSubdir)) fs.mkdirSync(publicSubdir, { recursive: true });
    fs.copyFileSync(gen.filePath, path.join(publicSubdir, 'index.html'));

    results.push({
      id: lead.id,
      name: lead.name,
      slug: lead.slug,
      category: resolvedCat.displayName,
      qaScore: qa.score,
      safe: safety.safe,
      violations: safety.violations
    });

    console.log('');
  }

  // Generate Hub Index in git_staging
  console.log('[HUB] Generating public showcase directory in data/git_staging/index.html...');
  const hubHtml = `<!DOCTYPE html>
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
      ${leads.map(lead => {
        const cat = categoryRegistry.resolveCategory(lead);
        return `
        <a href="./${lead.slug}/" class="card">
          <div>
            <div class="card-cat">${cat.displayName}</div>
            <h3>${lead.name}</h3>
            <p>${lead.websiteGapDetails || 'Serving Karimnagar with verified craftsmanship, transparent offerings, and direct WhatsApp booking.'}</p>
          </div>
          <div class="card-footer">
            <span>Explore Experience</span>
            <span>→</span>
          </div>
        </a>
        `;
      }).join('')}
    </div>

    <footer>
      <p>© ${new Date().getFullYear()} Karimnagar Commercial Showcase. All rights reserved.</p>
      <p style="margin-top: 6px; font-size: 0.82rem;">Telangana Verified Local Business Ecosystem</p>
    </footer>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(stagingDir, 'index.html'), hubHtml, 'utf8');
  console.log('✅ Hub index generated successfully.');

  console.log('\n=== REGENERATION SUMMARY ===');
  console.table(results);
}

main().catch(err => {
  console.error('Fatal error during batch demo regeneration:', err);
  process.exit(1);
});
