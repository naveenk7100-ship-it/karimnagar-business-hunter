import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const generatorFile = path.join(__dirname, '../src/services/generator.js');

let content = fs.readFileSync(generatorFile, 'utf8').replace(/\r\n/g, '\n');

// 1. Add design-system import
if (!content.includes('../design-system/index.js')) {
  content = content.replace(
    "import { getCategoryAssets, renderCategoryMicroComponent } from './visualComponents.js';",
    "import { getCategoryAssets, renderCategoryMicroComponent } from './visualComponents.js';\nimport { getBookingConfig, renderSiteHeader, renderDesignSystemCss, renderMobileActionBar } from '../design-system/index.js';"
  );
}

// 2. Update _buildHtml to use getBookingConfig
const oldBuildHtmlStart = `  _buildHtml(lead, bp) {
    const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
    const waPhone = cleanPhone.length === 10 ? \`91\${cleanPhone}\` : cleanPhone;
    const makeWaUrl = (text) => \`https://wa.me/\${waPhone}?text=\${encodeURIComponent(text || \`Hi \${lead.name}, I am contacting you regarding your services in Karimnagar.\`)}\`;
    const defaultWaLink = makeWaUrl();`;

const newBuildHtmlStart = `  _buildHtml(lead, bp) {
    const booking = getBookingConfig(lead);
    const cleanPhone = (lead.phone || booking.phoneDisplay || '').replace(/[^0-9]/g, '');
    const waPhone = booking.waDigits;
    const makeWaUrl = (text) => \`https://wa.me/\${waPhone}?text=\${encodeURIComponent(text || booking.prefilledMessage)}\`;
    const defaultWaLink = booking.bookingUrl;`;

if (content.includes(oldBuildHtmlStart)) {
  content = content.replace(oldBuildHtmlStart, newBuildHtmlStart);
  console.log('✅ Replaced _buildHtml start with bookingConfig');
} else {
  console.log('⚠️ Could not find exact oldBuildHtmlStart');
}

// 3. Inject renderDesignSystemCss into the style block
if (!content.includes('${renderDesignSystemCss()}')) {
  // Replace the old site-header / nav / btn-nav CSS up to .hero
  const oldHeaderCss = `    /* Sticky Site Header */
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
    }`;

  if (content.includes(oldHeaderCss)) {
    content = content.replace(oldHeaderCss, `    \${renderDesignSystemCss()}`);
    console.log('✅ Replaced old header CSS with renderDesignSystemCss()');
  } else {
    console.log('⚠️ Could not find exact oldHeaderCss');
  }
}

// 4. Remove old floating-wa CSS
const oldFloatingWaCss = `    /* Floating WhatsApp Button (Desktop) */
    .floating-wa {
      position: fixed;
      bottom: 28px;
      right: 28px;
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
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .floating-wa:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 24px rgba(37, 211, 102, 0.55);
    }
    .floating-wa svg { width: 30px; height: 30px; fill: currentColor; }`;

if (content.includes(oldFloatingWaCss)) {
  content = content.replace(oldFloatingWaCss, '');
  console.log('✅ Removed old floating-wa CSS');
}

// 5. Replace header HTML with renderSiteHeader
const oldHeaderHtml = `  <!-- Sticky Header & Navigation -->
  <header class="site-header">
    <nav>
      <a href="#hero" class="brand">
        <span>\${this._escape(lead.name)}</span>
        <span class="brand-badge">Karimnagar</span>
      </a>
      <div class="nav-links">
        <a href="#advantages">Why Us</a>
        <a href="#gallery">Showcase</a>
        <a href="#services">Services</a>
        <a href="#faq">FAQ</a>
        <a href="#location">Find Us</a>
        <a href="\${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-nav">WhatsApp Booking</a>
      </div>
    </nav>
  </header>`;

if (content.includes(oldHeaderHtml)) {
  content = content.replace(
    oldHeaderHtml,
    `  \${renderSiteHeader({ lead, booking, archetype: bp.archetype })}`
  );
  console.log('✅ Replaced old header HTML with renderSiteHeader()');
} else {
  console.log('⚠️ Could not find exact oldHeaderHtml');
}

// 6. Remove floating-wa HTML
const oldFloatingWaHtml = `  <!-- Floating WhatsApp CTA (Desktop) -->
  <a href="\${defaultWaLink}" class="floating-wa" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
    <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
  </a>`;

if (content.includes(oldFloatingWaHtml)) {
  content = content.replace(oldFloatingWaHtml, '');
  console.log('✅ Removed floating-wa HTML');
}

// 7. Replace mobile action bar HTML
const oldMobileBarHtml = `  <!-- Mobile Bottom Action Bar -->
  <div class="mobile-action-bar" aria-label="Mobile Navigation">
    <a href="tel:\${cleanPhone}">
      <span>📞</span>
      <span>Call</span>
    </a>
    <a href="\${mapsLink}" target="_blank" rel="noopener noreferrer">
      <span>📍</span>
      <span>Directions</span>
    </a>
    <a href="\${defaultWaLink}" target="_blank" rel="noopener noreferrer" class="btn-wa-action">
      <span>💬</span>
      <span>WhatsApp</span>
    </a>
  </div>`;

if (content.includes(oldMobileBarHtml)) {
  content = content.replace(
    oldMobileBarHtml,
    `  \${renderMobileActionBar({ lead, booking })}\n
  <script>
    (function initMobileDrawer() {
      const navToggle = document.getElementById('mobile-nav-toggle');
      const mobileMenu = document.getElementById('mobile-nav-menu');
      if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function() {
          const expanded = navToggle.getAttribute('aria-expanded') === 'true';
          navToggle.setAttribute('aria-expanded', !expanded);
          mobileMenu.classList.toggle('open');
        });
        document.querySelectorAll('.mobile-nav-link').forEach(function(link) {
          link.addEventListener('click', function() {
            navToggle.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('open');
          });
        });
      }
    })();
  </script>`
  );
  console.log('✅ Replaced old mobile bar HTML with renderMobileActionBar() and drawer script');
} else {
  console.log('⚠️ Could not find exact oldMobileBarHtml');
}

fs.writeFileSync(generatorFile, content, 'utf8');
console.log('Generator patching complete.');
