// Release helpers shared by the server (/api/release, /download) and scripts/gen-release.ts.
// Runs under plain Node (type stripping), so relative imports carry .ts and types use `import type`.
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import type { Release } from '../src/content/release.ts';

export type { Release };

/** The web/ folder; default paths are relative to it, not to the working directory. */
export const WEB_ROOT = fileURLToPath(new URL('..', import.meta.url));
export const RELEASE_JSON = join(WEB_ROOT, 'src/generated/release.json');
export const DOWNLOAD_PATH = '/download/bezpiecznik.apk';
export const DEFAULT_ORIGIN = 'https://bezpiecznik.edu.pl';

export interface ApkFile {
  path: string;
  size: number;
  mtime: Date;
}

/** Facts about the build that cannot be read from the APK bytes. */
export interface ReleaseMeta {
  version: string;
  minAndroid: string;
  abi: string;
}

/**
 * Resolves the APK: `apkFile` if given (relative to `releaseDir`), else the single *.apk in `releaseDir`.
 * Returns null when there is none; throws when the choice is ambiguous.
 */
export async function findApk(releaseDir: string, apkFile?: string): Promise<ApkFile | null> {
  let path: string;
  if (apkFile) {
    path = resolve(releaseDir, apkFile);
  } else {
    let names: string[];
    try {
      names = (await readdir(releaseDir)).filter((n) => n.toLowerCase().endsWith('.apk'));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
      throw err;
    }
    if (names.length === 0) return null;
    if (names.length > 1) throw new Error(`${releaseDir} holds ${names.length} APKs (${names.join(', ')}); set APK_FILE`);
    path = join(releaseDir, names[0]);
  }
  try {
    const s = await stat(path); // follows symlinks
    return s.isFile() ? { path, size: s.size, mtime: s.mtime } : null;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

/** Data packs the app downloads after install: the offline map tiles and, optionally, the model. */
const PACK_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]{0,99}\.(mbtiles|litertlm)$/;

/**
 * Resolves a pack by file name inside `packsDir`. Null for anything that is not a plain pack file
 * name (so no path can leave the directory), for a missing file and for a non-file.
 */
export async function findPack(packsDir: string, name: string): Promise<ApkFile | null> {
  if (!PACK_NAME.test(name)) return null;
  try {
    const path = join(packsDir, name);
    const s = await stat(path); // follows symlinks, like the APK
    return s.isFile() ? { path, size: s.size, mtime: s.mtime } : null;
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === 'ENOENT' || code === 'ENOTDIR') return null;
    throw err;
  }
}

// One entry per path; a new size or mtime replaces it, so the cache never grows past the number of APKs.
const hashCache = new Map<string, { key: string; hash: Promise<string> }>();
/** How many times a file was actually read for hashing (tests use it to see cache hits). */
export const hashStats = { computed: 0 };

/** Streaming sha256, cached by (path, size, mtime). Concurrent callers share one read. */
export function sha256File(apk: ApkFile): Promise<string> {
  const key = `${apk.size}:${apk.mtime.getTime()}`;
  const hit = hashCache.get(apk.path);
  if (hit && hit.key === key) return hit.hash;
  hashStats.computed++;
  const hash = new Promise<string>((done, fail) => {
    const h = createHash('sha256');
    createReadStream(apk.path)
      .on('data', (chunk) => h.update(chunk))
      .on('error', fail)
      .on('end', () => done(h.digest('hex')));
  });
  hashCache.set(apk.path, { key, hash });
  hash.catch(() => hashCache.delete(apk.path));
  return hash;
}

/** The file name the browser saves: bezpiecznik-1.0.0.apk. */
export const downloadName = (version: string) => `bezpiecznik-${version}.apk`;

export async function readReleaseJson(path = RELEASE_JSON): Promise<Release | null> {
  try {
    return JSON.parse(await readFile(path, 'utf8')) as Release;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw err;
  }
}

/** version / minAndroid / abi: env overrides, then the generated file, then the known first release. */
export function releaseMeta(saved: Partial<ReleaseMeta> | null, env: NodeJS.ProcessEnv = process.env): ReleaseMeta {
  return {
    version: env.APP_VERSION || saved?.version || '1.0.0',
    minAndroid: env.MIN_ANDROID || saved?.minAndroid || 'Android 11',
    abi: env.ABI || saved?.abi || 'arm64-v8a',
  };
}

export async function buildRelease(apk: ApkFile, meta: ReleaseMeta, url = DOWNLOAD_PATH): Promise<Omit<Release, 'qr'>> {
  return {
    version: meta.version,
    fileName: downloadName(meta.version),
    sizeBytes: apk.size,
    sha256: await sha256File(apk),
    builtAt: apk.mtime.toISOString().slice(0, 10),
    url,
    minAndroid: meta.minAndroid,
    abi: meta.abi,
  };
}

/** QR code as an SVG path, one unit square per dark module (draw with viewBox="0 0 size size"). */
export function qrPath(url: string): Release['qr'] {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
  let path = '';
  for (let y = 0; y < modules.size; y++)
    for (let x = 0; x < modules.size; x++) if (modules.data[y * modules.size + x]) path += `M${x} ${y}h1v1h-1z`;
  return { url, size: modules.size, path };
}

