// Streams a file (the APK, a data pack) with single-range and conditional-request support, so a flaky
// mobile download can resume.
import { createReadStream } from 'node:fs';
import type { Context } from 'hono';
import { createStreamBody } from '@hono/node-server/utils/stream';
import { downloadName, sha256File, type ApkFile } from '../shared/release.ts';

/** Parses one `bytes=` range. undefined: ignore the header (absent, malformed or multi-range, RFC 9110 14.2). null: unsatisfiable. */
export function parseRange(header: string | undefined, size: number): { start: number; end: number } | null | undefined {
  const m = header?.trim().match(/^bytes=(\d*)-(\d*)$/i);
  if (!m || (m[1] === '' && m[2] === '')) return undefined;
  let start: number;
  let end: number;
  if (m[1] === '') {
    const suffix = Number(m[2]);
    if (suffix === 0) return null;
    start = Math.max(size - suffix, 0);
    end = size - 1;
  } else {
    start = Number(m[1]);
    end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1);
    if (m[2] !== '' && Number(m[2]) < start) return undefined; // last < first is invalid syntax, not unsatisfiable
  }
  return start < size && start <= end ? { start, end } : null;
}

const etagMatches = (list: string, etag: string) =>
  list.split(',').some((t) => {
    t = t.trim();
    return t === '*' || t.replace(/^W\//, '') === etag;
  });

export const sendApk = (c: Context, apk: ApkFile, version: string): Promise<Response> =>
  sendFile(c, apk, 'application/vnd.android.package-archive', downloadName(version));

/** [file] as `contentType`, saved as `saveAs`. ETag = sha256 of the file. */
export async function sendFile(c: Context, apk: ApkFile, contentType: string, saveAs: string): Promise<Response> {
  const etag = `"${await sha256File(apk)}"`;
  const lastModified = apk.mtime.toUTCString();
  const headers: Record<string, string> = {
    ETag: etag,
    'Last-Modified': lastModified,
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'no-cache', // same URL for every release; the ETag makes revalidation cheap
  };

  const inm = c.req.header('if-none-match');
  if (inm && etagMatches(inm, etag)) return c.body(null, 304, headers);

  let range = c.req.method === 'GET' ? parseRange(c.req.header('range'), apk.size) : undefined;
  const ifRange = c.req.header('if-range');
  if (range !== undefined && ifRange) {
    // Strong comparison for ETags; a date must equal Last-Modified exactly. Otherwise send the whole file.
    const same = ifRange.startsWith('"') ? ifRange === etag : ifRange === lastModified;
    if (!same) range = undefined;
  }

  headers['Content-Type'] = contentType;
  headers['Content-Disposition'] = `attachment; filename="${saveAs}"`;

  if (range === null) {
    headers['Content-Range'] = `bytes */${apk.size}`;
    delete headers['Content-Disposition'];
    headers['Content-Type'] = 'application/json; charset=utf-8';
    return c.body(JSON.stringify({ error: 'range not satisfiable' }), 416, headers);
  }

  const { start, end } = range ?? { start: 0, end: apk.size - 1 };
  headers['Content-Length'] = String(apk.size === 0 ? 0 : end - start + 1);
  if (range) headers['Content-Range'] = `bytes ${start}-${end}/${apk.size}`;
  const status = range ? 206 : 200;
  if (c.req.method === 'HEAD' || apk.size === 0) return c.body(null, status, headers);
  return c.body(createStreamBody(createReadStream(apk.path, { start, end })), status, headers);
}
