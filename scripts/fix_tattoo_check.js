import fs from 'node:fs';
import path from 'node:path';

const filePath = path.resolve('src/services/categoryRegistry.js');
let content = fs.readFileSync(filePath, 'utf8');

const oldCheck = `      const isTattoo = (lead.slug === 'famous-tattoos-fathepura') ||
                       (lead.niche && lead.niche.includes('tattoo')) ||
                       (lead.name && lead.name.toLowerCase().includes('famous tattoo'));`;

const newCheck = `      const isTattoo = (lead.slug === 'famous-tattoos-fathepura') ||
                       (lead.name && lead.name.toLowerCase().includes('famous tattoo'));`;

let norm = content.replace(/\r\n/g, '\n');
if (norm.includes(oldCheck)) {
  norm = norm.replace(oldCheck, newCheck);
  fs.writeFileSync(filePath, norm, 'utf8');
  console.log('✅ isTattoo condition successfully fixed!');
} else {
  console.warn('⚠️ oldCheck not found');
}
