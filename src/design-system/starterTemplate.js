/**
 * FLASH.Ai Universal Website Design System — Starter Template
 * Reusable starter template generating valid, responsive, client-ready websites
 * equipped with the white WhatsApp booking button and verified design tokens.
 */

import { BREAKPOINTS, LAYOUT, TYPOGRAPHY, BUTTON_THEMES } from './tokens.js';
import { getBookingConfig } from './bookingConfig.js';
import { renderSiteHeader, renderDesignSystemCss, renderMobileActionBar } from './components.js';

export function createStarterTemplate(lead, options = {}) {
  const booking = getBookingConfig(lead);
  const siteHeader = renderSiteHeader({ lead, booking });
  const mobileActionBar = renderMobileActionBar({ lead, booking });
  const designSystemCss = renderDesignSystemCss();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${lead.name} | Premium Concept in Karimnagar</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
      --font-heading: 'Plus Jakarta Sans', sans-serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
      --header-height: 72px;
      --radius: 14px;
    }
    ${designSystemCss}
  </style>
</head>
<body>
  ${siteHeader}
  <main>
    <section id="hero" style="padding: 80px 20px; text-align: center;">
      <h1>${lead.name}</h1>
      <p style="color: var(--text-muted); margin-top: 10px;">${lead.category || 'Premier Local Business'} in Karimnagar, Telangana</p>
    </section>
  </main>
  ${mobileActionBar}
  <script>
    const navToggle = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-nav-menu');
    if (navToggle && mobileMenu) {
      navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !expanded);
        mobileMenu.classList.toggle('open');
      });
    }
  </script>
</body>
</html>`;
}
