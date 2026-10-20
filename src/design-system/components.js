/**
 * FLASH.Ai Universal Website Design System — Components
 * Reusable, production-grade components ensuring visual consistency,
 * strict category identity, and 100% zero-overflow across all 10 viewports.
 */

import { BUTTON_THEMES, LAYOUT } from './tokens.js';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Global Header Component with the White WhatsApp Booking Button
 */
export function renderSiteHeader({ lead, booking, archetype }) {
  const safeName = escapeHtml(lead?.name || 'Local Business');
  const safeBookingLabel = escapeHtml(booking?.bookingLabel || 'WhatsApp Booking');
  const safeCompactLabel = escapeHtml(booking?.compactLabel || 'Book');
  const bookingUrl = booking?.bookingUrl || '#';

  return `
  <!-- FLASH.Ai Design System: Universal Site Header with White WhatsApp Booking CTA -->
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="#hero" class="brand" aria-label="${safeName} Home">
        <span class="brand-title">${safeName}</span>
        <span class="brand-badge">Karimnagar</span>
      </a>

      <nav class="nav-desktop" aria-label="Main Navigation">
        <a href="#advantages">Why Us</a>
        <a href="#gallery">Showcase</a>
        <a href="#services">Services</a>
        <a href="#faq">FAQ</a>
        <a href="#location">Find Us</a>
      </nav>

      <div class="header-actions">
        <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn-wa-header" aria-label="${safeBookingLabel} with ${safeName} on WhatsApp">
          <svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          <span class="wa-text-full">${safeBookingLabel}</span>
          <span class="wa-text-compact">${safeCompactLabel}</span>
        </a>

        <button class="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false" id="mobile-nav-toggle" type="button">
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
          <span class="hamburger-bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <div class="mobile-nav-menu" id="mobile-nav-menu" aria-hidden="true">
      <a href="#advantages" class="mobile-nav-link">Why Us</a>
      <a href="#gallery" class="mobile-nav-link">Showcase</a>
      <a href="#services" class="mobile-nav-link">Services</a>
      <a href="#faq" class="mobile-nav-link">FAQ</a>
      <a href="#location" class="mobile-nav-link">Find Us</a>
    </div>
  </header>`;
}

/**
 * Mobile Bottom Sticky Action Bar (Direct Call + WhatsApp)
 */
export function renderMobileActionBar({ lead, booking }) {
  const safePhone = escapeHtml(lead?.phone || booking?.phoneDisplay || '');
  const cleanPhone = (lead?.phone || booking?.waDigits || '').replace(/[^0-9]/g, '');
  const bookingUrl = booking?.bookingUrl || '#';
  const safeCompactLabel = escapeHtml(booking?.compactLabel || 'Book');

  return `
  <!-- FLASH.Ai Design System: Mobile Persistent Action Bar -->
  <div class="mobile-action-bar" role="navigation" aria-label="Quick Actions">
    <a href="tel:${cleanPhone}" class="btn-call-action" aria-label="Call ${escapeHtml(lead?.name || '')}">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      <span>Call Now</span>
    </a>
    <a href="${bookingUrl}" target="_blank" rel="noopener noreferrer" class="btn-wa-action" aria-label="${safeCompactLabel} on WhatsApp">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
      <span>WhatsApp ${safeCompactLabel}</span>
    </a>
  </div>`;
}

/**
 * Returns the Design System CSS for Headers, Navigation, Buttons, and Viewport Safety
 */
