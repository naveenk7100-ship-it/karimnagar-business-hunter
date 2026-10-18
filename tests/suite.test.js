import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { discoveryEngine } from '../src/services/discovery.js';
import { websiteGenerator } from '../src/services/generator.js';
import { qaEngine } from '../src/services/qa.js';
import { outreachGenerator } from '../src/services/outreach.js';
import { telegramService } from '../src/services/telegram.js';
import { store } from '../src/services/store.js';

test('1. Lead Discovery & Duplicate Prevention Suite', async (t) => {
  await t.test('Deduplication prevents re-selecting previously processed businesses', async () => {
    // Vasantha Family Salon was pre-seeded
    const isProcessed = store.isProcessed('vasantha-family-salon-karimnagar');
    assert.equal(isProcessed, true, 'Pre-seeded workspace demo should be marked as processed');
  });

  await t.test('Discovery returns up to 3 fresh qualified Karimnagar leads with scores', async () => {
    const res = await discoveryEngine.discoverDailyLeads(3);
    assert.ok(res.selectedCount <= 3, 'Must not exceed 3 leads per day');
    assert.ok(Array.isArray(res.leads), 'Leads must be an array');
    
    for (const lead of res.leads) {
      assert.ok(lead.name, 'Lead must have a name');
      assert.ok(lead.address.includes('Karimnagar'), 'Lead must be located in Karimnagar');
      assert.ok(lead.score >= 50, 'Qualified lead must meet minimum viability score');
      assert.ok(!lead.website, 'Prefer businesses with zero website presence');
    }
  });
});

test('2. Unique 3D Website Generator & Versioning Suite', async (t) => {
  const mockLead = {
    id: 'test-lead-01',
    name: 'Apollo Aesthetics Studio',
    slug: 'apollo-aesthetics-test',
    category: 'Salons & Spas',
    niche: 'salon_tattoo',
    address: 'Near Tower Circle, Karimnagar, Telangana 505001',
    landmark: 'Tower Circle',
    phone: '+91 98490 12345',
    phoneDisplay: '+91 98490 12345',
    publicSourceUrl: 'https://example.com/listing',
    sourceType: 'Directory',
    rating: 4.8,
    reviewCount: 95,
    websiteGapDetails: 'No website. Lacks online appointment bookings.'
  };

  const gen = await websiteGenerator.generateWebsite(mockLead);
  assert.ok(fs.existsSync(gen.filePath), 'Generated HTML file must exist on disk');

  const content = fs.readFileSync(gen.filePath, 'utf8');
  assert.ok(content.includes('Apollo Aesthetics Studio'), 'HTML must include business name');
  assert.ok(content.includes('three-canvas'), 'HTML must include 3D canvas');
  assert.ok(content.includes('wa.me'), 'HTML must include WhatsApp conversion link');
  assert.ok(content.includes('CONCEPT PREVIEW'), 'Must include concept disclaimer banner');

  // Test versioning: second generation should preserve prior version
  await websiteGenerator.generateWebsite(mockLead);
  const versionsDir = path.join(path.dirname(gen.filePath), 'versions');
  assert.ok(fs.existsSync(versionsDir), 'Prior versions directory must be created');
  const files = fs.readdirSync(versionsDir);
  assert.ok(files.length >= 1, 'At least one backup version must be archived');
});

test('3. Real QA Audit & Automated Repair Suite', async (t) => {
  const testHtmlPath = path.join(store.historyFile, '..', 'temp_qa_test.html');

  // Case A: Flawed HTML with empty hash link
  const flawedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flawed Test | Karimnagar</title>
  <meta name="description" content="Test description">
  <meta property="og:title" content="Test">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script type="application/ld+json">{"@type": "LocalBusiness", "name": "Flawed Test"}</script>
  <style>
    @media (max-width: 768px) { body { font-size: 14px; } }
  </style>
</head>
<body>
  <h1>Flawed Test</h1>
  <h2>Services</h2>
  <canvas id="three-canvas"></canvas>
  <div class="mobile-action-bar"></div>
  <a href="#" class="btn">Broken Hash Link</a>
  <a href="tel:+919876543210">Call</a>
  <a href="https://wa.me/919876543210?text=Hello">WhatsApp</a>
  <a href="https://www.google.com/maps/search/?api=1&query=Karimnagar">Maps</a>
  <a href="#" class="floating-wa">WA</a>
  <script>try { const s = new THREE.Scene(); } catch(e) {}</script>
</body>
</html>`;

  fs.writeFileSync(testHtmlPath, flawedHtml, 'utf8');

  const report = await qaEngine.auditAndRepair(testHtmlPath, { slug: 'flawed-test' });
  assert.ok(report.repaired, 'QA engine should detect and repair empty hash link & missing aria');
  assert.ok(report.score >= 85, 'QA score should be high after automated repair');

  // Clean up temp file
  try { fs.unlinkSync(testHtmlPath); } catch (_) {}
});

test('4. Telugu & English Customer Outreach Suite', async (t) => {
  const mockLead = {
    id: 'outreach-lead-01',
    name: 'Karimnagar Fitness Hub',
    slug: 'karimnagar-fitness-hub',
    address: 'Near Shivalayam, Collectorate Road, Karimnagar',
    landmark: 'Collectorate Road',
    phone: '+91 79933 55445'
  };

  const draft = outreachGenerator.generateOutreach(mockLead, 'https://example.com/demo/');
  assert.ok(draft.tenglishMessage.includes('Namaste'), 'Tenglish outreach must include polite greeting');
  assert.ok(draft.teluguMessage.includes('నమస్తే'), 'Telugu outreach must include Telugu script greeting');
  assert.ok(draft.callScript.includes('Phone Call Opening'), 'Must include 30-second phone call script');
  assert.equal(draft.approved, false, 'Outreach must strictly start as unapproved (human in loop)');
});

test('5. Telegram Reporting & Dispatcher Suite', async (t) => {
  // When no token is configured, service must not throw; it logs safely to file
  const mockRunData = {
    totalDiscovered: 3,
    leads: []
  };

  const res = await telegramService.sendDailyReport(mockRunData);
  assert.ok(res.savedToLog, 'Report must be persisted locally in data directory');
  assert.ok(fs.existsSync(res.savedToLog), 'Log file must exist');
});
