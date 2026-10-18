import test from 'node:test';
import assert from 'node:assert/strict';
import { deepseekHarness } from '../src/harness/deepseekHarness.js';
import { store } from '../src/services/store.js';

test('DeepSeek Harness & Workflow Benchmark Suite', async (t) => {
  await t.test('Harness probe returns valid diagnosis and fallback configuration', async () => {
    const probe = await deepseekHarness.probeHarnessAvailability();
    assert.ok(probe, 'Probe must return diagnosis result');
    assert.equal(probe.provider, 'deepseek-ai/deepseek-harness', 'Provider must match official DeepSeek repo');
    assert.ok(['DEEPSEEK_HARNESS_DSH', 'NATIVE_FALLBACK_ANALYSIS'].includes(probe.mode), 'Mode must be either dsh or native fallback');
  });

  await t.test('Workspace inspection reports branch isolation and entity separation', async () => {
    const inspection = await deepseekHarness.inspectWorkspace();
    assert.ok(inspection.git.branch.includes('deepseek-harness') || inspection.git.branch === 'feat/deepseek-harness-workflow', 'Must be executed on deepseek-harness branch');
    assert.equal(inspection.separationCheck.status, 'VERIFIED', 'Separation between leads and demos must be verified');
    assert.ok(inspection.systemMetrics.totalLeads > 0, 'Must track discovered leads');
    assert.ok(inspection.systemMetrics.totalDemos > 0, 'Must track generated demos');
    assert.ok(inspection.archetypeCoverage.totalUniqueArchetypes >= 3, 'Must have diverse archetypes across categories');
  });

  await t.test('Benchmark metric recording functions accurately with persistence', async () => {
    const initialCount = store.getHarnessRuns().length;
    
    store.recordHarnessRun({
      tool: 'BENCHMARK_VERIFIER',
      branch: 'feat/deepseek-harness-workflow',
      durationMs: 42,
      testSuccess: true,
      passCount: 7,
      failCount: 0,
      memoryRssMb: 45.2,
      memoryHeapMb: 22.1
    });

    const updatedRuns = store.getHarnessRuns();
    assert.equal(updatedRuns.length, initialCount + 1, 'Harness run must be recorded persistently');
    assert.equal(updatedRuns[0].tool, 'BENCHMARK_VERIFIER', 'Run details must match recorded metadata');
  });
});
