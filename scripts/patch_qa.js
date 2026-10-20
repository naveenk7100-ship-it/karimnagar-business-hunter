import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qaFile = path.join(__dirname, '../src/services/qa.js');

let content = fs.readFileSync(qaFile, 'utf8');

const targetStr = `    // 4. Accessibility & Semantic Hierarchy
    const hasH1 = /<h1[^>]*>.*?<\\/h1>/is.test(html);
    const hasH2 = /<h2[^>]*>.*?<\\/h2>/is.test(html);
    const hasFloatingWaAria = /class=["'][^"']*floating-wa[^"']*["'][^>]*aria-label=/i.test(html);
    let a11yPass = hasH1 && hasH2 && hasFloatingWaAria;

    if (!hasFloatingWaAria && /class=["'][^"']*floating-wa[^"']*["']/i.test(html)) {
      html = html.replace(
        /(class=["'][^"']*floating-wa[^"']*["'])/i,
        '$1 aria-label="Chat with us on WhatsApp"'
      );
      repaired = true;
      checks.push({
        id: 'accessibility',
        name: 'Accessibility & ARIA Attributes',
        status: 'REPAIRED',
        evidence: 'Added missing aria-label to floating WhatsApp CTA'
      });
    } else {
      checks.push({
        id: 'accessibility',
        name: 'Accessibility & ARIA Attributes',
        status: a11yPass ? 'PASS' : 'FAIL',
        evidence: \`h1=\${hasH1}, h2=\${hasH2}, floating_wa_aria=\${hasFloatingWaAria}\`
      });
    }`;

const replacementStr = `    // 4. Accessibility & Semantic Hierarchy
    const hasH1 = /<h1[^>]*>.*?<\\/h1>/is.test(html);
    const hasH2 = /<h2[^>]*>.*?<\\/h2>/is.test(html);
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
        evidence: \`h1=\${hasH1}, h2=\${hasH2}, wa_cta_aria=\${hasWaAria}\`
      });
    }`;

// Normalize line endings for replacement
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = targetStr.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const updated = normalizedContent.replace(normalizedTarget, replacementStr);
  fs.writeFileSync(qaFile, updated, 'utf8');
  console.log('Successfully patched qa.js with universal wa_cta_aria support');
} else {
  console.error('Target not found in qa.js');
}
