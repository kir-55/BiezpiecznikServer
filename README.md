# Bezpiecznik landing page

Static, prerendered React page plus a small Hono server that serves it, the APK with its release facts, and the data packs the app downloads after install.
Needs Node >= 22.18: the server and scripts run as TypeScript directly (`node server/index.ts`, type stripping), so there is no server build step.

## Develop

```sh
npm install
npm run dev          # frontend on vite, http://localhost:5173
npm run dev:server   # backend with reload (tsx watch), http://localhost:8080
npm test             # node:test, server/**/*.test.ts and shared/**/*.test.ts
npm run typecheck
```

`dev:server` serves `dist/client` if it exists; without a build every page is a 404 but `/api/release`, `/download` and `/pobierz` work.

## Release flow

1. Put the APK in `releases/` (gitignored; a symlink is fine). Exactly one `*.apk`, or set `APK_FILE`.
2. `npm run build && npm start`.

`npm run build` runs `prebuild` first, which is `npm run release` (`scripts/gen-release.ts`): it writes `src/generated/release.json` (size, sha256, file date, QR code for `https://bezpiecznik.edu.pl/pobierz`) so the prerendered page shows the real file. `version`, `minAndroid` and `abi` are kept from that file unless `APP_VERSION`, `MIN_ANDROID` or `ABI` are set. No APK: it warns and leaves the file alone. Commit the regenerated `release.json` with each release.

### Data packs (offline map)

The app downloads the map tiles on first start from `https://bezpiecznik.edu.pl/paczki/zachodniopomorskie.mbtiles` (`app/lib/paczki/pack.dart`). Put the file in `packs/` (gitignored; a symlink is fine) and it is served at `/paczki/<file name>`, no restart needed. The app is built with the file's size and sha256, so build the APK from the same file:

```sh
stat -f %z packs/zachodniopomorskie.mbtiles      # MAP_PACK_BYTES (Linux: stat -c %s)
shasum -a 256 packs/zachodniopomorskie.mbtiles   # MAP_PACK_SHA256
```

Replace the pack and the already released app rejects it (size or checksum mismatch) until a new APK is out.

At runtime the server reads the APK again for every request (stat only), so replacing the file without a restart is picked up by `/api/release` and `/download`. The sha256 is computed once per (path, size, mtime), at start and after a change. The prerendered page only changes after a rebuild.

## Routes

| Route | What |
|---|---|
| `GET /` and static files | `dist/client`. HTML `no-cache`, `/assets/*` `max-age=1y, immutable`. Unknown path: 404 page, no SPA fallback. |
| `GET /api/release` | `{ version, fileName, sizeBytes, sha256, builtAt, url, minAndroid, abi }` from the APK on disk. |
| `GET`/`HEAD /download/bezpiecznik.apk` | The APK, streamed, saved as `bezpiecznik-<version>.apk`. ETag = sha256. Single `Range` (206/416), `If-Range`, `If-None-Match`. |
| `GET`/`HEAD /paczki/<name>` | A data pack from `PACKS_DIR`: a file name ending in `.mbtiles` or `.litertlm`, no sub-directories. Streamed like the APK: ETag = sha256, single `Range` (the app resumes with `bytes=N-`), `If-Range`, `If-None-Match`. Anything else: JSON 404. |
| `GET /pobierz` | The QR code target. Android: 302 to the APK. Anything else: 302 to `/#pobierz`. |
| `GET /healthz` | `ok` |
aaaa
## Environment

| Variable | Default | |
|---|---|---|
| `PORT` | `8080` | |
| `HOST` | all interfaces | Use `127.0.0.1` behind a proxy on the same machine. |
| `RELEASE_DIR` | `web/releases` | |
| `APK_FILE` | the single `*.apk` in `RELEASE_DIR` | Relative to `RELEASE_DIR`. |
| `PACKS_DIR` | `web/packs` | Data packs served at `/paczki/`. May be missing. |
| `STATIC_DIR` | `web/dist/client` | |
| `PUBLIC_ORIGIN` | unset | e.g. `https://bezpiecznik.edu.pl`. Makes `url` in `/api/release` absolute; in `gen-release` sets the QR origin. |
| `TRUST_HTTPS` | `0` | `1` adds HSTS. Set only when the site is reachable over HTTPS alone. |
| `APP_VERSION`, `MIN_ANDROID`, `ABI` | from `release.json` | |

Relative paths in env resolve against the working directory. Invalid values stop the server at start.

## Deploy

Run `npm start` under a process manager (systemd, a container) behind a reverse proxy that terminates TLS (Caddy, nginx), with `HOST=127.0.0.1` and `TRUST_HTTPS=1`. The server shuts down on SIGTERM/SIGINT, giving running downloads 10 s.
Notes for the proxy: do not buffer or gzip `/download/` and `/paczki/` (the files are already compressed, and buffering breaks range resumes), and do not log IPs or User-Agents there either, or the promise below is only half kept.

## Privacy and security the server enforces

- No cookies, accounts or analytics. Any `Set-Cookie` is stripped from every response.
- The access log is one line per request: method, path without query string, status, ms to response headers. No IP, no User-Agent.
  The User-Agent is read only to pick the `/pobierz` redirect and is never stored.
- Every response: CSP `default-src 'self'` (scripts only from our origin, no inline scripts; inline style attributes allowed for React), `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` denying geolocation, camera, microphone and FLoC, `Cross-Origin-Opener-Policy: same-origin`, HSTS with `TRUST_HTTPS=1`.
- Static files are served by `@hono/node-server`'s `serveStatic`, which rejects `..`, encoded dots and slashes, backslashes and `//` (covered by tests).
