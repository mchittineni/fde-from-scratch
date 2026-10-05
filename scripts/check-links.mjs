// Checks that every Library resource URL still resolves.
// Run with: npm run check:links   (needs network access)
const { resources } = await import(new URL('../src/data/resources.js', import.meta.url));

const UA = 'Mozilla/5.0 (compatible; fde-from-scratch-link-check; +https://github.com/mchittineni/fde-from-scratch)';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

async function check(r) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(r.url, { redirect: 'follow', signal: ctrl.signal, headers: { 'user-agent': UA } });
    return { r, status: res.status, ok: res.ok };
  } catch (e) {
    return { r, status: e.name === 'AbortError' ? 'timeout' : e.message, ok: false };
  } finally {
    clearTimeout(timer);
  }
}

const queue = [...resources];
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
