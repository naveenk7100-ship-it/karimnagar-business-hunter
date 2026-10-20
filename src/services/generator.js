import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';
import { aiService } from './ai.js';
import { store } from './store.js';
import { designEngine } from './designEngine.js';
import { categoryRegistry } from './categoryRegistry.js';
import { getCategoryAssets, renderCategoryMicroComponent } from './visualComponents.js';

export class WebsiteGenerator {
  /**
   * Generates a unique, agency-grade concept website for a business lead
   */
  async generateWebsite(lead) {
    const demoDir = path.join(CONFIG.DEMOS_DIR, lead.slug);
    if (!fs.existsSync(demoDir)) {
      fs.mkdirSync(demoDir, { recursive: true });
    }

    // Versioning check: "Never overwrite approved demos without preserving prior versions"
    const targetFile = path.join(demoDir, 'index.html');
    if (fs.existsSync(targetFile)) {
      const backupDir = path.join(demoDir, 'versions');
      if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
      const versionFile = path.join(backupDir, `index.${Date.now()}.html`);
      fs.copyFileSync(targetFile, versionFile);
    }

    // Compute category-aware archetype and design fingerprint
    const existingDemos = typeof store.getDemos === 'function' ? store.getDemos() : [];
    const existingFingerprints = existingDemos.map(d => d.designFingerprint).filter(Boolean);
    const { archetype, fingerprint } = designEngine.createDesignFingerprint(lead, existingFingerprints);

    // Generate tailored design blueprint using AI / heuristic engine
    const blueprint = await aiService.generateDesignBlueprint(lead);

    const mergedBlueprint = {
      ...blueprint,
      primaryColor: fingerprint.primaryColor,
      accentColor: fingerprint.accentColor,
      bgDark: fingerprint.bgDark,
      fontFamily: fingerprint.fontHeading,
      fontBody: fingerprint.fontBody,
      archetype,
      fingerprint
    };

    // Build the standalone HTML document
    const html = this._buildHtml(lead, mergedBlueprint);

    // Write file
    fs.writeFileSync(targetFile, html, 'utf8');

    return {
      slug: lead.slug,
      filePath: targetFile,
      relativeUrl: `/demos/${lead.slug}/index.html`,
      theme: mergedBlueprint.theme || archetype.name,
      archetype,
      designFingerprint: fingerprint,
      generatedAt: new Date().toISOString()
    };
  }

  _buildHtml(lead, bp) {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const makeWaUrl = (text) => `https://wa.me/${waPhone}?text=${encodeURIComponent(text || `Hi ${lead.name}, I am contacting you regarding your services in Karimnagar.`)}`;
    const defaultWaLink = makeWaUrl();
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lead.name} ${lead.address}`)}`;

    const resolvedCat = categoryRegistry.resolveCategory(lead);
    const categoryName = resolvedCat.displayName;
    const bgDark = bp.archetype?.theme?.bgDark || bp.bgDark || '#0f1115';
    const surfaceDark = bp.archetype?.theme?.surfaceDark || '#1a1d24';
    const primary = bp.archetype?.theme?.primary || bp.primaryColor || '#c9a050';
    const accent = bp.archetype?.theme?.accent || bp.accentColor || '#3d72b4';
    const font = bp.archetype?.typography?.heading || bp.fontFamily || 'Plus Jakarta Sans';

