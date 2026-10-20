/**
 * FLASH.Ai Multi-Viewport Auditor & Headless Chrome Screenshot Capture
 * Connects directly via Chrome DevTools Protocol (CDP) to measure exact layout
 * metrics, assert zero horizontal overflow across 10 viewports, full-width hero bleed,
 * contrast-certified WhatsApp button, and complete removal of all rating displays.
 */

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WORKSPACE_DIR = path.resolve('.');
const DEMOS_DIR = path.join(WORKSPACE_DIR, 'public', 'demos');
const SCREENSHOT_DIR = path.join(WORKSPACE_DIR, 'reports', 'screenshots');
const AUDIT_REPORT_PATH = path.join(WORKSPACE_DIR, 'reports', 'multi_viewport_audit.json');

const VIEWPORTS = [
  { name: 'desktop-1920', width: 1920, height: 1080, type: 'Desktop Full HD' },
  { name: 'desktop-1648', width: 1648, height: 900, type: 'High-Res Laptop / Scaled' },
  { name: 'desktop-1440', width: 1440, height: 900, type: 'Standard Desktop' },
  { name: 'laptop-1280', width: 1280, height: 800, type: 'Compact Laptop' },
  { name: 'tablet-1024', width: 1024, height: 768, type: 'Tablet Landscape' },
  { name: 'tablet-768', width: 768, height: 1024, type: 'Tablet Portrait' },
  { name: 'mobile-430', width: 430, height: 932, type: 'iPhone Pro Max' },
  { name: 'mobile-390', width: 390, height: 844, type: 'iPhone Standard' },
  { name: 'mobile-375', width: 375, height: 812, type: 'iPhone Mini' },
  { name: 'mobile-360', width: 360, height: 780, type: 'Compact Android' }
];

const SLUGS = [
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

class CdpClient {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 1;
    this.callbacks = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
    this.ws.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        }
      } catch (_) {}
    };
  }

  send(method, params = {}, timeoutMs = 8000) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.callbacks.delete(id);
        reject(new Error(`Timeout waiting for ${method} (${timeoutMs}ms)`));
      }, timeoutMs);

      this.callbacks.set(id, {
        resolve: (res) => { clearTimeout(timer); resolve(res); },
        reject: (err) => { clearTimeout(timer); reject(err); }
      });

      try {
        this.ws.send(JSON.stringify({ id, method, params }));
      } catch (err) {
        clearTimeout(timer);
        reject(err);
      }
    });
  }

  close() {
    try { this.ws.close(); } catch (_) {}
  }
}

