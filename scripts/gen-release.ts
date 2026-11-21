// Writes src/generated/release.json from the APK in RELEASE_DIR, so the prerendered page shows the real file.
// No APK: warn and keep the existing file, so frontend builds work without one.
import { writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import {
  buildRelease,
  DEFAULT_ORIGIN,
  findApk,
  qrPath,
  readReleaseJson,
  RELEASE_JSON,
  releaseMeta,
  WEB_ROOT,
} from '../shared/release.ts';

const releaseDir = resolve(process.env.RELEASE_DIR || join(WEB_ROOT, 'releases'));
const apk = await findApk(releaseDir, process.env.APK_FILE || undefined);
if (!apk) {
  console.warn(`gen-release: no APK in ${releaseDir}; keeping ${RELEASE_JSON} as it is`);
  process.exit(0);
}

const origin = (process.env.PUBLIC_ORIGIN || DEFAULT_ORIGIN).replace(/\/+$/, '');
const release = {
  ...(await buildRelease(apk, releaseMeta(await readReleaseJson()))),
  qr: qrPath(`${origin}/pobierz`),
};
await writeFile(RELEASE_JSON, JSON.stringify(release, null, 2) + '\n');
console.log(`gen-release: ${release.fileName} ${release.sizeBytes} B sha256 ${release.sha256} -> ${RELEASE_JSON}`);
