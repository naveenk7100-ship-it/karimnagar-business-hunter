import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WORKSPACE_DIR = 'C:\\Users\\navee\\.gemini\\antigravity\\scratch\\karimnagar-business-hunter';
const DEMOS_DIR = path.join(WORKSPACE_DIR, 'public', 'demos');
const SCREENSHOT_DIR = path.join(WORKSPACE_DIR, 'reports', 'screenshots');

async function main() {
  console.log('=== REAL AUTOMATED HEADLESS CHROME SCREENSHOT AUDITOR (MULTI-VIEWPORT) ===');
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

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900, suffix: '-1440x900.png' },
    { name: 'desktop-1280', width: 1280, height: 800, suffix: '-desktop.png' },
    { name: 'tablet-768', width: 768, height: 1024, suffix: '-tablet-768.png' },
    { name: 'mobile-390', width: 390, height: 844, suffix: '-mobile-390.png' },
    { name: 'mobile-375', width: 375, height: 812, suffix: '-mobile.png' }
  ];

  const results = [];

  for (const slug of slugs) {
    const htmlPath = path.join(DEMOS_DIR, slug, 'index.html');
    if (!fs.existsSync(htmlPath)) {
      console.warn(`[WARN] HTML file missing for ${slug}: ${htmlPath}`);
      continue;
    }

    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    console.log(`\n[CAPTURE] Capturing ${slug}...`);
    const demoResult = { slug, captures: {} };

    for (const vp of viewports) {
      const outPath = path.join(SCREENSHOT_DIR, `${slug}${vp.suffix}`);
      try {
        execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=2000 --screenshot="${outPath}" --window-size=${vp.width},${vp.height} "${fileUrl}"`, {
          stdio: 'pipe',
          timeout: 20000
        });
        const stats = fs.statSync(outPath);
        const sizeKb = (stats.size / 1024).toFixed(1);
        demoResult.captures[vp.name] = {
          file: `${slug}${vp.suffix}`,
          sizeKb,
          status: stats.size > 5000 ? 'PASS' : 'FAIL'
        };
        process.stdout.write(`  [${vp.name} ${vp.width}x${vp.height}: ${sizeKb}KB] `);
      } catch (err) {
        demoResult.captures[vp.name] = { error: err.message, status: 'FAIL' };
        process.stdout.write(`  [${vp.name}: FAIL] `);
      }
    }
    console.log();
    results.push(demoResult);
  }

  // Also capture Hub index across desktop and mobile
  const hubHtmlPath = path.join(WORKSPACE_DIR, 'data', 'git_staging', 'index.html');
  if (fs.existsSync(hubHtmlPath)) {
    const hubUrl = `file:///${hubHtmlPath.replace(/\\/g, '/')}`;
    console.log(`\n[CAPTURE] Capturing Hub Directory...`);
    const hubResult = { slug: 'hub-directory', captures: {} };
    for (const vp of viewports.slice(0, 2)) {
      const outPath = path.join(SCREENSHOT_DIR, `hub${vp.suffix}`);
      try {
        execSync(`"${CHROME_PATH}" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=1500 --screenshot="${outPath}" --window-size=${vp.width},${vp.height} "${hubUrl}"`, {
          stdio: 'pipe',
          timeout: 15000
        });
        const stats = fs.statSync(outPath);
        hubResult.captures[vp.name] = { file: `hub${vp.suffix}`, sizeKb: (stats.size / 1024).toFixed(1), status: 'PASS' };
      } catch (err) {
        hubResult.captures[vp.name] = { error: err.message, status: 'FAIL' };
      }
    }
    results.push(hubResult);
  }

  // Write screenshot audit report
  const reportPath = path.join(WORKSPACE_DIR, 'reports', 'screenshot_audit.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    capturedAt: new Date().toISOString(),
    totalDemos: slugs.length,
    viewportsTested: viewports.map(v => `${v.name} (${v.width}x${v.height})`),
    details: results
  }, null, 2), 'utf8');

  console.log(`\nScreenshot audit report written to ${reportPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
