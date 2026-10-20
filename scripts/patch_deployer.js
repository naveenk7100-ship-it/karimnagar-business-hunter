import fs from 'node:fs';
import path from 'node:path';

const deployerPath = path.resolve('src/services/deployer.js');
let content = fs.readFileSync(deployerPath, 'utf8');

content = content.replace(
  'Karimnagar Business Demos Hub | AI Local Hunter',
  'Karimnagar Commercial Showcase | Digital Demonstration Hub'
);

content = content.replace(
  '<p class="subtitle">Live responsive preview concepts engineered autonomously by Karimnagar Business Hunter AI.</p>',
  '<p class="subtitle">Independent concept prototypes and interactive digital demonstrations developed for premier local businesses across Karimnagar, Telangana.</p>'
);

fs.writeFileSync(deployerPath, content, 'utf8');
console.log('✅ deployer.js patched successfully');
