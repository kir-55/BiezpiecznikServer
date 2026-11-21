import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import { WEB_ROOT } from '../shared/release.ts';
import { createApp } from './app.ts';
import { loadConfig } from './config.ts';

const APK = Buffer.from(Array.from({ length: 1000 }, (_, i) => (i * 7) % 256));
const SHA = createHash('sha256').update(APK).digest('hex');
const PACK = Buffer.from(Array.from({ length: 5000 }, (_, i) => (i * 13) % 256));
const PACK_SHA = createHash('sha256').update(PACK).digest('hex');
const ANDROID = 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36';
const DESKTOP = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36';

let dir: string;
let app: ReturnType<typeof createApp>;
const seen: Response[] = [];
async function req(path: string, init?: RequestInit) {
  const res = await app.request(path, init);
  seen.push(res);
  return res;
}

before(async () => {
  console.log = () => {}; // keep the request log out of the test output
  await mkdir(join(WEB_ROOT, '.qa/backend'), { recursive: true });
  dir = await mkdtemp(join(WEB_ROOT, '.qa/backend/app-test-'));
  await mkdir(join(dir, 'releases'));
  await mkdir(join(dir, 'static/assets'), { recursive: true });
  await writeFile(join(dir, 'releases/bezpiecznik.apk'), APK);
  await writeFile(join(dir, 'static/index.html'), '<!doctype html><title>t</title>');
  await writeFile(join(dir, 'static/assets/index-abc123.js'), 'console.log(1)');
  await writeFile(join(dir, 'static/assets/index-abc123.css'), 'body{}');
  await writeFile(join(dir, 'static/assets/font.woff2'), 'w');
  await writeFile(join(dir, 'static/assets/icon.svg'), '<svg/>');
  await writeFile(join(dir, 'secret.txt'), 'outside STATIC_DIR');
  await mkdir(join(dir, 'packs/nested'), { recursive: true });
  await writeFile(join(dir, 'packs/zachodniopomorskie.mbtiles'), PACK);
  await writeFile(join(dir, 'packs/notes.txt'), 'not a pack');
  await writeFile(join(dir, 'packs/nested/inner.mbtiles'), 'nested');
  const env = { RELEASE_DIR: join(dir, 'releases'), STATIC_DIR: join(dir, 'static'), PACKS_DIR: join(dir, 'packs'), TRUST_HTTPS: '1' };
  app = createApp(loadConfig(env, { version: '1.0.0', minAndroid: 'Android 11', abi: 'arm64-v8a' }));
});
after(() => rm(dir, { recursive: true, force: true }));

test('GET /api/release', async () => {
  const res = await req('/api/release');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('cache-control'), 'no-cache');
  const body = await res.json();
  assert.match(body.builtAt, /^\d{4}-\d{2}-\d{2}$/);
  delete body.builtAt;
  assert.deepEqual(body, {
    version: '1.0.0',
    fileName: 'bezpiecznik-1.0.0.apk',
    sizeBytes: 1000,
    sha256: SHA,
    url: '/download/bezpiecznik.apk',
    minAndroid: 'Android 11',
    abi: 'arm64-v8a',
  });
});

test('download: full 200', async () => {
  const res = await req('/download/bezpiecznik.apk');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'application/vnd.android.package-archive');
  assert.equal(res.headers.get('content-disposition'), 'attachment; filename="bezpiecznik-1.0.0.apk"');
  assert.equal(res.headers.get('content-length'), '1000');
  assert.equal(res.headers.get('etag'), `"${SHA}"`);
  assert.equal(res.headers.get('accept-ranges'), 'bytes');
  assert.ok(res.headers.get('last-modified'));
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), APK);
});

