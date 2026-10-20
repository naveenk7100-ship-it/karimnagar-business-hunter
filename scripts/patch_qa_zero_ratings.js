import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const qaFile = path.join(__dirname, '../src/services/qa.js');

let content = fs.readFileSync(qaFile, 'utf8').replace(/\r\n/g, '\n');

const targetStr = `    const factsPass = hasBusinessName && hasKarimnagar && (hasWaLink || hasTelLink);
    checks.push({
      id: 'verified_facts',
      name: 'Verified Facts & Local Integrity',
      status: factsPass ? 'PASS' : 'FAIL',
      evidence: \`business_name=\${hasBusinessName}, local_karimnagar=\${hasKarimnagar}, direct_cta=\${hasWaLink || hasTelLink}\`
    });`;

const replacementStr = `    const factsPass = hasBusinessName && hasKarimnagar && (hasWaLink || hasTelLink);
    checks.push({
      id: 'verified_facts',
      name: 'Verified Facts & Local Integrity',
      status: factsPass ? 'PASS' : 'FAIL',
      evidence: \`business_name=\${hasBusinessName}, local_karimnagar=\${hasKarimnagar}, direct_cta=\${hasWaLink || hasTelLink}\`
    });

    // 11. Complete Rating UI & Claims Removal Guard
    const hasStars = /[⭐★]/i.test(html);
    const hasAggregateRating = /aggregateRating/i.test(html);
    const hasRatingValue = /ratingValue/i.test(html);
    const hasReviewClaims = /verified\\s+reviews/i.test(html);
    const hasRatings = hasStars || hasAggregateRating || hasRatingValue || hasReviewClaims;
    checks.push({
      id: 'zero_ratings',
      name: 'Zero Rating UI & Claims Guard',
      status: !hasRatings ? 'PASS' : 'FAIL',
      evidence: !hasRatings
        ? 'Clean presentation: zero rating badges, stars, review counts or aggregateRating claims'
        : \`Detected forbidden rating claims: stars=\${hasStars}, aggregateRating=\${hasAggregateRating}, ratingValue=\${hasRatingValue}, reviewClaims=\${hasReviewClaims}\`
    });`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replacementStr);
  fs.writeFileSync(qaFile, content, 'utf8');
  console.log('Successfully added zero_ratings check to qa.js');
} else {
  console.error('Target string not found in qa.js');
}
