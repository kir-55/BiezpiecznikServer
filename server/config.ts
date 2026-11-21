// Server configuration from the environment, validated once at start.
import { existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { WEB_ROOT, releaseMeta, type ReleaseMeta } from '../shared/release.ts';

export interface Config {
  port: number;
  host: string | undefined;
  releaseDir: string;
  apkFile: string | undefined;
  /** Data packs the app downloads (`/paczki/<name>`); a missing directory just means no packs. */
  packsDir: string;
  staticDir: string;
  /** e.g. https://bezpiecznik.edu.pl, without a trailing slash; '' keeps URLs relative. */
  publicOrigin: string;
  trustHttps: boolean;
  meta: ReleaseMeta;
}

export function loadConfig(env: NodeJS.ProcessEnv, saved: Partial<ReleaseMeta> | null): Config {
  const errors: string[] = [];

  const port = Number(env.PORT ?? 8080);
  if (!Number.isInteger(port) || port < 0 || port > 65535) errors.push(`PORT must be an integer 0-65535, got "${env.PORT}"`);

  let publicOrigin = '';
  if (env.PUBLIC_ORIGIN) {
    try {
      const u = new URL(env.PUBLIC_ORIGIN);
      if ((u.protocol !== 'https:' && u.protocol !== 'http:') || u.pathname !== '/' || u.search || u.hash) throw new Error();
      publicOrigin = u.origin;
    } catch {
      errors.push(`PUBLIC_ORIGIN must be an origin like https://bezpiecznik.edu.pl, got "${env.PUBLIC_ORIGIN}"`);
    }
  }

  const trust = env.TRUST_HTTPS ?? '0';
  if (trust !== '0' && trust !== '1') errors.push(`TRUST_HTTPS must be 0 or 1, got "${trust}"`);

  const releaseDir = resolve(env.RELEASE_DIR || join(WEB_ROOT, 'releases'));
  const apkFile = env.APK_FILE || undefined;
  if (apkFile && !existsSync(resolve(releaseDir, apkFile))) errors.push(`APK_FILE ${resolve(releaseDir, apkFile)} does not exist`);

  const packsDir = resolve(env.PACKS_DIR || join(WEB_ROOT, 'packs'));

  const staticDir = resolve(env.STATIC_DIR || join(WEB_ROOT, 'dist/client'));
  // Not fatal: the API is useful while the frontend runs on vite dev. Every page answers 404 meanwhile.
  if (!existsSync(staticDir) || !statSync(staticDir).isDirectory()) console.warn(`STATIC_DIR ${staticDir} is not a directory (run npm run build)`);

  const meta = releaseMeta(saved, env);
  // The version ends up in Content-Disposition, so keep it to header-safe characters.
  if (!/^[0-9A-Za-z.+_-]{1,40}$/.test(meta.version)) errors.push(`APP_VERSION "${meta.version}" must match [0-9A-Za-z.+_-]`);

  if (errors.length) throw new Error(`Invalid configuration:\n  ${errors.join('\n  ')}`);
  return { port, host: env.HOST || undefined, releaseDir, apkFile, packsDir, staticDir, publicOrigin, trustHttps: trust === '1', meta };
}
