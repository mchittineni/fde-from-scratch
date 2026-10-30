// Checks that every Library resource URL, and every external link in the README and
// field guides, still resolves.
// Run with: npm run check:links   (needs network access)
import { readdirSync, readFileSync } from 'node:fs';

const { resources } = await import(new URL('../src/data/resources.js', import.meta.url));

// External Markdown links, labelled by file, skipping any URL the Library already checks.
const docs = ['README.md', ...readdirSync(new URL('../docs/guides/', import.meta.url)).map((n) => `docs/guides/${n}`)].filter((p) => p.endsWith('.md'));
const seen = new Set(resources.map((r) => r.url));
const docLinks = docs.flatMap((file) => {
  const text = readFileSync(new URL(`../${file}`, import.meta.url), 'utf8').replace(/```[\s\S]*?```/g, '');
  return [...text.matchAll(/\]\((https:\/\/[^)\s]+)\)/g)].map(([, url]) => url)
    .filter((url) => !seen.has(url) && seen.add(url))
    .map((url) => ({ id: file, url }));
});
// Badges and the live site are generated or self-referential, not learning content.
const SKIP = /img\.shields\.io|\/actions\/workflows\/|mchittineni\.github\.io\/fde-from-scratch/;

const UA = 'Mozilla/5.0 (compatible; fde-from-scratch-link-check; +https://github.com/mchittineni/fde-from-scratch)';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

// YouTube answers 200 for any watch URL, even a deleted or mistyped video. Its oEmbed
// endpoint returns 404 / 400 / 401 instead, so check videos through it.
const probeUrl = (url) => {
  const { hostname } = new URL(url);
  return /(^|\.)youtube\.com$|^youtu\.be$/.test(hostname) && /watch\?v=|youtu\.be\//.test(url)
    ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`
    : url;
};

async function check(r) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(probeUrl(r.url), { redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA } });
    return { r, status: res.status, ok: res.ok };
  } catch (e) {
    return { r, status: e.name === 'AbortError' ? 'timeout' : e.message, ok: false };
  } finally {
    clearTimeout(timer);
  }
}

const queue = [...resources, ...docLinks.filter((l) => !SKIP.test(l.url))];
const results = [];
await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
  while (queue.length) results.push(await check(queue.shift()));
}));

const broken = results.filter((x) => !x.ok);
// Some sites reject automated requests (403/429) but work in a browser — report them separately.
const blocked = broken.filter((x) => x.status === 403 || x.status === 429);
const dead = broken.filter((x) => !blocked.includes(x));

blocked.forEach((x) => console.warn(`! ${x.status}  ${x.r.id}  ${x.r.url}  (blocked automated check — verify in a browser)`));
dead.forEach((x) => console.error(`✗ ${x.status}  ${x.r.id}  ${x.r.url}`));
console.log(`\n${results.length - broken.length}/${results.length} links OK${blocked.length ? `, ${blocked.length} blocked` : ''}${dead.length ? `, ${dead.length} broken` : ''}.`);
process.exit(dead.length ? 1 : 0);
