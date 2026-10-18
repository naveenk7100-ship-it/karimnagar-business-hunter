import { hunterOrchestrator } from './orchestrator.js';
import { aiService } from './services/ai.js';
import { telegramService } from './services/telegram.js';
import { discoveryEngine } from './services/discovery.js';
import { CONFIG } from './config.js';
import { execSync } from 'node:child_process';

const command = process.argv[2] || 'hunt';

async function main() {
  switch (command) {
    case 'hunt': {
      await hunterOrchestrator.runDailyPipeline();
      break;
    }

    case 'check-providers': {
      console.log('--- Checking AI Providers Health ---');
      const health = await aiService.checkHealth();
      console.log(JSON.stringify(health, null, 2));
      break;
    }

    case 'check-telegram': {
      console.log('--- Checking Telegram Bot Access ---');
      const res = await telegramService.validateBot();
      console.log(JSON.stringify(res, null, 2));
      if (res.valid && res.chatAccess) {
        console.log('Sending test message to verify...');
        const testRes = await telegramService.sendTestMessage();
        console.log('Test send result:', testRes);
      }
      break;
    }

    case 'check-github': {
      console.log('--- Checking GitHub & GitHub Pages Setup ---');
      try {
        const auth = execSync('gh auth status', { encoding: 'utf8' });
        console.log('GitHub CLI Status:\n', auth);
        const repo = execSync(`gh repo view ${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO} --json name,url,visibility`, { encoding: 'utf8' });
        console.log('Demo Hub Repo:\n', repo);
      } catch (err) {
        console.error('GitHub check error:', err.message);
      }
      break;
    }

    case 'check-osm': {
      console.log('--- Checking Karimnagar Lead Discovery ---');
      const res = await discoveryEngine.discoverDailyLeads(3);
      console.log(`Discovered: ${res.totalDiscovered}, Selected: ${res.selectedCount}`);
      res.leads.forEach((l, i) => {
        console.log(`${i + 1}. ${l.name} | ${l.category} | Score: ${l.score} | Phone: ${l.phone || 'N/A'}`);
      });
      break;
    }

    default: {
      console.log(`Unknown command: ${command}`);
      console.log('Usage: node src/cli.js [hunt | check-providers | check-telegram | check-github | check-osm]');
      process.exit(1);
    }
  }
}

main().catch(err => {
  console.error('Fatal CLI error:', err);
  process.exit(1);
});