export function renderDesignSystemCss() {
  const btn = BUTTON_THEMES.whiteWhatsApp;

  return `
    /* ==========================================================================
       FLASH.Ai Universal Website Design System — Shared Header & CTA Rules
       ========================================================================== */
    
    /* Header Base Container */
    header.site-header {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 1000;
      background: rgba(11, 15, 23, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      height: var(--header-height, ${LAYOUT.headerHeight});
      display: flex;
      align-items: center;
      transition: background-color 0.2s ease, border-color 0.2s ease;
    }

    .header-inner {
      max-width: ${LAYOUT.containerMax};
      width: 100%;
      margin: 0 auto;
      padding: 0 clamp(16px, 3vw, 40px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      gap: 16px;
      box-sizing: border-box;
    }

    /* Brand Identity */
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #ffffff;
      min-width: 0;
      flex-shrink: 1;
    }
    .brand-title {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: clamp(1.05rem, 1.6vw, 1.35rem);
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.3px;
    }
    .brand-badge {
      font-size: 0.65rem;
      background: rgba(255, 255, 255, 0.08);
      color: var(--primary);
      padding: 3px 8px;
      border-radius: ${LAYOUT.radiusPill};
      border: 1px solid var(--border);
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      flex-shrink: 0;
    }

    /* Desktop Navigation Links */
    .nav-desktop {
      display: flex;
      align-items: center;
      gap: clamp(16px, 2vw, 28px);
      list-style: none;
    }
    .nav-desktop a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s ease;
      white-space: nowrap;
    }
    .nav-desktop a:hover {
      color: #ffffff;
    }

    /* Header Actions Container */
    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }

    /* ==========================================================================
       GLOBAL WHITE WHATSAPP BOOKING BUTTON
       High contrast, accessible, tactile, prominent across all header themes.
       ========================================================================== */
    .btn-wa-header {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: ${btn.bg} !important;
      color: ${btn.text} !important;
      font-family: var(--font-body);
      font-weight: 700;
      font-size: 0.88rem;
      line-height: 1;
      padding: 10px 18px;
      border-radius: ${LAYOUT.radiusPill};
      border: ${btn.border};
      box-shadow: ${btn.shadow};
      text-decoration: none;
      white-space: nowrap;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, background-color 0.2s ease;
      cursor: pointer;
    }
    .btn-wa-header:hover {
      background: ${btn.bgHover} !important;
      color: #000000 !important;
      transform: translateY(-2px);
      box-shadow: ${btn.shadowHover};
    }
    .btn-wa-header:focus-visible {
      outline: ${btn.focusOutline};
      outline-offset: 2px;
    }
    .btn-wa-header:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
    }
    .btn-wa-header .wa-icon {
      width: 17px;
      height: 17px;
      fill: ${btn.iconColor};
      flex-shrink: 0;
      display: block;
    }
    .btn-wa-header .wa-text-full {
      display: inline;
    }
    .btn-wa-header .wa-text-compact {
      display: none;
    }

    /* Mobile Drawer Toggle (Hamburger) */
    .nav-toggle {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: 8px;
      cursor: pointer;
      padding: 0;
      gap: 5px;
    }
    .nav-toggle .hamburger-bar {
      display: block;
      width: 20px;
      height: 2px;
      background-color: #ffffff;
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }
    .nav-toggle[aria-expanded="true"] .hamburger-bar:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .nav-toggle[aria-expanded="true"] .hamburger-bar:nth-child(2) {
      opacity: 0;
    }
    .nav-toggle[aria-expanded="true"] .hamburger-bar:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    /* Mobile Drawer Menu */
    .mobile-nav-menu {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background: rgba(11, 15, 23, 0.98);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      padding: 16px 20px;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.5);
    }
    .mobile-nav-menu.open {
      display: flex;
    }
    .mobile-nav-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 1rem;
      font-weight: 600;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: color 0.2s ease;
    }
    .mobile-nav-link:hover {
      color: #ffffff;
    }

    /* ==========================================================================
       RESPONSIVE BREAKPOINTS (Audited across all 10 target viewports)
       ========================================================================== */

    /* Tablet Landscape / Medium Screens (<= 1024px) */
    @media (max-width: 1024px) {
      .nav-desktop {
        gap: 14px;
      }
      .nav-desktop a {
        font-size: 0.9rem;
      }
      .btn-wa-header {
        padding: 9px 16px;
        font-size: 0.85rem;
      }
    }

    /* Tablet Portrait & Collapsed Navigation (<= 880px) */
    @media (max-width: 880px) {
      .nav-desktop {
        display: none;
      }
      .nav-toggle {
        display: flex;
      }
      header.site-header {
        height: ${LAYOUT.headerHeightMobile};
      }
      .btn-wa-header {
        padding: 8px 14px;
        font-size: 0.82rem;
        gap: 6px;
      }
    }

    /* Mobile Standards (<= 768px) */
    @media (max-width: 768px) {
      .btn-wa-header .wa-text-full {
        display: none;
      }
      .btn-wa-header .wa-text-compact {
        display: inline;
        font-size: 0.82rem;
        font-weight: 700;
      }
      .grid-gallery {
        grid-template-columns: 1fr;
      }
      body {
        padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
      }
      .mobile-action-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(13, 15, 20, 0.96);
        border-top: 1px solid var(--border);
        display: flex;
        z-index: 1000;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding-bottom: env(safe-area-inset-bottom, 0px);
      }
      .mobile-action-bar a {
        flex: 1;
        text-align: center;
        padding: 12px 6px;
        color: #fff;
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        border-right: 1px solid var(--border);
      }
      .mobile-action-bar a:last-child {
        border-right: none;
      }
      .mobile-action-bar a.btn-wa-action {
        background: #25d366;
        color: #000;
        font-weight: 700;
      }
    }

    /* Compact Mobile Breakpoints (430px, 390px, 375px, 360px) */
    @media (max-width: 480px) {
      .header-inner {
        padding: 0 14px;
        gap: 8px;
      }
      .brand-badge {
        display: none; /* Hide location pill on narrow mobile to prevent title squeeze */
      }
      .brand-title {
        font-size: 1.02rem;
        max-width: 180px;
      }
      .btn-wa-header {
        padding: 7px 11px;
        font-size: 0.8rem;
        gap: 5px;
      }
      .btn-wa-header .wa-icon {
        width: 15px;
        height: 15px;
      }
    }

    @media (max-width: 360px) {
      .brand-title {
        font-size: 0.95rem;
        max-width: 150px;
      }
      .header-inner {
        padding: 0 10px;
      }
      .btn-wa-header {
        padding: 6px 9px;
      }
    }

    /* Universal Zero-Overflow Enforcers */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html, body {
      max-width: 100vw;
      overflow-x: hidden;
      width: 100%;
    }
    img, svg, canvas, video {
      max-width: 100%;
      height: auto;
    }
  `;
}