test('download: ranges, conditionals, HEAD', async () => {
  let res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=0-99' } });
  assert.equal(res.status, 206);
  assert.equal(res.headers.get('content-range'), 'bytes 0-99/1000');
  assert.equal(res.headers.get('content-length'), '100');
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), APK.subarray(0, 100));

  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=900-' } });
  assert.equal(res.headers.get('content-range'), 'bytes 900-999/1000');
  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=-10' } });
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), APK.subarray(990));

  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=5000-' } });
  assert.equal(res.status, 416);
  assert.equal(res.headers.get('content-range'), 'bytes */1000');

  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=0-1,5-9' } });
  assert.equal(res.status, 200, 'multi-range is ignored');

  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=10-19', 'If-Range': `"${SHA}"` } });
  assert.equal(res.status, 206, 'If-Range with the current ETag resumes');
  res = await req('/download/bezpiecznik.apk', { headers: { Range: 'bytes=10-19', 'If-Range': '"stale"' } });
  assert.equal(res.status, 200, 'If-Range with an old ETag restarts');

  res = await req('/download/bezpiecznik.apk', { headers: { 'If-None-Match': `W/"x", "${SHA}"` } });
  assert.equal(res.status, 304);

  res = await req('/download/bezpiecznik.apk', { method: 'HEAD' });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-length'), '1000');
  assert.equal((await res.arrayBuffer()).byteLength, 0);
});

// The app downloads data packs (the offline map) from here, resuming after a dropped connection.
test('packs: full file with the headers a resumable download needs', async () => {
  const res = await req('/paczki/zachodniopomorskie.mbtiles');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-type'), 'application/octet-stream');
  assert.equal(res.headers.get('content-length'), '5000');
  assert.equal(res.headers.get('accept-ranges'), 'bytes');
  assert.equal(res.headers.get('etag'), `"${PACK_SHA}"`);
  assert.equal(res.headers.get('content-disposition'), 'attachment; filename="zachodniopomorskie.mbtiles"');
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), PACK);
});

test('packs: the app resumes with an open-ended range', async () => {
  let res = await req('/paczki/zachodniopomorskie.mbtiles', { headers: { Range: 'bytes=4000-' } });
  assert.equal(res.status, 206);
  assert.equal(res.headers.get('content-range'), 'bytes 4000-4999/5000');
  assert.deepEqual(Buffer.from(await res.arrayBuffer()), PACK.subarray(4000));

  res = await req('/paczki/zachodniopomorskie.mbtiles', { headers: { Range: 'bytes=5000-' } });
  assert.equal(res.status, 416, 'a partial file as long as the pack: nothing left to send');
  assert.equal(res.headers.get('content-range'), 'bytes */5000');

  res = await req('/paczki/zachodniopomorskie.mbtiles', { method: 'HEAD' });
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('content-length'), '5000');
});

test('packs: only pack files directly in PACKS_DIR are served', async () => {
  for (const p of [
    '/paczki/missing.mbtiles',
    '/paczki/notes.txt', // not a pack extension
    '/paczki/nested/inner.mbtiles', // no sub-directories
    '/paczki/..%2Fsecret.txt',
    '/paczki/%2e%2e%2fsecret.txt',
    '/paczki/.mbtiles',
    '/paczki/',
  ]) {
    const res = await req(`http://localhost${p}`);
    assert.equal(res.status, 404, p);
    assert.doesNotMatch(await res.text(), /outside STATIC_DIR|not a pack|nested/, p);
  }
  const res = await req('/paczki/missing.mbtiles');
  assert.deepEqual(await res.json(), { error: 'not found' }, 'JSON, not the HTML page: the client is the app');
});

test('/pobierz sends Android to the APK and others to the page', async () => {
  let res = await req('/pobierz', { headers: { 'User-Agent': ANDROID } });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get('location'), '/download/bezpiecznik.apk');
  assert.equal(res.headers.get('vary'), 'User-Agent');
  assert.equal(res.headers.get('cache-control'), 'no-store');
  res = await req('/pobierz', { headers: { 'User-Agent': DESKTOP } });
  assert.equal(res.headers.get('location'), '/#pobierz');
});

