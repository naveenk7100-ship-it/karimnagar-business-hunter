import fs from 'node:fs';
import path from 'node:path';

const genPath = path.resolve('src/services/generator.js');
let content = fs.readFileSync(genPath, 'utf8');

// Normalize line endings
let text = content.replace(/\r\n/g, '\n');

// 1. Update .hero and nav CSS
const oldCssBlock = `    /* Sticky Site Header */
    header.site-header {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 100;
      background: rgba(13, 15, 20, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      height: var(--header-height);
      display: flex;
      align-items: center;
    }
    nav {
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
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
      letter-spacing: -0.3px;
    }
    .brand-badge {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.1);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 20px;
      border: 1px solid var(--border);
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s ease;
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
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-nav:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255,255,255,0.2);
    }

    /* Hero Section with Photographic Depth and Dynamic Viewport Alignment */
    .hero {
      position: relative;
      min-height: calc(100vh - var(--header-height));
      min-height: calc(100dvh - var(--header-height));
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: clamp(48px, 6vh, 84px) 24px;
      overflow: hidden;
      box-sizing: border-box;
      background: linear-gradient(180deg, rgba(13, 15, 20, 0.82) 0%, rgba(13, 15, 20, 0.94) 100%),
                  url('\${heroImage}') center/cover no-repeat;
    }
    #three-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.5;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 880px;
      width: 100%;
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
      font-weight: 700;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      letter-spacing: 0.5px;
    }
    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(2.2rem, 4vw + 1rem, 3.8rem);
      line-height: 1.15;
      font-weight: 800;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
      background: linear-gradient(180deg, #ffffff 40%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      word-break: break-word;
    }
    .hero p {
      font-size: clamp(1rem, 1.2vw + 0.6rem, 1.25rem);
      line-height: 1.6;
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
    }`;

const newCssBlock = `    /* Sticky Site Header */
    header.site-header {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 100;
      background: rgba(12, 14, 18, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      height: var(--header-height);
      display: flex;
      align-items: center;
    }
    nav {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: 0 clamp(20px, 3vw, 40px);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: clamp(1.15rem, 1.8vw, 1.35rem);
      color: #fff;
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      letter-spacing: -0.3px;
    }
    .brand-badge {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.1);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: 20px;
      border: 1px solid var(--border);
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s ease;
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
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .btn-nav:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255,255,255,0.2);
    }

    /* Hero Section with Balanced Photographic Lighting and Responsive Viewport Alignment */
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
    }
    #three-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0.22;
      pointer-events: none;
    }
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 1200px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(18, 22, 32, 0.72);
      border: 1px solid var(--border);
      color: var(--primary);
      font-size: 0.85rem;
      padding: 7px 18px;
      border-radius: 30px;
      margin-bottom: 20px;
      font-weight: 700;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      letter-spacing: 0.5px;
    }
    .hero h1 {
      font-family: var(--font-heading);
      font-size: clamp(2rem, 3.2vw + 0.4rem, 3.25rem);
      line-height: 1.18;
      font-weight: 800;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
      background: linear-gradient(180deg, #ffffff 30%, rgba(255, 255, 255, 0.78) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      max-width: 1060px;
      text-wrap: balance;
      filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.65));
      word-break: normal;
    }
    .hero p {
      font-size: clamp(1.02rem, 1.1vw + 0.5rem, 1.2rem);
      line-height: 1.62;
      color: #e2e8f0;
      margin-bottom: 32px;
      max-width: 780px;
      margin-left: auto;
      margin-right: auto;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
    }
    .hero-ctas {
      display: flex;
      gap: 16px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
    .hero-highlights {
      display: flex;
      gap: 14px;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 36px;
      max-width: 1050px;
      width: 100%;
    }
    .highlight-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(14, 18, 26, 0.75);
      border: 1px solid var(--border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 8px 18px;
      border-radius: 30px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #f1f5f9;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);
    }
    .highlight-pill .pill-icon {
      color: var(--primary);
      font-size: 1rem;
    }`;

if (text.includes(oldCssBlock)) {
  text = text.replace(oldCssBlock, newCssBlock);
  console.log('✅ Replaced CSS block successfully');
} else {
  console.warn('⚠️ oldCssBlock not found in generator.js');
}

// 2. Update section styles
const oldSectionStyles = `    /* Section Styles */
    section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px;
      box-sizing: border-box;
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
      font-size: clamp(1.8rem, 3vw + 0.8rem, 2.6rem);
      line-height: 1.25;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.3px;
    }

    /* Photographic Showcase Gallery */
    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
      gap: 28px;
    }`;

