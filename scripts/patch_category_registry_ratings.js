import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catFile = path.join(__dirname, '../src/services/categoryRegistry.js');

let content = fs.readFileSync(catFile, 'utf8').replace(/\r\n/g, '\n');

const replacements = [
  {
    target: "badgeText: `⭐ ${lead.rating || '4.5'} Solid Teak & Living Collections`",
    replacement: "badgeText: 'Solid Teak & Living Collections'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Leading Junior & Entrance Coaching Institute`",
    replacement: "badgeText: 'Leading Junior & Entrance Coaching Institute'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Top-Rated Family Multi-Cuisine Destination`",
    replacement: "badgeText: 'Family Multi-Cuisine Dining Destination'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Artisan Bakery & Dessert Destination`",
    replacement: "badgeText: 'Artisan Bakery & Dessert Destination'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Certified Sterile Tattoo & Piercing Studio`",
    replacement: "badgeText: 'Certified Sterile Tattoo & Piercing Studio'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Premium Salon & Grooming Lounge`",
    replacement: "badgeText: 'Premium Salon & Grooming Lounge'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Top-Rated AC Gym in Karimnagar`",
    replacement: "badgeText: 'Air-Conditioned Fitness Centre in Karimnagar'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Karimnagar Heritage Portrait & Restoration Studio`",
    replacement: "badgeText: 'Karimnagar Heritage Portrait & Restoration Studio'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Rated (${lead.reviewCount || '80'}+ Weddings Documented)`",
    replacement: "badgeText: 'Cinematic 4K Wedding Films & Candid Photography'"
  },
  {
    target: "badgeText: `⭐ ${lead.rating || '4.8'} Top Rated in Karimnagar`",
    replacement: "badgeText: 'Premier Commercial Destination in Karimnagar'"
  }
];

let replacedCount = 0;
for (const { target, replacement } of replacements) {
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    replacedCount++;
  } else {
    // Also try matching with regex for any variation
    const regex = new RegExp("badgeText:\\s*`[^`]*\\$\\{lead\\.rating[^`]*`", "g");
    // We'll replace specifically if direct string didn't match
    console.log('Target not found directly:', target);
  }
}

// Fallback regex replacement for any remaining badgeText with lead.rating
content = content.replace(/badgeText:\s*`[^`]*\$\{lead\.rating[^`]*`/g, (match) => {
  replacedCount++;
  return "badgeText: 'Verified Local Business in Karimnagar'";
});

fs.writeFileSync(catFile, content, 'utf8');
console.log(`Updated categoryRegistry.js: replaced ${replacedCount} badgeText rating instances.`);
