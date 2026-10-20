import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const catFile = path.join(__dirname, '../src/services/categoryRegistry.js');

let content = fs.readFileSync(catFile, 'utf8');

const categoryBadges = [
  { match: /id: 'furniture_decor'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Solid Teak Living & Architectural Interior Collections'" },
  { match: /id: 'education_coaching'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Integrated IIT-JEE, NEET & Intermediate Coaching'" },
  { match: /id: 'restaurant_dining'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Authentic Dum Biryani & Multi-Cuisine Family Dining'" },
  { match: /id: 'bakery_cafe'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Artisan Patisserie, Custom Cakes & Fresh Viennoiserie'" },
  { match: /niche === 'tattoo'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Clinical Sterile Tattoo Artistry & Custom Flash Studio'" },
  { match: /niche !== 'tattoo'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Luxury Hair Architecture, Grooming & Botanical Spa'" },
  { match: /id: 'fitness_gym'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Air-Conditioned Unisex Fitness & Olympic Strength Arena'" },
  { match: /niche === 'portrait_photo'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Karimnagar Heritage Portraiture & Archival Restoration'" },
  { match: /niche !== 'portrait_photo'[\s\S]*?badgeText:\s*'[^']*'/, replaceKey: "badgeText: 'Cinematic 4K Wedding Films & Authentic Candid Muhurtham'" }
];

for (const item of categoryBadges) {
  content = content.replace(item.match, (matched) => {
    return matched.replace(/badgeText:\s*'[^']*'/, item.replaceKey);
  });
}

fs.writeFileSync(catFile, content, 'utf8');
console.log('Successfully set bespoke, non-rating category badges in categoryRegistry.js');
