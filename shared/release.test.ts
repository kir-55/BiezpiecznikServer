import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, rm, utimes, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { after, before, test } from 'node:test';
import QRCode from 'qrcode';
import { buildRelease, findApk, hashStats, qrPath, releaseMeta, sha256File, WEB_ROOT } from './release.ts';

let dir: string;
before(async () => {
  await mkdir(join(WEB_ROOT, '.qa/backend'), { recursive: true });
  dir = await mkdtemp(join(WEB_ROOT, '.qa/backend/release-test-'));
  await writeFile(join(dir, 'app.apk'), Buffer.from(Array.from({ length: 5000 }, (_, i) => i % 251)));
});
after(() => rm(dir, { recursive: true, force: true }));

test('sha256 matches sha256sum and is cached by (path, size, mtime)', async () => {
  const apk = (await findApk(dir))!;
  const expected = execFileSync('sha256sum', [apk.path], { encoding: 'utf8' }).split(' ')[0];
  const before = hashStats.computed;
  assert.equal(await sha256File(apk), expected);
  assert.equal(await sha256File({ ...apk }), expected);
  assert.equal(hashStats.computed, before + 1, 'second call hits the cache');

  const later = new Date(apk.mtime.getTime() + 5000);
  await utimes(apk.path, later, later);
  await sha256File((await findApk(dir))!);
  assert.equal(hashStats.computed, before + 2, 'a new mtime rehashes');
});

test('findApk: missing dir, explicit file, ambiguity', async () => {
  assert.equal(await findApk(join(dir, 'nope')), null);
  assert.equal((await findApk(dir, 'app.apk'))?.size, 5000);
  assert.equal(await findApk(dir, 'other.apk'), null);
  await writeFile(join(dir, 'second.apk'), 'x');
  await assert.rejects(findApk(dir), /set APK_FILE/);
  await rm(join(dir, 'second.apk'));
});

test('buildRelease shape and meta precedence', async () => {
  const meta = releaseMeta({ version: '1.0.0', minAndroid: 'Android 11', abi: 'arm64-v8a' }, { APP_VERSION: '1.2.3' });
  const r = await buildRelease((await findApk(dir))!, meta);
  assert.deepEqual(Object.keys(r).sort(), ['abi', 'builtAt', 'fileName', 'minAndroid', 'sha256', 'sizeBytes', 'url', 'version']);
  assert.equal(r.version, '1.2.3');
  assert.equal(r.fileName, 'bezpiecznik-1.2.3.apk');
  assert.equal(r.url, '/download/bezpiecznik.apk');
  assert.match(r.builtAt, /^\d{4}-\d{2}-\d{2}$/);
});

test('qrPath draws the same modules as the qrcode SVG renderer (not transposed)', async () => {
  const url = 'https://bezpiecznik.edu.pl/pobierz';
  const qr = qrPath(url);
  const ours = new Set(qr.path.split('z').filter(Boolean).map((s) => s.match(/^M(\d+) (\d+)h1v1h-1$/)!.slice(1).join(',')));
  // The renderer emits runs: "M{x} {y+0.5}h{n}" starts a row, "m{dx} 0h{n}" skips light modules.
  const svg = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });
  const d = svg.match(/<path stroke="[^"]+" d="([^"]+)"/)![1];
  const theirs = new Set<string>();
  let x = 0;
  let y = 0;
  for (const [, cmd, a, b] of d.matchAll(/([Mmh])(\d+(?:\.5)?)(?: (\d+(?:\.5)?))?/g)) {
    if (cmd === 'M') [x, y] = [Number(a), Number(b) - 0.5];
    else if (cmd === 'm') x += Number(a);
    else for (let i = 0; i < Number(a); i++) theirs.add(`${x++},${y}`);
  }
  assert.equal(qr.size, 29);
  assert.deepEqual(ours, theirs);
});