test('static files: cache headers, MIME, 404', async () => {
  for (const p of ['/', '/index.html']) {
    const res = await req(p);
    assert.equal(res.status, 200, p);
    assert.equal(res.headers.get('cache-control'), 'no-cache', p);
    assert.match(res.headers.get('content-type')!, /^text\/html/);
  }
  const mime: Record<string, RegExp> = {
    'index-abc123.js': /^text\/javascript/,
    'index-abc123.css': /^text\/css/,
    'font.woff2': /^font\/woff2$/,
    'icon.svg': /^image\/svg\+xml/,
  };
  for (const [f, type] of Object.entries(mime)) {
    const res = await req(`/assets/${f}`);
    assert.equal(res.status, 200, f);
    assert.equal(res.headers.get('cache-control'), 'public, max-age=31536000, immutable');
    assert.match(res.headers.get('content-type')!, type);
  }
  let res = await req('/nie-ma');
  assert.equal(res.status, 404);
  assert.match(await res.text(), /Nie ma takiej strony/);
  res = await req('/api/nope');
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: 'not found' });
  assert.equal((await req('/healthz').then((r) => r.text())), 'ok');
});

test('path traversal is rejected', async () => {
  for (const p of ['/../secret.txt', '/assets/../../secret.txt', '/%2e%2e/secret.txt', '/%2E%2E%2Fsecret.txt', '/..%2fsecret.txt', '/assets/..%5c..%5csecret.txt', '/%252e%252e/secret.txt', '//secret.txt']) {
    // The URL parser already folds '..' and '%2e%2e'; serveStatic must reject what survives ('%2f', '%5c', '%25', '//').
    const res = await req(`http://localhost${p}`);
    assert.equal(res.status, 404, p);
    assert.doesNotMatch(await res.text(), /outside STATIC_DIR/, p);
  }
});

test('APK missing: JSON 404', async () => {
  const empty = createApp(loadConfig({ RELEASE_DIR: join(dir, 'none'), STATIC_DIR: join(dir, 'static') }, null));
  for (const p of ['/api/release', '/download/bezpiecznik.apk']) {
    const res = await empty.request(p);
    seen.push(res);
    assert.equal(res.status, 404);
    assert.deepEqual(await res.json(), { error: 'APK not available' });
  }
});

test('config validation', () => {
  assert.throws(() => loadConfig({ PORT: 'abc', TRUST_HTTPS: 'yes', PUBLIC_ORIGIN: 'ftp://x/y' }, null), /PORT[\s\S]*PUBLIC_ORIGIN[\s\S]*TRUST_HTTPS/);
  assert.equal(loadConfig({ PUBLIC_ORIGIN: 'https://bezpiecznik.edu.pl/' }, null).publicOrigin, 'https://bezpiecznik.edu.pl');
});

// Runs last: node:test runs top-level tests in order.
test('every response has the security headers and no Set-Cookie', () => {
  assert.ok(seen.length > 25, `checked ${seen.length} responses`);
  for (const res of seen) {
    const h = res.headers;
    assert.match(h.get('content-security-policy')!, /^default-src 'self'; script-src 'self';.*form-action 'none'$/);
    assert.equal(h.get('x-content-type-options'), 'nosniff');
    assert.equal(h.get('referrer-policy'), 'no-referrer');
    assert.equal(h.get('permissions-policy'), 'geolocation=(), camera=(), microphone=(), interest-cohort=()');
    assert.equal(h.get('cross-origin-opener-policy'), 'same-origin');
    assert.equal(h.has('set-cookie'), false);
  }
  assert.ok(seen[0].headers.get('strict-transport-security'), 'HSTS with TRUST_HTTPS=1');
  assert.equal(seen.at(-1)!.headers.has('strict-transport-security'), false, 'no HSTS without TRUST_HTTPS');
});
