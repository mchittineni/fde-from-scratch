import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  LESSON_DIAGRAMS, wrapText, smoothPath,
  DEPLOYMENT_LIFECYCLE_STAGES, renderDeploymentPipelineSvg,
  ROLE_COMPARISONS, renderRoleMatrixSvg,
  PILLAR_DETAILS, renderPillarsPentagramSvg,
  TOOLKIT_LAYERS, renderToolkitPyramidSvg,
  TRUST_MILESTONES, renderTrustCurveSvg,
  TRIAGE_LAYERS, renderTriageLadderSvg,
  FLYWHEEL_STEPS, renderFlywheelSvg,
  renderJourneyTransitSvg,
  renderSimulatorArchitectureSvg,
  renderCaseArchitectureSvg,
  renderPlaybookPipelineSvg
} from '../../src/lib/diagrams.js';
import { esc } from '../../src/lib/core.js';
import { diagnosticPillars } from '../../src/data/diagnostic.js';
import { simulations } from '../../src/data/simulations.js';
import { caseStudies } from '../../src/data/caseStudies.js';
import { companyPlaybooks } from '../../src/data/companies.js';
import { orientationLessons } from '../../src/data/foundations.js';

const pressed = (html, name) => [...html.matchAll(new RegExp(`data-diagram="${name}" data-value="([^"]+)"[^>]*aria-pressed="true"`, 'g'))].map((m) => m[1]);

// Every selectable diagram: [name, render, ids in order]
const SELECTABLE = [
  ['lifecycle', renderDeploymentPipelineSvg, DEPLOYMENT_LIFECYCLE_STAGES.map((s) => s.id)],
  ['roles', renderRoleMatrixSvg, Object.keys(ROLE_COMPARISONS)],
  ['pillars', renderPillarsPentagramSvg, diagnosticPillars.map((p) => p.id)],
  ['toolkit', renderToolkitPyramidSvg, TOOLKIT_LAYERS.map((l) => l.id)],
  ['trust', renderTrustCurveSvg, TRUST_MILESTONES.map((m) => m.id)],
  ['triage', renderTriageLadderSvg, TRIAGE_LAYERS.map((l) => l.id)],
  ['flywheel', renderFlywheelSvg, FLYWHEEL_STEPS.map((s) => s.id)]
];

describe('lesson diagrams', () => {
  test('the registry covers every selectable diagram and every lesson reference', () => {
    assert.deepEqual(Object.keys(LESSON_DIAGRAMS).sort(), SELECTABLE.map(([n]) => n).sort());
    const used = orientationLessons.flatMap((l) => l.blocks.filter((b) => b.type === 'diagram').map((b) => b.name));
    for (const name of used) assert.ok(LESSON_DIAGRAMS[name], `unknown diagram ${name}`);
  });

  for (const [name, render, ids] of SELECTABLE) {
    test(`${name}: each value selects exactly one button, and unknown values fall back`, () => {
      for (const id of ids) {
        const html = render(id);
        assert.match(html, new RegExp(`id="dg-${name}"`));
        assert.match(html, /<svg class="interactive-svg[^"]*"[^>]*role="img"[^>]*aria-label="[^"]+"/);
        assert.deepEqual(pressed(html, name), [id]);
        assert.match(html, /class="dg-inspector"/);
      }
      const fallback = render('nope');
      assert.equal(pressed(fallback, name).length, 1);
      assert.deepEqual(pressed(render(), name), pressed(fallback, name));
    });

    test(`${name}: SVG nodes are pointer shortcuts, not extra tab stops`, () => {
      const svg = render(ids[0]).match(/<svg[\s\S]*<\/svg>/)[0];
      assert.doesNotMatch(svg, /tabindex|role="button"/);
    });
  }

  test('the toolkit defaults to its base layer', () => {
    assert.deepEqual(pressed(renderToolkitPyramidSvg(), 'toolkit'), ['terminal']);
  });

  test('pillars use the diagnostic pillar names, so the lesson and the diagnostic agree', () => {
    assert.deepEqual(Object.keys(PILLAR_DETAILS).sort(), diagnosticPillars.map((p) => p.id).sort());
    for (const p of diagnosticPillars) assert.ok(renderPillarsPentagramSvg(p.id).includes(esc(p.name)));
  });

  test('the triage ladder marks lower layers ruled out and lifts the packet to the active layer', () => {
    const html = renderTriageLadderSvg('tls');
    assert.equal((html.match(/✓ ruled out/g) || []).length, 2);
    assert.match(html, /● investigate/);
    assert.match(html, /--rise:-96px/);
    assert.match(renderTriageLadderSvg('dns'), /--rise:0px/);
  });

  test('role scores are labelled as illustrative', () => {
    assert.match(renderRoleMatrixSvg('sa'), /illustrative/i);
    assert.match(renderRoleMatrixSvg('sa'), /FDE profile for comparison/);
    assert.doesNotMatch(renderRoleMatrixSvg('fde'), /FDE profile for comparison/);
  });
});

