import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const genFile = path.join(__dirname, '../src/services/generator.js');

let content = fs.readFileSync(genFile, 'utf8').replace(/\r\n/g, '\n');

// 1. Remove aggregateRating from Schema.org JSON-LD
const oldJsonLd = `    "telephone": "\${lead.phone || ''}",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "\${lead.rating || '4.8'}",
      "reviewCount": "\${lead.reviewCount || '80'}"
    }`;
const newJsonLd = `    "telephone": "\${lead.phone || ''}"`;

if (content.includes(oldJsonLd)) {
  content = content.replace(oldJsonLd, newJsonLd);
  console.log('✅ Removed aggregateRating from Schema.org JSON-LD');
} else {
  console.log('⚠️ Could not find exact oldJsonLd');
}

// 2. Fix Hero full-bleed and section:not(.hero)
const oldHeroCss = `    /* Hero Section with Balanced Photographic Lighting and Responsive Viewport Alignment */
    .hero {
      position: relative;
      min-height: calc(100vh - var(--header-height));
      min-height: calc(100dvh - var(--header-height));
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: clamp(48px, 6vh, 80px) clamp(20px, 3vw, 40px);
      overflow: hidden;
      box-sizing: border-box;
      background: linear-gradient(180deg, rgba(12, 14, 18, 0.58) 0%, rgba(12, 14, 18, 0.40) 45%, rgba(12, 14, 18, 0.88) 100%),
                  url('\${heroImage}') center/cover no-repeat;
    }`;

const newHeroCss = `    /* Hero Section with Full-Bleed Viewport Width & Responsive Height */
    section.hero {
      position: relative;
      width: 100% !important;
      max-width: 100% !important;
      margin: 0 !important;
      left: 0;
      right: 0;
      min-height: clamp(540px, 78vh, 880px);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: clamp(64px, 8vh, 120px) clamp(20px, 4vw, 48px);
      overflow: hidden;
      box-sizing: border-box;
      background: linear-gradient(180deg, rgba(12, 14, 18, 0.65) 0%, rgba(12, 14, 18, 0.44) 45%, rgba(12, 14, 18, 0.94) 100%),
                  url('\${heroImage}') center/cover no-repeat;
      background-attachment: scroll;
    }`;

if (content.includes(oldHeroCss)) {
  content = content.replace(oldHeroCss, newHeroCss);
  console.log('✅ Replaced .hero CSS with section.hero full-bleed');
} else {
  console.log('⚠️ Could not find exact oldHeroCss');
}

// 3. Fix section selector so it does not constrain hero
const oldSectionCss = `    /* Section Styles */
    section {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: clamp(56px, 7vw, 92px) clamp(20px, 3.5vw, 44px);
      box-sizing: border-box;
    }`;

const newSectionCss = `    /* Section Styles */
    section:not(.hero) {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: clamp(56px, 7vw, 92px) clamp(20px, 3.5vw, 44px);
      box-sizing: border-box;
    }`;

if (content.includes(oldSectionCss)) {
  content = content.replace(oldSectionCss, newSectionCss);
  console.log('✅ Changed section to section:not(.hero)');
} else {
  console.log('⚠️ Could not find exact oldSectionCss');
}

// 4. Remove rating pill from hero highlights
const oldHeroPills = `        <div class="hero-highlights">
          <div class="highlight-pill">
            <span class="pill-icon">📍</span>
            <span class="pill-text">\${this._escape(lead.landmark || 'Karimnagar, Telangana')}</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">★</span>
            <span class="pill-text">\${lead.rating || '4.8'} (\${lead.reviewCount || '80'}+ Verified Reviews)</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">🛡️</span>
            <span class="pill-text">\${this._escape(categoryName)}</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">💬</span>
            <span class="pill-text">Direct WhatsApp Enquiry</span>
          </div>
        </div>`;

const newHeroPills = `        <div class="hero-highlights">
          <div class="highlight-pill">
            <span class="pill-icon">📍</span>
            <span class="pill-text">\${this._escape(lead.landmark || 'Karimnagar, Telangana')}</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">🛡️</span>
            <span class="pill-text">\${this._escape(categoryName)}</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">⚡</span>
            <span class="pill-text">Prompt Local Customer Care</span>
          </div>
          <div class="highlight-pill">
            <span class="pill-icon">💬</span>
            <span class="pill-text">Direct WhatsApp Enquiry</span>
          </div>
        </div>`;

if (content.includes(oldHeroPills)) {
  content = content.replace(oldHeroPills, newHeroPills);
  console.log('✅ Replaced rating pill with Prompt Local Customer Care');
} else {
  console.log('⚠️ Could not find exact oldHeroPills');
}

fs.writeFileSync(genFile, content, 'utf8');
console.log('generator.js patching complete.');
