// The Hono app: release API, APK download, the /pobierz short link and the prerendered static site.
import { Hono, type Context } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { buildRelease, DOWNLOAD_PATH, findApk, findPack } from '../shared/release.ts';
import type { Config } from './config.ts';
import { sendApk, sendFile } from './download.ts';

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'", // React style={...} attributes
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

const NOT_FOUND_HTML = `<!doctype html><html lang="pl"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Nie znaleziono · Bezpiecznik</title><body style="font:18px/1.5 system-ui,sans-serif;background:#100f0e;color:#f4f1ec;padding:2rem"><h1>Nie ma takiej strony</h1><p><a href="/" style="color:inherit">Wróć na stronę główną Bezpiecznika</a></p></body></html>`;

const isApiPath = (path: string) => path.startsWith('/api/') || path.startsWith('/download/') || path.startsWith('/paczki/');

export function createApp(config: Config) {
  const app = new Hono();

  // One line per request. Privacy promise: no IP, no User-Agent, no query string.
  app.use(async (c, next) => {
    const t0 = performance.now();
    await next();
    console.log(`${c.req.method} ${c.req.path} ${c.res.status} ${Math.round(performance.now() - t0)}ms`);
  });

  app.use(async (c, next) => {
    await next();
    const h = c.res.headers;
    h.set('Content-Security-Policy', CSP);
    h.set('X-Content-Type-Options', 'nosniff');
    h.set('Referrer-Policy', 'no-referrer');
    h.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), interest-cohort=()');
    h.set('Cross-Origin-Opener-Policy', 'same-origin');
    if (config.trustHttps) h.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    h.delete('Set-Cookie'); // we never set cookies; this guards against a future middleware doing it
  });

  const apkOr404 = async (c: Context) => {
    const apk = await findApk(config.releaseDir, config.apkFile);
    return apk ?? c.json({ error: 'APK not available' }, 404);
  };

  app.get('/api/release', async (c) => {
    const apk = await apkOr404(c);
    if (apk instanceof Response) return apk;
    c.header('Cache-Control', 'no-cache');
    return c.json(await buildRelease(apk, config.meta, config.publicOrigin + DOWNLOAD_PATH));
  });

  // app.get also answers HEAD in Hono; sendApk drops the body for HEAD.
  app.get(DOWNLOAD_PATH, async (c) => {
    const apk = await apkOr404(c);
    if (apk instanceof Response) return apk;
    return sendApk(c, apk, config.meta.version);
  });

  // Data packs for the app (the offline map). The client is the app, which resumes with `Range: bytes=N-`
  // and checks size and sha256 itself, so a replaced file is caught there too.
  app.get('/paczki/:name', async (c) => {
    const pack = await findPack(config.packsDir, c.req.param('name'));
    if (!pack) return c.json({ error: 'not found' }, 404);
    return sendFile(c, pack, 'application/octet-stream', c.req.param('name'));
  });

  app.get('/pobierz', (c) => {
    c.header('Vary', 'User-Agent');
    c.header('Cache-Control', 'no-store');
    return c.redirect(/android/i.test(c.req.header('user-agent') ?? '') ? DOWNLOAD_PATH : '/#pobierz', 302);
  });

  app.get('/healthz', (c) => {
    c.header('Cache-Control', 'no-store');
    return c.text('ok');
  });

  // Runs only for requests no route above answered, i.e. static files.
  app.use(async (c, next) => {
    await next();
    if (c.res.ok) c.res.headers.set('Cache-Control', c.req.path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache');
  });
  // serveStatic rejects '..', encoded '%2e%2e', backslashes and '//' before touching the disk.
  app.use(serveStatic({ root: config.staticDir }));

  app.notFound((c) => {
    if (isApiPath(c.req.path)) return c.json({ error: 'not found' }, 404);
    c.header('Cache-Control', 'no-cache');
    return c.html(NOT_FOUND_HTML, 404);
  });

  app.onError((err, c) => {
    console.error(`${c.req.method} ${c.req.path} failed:`, err.stack ?? err);
    return isApiPath(c.req.path) ? c.json({ error: 'internal error' }, 500) : c.text('Internal Server Error', 500);
  });

  return app;
}
