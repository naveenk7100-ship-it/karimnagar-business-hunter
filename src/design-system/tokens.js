/**
 * FLASH.Ai Universal Website Design System — Tokens
 * Centralized design tokens for colors, spacing, typography, layout, and responsive breakpoints.
 */

export const BREAKPOINTS = {
  desktopWide: 1648,
  desktop: 1440,
  laptop: 1280,
  tabletLandscape: 1024,
  tablet: 768,
  mobileLarge: 430,
  mobileMedium: 390,
  mobileSmall: 375,
  mobileNarrow: 360
};

export const LAYOUT = {
  containerMax: '1320px',
  headerHeight: '72px',
  headerHeightMobile: '64px',
  radiusSm: '8px',
  radiusMd: '14px',
  radiusLg: '20px',
  radiusPill: '9999px',
  sectionPaddingY: 'clamp(56px, 7vw, 92px)',
  sectionPaddingX: 'clamp(20px, 3.5vw, 44px)'
};

export const TYPOGRAPHY = {
  fontBody: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  scale: {
    heroH1: 'clamp(1.95rem, 3.1vw + 0.4rem, 3.25rem)',
    heroP: 'clamp(1rem, 1.05vw + 0.5rem, 1.18rem)',
    sectionTitle: 'clamp(1.8rem, 2.5vw + 0.5rem, 2.45rem)',
    cardTitle: 'clamp(1.15rem, 1.5vw, 1.3rem)',
    body: '1rem',
    small: '0.875rem',
    badge: '0.75rem'
  }
};

export const BUTTON_THEMES = {
  // Primary White WhatsApp Booking Button (Global Design System Component)
  whiteWhatsApp: {
    bg: '#ffffff',
    bgHover: '#f8fafc',
    text: '#0b0f17',
    textMuted: '#475569',
    iconColor: '#25D366',
    border: '1px solid rgba(255, 255, 255, 0.95)',
    shadow: '0 4px 14px rgba(255, 255, 255, 0.22)',
    shadowHover: '0 6px 20px rgba(255, 255, 255, 0.38)',
    focusOutline: '2px solid #38bdf8'
  }
};
