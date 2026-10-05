import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  rankTopics, topicsFor, practiceFor, learnFor, projectFor, projectDone,
  FALLBACK_PRACTICE, LEVEL_PREF, TOPIC_RULES, resById
} from '../../src/lib/journey.js';
import { experienceLevels } from '../../src/data/roadmaps.js';
import { resources, resourceTopics } from '../../src/data/resources.js';
import { portfolioProjects } from '../../src/data/labs.js';

const week = (title, focus = '', summary = '') => ({ title, focus, summary });

describe('rankTopics', () => {
  test('matches a single clear topic', () => {
    assert.deepEqual(rankTopics('Kafka pipelines'), ['data']);
  });

  test('a title match outweighs a summary match', () => {
    assert.equal(rankTopics('SAML and SSO', 'one ai mention')[0], 'security');
  });

  test('a secondary topic needs a strong match', () => {
    // one weak mention of "llm" in the summary is not enough to add "ai"
    assert.deepEqual(rankTopics('Spark lakehouse', 'maybe an llm'), ['data']);
    // a title-level mention scores 2 and is kept
    assert.deepEqual(rankTopics('Spark lakehouse with RAG'), ['data', 'ai']);
  });

  test('never returns more than two topics', () => {
    assert.ok(rankTopics('Spark SAML RAG Kubernetes stakeholder interview').length <= 2);
  });

  test('ties keep rule order', () => {
    assert.deepEqual(rankTopics('decomp and client'), ['decomp', 'diplomacy']);
  });

  test('word-boundary rules do not match inside other words', () => {
    assert.deepEqual(rankTopics('maintain the email thread'), []); // "ai" inside words
    assert.deepEqual(rankTopics('a ssot design'), []); // not "sso"
  });

  test('every rule maps to a known library topic', () => {
    const ids = new Set(resourceTopics.map((t) => t.id));
    for (const [, id] of TOPIC_RULES) assert.ok(ids.has(id), `unknown topic ${id}`);
  });
});

describe('topicsFor', () => {
  test('falls back to client diplomacy when nothing matches', () => {
    assert.deepEqual(topicsFor('Week of rest', 'nothing relevant here'), ['diplomacy']);
  });
  test('returns ranked topics when something matches', () => {
    assert.deepEqual(topicsFor('Production RAG'), ['ai']);
  });
});

describe('practiceFor', () => {
  test('suggests at most two distinct labs', () => {
    const out = practiceFor(week('Decomp for stakeholders', 'Linux networking', 'Spark and RAG'));
    assert.equal(out.length, 2);
    assert.notEqual(out[0].href, out[1].href);
  });
  test('falls back to the diagnostic', () => {
    assert.deepEqual(practiceFor(week('Rest week')), [FALLBACK_PRACTICE]);
  });
  test('links to the right question category', () => {
    const [link] = practiceFor(week('LLM agents'));
    assert.equal(link.href, '#/labs/questions?c=Enterprise%20AI%20%26%20LLMs');
  });
});

describe('learnFor', () => {
  test('returns up to three resources from the topic', () => {
    const out = learnFor(['data'], { role: 'entry' });
    assert.equal(out.length, 3);
    out.forEach((r) => assert.equal(r.topic, 'data'));
  });

  test('gives the primary topic two of three slots', () => {
    const out = learnFor(['data', 'ai'], { role: 'mid' });
    assert.deepEqual(out.map((r) => r.topic), ['data', 'data', 'ai']);
  });

  test('prefers the level that suits the track', () => {
    for (const role of Object.keys(LEVEL_PREF)) {
      const [first] = learnFor(['infra'], { role });
      const best = LEVEL_PREF[role].find((lvl) => resources.some((r) => r.topic === 'infra' && r.level === lvl));
      assert.equal(first.level, best, `${role} should start at ${best}`);
    }
  });

  test('pushes already-read resources down the list', () => {
    const unread = learnFor(['security'], { role: 'entry' });
    const readRes = { [unread[0].id]: true };
    const after = learnFor(['security'], { role: 'entry', readRes });
    assert.notEqual(after[0].id, unread[0].id);
  });

  test('never returns duplicates', () => {
    for (const t of resourceTopics) {
      for (const u of resourceTopics) {
        const ids = learnFor([t.id, u.id], { role: 'senior' }).map((r) => r.id);
        assert.equal(new Set(ids).size, ids.length, `${t.id}+${u.id}`);
      }
    }
  });

  test('unknown roles behave like entry', () => {
    assert.deepEqual(learnFor(['ai'], { role: 'nope' }), learnFor(['ai'], { role: 'entry' }));
  });
});

describe('projectFor', () => {
  test('matches the primary topic exactly', () => {
    assert.equal(projectFor(['security'], { role: 'mid' }).topic, 'security');
  });

  test('interview stations build the exec demo', () => {
    assert.equal(projectFor(['interview'], { role: 'entry' }).id, 'p-demo');
  });

  test('finished projects drop behind unfinished ones', () => {
    const first = projectFor(['ai'], { role: 'mid' });
    const projects = { [first.id]: Object.fromEntries(first.criteria.map((c) => [c.id, true])) };
    assert.notEqual(projectFor(['ai'], { role: 'mid', projects }).id, first.id);
  });

  test('projectDone needs every criterion', () => {
    const p = portfolioProjects[0];
    const all = Object.fromEntries(p.criteria.map((c) => [c.id, true]));
    assert.equal(projectDone(p, { [p.id]: all }), true);
    assert.equal(projectDone(p, { [p.id]: { ...all, [p.criteria[0].id]: false } }), false);
    assert.equal(projectDone(p, {}), false);
  });
});

describe('every roadmap station gets useful links', () => {
  // Guards against the regressions seen while tuning TOPIC_RULES: stations with no links,
  // or links to an unrelated topic.
  for (const [roleId, track] of Object.entries(experienceLevels)) {
    test(`${roleId}: each week has resources, a project and practice`, () => {
      track.weeks.forEach((w, i) => {
        const topics = topicsFor(`${w.title} ${w.focus}`, w.summary);
        const learn = learnFor(topics, { role: roleId });
        assert.ok(learn.length >= 2, `${roleId} week ${i + 1} "${w.title}" has ${learn.length} resources`);
        learn.forEach((r) => assert.ok(resById[r.id], `unknown resource ${r.id}`));
        assert.ok(projectFor(topics, { role: roleId }), `${roleId} week ${i + 1} "${w.title}" has no project`);
        assert.ok(practiceFor(w).length >= 1);
      });
    });
  }
});