    // Retrieve curated photographic assets and interactive micro-component
    const assets = getCategoryAssets(lead);
    const heroImage = assets.heroImage || '';
    const galleryItems = assets.items || [];
    const microComponentHtml = renderCategoryMicroComponent(lead, waPhone);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this._escape(lead.name)} | ${this._escape(categoryName)} in Karimnagar, Telangana</title>
  <meta name="description" content="Discover ${this._escape(lead.name)} in Karimnagar, Telangana. ${this._escape(bp.hero.subheadline)}">
  
  <!-- OpenGraph / Social Metadata -->
  <meta property="og:title" content="${this._escape(lead.name)} - Karimnagar">
  <meta property="og:description" content="${this._escape(bp.hero.subheadline)}">
  <meta property="og:type" content="business.business">
  <meta property="og:locale" content="en_IN">
  
  <!-- Google Fonts Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${bp.archetype?.typography?.googleFontQuery ? bp.archetype.typography.googleFontQuery : encodeURIComponent(font) + ':wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700'}&display=swap" rel="stylesheet">
  
  <!-- Three.js for 3D Hero Particles -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

  <!-- Structured Data: Schema.org LocalBusiness -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "${this._escape(lead.name)}",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "${this._escape(lead.address)}",
      "addressLocality": "Karimnagar",
      "addressRegion": "Telangana",
      "postalCode": "505001",
      "addressCountry": "IN"
    },
    "telephone": "${lead.phone || ''}",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "${lead.rating || '4.8'}",
      "reviewCount": "${lead.reviewCount || '80'}"
    }
  }
  </script>

  <style>
    :root {
      --bg: ${bp.bgDark || bgDark};
      --surface: ${bp.archetype?.theme?.surfaceDark || surfaceDark};
      --surface-hover: ${bp.archetype?.theme?.surfaceHover || '#222530'};
      --primary: ${primary};
      --accent: ${accent};
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --border: ${bp.archetype?.theme?.border || 'rgba(255, 255, 255, 0.08)'};
      --font-heading: '${font}', ${bp.archetype?.typography?.headingFallback || 'sans-serif'};
      --font-body: '${bp.fontBody || 'Plus Jakarta Sans'}', sans-serif;
      --radius: 14px;
      --shadow: 0 10px 30px rgba(0,0,0,0.5);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
    }

    /* Navigation */
    nav {
      max-width: 1200px;
      margin: 0 auto;
      padding: 18px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 20;
    }
    .brand {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.35rem;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }
    .brand-badge {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.1);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 20px;
      border: 1px solid var(--border);
    }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: #fff; }
    .btn-nav {
      background: var(--primary);
      color: #000;
      font-weight: 700;
      padding: 10px 20px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 0.9rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-nav:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255,255,255,0.2);
    }

    /* Hero Section with Photographic Backdrop and 3D Canvas */
    .hero {
      position: relative;
      min-height: 85vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 90px 24px 80px;
      overflow: hidden;
      background: linear-gradient(180deg, rgba(13, 15, 20, 0.82) 0%, rgba(13, 15, 20, 0.94) 100%),
                  url('${heroImage}') center/cover no-repeat;
    }
    #three-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.55;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 860px;
      margin: 0 auto;
    }
    .hero-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--border);
      color: var(--primary);
      font-size: 0.85rem;
      padding: 6px 16px;
      border-radius: 30px;
      margin-bottom: 20px;
      font-weight: 600;
      backdrop-filter: blur(8px);
    }
    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(2.4rem, 5vw, 4rem);
      line-height: 1.15;
      font-weight: 800;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
      background: linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero p {
      font-size: clamp(1.05rem, 2vw, 1.25rem);
      color: var(--text-muted);
      margin-bottom: 36px;
      max-width: 680px;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-ctas {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .btn-primary {
      background: var(--primary);
      color: #000;
      font-weight: 700;
      padding: 15px 32px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 1.05rem;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(255, 255, 255, 0.25);
    }
    .btn-secondary {
      background: rgba(255, 255, 255, 0.07);
      color: #fff;
      font-weight: 600;
      padding: 15px 28px;
      border-radius: 30px;
      text-decoration: none;
      font-size: 1.05rem;
      border: 1px solid var(--border);
      backdrop-filter: blur(10px);
      transition: background 0.2s;
    }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.12); }

    /* Section Styles */
    section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px;
    }
    .section-header {
      text-align: center;
      margin-bottom: 50px;
    }
    .section-tag {
      color: var(--primary);
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
      display: block;
    }
    .section-title {
      font-family: var(--font-heading);
      font-size: clamp(1.8rem, 3.5vw, 2.5rem);
      font-weight: 800;
      color: #fff;
    }

    /* Photographic Showcase Gallery */
    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 28px;
    }
    .card-gallery {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    .card-gallery:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    }
    .gallery-img-wrap {
      position: relative;
      width: 100%;
      height: 220px;
      overflow: hidden;
      background: #111;
    }
    .gallery-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card-gallery:hover .gallery-img-wrap img {
      transform: scale(1.05);
    }
    .gallery-tag {
      position: absolute;
      top: 12px;
      right: 12px;
      background: rgba(0, 0, 0, 0.75);
      color: var(--primary);
      border: 1px solid var(--border);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      backdrop-filter: blur(6px);
    }
    .gallery-info {
      padding: 20px 22px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .gallery-info h4 {
      font-family: var(--font-heading);
      color: #fff;
      font-size: 1.15rem;
      margin-bottom: 8px;
    }
    .gallery-info p {
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* Advantages Grid */
    .grid-advantages {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .card-advantage {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px 28px;
      transition: transform 0.3s, border-color 0.3s;
    }
    .card-advantage:hover {
      transform: translateY(-6px);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .card-advantage h3 {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      color: #fff;
      margin-bottom: 12px;
    }
    .card-advantage p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Services Grid */
    .grid-services {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
      gap: 24px;
    }
    .card-service {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: background 0.2s, transform 0.2s;
    }
    .card-service:hover {
      background: var(--surface-hover);
      transform: translateY(-4px);
    }
    .service-cat {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--primary);
      font-weight: 700;
      margin-bottom: 8px;
    }
    .card-service h4 {
      font-family: var(--font-heading);
      font-size: 1.2rem;
      color: #fff;
      margin-bottom: 10px;
    }
    .card-service p {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
    .service-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid var(--border);
    }
    .service-price {
      font-weight: 700;
      font-size: 1.1rem;
      color: #fff;
    }
    .btn-book-sm {
      background: rgba(255,255,255,0.08);
      color: #fff;
      padding: 6px 14px;
      border-radius: 20px;
      text-decoration: none;
      font-size: 0.8rem;
      font-weight: 600;
      transition: background 0.2s;
    }
    .btn-book-sm:hover { background: var(--primary); color: #000; }

    /* Interactive Callout Card */
    .interactive-card {
      background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.08));
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 40px;
      margin: 40px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 32px;
      align-items: center;
      justify-content: space-between;
    }
    .interactive-card h3 {
      font-family: var(--font-heading);
      font-size: 1.8rem;
      color: #fff;
      margin-bottom: 10px;
    }

    /* FAQ Section */
    .faq-list {
      max-width: 800px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .faq-item {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
    }
    .faq-item h4 {
      font-size: 1.05rem;
      color: #fff;
      margin-bottom: 6px;
    }
    .faq-item p {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Verified Location & Map Section */
    .location-box {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px;
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: space-between;
      align-items: center;
    }
    .location-details h4 {
      font-family: var(--font-heading);
      font-size: 1.3rem;
      color: #fff;
      margin-bottom: 8px;
    }
    .location-details p {
      color: var(--text-muted);
      font-size: 0.95rem;
      max-width: 500px;
    }

    /* Footer */
    footer {
      border-top: 1px solid var(--border);
      padding: 60px 24px 100px;
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    /* Floating WhatsApp Button */
    .floating-wa {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #25d366;
      color: #fff;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
      z-index: 99;
      text-decoration: none;
      transition: transform 0.2s;
    }
    .floating-wa:hover { transform: scale(1.1); }
    .floating-wa svg { width: 30px; height: 30px; fill: currentColor; }

    /* Mobile Bottom Action Bar */
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .grid-gallery { grid-template-columns: 1fr; }
      .mobile-action-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(13, 13, 17, 0.96);
        border-top: 1px solid var(--border);
        display: flex;
        z-index: 98;
        backdrop-filter: blur(12px);
      }
      .mobile-action-bar a {
        flex: 1;
        text-align: center;
        padding: 14px 8px;
        color: #fff;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        border-right: 1px solid var(--border);
      }
      .mobile-action-bar a:last-child { border-right: none; }
      .mobile-action-bar a.btn-wa-action {
        background: #25d366;
        color: #000;
        font-weight: 700;
      }
      .floating-wa { bottom: 76px; }
      body { padding-bottom: 60px; }
    }
  </style>
</head>
<body>

  <!-- Header & Navigation -->
  <nav>
    <a href="#hero" class="brand">
      <span>${this._escape(lead.name)}</span>
      <span class="brand-badge">Karimnagar</span>
    </a>
    <div class="nav-links">
      <a href="#advantages">Why Us</a>
      <a href="#gallery">Showcase</a>
      <a href="#services">Services</a>
      <a href="#faq">FAQ</a>
      <a href="#location">Find Us</a>
      <a href="${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-nav">WhatsApp Booking</a>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="hero" id="hero">
    <canvas id="three-canvas" aria-hidden="true"></canvas>
    <div class="hero-content">
      <div class="hero-badge">${this._escape(bp.hero.badgeText)}</div>
      <h1>${this._escape(bp.hero.headline)}</h1>
      <p>${this._escape(bp.hero.subheadline)}</p>
      <div class="hero-ctas">
        <a href="${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
          ${this._escape(bp.hero.ctaText)}
        </a>
        <a href="tel:${cleanPhone}" class="btn-secondary">
          📞 Call ${this._escape(lead.phoneDisplay || lead.phone || 'Studio')}
        </a>
      </div>
    </div>
  </section>

  <!-- Advantages / Highlights Section -->
  <section id="advantages">
    <div class="section-header">
      <span class="section-tag">Distinctive Quality</span>
      <h2 class="section-title">Built for Karimnagar's Best</h2>
    </div>
    <div class="grid-advantages">
      ${bp.advantages.map(adv => `
        <div class="card-advantage">
          <h3>${this._escape(adv.title)}</h3>
          <p>${this._escape(adv.desc)}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Curated Category Photography Showcase -->
  <section id="gallery">
    <div class="section-header">
      <span class="section-tag">${this._escape(categoryName)} Visual Showcase</span>
      <h2 class="section-title">Verified Portfolio & Standards</h2>
      <p style="color: var(--text-muted); max-width: 600px; margin: 10px auto 0;">Authentic glimpses into our daily work, facilities, and signature service quality in Karimnagar.</p>
    </div>
    <div class="grid-gallery">
      ${galleryItems.map(item => `
        <div class="card-gallery">
          <div class="gallery-img-wrap">
            <img src="${item.img}" alt="${this._escape(item.title)}" loading="lazy" width="600" height="400">
            <span class="gallery-tag">${this._escape(item.tag)}</span>
          </div>
          <div class="gallery-info">
            <h4>${this._escape(item.title)}</h4>
            <p>${this._escape(item.desc)}</p>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Bespoke Interactive Micro-Component Section -->
  ${microComponentHtml}

  <!-- Services Showcase -->
  <section id="services">
    <div class="section-header">
      <span class="section-tag">Popular Offerings</span>
      <h2 class="section-title">Signature Offerings & Transparent Pricing</h2>
    </div>
    <div class="grid-services">
      ${bp.services.map(srv => `
        <div class="card-service">
          <div>
            <div class="service-cat">${this._escape(srv.category)}</div>
            <h4>${this._escape(srv.name)}</h4>
            <p>${this._escape(srv.desc)}</p>
          </div>
          <div class="service-footer">
            <span class="service-price">${this._escape(srv.price)}</span>
            <a href="${makeWaUrl(`Hi ${lead.name}, I would like to enquire about ${srv.name}`)}" target="_blank" rel="noopener noreferrer" class="btn-book-sm">Enquire on WhatsApp</a>
          </div>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Interactive Callout -->
  <section>
    <div class="interactive-card">
      <div>
        <h3>Need custom requirements or personalized assistance?</h3>
        <p style="color: var(--text-muted); max-width: 500px;">Direct WhatsApp consultation connects you immediately with our team in Karimnagar.</p>
      </div>
      <a href="${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">Chat with Us Now</a>
    </div>
  </section>

  <!-- FAQ Section -->
  <section id="faq">
    <div class="section-header">
      <span class="section-tag">Common Enquiries</span>
      <h2 class="section-title">Frequently Asked Questions</h2>
    </div>
    <div class="faq-list">
      ${bp.faq.map(f => `
        <div class="faq-item">
          <h4>${this._escape(f.q)}</h4>
          <p>${this._escape(f.a)}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Verified Location & Contact Section -->
  <section id="location">
    <div class="section-header">
      <span class="section-tag">Visit In Person</span>
      <h2 class="section-title">Location & Verified Address</h2>
    </div>
    <div class="location-box">
      <div class="location-details">
        <h4>${this._escape(lead.name)}</h4>
        <p>📍 ${this._escape(lead.address)}</p>
        <p style="margin-top: 6px;">📞 Phone: <strong>${this._escape(lead.phoneDisplay || lead.phone || 'Available via WhatsApp')}</strong></p>
        <p style="margin-top: 6px; font-size: 0.88rem; color: var(--text-muted);">Serving Karimnagar, Telangana and surrounding communities with premium quality service.</p>
      </div>
      <div>
        <a href="${mapsLink}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
          🗺️ Open in Google Maps
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <p>© ${new Date().getFullYear()} ${this._escape(lead.name)}. All rights reserved.</p>
    <p style="margin-top: 8px; font-size: 0.85rem; color: var(--text-muted);">${this._escape(lead.address)}</p>
  </footer>

  <!-- Floating WhatsApp CTA (Desktop & Mobile) -->
  <a href="${defaultWaLink}" class="floating-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
  </a>

  <!-- Mobile Bottom Action Bar -->
  <div class="mobile-action-bar" aria-label="Mobile Navigation">
    <a href="tel:${cleanPhone}">
      <span>📞</span>
      <span>Call</span>
    </a>
    <a href="${mapsLink}" target="_blank" rel="noopener noreferrer">
      <span>📍</span>
      <span>Directions</span>
    </a>
    <a href="${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-wa-action">
      <span>💬</span>
      <span>WhatsApp</span>
    </a>
  </div>

  <!-- Three.js Interactive Particle Background with CSS fallback -->
  <script>
    (function init3DHero() {
      const canvas = document.getElementById('three-canvas');
      if (!canvas || typeof THREE === 'undefined') return;

      try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 25;

        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particle Geometry
        const particleCount = 200;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPrimary = new THREE.Color('${primary}');
        const colorAccent = new THREE.Color('${accent}');

        for (let i = 0; i < particleCount; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 50;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

          const mixedColor = colorPrimary.clone().lerp(colorAccent, Math.random());
          colors[i * 3] = mixedColor.r;
          colors[i * 3 + 1] = mixedColor.g;
          colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.6,
          vertexColors: true,
          transparent: true,
          opacity: 0.8
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        let mouseX = 0, mouseY = 0;
        window.addEventListener('mousemove', (e) => {
          mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
          mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
        }, { passive: true });

        function animate() {
          requestAnimationFrame(animate);
          particles.rotation.y += 0.0015;
          particles.rotation.x += 0.0008;

          particles.position.x += (mouseX * 5 - particles.position.x) * 0.05;
          particles.position.y += (-mouseY * 5 - particles.position.y) * 0.05;

          renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
          const w = canvas.parentElement.clientWidth;
          const h = canvas.parentElement.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        });
      } catch (err) {
        console.warn('3D canvas fallback active:', err);
      }
    })();
  </script>
</body>
</html>`;
  }

  _escape(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}

export const websiteGenerator = new WebsiteGenerator();