describe('page diagrams', () => {
  test('journey route map handles empty and populated station lists', () => {
    assert.equal(renderJourneyTransitSvg([]), '');
    const html = renderJourneyTransitSvg([
      { id: 'orientation', n: '00', title: 'Orientation', status: 'done' },
      { id: 'w1', n: '01', title: 'Distributed data engines and lakehouse internals', status: 'current' },
      { id: 'w2', n: '02', title: 'Decomposition', status: 'upcoming' }
    ], 'w1');
    assert.match(html, /1\/3 stations/);
    assert.match(html, /data-action="goto-station" data-id="w1"/);
    assert.match(html, /<tspan[^>]*>Distributed<\/tspan><tspan[^>]*>data engines…<\/tspan>/); // two lines, then an ellipsis
    assert.equal((html.match(/dg-pulse/g) || []).length, 1);
  });

  test('simulator map colours each node by health and flags critical ones', () => {
    const good = renderSimulatorArchitectureSvg(simulations[0], { trust: 85, integrity: 90, velocity: 80 });
    assert.match(good, /Trust 85/);
    assert.doesNotMatch(good, /is-critical/);
    const bad = renderSimulatorArchitectureSvg(simulations[0], { trust: 25, integrity: 30, velocity: 20 });
    assert.equal((bad.match(/is-critical/g) || []).length, 2);
  });

  test('case overview strips the "1." prefix and lays out every phase', () => {
    for (const cs of caseStudies) {
      const html = renderCaseArchitectureSvg(cs);
      assert.equal((html.match(/class="dg-phase"/g) || []).length, cs.architecturePhases.length);
      assert.doesNotMatch(html, /<tspan[^>]*>\d+\.</);
    }
    assert.equal(renderCaseArchitectureSvg({ title: 'x', architecturePhases: [] }), '');
  });

  test('playbook rounds are scoped to the company and clamped to the loop', () => {
    const co = companyPlaybooks[0];
    const html = renderPlaybookPipelineSvg(co, 1);
    assert.deepEqual(pressed(html, 'playbook'), [`${co.id}:1`]);
    assert.match(html, new RegExp(`Round 2 of ${co.interviewStages.length}`));
    const clamped = renderPlaybookPipelineSvg(co, 99);
    assert.deepEqual(pressed(clamped, 'playbook'), [`${co.id}:${co.interviewStages.length - 1}`]);
  });
});

describe('svg helpers', () => {
  test('wrapText breaks on words within the limit', () => {
    assert.deepEqual(wrapText('Ingestion and Entity Resolution', 16), ['Ingestion and', 'Entity', 'Resolution']);
    assert.deepEqual(wrapText('Short', 16), ['Short']);
    assert.deepEqual(wrapText('', 10), []);
  });

  test('smoothPath starts at the first point and ends at the last', () => {
    const d = smoothPath([[0, 0], [10, 10], [20, 0]]);
    assert.match(d, /^M0,0 C/);
    assert.match(d, / 20,0$/);
    assert.equal((d.match(/C/g) || []).length, 2);
  });
});
