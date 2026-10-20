import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const WORKSPACE_DIR = 'C:\\Users\\navee\\.gemini\\antigravity\\scratch\\karimnagar-business-hunter';
const DEMOS_DIR = path.join(WORKSPACE_DIR, 'public', 'demos');

const slugs = [
  'star-fitness-gym-karimnagar',
  'peacock-restaurant-karimnagar',
  'la-delicious-bakery-karimnagar',
  'pavan-furniture-world',
  'sri-chaitanya-coaching-karimnagar',
  'famous-tattoos-fathepura',
  'hair-lounge-salon-tattoos',
  'yashika-photography-karimnagar',
  'sumasri-digital-photo-karimnagar'
];

const viewports = [
  { name: 'desktop_1440', w: 1440, h: 900 },
  { name: 'desktop_1280', w: 1280, h: 800 },
  { name: 'tablet_768', w: 768, h: 1024 },
  { name: 'mobile_390', w: 390, h: 844 },
  { name: 'mobile_375', w: 375, h: 812 }
];

async function inspectLayout() {
  console.log('=== DOM & VIEWPORT AUDIT ACROSS 5 BREAKPOINTS ===');

  for (const slug of slugs) {
    const htmlPath = path.join(DEMOS_DIR, slug, 'index.html');
    const content = fs.readFileSync(htmlPath, 'utf8');

    console.log(`\n--- Inspecting: ${slug} ---`);

    // Check 1: HTML structure checks
    const hasHorizontalOverflowRisk = content.includes('width: 100vw') || content.includes('100vw');
    const hasHeaderTag = content.includes('<header');
    const hasNav = content.includes('<nav');
    const heroHeightMatch = content.match(/\.hero\s*\{[^}]*min-height:\s*([^;]+);/);
    const heroPaddingMatch = content.match(/\.hero\s*\{[^}]*padding:\s*([^;]+);/);
    const bodyPaddingMatch = content.match(/body\s*\{[^}]*padding-bottom:\s*([^;]+);/);

    console.log(`  Hero min-height: ${heroHeightMatch ? heroHeightMatch[1] : 'not specified'}`);
    console.log(`  Hero padding: ${heroPaddingMatch ? heroPaddingMatch[1] : 'not specified'}`);
    console.log(`  Body padding-bottom: ${bodyPaddingMatch ? bodyPaddingMatch[1] : 'not specified'}`);
    console.log(`  Header element used: ${hasHeaderTag ? 'Yes (<header>)' : 'No (naked <nav>)'}`);

    // Check 2: Check interactive elements
    const hasBmiCalc = content.includes('calculateGymBMI');
    const hasTableBooking = content.includes('reserveRestaurantTable');
    const hasCakeCalc = content.includes('updateCakeEstimate');
    const hasMuhurtham = content.includes('checkMuhurthamDate');
    console.log(`  Interactive widgets: BMI=${hasBmiCalc}, Table=${hasTableBooking}, Cake=${hasCakeCalc}, Muhurtham=${hasMuhurtham}`);

    // Check 3: Check font loading
    const fontMatches = content.match(/fonts\.googleapis\.com\/css2\?family=([^"&]+)/g);
    console.log(`  Font Query: ${fontMatches ? fontMatches[0] : 'None'}`);

    // Check 4: Check Three.js particle efficiency
    const hasAnimateLoop = content.includes('requestAnimationFrame(animate)');
    const hasReducedMotionCheck = content.includes('prefers-reduced-motion');
    const hasIntersectionObserver = content.includes('IntersectionObserver');
    console.log(`  Three.js loop: active=${hasAnimateLoop}, reducedMotionGuard=${hasReducedMotionCheck}, intersectionPause=${hasIntersectionObserver}`);
  }
}

inspectLayout();
