// Production entry: `node server/index.ts` (Node >= 22.18 strips the types; no build step for the server).
import type { Server } from 'node:http';
import { serve } from '@hono/node-server';
import { findApk, readReleaseJson, sha256File } from '../shared/release.ts';
import { createApp } from './app.ts';
import { loadConfig, type Config } from './config.ts';

let config: Config;
try {
  config = loadConfig(process.env, await readReleaseJson());
  const apk = await findApk(config.releaseDir, config.apkFile); // throws if RELEASE_DIR holds several APKs
  if (apk) {
    const t0 = performance.now();
    // Warm the hash cache so the first visitor does not wait for 178 MB to be read.
    sha256File(apk).then(
      () => console.log(`hashed ${apk.path} in ${Math.round(performance.now() - t0)}ms`),
      (err) => console.error('hashing the APK failed:', err),
    );
  } else console.warn(`no APK in ${config.releaseDir}: /download and /api/release answer 404`);
} catch (err) {
  console.error((err as Error).message);
  process.exit(1);
}

const server = serve({ fetch: createApp(config).fetch, port: config.port, hostname: config.host }, (info) =>
  console.log(`listening on http://${info.address.includes(':') ? `[${info.address}]` : info.address}:${info.port}`),
) as Server;

function shutdown(signal: string) {
  console.log(`${signal}: closing`);
  server.close(() => process.exit(0));
  server.closeIdleConnections();
  // Downloads in progress get 10 s to finish, then are cut.
  setTimeout(() => {
    server.closeAllConnections();
    process.exit(0);
  }, 10_000).unref();
}
process.once('SIGTERM', () => shutdown('SIGTERM'));
process.once('SIGINT', () => shutdown('SIGINT'));
