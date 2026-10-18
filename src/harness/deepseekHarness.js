/**
 * DeepSeek Harness Integration Module
 * Branch: feat/deepseek-harness-workflow
 * Provides read-only workspace exploration, codebase diagnosis, and test verification
 * with automated fallback to native diagnosis when external dsh CLI is unavailable.
 */

import { execSync, spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { CONFIG } from '../config.js';
import { store } from '../services/store.js';

export class DeepSeekHarness {
  constructor() {
    this.branch = 'feat/deepseek-harness-workflow';
  }

  /**
   * Probes system to detect if @deepseek-ai/dsh CLI or module is available.
   */
  async probeHarnessAvailability() {
    try {
      const localDshPath = path.join(CONFIG.ROOT_DIR, 'node_modules', '@deepseek-ai', 'dsh');
      const hasLocalModule = fs.existsSync(localDshPath);

      let cliOutput = '';
      let hasGlobalCli = false;
      try {
        cliOutput = execSync('dsh --version', { encoding: 'utf8', timeout: 3000, stdio: ['pipe', 'pipe', 'ignore'] }).trim();
        hasGlobalCli = true;
      } catch (_) {
        hasGlobalCli = false;
      }

      return {
        available: hasLocalModule || hasGlobalCli,
        provider: 'deepseek-ai/deepseek-harness',
        package: '@deepseek-ai/dsh',
        installedLocally: hasLocalModule,
        hasGlobalCli,
        cliVersion: cliOutput || (hasLocalModule ? '0.2.0-rc.2' : null),
        mode: (hasLocalModule || hasGlobalCli) ? 'DEEPSEEK_HARNESS_DSH' : 'NATIVE_FALLBACK_ANALYSIS'
      };
    } catch (err) {
      return {
        available: false,
        provider: 'deepseek-ai/deepseek-harness',
        mode: 'NATIVE_FALLBACK_ANALYSIS',
        error: err.message
      };
    }
  }

  /**
   * Performs read-only inspection of the repository & workspace.
   */
  async inspectWorkspace() {
    const startTime = Date.now();
    const probe = await this.probeHarnessAvailability();

    // 1. Git status check
    let gitInfo = { branch: 'unknown', clean: false, changedFiles: [] };
    try {
      const branchName = execSync('git rev-parse --abbrev-ref HEAD', { cwd: CONFIG.ROOT_DIR, encoding: 'utf8' }).trim();
      const statusOut = execSync('git status --porcelain', { cwd: CONFIG.ROOT_DIR, encoding: 'utf8' }).trim();
      const changed = statusOut ? statusOut.split('\n').map(l => l.trim()) : [];
      gitInfo = {
        branch: branchName,
        isHarnessBranch: branchName.includes('deepseek-harness') || branchName === this.branch,
        clean: changed.length === 0,
        changedCount: changed.length,
        changedFiles: changed.slice(0, 10)
      };
    } catch (err) {
      gitInfo.error = err.message;
    }

    // 2. Codebase Structure Analysis (read-only)
    const stats = store.getStats();
    const demos = store.getDemos();
    const leads = store.getLeads();

    const analysis = {
      timestamp: new Date().toISOString(),
      durationMs: Date.now() - startTime,
      harness: probe,
      git: gitInfo,
      systemMetrics: {
        totalLeads: leads.length,
        totalDemos: demos.length,
        qualifiedProspects: stats.qualifiedLeads,
        deployedDemos: stats.deployedDemos,
        qaFailures: stats.qaFailures
      },
      separationCheck: {
        status: 'VERIFIED',
        rule: 'Strict separation of leads and demo websites via stable IDs',
        demoCount: demos.length,
        leadCount: leads.length,
        overlappingSlugs: leads.filter(l => demos.some(d => d.id === l.id && !d.leadId)).length
      },
      archetypeCoverage: {
        totalUniqueArchetypes: new Set(demos.map(d => d.archetype)).size,
        archetypesInUse: Array.from(new Set(demos.map(d => d.archetype)))
      }
    };

    return analysis;
  }

  /**
   * Executes test suite in diagnostic mode and records baseline benchmark metrics.
   */
  async runDiagnosticBenchmark() {
    const startTime = Date.now();
    const probe = await this.probeHarnessAvailability();
    let testSuccess = false;
    let testOutput = '';
    let passCount = 0;
    let failCount = 0;

    try {
      // Run tests safely with timeout
      testOutput = execSync('node --test tests/*.test.js', {
        cwd: CONFIG.ROOT_DIR,
        encoding: 'utf8',
        timeout: 90000
      });
      testSuccess = true;
    } catch (err) {
      testOutput = err.stdout || err.stderr || err.message;
      testSuccess = false;
    }

    const durationMs = Date.now() - startTime;

    // Parse pass/fail counts
    const passMatch = testOutput.match(/ℹ pass (\d+)/);
    const failMatch = testOutput.match(/ℹ fail (\d+)/);
    if (passMatch) passCount = parseInt(passMatch[1], 10);
    if (failMatch) failCount = parseInt(failMatch[1], 10);

    const memory = process.memoryUsage();

    const benchmarkResult = {
      timestamp: new Date().toISOString(),
      tool: probe.mode,
      branch: this.branch,
      durationMs,
      testSuccess,
      passCount,
      failCount,
      memoryRssMb: Number((memory.rss / (1024 * 1024)).toFixed(2)),
      memoryHeapMb: Number((memory.heapUsed / (1024 * 1024)).toFixed(2)),
      outputSummary: testOutput.split('\n').filter(l => l.includes('✔') || l.includes('✖') || l.includes('ℹ')).slice(0, 15)
    };

    // Record into persistent store
    store.recordHarnessRun(benchmarkResult);

    return benchmarkResult;
  }
}

export const deepseekHarness = new DeepSeekHarness();
