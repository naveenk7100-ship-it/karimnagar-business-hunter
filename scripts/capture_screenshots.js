import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WORKSPACE_DIR = 'C:\\Users\\navee\\.gemini\\antigravity\\scratch\\karimnagar-business-hunter';
const DEMOS_DIR = path.join(WORKSPACE_DIR, 'public', 'demos');
const SCREENSHOT_DIR = path.join(WORKSPACE_DIR, 'reports', 'screenshots');

async function main() {
  console.log('=== REAL AUTOMATED HEADLESS CHROME SCREENSHOT AUDITOR ===');
  if (!fs.existsSync(CHROME_PATH)) {
    throw new Error(`Chrome binary not found at ${CHROME_PATH}`);
  }

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const slugs = [
    'hair-lounge-salon-tattoos',
    'star-fitness-gym-karimnagar',
    'yashika-photography-karimnagar',
    'pavan-furniture-world',
    'sri-chaitanya-coaching-karimnagar',
    'peacock-restaurant-karimnagar',
    'famous-tattoos-fathepura',
    'sumasri-digital-photo-karimnagar',
    'la-delicious-bakery-karimnagar'
  ];

  const results = [];

  for (const slug of slugs) {
    const htmlPath = path.join(DEMOS_DIR, slug, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.warn(`[WARN] HTML file missing for ${slug}: ${htmlPath}`);
      continue;
    }

    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    const desktopOut = path.join(SCREENSHOT_DIR, `${slug}-desktop.png`);
    const mobileOut = path.join(SCREENSHOT_DIR, `${slug}-mobile.png`);

    console.log(`[CAPTURE] Capturing ${slug}...`);

    // Desktop: 1280x800
    try {
      execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=2000 --screenshot="${desktopOut}" --window-size=1280,800 "${fileUrl}"`, {
        stdio: 'pipe',
        timeout: 15000
      });
      const dStats = fs.statSync(desktopOut);
      console.log(`          ✅ Desktop (1280x800): ${(dStats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`          ❌ Desktop capture failed: ${err.message}`);
    }

    // Mobile: 375x812
    try {
      execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=2000 --screenshot="${mobileOut}" --window-size=375,812 "${fileUrl}"`, {
        stdio: 'pipe',
        timeout: 15000
      });
      const mStats = fs.statSync(mobileOut);
      console.log(`          ✅ Mobile  (375x812): ${(mStats.size / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`          ❌ Mobile capture failed: ${err.message}`);
    }

    const dSize = fs.existsSync(desktopOut) ? fs.statSync(desktopOut).size : 0;
    const mSize = fs.existsSync(mobileOut) ? fs.statSync(mobileOut).size : 0;

    results.push({
      slug,
      desktopPng: `${slug}-desktop.png`,
      desktopSizeKb: (dSize / 1024).toFixed(1),
      desktopStatus: dSize > 5000 ? 'PASS' : 'FAIL',
      mobilePng: `${slug}-mobile.png`,
      mobileSizeKb: (mSize / 1024).toFixed(1),
      mobileStatus: mSize > 5000 ? 'PASS' : 'FAIL'
    });
  }

  console.log('\n=== SCREENSHOT QA AUDIT RESULTS ===');
  console.table(results);

  // Write screenshot audit report
  const reportPath = path.join(WORKSPACE_DIR, 'reports', 'screenshot_audit.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    capturedAt: new Date().toISOString(),
    totalDemos: results.length,
    totalScreenshots: results.length * 2,
    allPassed: results.every(r => r.desktopStatus === 'PASS' && r.mobileStatus === 'PASS'),
    details: results
  }, null, 2), 'utf8');

  console.log(`Report written to ${reportPath}`);
}

main().catch(err => {
  console.error('Fatal error during screenshot capture:', err);
  process.exit(1);
});
