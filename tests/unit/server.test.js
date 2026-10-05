import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer, resolveRequestPath } from '../../server.js';

const root = fileURLToPath(new URL('../..', import.meta.url)).replace(/\/$/, '');

describe('resolveRequestPath', () => {
  test('maps / to index.html', () => {
    assert.equal(resolveRequestPath(root, '/'), path.join(root, 'index.html'));
  });
  test('ignores the query string', () => {
    assert.equal(resolveRequestPath(root, '/src/main.js?v=2'), path.join(root, 'src/main.js'));
  });
  // WHATWG URL parsing clamps plain "/../" at the root, so the property that matters is
  // that no request ever resolves outside it.
  const inside = (p) => p === null || !path.relative(root, p).startsWith('..');
  test('never resolves outside the root', () => {
    for (const url of ['/../package.json', '/%2e%2e/%2e%2e/etc/passwd', '/src/../../x', `/../${path.basename(root)}-secrets/key.txt`]) {
      assert.ok(inside(resolveRequestPath(root, url)), url);
    }
  });
  test('blocks encoded-slash traversal', () => {
    assert.equal(resolveRequestPath(root, '/..%2f..%2fetc%2fpasswd'), null);
    assert.equal(resolveRequestPath(root, '/src/..%2f..%2f..%2fetc/passwd'), null);
  });
  test('blocks dotfiles and dot folders', () => {
    for (const url of ['/.git/config', '/.env', '/src/.hidden.js', '/%2egit/HEAD']) {
      assert.equal(resolveRequestPath(root, url), null, url);
    }
  });
  test('rejects null bytes and malformed encoding', () => {
    assert.equal(resolveRequestPath(root, '/index.html%00.js'), null);
    assert.equal(resolveRequestPath(root, '/%E0%A4%A'), null);
  });
});

describe('dev server', () => {
  let server; let base; let port;
  before(async () => {
    server = createServer(root);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    port = server.address().port;
    base = `http://127.0.0.1:${port}`;
  });
  after(() => new Promise((resolve) => server.close(resolve)));

  test('serves the app shell', async () => {
    const res = await fetch(`${base}/`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /text\/html/);
    assert.match(await res.text(), /<title>FDE from Scratch/);
  });

  test('serves modules with a JavaScript MIME type', async () => {
    const res = await fetch(`${base}/src/main.js`);
    assert.equal(res.status, 200);
    assert.match(res.headers.get('content-type'), /application\/javascript/);
  });

  test('serves stylesheets as CSS', async () => {
    const res = await fetch(`${base}/styles/main.css`);
    assert.match(res.headers.get('content-type'), /text\/css/);
  });

  test('falls back to the shell for extensionless routes', async () => {
    const res = await fetch(`${base}/journey`);
    assert.equal(res.status, 200);
    assert.match(await res.text(), /id="app"/);
  });

  test('returns 404 for missing assets', async () => {
    assert.equal((await fetch(`${base}/src/missing.js`)).status, 404);
  });

  test('refuses dotfiles', async () => {
    assert.equal((await fetch(`${base}/.git/HEAD`)).status, 403);
  });

  const rawGet = (target) => new Promise((resolve, reject) => {
    const sock = net.connect(port, '127.0.0.1', () => sock.write(`GET ${target} HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n`));
    let data = '';
    sock.on('data', (c) => { data += c; }).on('end', () => resolve(data.split('\r\n')[0])).on('error', reject);
  });

  test('refuses raw traversal requests that a browser would normalize away', async () => {
    assert.match(await rawGet('/..%2f..%2fetc%2fpasswd'), / 403 /);
    // the old prefix check served sibling folders such as ../FDE-secrets/
    assert.doesNotMatch(await rawGet(`/../../${path.basename(root)}-secrets/x.txt`), / 200 /);
  });
});
