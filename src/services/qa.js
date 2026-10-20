import fs from 'node:fs';
import { categoryRegistry } from './categoryRegistry.js';

export class QAEngine {
  /**
   * Runs the comprehensive real QA suite on a generated website HTML file
   */
  async auditAndRepair(filePath, lead) {
    if (!fs.existsSync(filePath)) {
      return {
        pass: false,
        score: 0,
        filePath,
        checks: [{ id: 'file_exists', name: 'File Existence', status: 'FAIL', evidence: 'File does not exist' }]
      };
    }

    let html = fs.readFileSync(filePath, 'utf8');
    let repaired = false;
    const checks = [];

    // 1. Structure & Syntax
    const hasDoctype = /<!DOCTYPE html>/i.test(html);
    const hasHtmlTag = /<html/i.test(html) && /<\/html>/i.test(html);
    const hasHead = /<head/i.test(html) && /<\/head>/i.test(html);
    const hasBody = /<body/i.test(html) && /<\/body>/i.test(html);
    const structurePass = hasDoctype && hasHtmlTag && hasHead && hasBody;
    checks.push({
      id: 'html_structure',
      name: 'HTML Document Structure',
      status: structurePass ? 'PASS' : 'FAIL',
      evidence: `DOCTYPE=${hasDoctype}, html=${hasHtmlTag}, head=${hasHead}, body=${hasBody}`
    });

    // 2. Mobile Responsiveness & Viewport
    const hasViewport = /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']/i.test(html);
    const hasMobileCSS = /@media\s*\(\s*max-width:\s*768px\s*\)/i.test(html);
    const hasMobileActionBar = /class=["'][^"']*mobile-action-bar[^"']*["']/i.test(html);
    const mobilePass = hasViewport && hasMobileCSS && hasMobileActionBar;
    checks.push({
      id: 'mobile_responsive',
      name: 'Mobile Responsiveness & Viewport',
      status: mobilePass ? 'PASS' : 'FAIL',
      evidence: `viewport_meta=${hasViewport}, media_query_768=${hasMobileCSS}, mobile_action_bar=${hasMobileActionBar}`
    });

    // 3. CTA & Broken Links Integrity
    const hasWaLink = /href=["']https:\/\/wa\.me\/[0-9]+\?text=[^"']*["']/i.test(html);
    const hasTelLink = /href=["']tel:[0-9+]+["']/i.test(html);
    const hasMapsLink = /href=["']https:\/\/www\.google\.com\/maps\/search\/\?[^"']*["']/i.test(html);
    const hasEmptyHashLinks = /href=["']#["']/i.test(html);
    
    // Repair empty hash links if any
    if (hasEmptyHashLinks) {
      html = html.replace(/href=["']#["']/g, 'href="#hero"');
      repaired = true;
      checks.push({
        id: 'links_cta',
        name: 'CTA & Navigation Links',
        status: 'REPAIRED',
        evidence: 'Empty "#" link replaced with target anchor "#hero"'
      });
    } else {
      checks.push({
        id: 'links_cta',
        name: 'CTA & Navigation Links',
        status: (hasWaLink && hasTelLink && hasMapsLink) ? 'PASS' : 'FAIL',
        evidence: `wa_link=${hasWaLink}, tel_link=${hasTelLink}, maps_link=${hasMapsLink}`
      });
    }

    // 4. Accessibility & Semantic Hierarchy
    const hasH1 = /<h1[^>]*>.*?<\/h1>/is.test(html);
    const hasH2 = /<h2[^>]*>.*?<\/h2>/is.test(html);
    const hasWaAria = /class=["'][^"']*(?:btn-wa-header|floating-wa)[^"']*["'][^>]*aria-label=/i.test(html);
    let a11yPass = hasH1 && hasH2 && hasWaAria;

    if (!hasWaAria && /class=["'][^"']*(?:btn-wa-header|floating-wa)[^"']*["']/i.test(html)) {
      html = html.replace(
        /(class=["'][^"']*(?:btn-wa-header|floating-wa)[^"']*["'])/i,
        '$1 aria-label="Book with us on WhatsApp"'
      );
      repaired = true;
      checks.push({
        id: 'accessibility',
        name: 'Accessibility & ARIA Attributes',
        status: 'REPAIRED',
        evidence: 'Added missing aria-label to WhatsApp CTA'
      });
    } else {
      checks.push({
        id: 'accessibility',
        name: 'Accessibility & ARIA Attributes',
        status: a11yPass ? 'PASS' : 'FAIL',
        evidence: `h1=${hasH1}, h2=${hasH2}, wa_cta_aria=${hasWaAria}`
      });
    }

    // 5. SEO & Schema.org Structured Data
    const hasTitle = /<title>[^<]+<\/title>/i.test(html);
    const hasMetaDesc = /<meta\s+name=["']description["']\s+content=["'][^"']+["']/i.test(html);
    const hasOgTitle = /<meta\s+property=["']og:title["']/i.test(html);
    const jsonLdMatch = html.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
    let validJsonLd = false;
    if (jsonLdMatch && jsonLdMatch[1]) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        validJsonLd = parsed['@type'] === 'LocalBusiness' && parsed.name;
      } catch (_) {}
    }
    const seoPass = hasTitle && hasMetaDesc && hasOgTitle && validJsonLd;
    checks.push({
      id: 'seo_metadata',
      name: 'SEO & Structured Data (JSON-LD)',
      status: seoPass ? 'PASS' : 'FAIL',
      evidence: `title=${hasTitle}, meta_desc=${hasMetaDesc}, og_title=${hasOgTitle}, schema_localbusiness=${validJsonLd}`
    });

    // 6. 3D Canvas & Animation Fallback
    const hasCanvas = /<canvas\s+id=["']three-canvas["']/i.test(html);
    const hasThreeScript = /three\.min\.js/i.test(html);
    const hasTryCatch = /try\s*\{[\s\S]*?THREE\.Scene[\s\S]*?\}\s*catch/i.test(html);
    const canvasPass = hasCanvas && hasThreeScript && hasTryCatch;
    checks.push({
      id: 'interactive_3d_fallback',
      name: 'Interactive 3D Engine & Fallbacks',
      status: canvasPass ? 'PASS' : 'FAIL',
      evidence: `canvas_tag=${hasCanvas}, threejs_cdn=${hasThreeScript}, graceful_catch_block=${hasTryCatch}`
    });

    // 7. Raw Placeholder Leakage Audit (stripping scripts and styles first)
    const bodyOnly = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
    const rawTokens = ['{{', '}}', '[INSERT_', '__UNDEFINED__', 'NaN', 'undefined', 'TODO'];
    const foundTokens = rawTokens.filter(t => bodyOnly.includes(t));
    const placeholderPass = foundTokens.length === 0;
    checks.push({
      id: 'placeholder_leakage',
      name: 'Placeholder & Template Leakage',
      status: placeholderPass ? 'PASS' : 'FAIL',
      evidence: placeholderPass ? 'No raw template tokens detected' : `Found leaked tokens: ${foundTokens.join(', ')}`
    });

    // 8. Strict Category Safety & Cross-Contamination Guard
    const resolvedCategory = categoryRegistry.resolveCategory(lead);
    const categorySafety = categoryRegistry.validateContentSafety(resolvedCategory.id, bodyOnly);
    checks.push({
      id: 'category_safety',
      name: 'Category Safety & Zero Contamination',
      status: categorySafety.safe ? 'PASS' : 'FAIL',
      evidence: categorySafety.safe
        ? `Clean category integrity verified (${resolvedCategory.displayName})`
        : `Cross-category contamination detected: ${categorySafety.violations.join(', ')}`
    });

    // 9. Client-Facing Independence & Zero Internal Leakage
    const internalTokens = [
      'Karimnagar Leads',
      'Business Hunter',
      'AI-generated',
      'CONCEPT PREVIEW',
      'Concept Placeholder',
      'Official Concept Showcase',
      'View Public Source'
    ];
    const foundInternal = internalTokens.filter(t => bodyOnly.toLowerCase().includes(t.toLowerCase()));
    const internalPass = foundInternal.length === 0;
    checks.push({
      id: 'no_internal_leakage',
      name: 'Client-Facing Independence',
      status: internalPass ? 'PASS' : 'FAIL',
      evidence: internalPass
        ? '100% standalone client website without internal platform branding'
        : `Leaked internal strings: ${foundInternal.join(', ')}`
    });

    // 10. Verified Business Facts & Conversion Integrity
    const unescapedHtml = html.replace(/&amp;/g, '&');
    const hasBusinessName = lead?.name ? (unescapedHtml.includes(lead.name) || unescapedHtml.toLowerCase().includes(lead.name.toLowerCase())) : true;
    const hasKarimnagar = /Karimnagar/i.test(html);
    const factsPass = hasBusinessName && hasKarimnagar && (hasWaLink || hasTelLink);
    checks.push({
      id: 'verified_facts',
      name: 'Verified Facts & Local Integrity',
      status: factsPass ? 'PASS' : 'FAIL',
      evidence: `business_name=${hasBusinessName}, local_karimnagar=${hasKarimnagar}, direct_cta=${hasWaLink || hasTelLink}`
    });

    // Save repaired file if modifications were applied
    if (repaired) {
      fs.writeFileSync(filePath, html, 'utf8');
    }

    const failedCount = checks.filter(c => c.status === 'FAIL').length;
    const passedCount = checks.filter(c => c.status === 'PASS' || c.status === 'REPAIRED').length;
    const score = Math.round((passedCount / checks.length) * 100);

    return {
      pass: failedCount === 0,
      score,
      repaired,
      checks,
      auditedAt: new Date().toISOString()
    };
  }
}

export const qaEngine = new QAEngine();