async function main() {
  console.log('=== FLASH.Ai UNIVERSAL UPGRADE: FULL-WIDTH, CONTRAST & ZERO-RATING CDP AUDITOR ===');
  if (!fs.existsSync(CHROME_PATH)) {
    throw new Error(`Chrome binary not found at ${CHROME_PATH}`);
  }

  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const port = 9333; // dedicated audit port
  console.log(`[CHROME] Launching headless Chrome on port ${port}...`);
  const chromeProcess = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ]);

  // Wait for CDP readiness
  let cdpReady = false;
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) {
        cdpReady = true;
        break;
      }
    } catch (_) {}
    await new Promise(r => setTimeout(r, 200));
  }

  if (!cdpReady) {
    chromeProcess.kill();
    throw new Error('Could not connect to Chrome CDP endpoint');
  }

  const auditReport = {
    auditedAt: new Date().toISOString(),
    viewportsTested: VIEWPORTS.length,
    demosTested: SLUGS.length,
    results: []
  };

  try {
    for (const slug of SLUGS) {
      const htmlPath = path.join(DEMOS_DIR, slug, 'index.html');
      if (!fs.existsSync(htmlPath)) {
        console.warn(`[WARN] Missing ${htmlPath}`);
        continue;
      }

      const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
      console.log(`\n======================================================`);
      console.log(`[AUDIT] ${slug}`);
      console.log(`======================================================`);

      // Open new tab
      const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(fileUrl)}`, { method: 'PUT' });
      const tabData = await newTabRes.json();
      const client = new CdpClient(tabData.webSocketDebuggerUrl);
      await client.ready;

      await client.send('Page.enable');
      await client.send('DOM.enable');
      await client.send('Runtime.enable');
      await client.send('Page.navigate', { url: fileUrl });
      await new Promise(r => setTimeout(r, 500));

      // Wait for DOM readiness and button attachment
      for (let w = 0; w < 30; w++) {
        try {
          const chk = await client.send('Runtime.evaluate', {
            expression: 'Boolean(document.querySelector(".btn-wa-header"))',
            returnByValue: true
          }, 3000);
          if (chk.result?.value) break;
        } catch (_) {}
        await new Promise(r => setTimeout(r, 150));
      }

      const demoAudit = {
        slug,
        viewports: []
      };

      for (const vp of VIEWPORTS) {
        // Set viewport metrics
        await client.send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });

        await new Promise(r => setTimeout(r, 120));

        // Evaluate comprehensive layout metrics, full-width bleed, WhatsApp button contrast, and zero ratings
        const evalRes = await client.send('Runtime.evaluate', {
          expression: `(function() {
            const html = document.documentElement;
            const scrollW = html.scrollWidth;
            const clientW = html.clientWidth;
            const hero = document.querySelector('section.hero') || document.querySelector('.hero');
            const heroW = hero ? hero.clientWidth : 0;
            const heroFullBleed = hero ? Math.abs(heroW - clientW) <= 2 : false;
            
            const btnWa = document.querySelector('.btn-wa-header');
            const floatingWa = document.querySelector('.floating-wa');
            const btnStyle = btnWa ? window.getComputedStyle(btnWa) : null;
            const btnRect = btnWa ? btnWa.getBoundingClientRect() : null;

            // Zero Rating Check (no stars, no aggregateRating, no review claims)
            const bodyHtml = document.body ? document.body.innerHTML : '';
            const hasStars = /[⭐★]/i.test(bodyHtml);
            const hasAggregateRating = /aggregateRating/i.test(bodyHtml);
            const hasRatingValue = /ratingValue/i.test(bodyHtml);
            const hasReviewClaims = /verified\\s+reviews/i.test(bodyHtml);
            const zeroRatings = !hasStars && !hasAggregateRating && !hasRatingValue && !hasReviewClaims;

            // High contrast text check on white button:
            // Background is white/near-white rgb(255, 255, 255)
            // Color is dark rgb(11, 15, 23)
            const isWhiteBg = btnStyle ? btnStyle.backgroundColor.includes('255, 255, 255') || btnStyle.backgroundColor === 'rgb(255, 255, 255)' : false;
            const isDarkText = btnStyle ? (btnStyle.color.includes('11, 15, 23') || btnStyle.color.includes('0, 0, 0') || btnStyle.color === 'rgb(11, 15, 23)') : false;

            return {
              scrollWidth: scrollW,
              clientWidth: clientW,
              zeroOverflow: scrollW <= clientW,
              heroWidth: heroW,
              heroFullBleed: heroFullBleed,
              hasBtnWa: !!btnWa,
              btnText: btnWa ? btnWa.innerText.replace(/\\s+/g, ' ').trim() : null,
              btnBg: btnStyle ? btnStyle.backgroundColor : null,
              btnColor: btnStyle ? btnStyle.color : null,
              contrastPass: isWhiteBg && isDarkText,
              btnTop: btnRect ? Math.round(btnRect.top) : null,
              btnRight: btnRect ? Math.round(btnRect.right) : null,
              btnWidth: btnRect ? Math.round(btnRect.width) : null,
              btnHeight: btnRect ? Math.round(btnRect.height) : null,
              hasFloatingWa: !!floatingWa,
              zeroRatings: zeroRatings
            };
          })()`,
          returnByValue: true
        });

        const metrics = evalRes.result?.value || {};
        const vpResult = {
          viewport: vp.name,
          width: vp.width,
          height: vp.height,
          type: vp.type,
          scrollWidth: metrics.scrollWidth,
          clientWidth: metrics.clientWidth,
          zeroOverflow: metrics.zeroOverflow,
          heroFullBleed: metrics.heroFullBleed,
          heroWidth: metrics.heroWidth,
          btnWaVisible: metrics.hasBtnWa && metrics.btnWidth > 0 && metrics.btnHeight > 0,
          btnText: metrics.btnText,
          btnBg: metrics.btnBg,
          btnColor: metrics.btnColor,
          contrastPass: metrics.contrastPass,
          zeroRatings: metrics.zeroRatings,
          floatingWaPresent: metrics.hasFloatingWa
        };

        // Capture PNG screenshot
        try {
          const shot = await client.send('Page.captureScreenshot', { format: 'png' }, 6000);
          const shotFilename = `${slug}-${vp.name}.png`;
          const shotPath = path.join(SCREENSHOT_DIR, shotFilename);
          fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));

          const fileSizeKb = (fs.statSync(shotPath).size / 1024).toFixed(1);
          vpResult.screenshot = shotFilename;
          vpResult.screenshotSizeKb = `${fileSizeKb}KB`;
          const overflowPill = vpResult.zeroOverflow ? '✅ 0-OVERFLOW' : '❌ OVERFLOW';
          const bleedPill = vpResult.heroFullBleed ? '✅ FULL-BLEED' : '❌ BOXED';
          const waPill = vpResult.btnWaVisible ? '✅ WA-CTA' : '❌ NO-WA';
          const ratingsPill = vpResult.zeroRatings ? '✅ 0-RATINGS' : '❌ HAS-RATINGS';
          console.log(`  [${vp.name.padEnd(12)}] ${overflowPill} | ${bleedPill} | ${waPill} ("${metrics.btnText}") | ${ratingsPill} | ${fileSizeKb}KB`);
        } catch (err) {
          console.warn(`  [${vp.name}] Screenshot capture skipped: ${err.message}`);
        }

        demoAudit.viewports.push(vpResult);
      }

      // Capture full-page screenshot at 1440px
      try {
        await client.send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 2400,
          deviceScaleFactor: 1,
          mobile: false
        });
        await new Promise(r => setTimeout(r, 150));

        const fpShot = await client.send('Page.captureScreenshot', { format: 'png' }, 7000);
        const fpFilename = `${slug}-fullpage.png`;
        const fpPath = path.join(SCREENSHOT_DIR, fpFilename);
        fs.writeFileSync(fpPath, Buffer.from(fpShot.data, 'base64'));
        demoAudit.fullpageScreenshot = fpFilename;
        demoAudit.fullpageSizeKb = `${(fs.statSync(fpPath).size / 1024).toFixed(1)}KB`;
        console.log(`  [fullpage-1440] ✅ ${demoAudit.fullpageSizeKb}`);
      } catch (_) {}

      // Close tab
      client.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${tabData.id}`);

      auditReport.results.push(demoAudit);
    }

    // Also audit the Hub index
    const hubHtmlPath = path.join(WORKSPACE_DIR, 'data', 'git_staging', 'index.html');
    if (fs.existsSync(hubHtmlPath)) {
      console.log(`\n======================================================`);
      console.log(`[AUDIT] Demonstration Hub (Showcase Index)`);
      console.log(`======================================================`);
      const hubUrl = `file:///${hubHtmlPath.replace(/\\/g, '/')}`;
      const newTabRes = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(hubUrl)}`, { method: 'PUT' });
      const tabData = await newTabRes.json();
      const client = new CdpClient(tabData.webSocketDebuggerUrl);
      await client.ready;
      await client.send('Page.enable');
      await client.send('DOM.enable');
      await client.send('Runtime.enable');
      await new Promise(r => setTimeout(r, 400));

      for (const vp of [VIEWPORTS[0], VIEWPORTS[2], VIEWPORTS[5], VIEWPORTS[7]]) {
        await client.send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });
        await new Promise(r => setTimeout(r, 120));
        const shot = await client.send('Page.captureScreenshot', { format: 'png' });
        const filename = `hub-showcase-${vp.name}.png`;
        fs.writeFileSync(path.join(SCREENSHOT_DIR, filename), Buffer.from(shot.data, 'base64'));
        console.log(`  [Hub ${vp.name.padEnd(12)}] Captured showcase screenshot: ${filename}`);
      }

      client.close();
      await fetch(`http://127.0.0.1:${port}/json/close/${tabData.id}`);
    }

    // Write full audit report
    fs.writeFileSync(AUDIT_REPORT_PATH, JSON.stringify(auditReport, null, 2), 'utf8');
    console.log(`\n✅ Full multi-viewport audit report saved to ${AUDIT_REPORT_PATH}`);

  } finally {
    chromeProcess.kill();
    console.log('🏁 Chrome process stopped cleanly.');
  }
}

main().catch(err => {
  console.error('Fatal error in multi-viewport auditor:', err);
  process.exit(1);
});