const newSectionStyles = `    /* Section Styles */
    section {
      max-width: 1320px;
      width: 100%;
      margin: 0 auto;
      padding: clamp(56px, 7vw, 92px) clamp(20px, 3.5vw, 44px);
      box-sizing: border-box;
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
      font-size: clamp(1.8rem, 2.6vw + 0.6rem, 2.5rem);
      line-height: 1.25;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.3px;
      text-wrap: balance;
    }

    /* Photographic Showcase Gallery */
    .grid-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 360px), 1fr));
      gap: clamp(20px, 2.5vw, 32px);
    }`;

if (text.includes(oldSectionStyles)) {
  text = text.replace(oldSectionStyles, newSectionStyles);
  console.log('✅ Replaced Section Styles successfully');
} else {
  console.warn('⚠️ oldSectionStyles not found in generator.js');
}

// 3. Update Grid Advantages and Grid Services
text = text.replace(
  'grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n      gap: 28px;',
  'grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));\n      gap: clamp(20px, 2.5vw, 32px);'
);
text = text.replace(
  'grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n      gap: 24px;',
  'grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));\n      gap: clamp(18px, 2vw, 28px);'
);

// 4. Update Hero HTML to include Hero Highlights Trust Bar
const oldHeroHtml = `      <div class="hero-content">
        <div class="hero-badge">\${this._escape(bp.hero.badgeText)}</div>
        <h1>\${this._escape(bp.hero.headline)}</h1>
        <p>\${this._escape(bp.hero.subheadline)}</p>
        <div class="hero-ctas">
          <a href="\${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            \${this._escape(bp.hero.ctaText)}
          </a>
          <a href="tel:\${cleanPhone}" class="btn-secondary">
            📞 Call \${this._escape(lead.phoneDisplay || lead.phone || 'Store')}
          </a>
        </div>
      </div>`;

const newHeroHtml = `      <div class="hero-content">
        <div class="hero-badge">\${this._escape(bp.hero.badgeText)}</div>
        <h1>\${this._escape(bp.hero.headline)}</h1>
        <p>\${this._escape(bp.hero.subheadline)}</p>
        <div class="hero-ctas">
          <a href="\${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
            \${this._escape(bp.hero.ctaText)}
          </a>
          <a href="tel:\${cleanPhone}" class="btn-secondary">
            📞 Call \${this._escape(lead.phoneDisplay || lead.phone || 'Store')}
          </a>
        </div>
        <div class="hero-highlights">
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
        </div>
      </div>`;

if (text.includes(oldHeroHtml)) {
  text = text.replace(oldHeroHtml, newHeroHtml);
  console.log('✅ Replaced Hero HTML with Highlights Bar successfully');
} else {
  console.warn('⚠️ oldHeroHtml not found in generator.js');
}

// 5. Update Three.js particles density & peripheral positioning
const oldParticlesBlock = `        // Adaptive particle density (50 on mobile, 180 on desktop)
        const particleCount = isMobile ? 50 : 180;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPrimary = new THREE.Color('\${primary}');
        const colorAccent = new THREE.Color('\${accent}');

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
          size: isMobile ? 0.7 : 0.6,
          vertexColors: true,
          transparent: true,
          opacity: 0.75
        });`;

const newParticlesBlock = `        // Subtle ambient particle field (15 on mobile, 40 on desktop)
        const particleCount = isMobile ? 15 : 40;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        const colorPrimary = new THREE.Color('\${primary}');
        const colorAccent = new THREE.Color('\${accent}');

        for (let i = 0; i < particleCount; i++) {
          // Peripheral distribution to prevent competing with main product photo & headline
          const angle = Math.random() * Math.PI * 2;
          const radius = 10 + Math.random() * 22;
          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 26;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 16;

          const mixedColor = colorPrimary.clone().lerp(colorAccent, Math.random());
          colors[i * 3] = mixedColor.r;
          colors[i * 3 + 1] = mixedColor.g;
          colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: isMobile ? 0.45 : 0.4,
          vertexColors: true,
          transparent: true,
          opacity: 0.4
        });`;

if (text.includes(oldParticlesBlock)) {
  text = text.replace(oldParticlesBlock, newParticlesBlock);
  console.log('✅ Replaced Three.js Particles Block successfully');
} else {
  console.warn('⚠️ oldParticlesBlock not found in generator.js');
}

fs.writeFileSync(genPath, text, 'utf8');
console.log('✅ generator.js updated and saved.');
