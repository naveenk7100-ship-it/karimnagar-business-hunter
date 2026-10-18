import { discoveryEngine } from './services/discovery.js';
import { websiteGenerator } from './services/generator.js';
import { qaEngine } from './services/qa.js';
import { gitHubPagesDeployer } from './services/deployer.js';
import { outreachGenerator } from './services/outreach.js';
import { telegramService } from './services/telegram.js';
import { store } from './services/store.js';

export class HunterOrchestrator {
  /**
   * Executes the full autonomous daily pipeline
   */
  async runDailyPipeline(options = {}) {
    const startTime = Date.now();
    console.log('\n======================================================');
    console.log('🚀 KARIMNAGAR BUSINESS HUNTER AI — PIPELINE ACTIVATED');
    console.log(`⏰ Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)`);
    console.log('======================================================\n');

    // 1. Lead Discovery
    console.log('[Step 1/5] Discovering & Qualifying Karimnagar Business Leads...');
    const discovery = await discoveryEngine.discoverDailyLeads(options.limit || 3);
    console.log(`- Total Qualified Candidates in Registry: ${discovery.totalDiscovered}`);
    console.log(`- Selected for Today's Run: ${discovery.selectedCount}`);

    if (discovery.selectedCount === 0) {
      console.log('ℹ️ No unserved eligible leads found today. All candidates have already been processed.');
    }

    const processedLeads = [];
    const leadErrors = [];

    // 2. Process each lead independently
    for (let i = 0; i < discovery.leads.length; i++) {
      const lead = discovery.leads[i];
      console.log(`\n--- Processing Lead ${i + 1}/${discovery.leads.length}: ${lead.name} (${lead.category}) ---`);

      try {
        // Step 2a: Generate Website
        console.log(`  [2a] Generating tailored 3D/animated concept website...`);
        const generated = await websiteGenerator.generateWebsite(lead);
        console.log(`  ✓ Generated: ${generated.filePath}`);

        // Step 2b: Real QA & Automated Repair
        console.log(`  [2b] Running Real QA & Repair Suite...`);
        const qaReport = await qaEngine.auditAndRepair(generated.filePath, lead);
        console.log(`  ✓ QA Score: ${qaReport.score}% (Pass: ${qaReport.pass}, Auto-Repaired: ${qaReport.repaired})`);

        // Step 2c: GitHub Pages Deployment
        console.log(`  [2c] Deploying to GitHub Pages...`);
        const deployReport = await gitHubPagesDeployer.deployLeadDemo(lead, generated.filePath);
        console.log(`  ✓ Published URL: ${deployReport.publishedUrl} (Live: ${deployReport.isLive}, State: ${deployReport.deploymentState})`);

        // Step 2d: Personalized Outreach
        console.log(`  [2d] Drafting Telugu/Tenglish & English outreach...`);
        const outreach = outreachGenerator.generateOutreach(lead, deployReport.publishedUrl);
        console.log(`  ✓ Outreach drafts created & awaiting human approval.`);

        // Record in persistent demo store and history
        store.saveDemo({
          id: lead.slug,
          leadId: lead.id,
          businessName: lead.name,
          category: lead.category,
          niche: lead.niche,
          slug: lead.slug,
          relativeUrl: generated.relativeUrl,
          publishedUrl: deployReport.publishedUrl,
          repo: `${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_DEMO_REPO}`,
          archetype: generated.archetype?.id || 'modern_showcase',
          designFingerprint: generated.designFingerprint,
          qaScore: qaReport.score,
          qaPass: qaReport.pass,
          deploymentStatus: deployReport.isLive ? 'LIVE' : 'DEPLOYED',
          httpStatus: deployReport.httpStatus || 200,
          verifiedAt: new Date().toISOString()
        });

        store.recordProcessedLead({
          id: lead.id,
          name: lead.name,
          slug: lead.slug,
          phone: lead.phone,
          category: lead.category,
          demoUrl: deployReport.publishedUrl
        });

        processedLeads.push({
          lead,
          generated,
          qa: qaReport,
          deployment: deployReport,
          outreach
        });
      } catch (err) {
        console.error(`  ❌ Error processing lead ${lead.name}:`, err.message);
        leadErrors.push({ lead: lead.name, slug: lead.slug, error: err.message });
        // Isolation: pipeline continues with other leads!
      }
    }

    // 3. Telegram Reporting
    console.log('\n[Step 4/5] Formatting & Sending Telegram Daily Report...');
    const telegramResult = await telegramService.sendDailyReport({
      totalDiscovered: discovery.totalDiscovered,
      leads: processedLeads,
      errors: leadErrors
    });

    if (telegramResult.sent) {
      console.log('✓ Telegram report delivered successfully to your chat!');
    } else {
      console.log(`ℹ️ Telegram delivery note: ${telegramResult.reason || telegramResult.error || 'Saved to log file'}`);
      console.log(`  (Report stored at: ${telegramResult.savedToLog})`);
    }

    // 4. Record Run Audit Log
    const runResult = {
      durationMs: Date.now() - startTime,
      totalDiscovered: discovery.totalDiscovered,
      processedCount: processedLeads.length,
      errorCount: leadErrors.length,
      telegramDelivered: Boolean(telegramResult.sent),
      leads: processedLeads.map(p => ({
        name: p.lead.name,
        slug: p.lead.slug,
        category: p.lead.category,
        qaScore: p.qa.score,
        demoUrl: p.deployment.publishedUrl,
        deploymentState: p.deployment.deploymentState
      })),
      errors: leadErrors
    };

    store.recordRun(runResult);
    console.log('\n======================================================');
    console.log('🏁 DAILY RUN FINISHED IN ' + Math.round(runResult.durationMs / 1000) + 's');
    console.log('======================================================\n');

    return runResult;
  }
}

export const hunterOrchestrator = new HunterOrchestrator();
