// Release facts shown on the page. Generated at build time by scripts/gen-release.ts from the APK folder,
// so the prerendered page and the backend (/api/release) report the same file.
import data from '../generated/release.json';

export interface Release {
  version: string;
  fileName: string;
  sizeBytes: number;
  sha256: string;
  builtAt: string;
  url: string;
  minAndroid: string;
  abi: string;
  /** QR code for qr.url as an SVG path on a size × size grid (draw with viewBox="0 0 size size", add a 4-module quiet zone). */
  qr: { url: string; size: number; path: string };
}
export const release: Release = data;
export const SITE_URL = 'https://bezpiecznik.edu.pl';
export const SHORT_DOWNLOAD_URL = 'bezpiecznik.edu.pl/pobierz';
export const formatMB = (bytes: number) => `${Math.round(bytes / 1_000_000)} MB`;
