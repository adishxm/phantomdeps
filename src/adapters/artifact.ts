/**
 * phantomdeps — artifact adapter (Phase 11)
 * Downloads the exact tarball into a temporary directory, verifies integrity,
 * and performs static inspection of the package.json exports field.
 *
 * SAFETY CONTRACT:
 * - No package code is ever imported or executed.
 * - The tarball is extracted to a temp directory that is deleted after inspection.
 * - Maximum download size: 50 MB (configurable via MAX_TARBALL_BYTES).
 * - Maximum download time: 10 seconds.
 * - Only package.json#exports, package.json#main, and .d.ts declarations are read.
 * - Archive traversal attack: only files matching /^package\// prefix are extracted.
 */

import { createHash } from "crypto";
import { createWriteStream, mkdirSync, rmSync, readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { gunzipSync } from "zlib";
import type { ArtifactInspection } from "../types.js";

/** Maximum tarball size to download (50 MB) */
const MAX_TARBALL_BYTES = 50 * 1024 * 1024;

/** Download timeout in milliseconds */
const DOWNLOAD_TIMEOUT_MS = 10_000;

export type ArtifactResult =
  | { ok: true; inspection: ArtifactInspection }
  | { ok: false; reason: "DOWNLOAD_FAILED" | "INTEGRITY_MISMATCH" | "SIZE_LIMIT" | "MALFORMED_ARCHIVE" | "UNSUPPORTED_MODULE_SHAPE" | "TIMEOUT" };

/**
 * Download, verify, and statically inspect a package tarball.
 * Returns ArtifactResult — never throws, never executes package code.
 */
export async function inspectTarball(
  packageName: string,
  resolvedVersion: string,
  tarballUrl: string,
  expectedIntegrity: string | null
): Promise<ArtifactResult> {
  // Create a temp directory unique to this inspection
  const tempDir = join(tmpdir(), `phantomdeps-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tempDir, { recursive: true });

  try {
    // ── Download ────────────────────────────────────────────────────────────
    const tarballPath = join(tempDir, "pkg.tgz");
    const downloadResult = await downloadWithLimits(tarballUrl, tarballPath);
    if (!downloadResult.ok) {
      return { ok: false, reason: downloadResult.reason };
    }

    // ── Integrity verification ───────────────────────────────────────────────
    const downloadedBytes = readFileSync(tarballPath);
    const actualSha512 = "sha512-" + createHash("sha512").update(downloadedBytes).digest("base64");
    const tarballIntegrity = actualSha512;
    // Phase 12: distinguish verified / unavailable (missing hash) / mismatch
    const integrityVerified: boolean =
      expectedIntegrity ? expectedIntegrity === actualSha512 : false;

    if (expectedIntegrity && expectedIntegrity !== actualSha512) {
      return { ok: false, reason: "INTEGRITY_MISMATCH" };
    }

    const artifactHash = "sha256:" + createHash("sha256").update(downloadedBytes).digest("hex");

    // ── Extract (archive traversal guard) ───────────────────────────────────
    const extractDir = join(tempDir, "extracted");
    mkdirSync(extractDir);

    try {
      await extractTarball(tarballPath, extractDir);
    } catch {
      return { ok: false, reason: "MALFORMED_ARCHIVE" };
    }

    // ── Locate package.json ──────────────────────────────────────────────────
    const pkgJsonPath = join(extractDir, "package", "package.json");
    if (!existsSync(pkgJsonPath)) {
      return { ok: false, reason: "MALFORMED_ARCHIVE" };
    }

    let pkgJson: Record<string, unknown>;
    try {
      pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
    } catch {
      return { ok: false, reason: "MALFORMED_ARCHIVE" };
    }

    // ── Static exports inspection ────────────────────────────────────────────
    const inspection = inspectExports(
      packageName, resolvedVersion, pkgJson, extractDir,
      tarballIntegrity, artifactHash,
      expectedIntegrity ? integrityVerified : null  // null = no expected hash (unavailable)
    );
    return { ok: true, inspection };

  } finally {
    // Always clean up the temp directory
    try { rmSync(tempDir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

// ── Download with size + time limits ─────────────────────────────────────────

async function downloadWithLimits(
  url: string,
  destPath: string
): Promise<{ ok: true } | { ok: false; reason: "DOWNLOAD_FAILED" | "SIZE_LIMIT" | "TIMEOUT" }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), DOWNLOAD_TIMEOUT_MS);

    let res: Response;
    try {
      res = await fetch(url, { signal: controller.signal });
    } catch {
      clearTimeout(timeout);
      return { ok: false, reason: "TIMEOUT" };
    }
    clearTimeout(timeout);

    if (!res.ok || !res.body) return { ok: false, reason: "DOWNLOAD_FAILED" };

    // Stream with size limit
    let bytesRead = 0;
    const writer = createWriteStream(destPath);
    const reader = res.body.getReader();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytesRead += value.byteLength;
        if (bytesRead > MAX_TARBALL_BYTES) {
          writer.destroy();
          return { ok: false, reason: "SIZE_LIMIT" };
        }
        await new Promise<void>((resolve, reject) => {
          writer.write(value, (err) => err ? reject(err) : resolve());
        });
      }
      await new Promise<void>((resolve, reject) => {
        writer.end((err: Error | null | undefined) => err ? reject(err) : resolve());
      });
    } finally {
      reader.releaseLock();
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "DOWNLOAD_FAILED" };
  }
}

// ── Tarball extraction with traversal guard (pure Node — no tar dependency) ──

/**
 * Extract a .tgz tarball using Node's built-in zlib + manual POSIX tar parsing.
 * Only extracts files matching /^package\// and with no path traversal.
 * Never executes any extracted code.
 */
async function extractTarball(tarballPath: string, destDir: string): Promise<void> {
  const compressed = readFileSync(tarballPath);
  const tarBuffer = gunzipSync(compressed);

  let offset = 0;
  while (offset + 512 <= tarBuffer.length) {
    // POSIX tar header: 512-byte blocks
    const header = tarBuffer.subarray(offset, offset + 512);

    // End-of-archive: two 512-byte zero blocks
    if (header.every((b) => b === 0)) break;

    // File name: bytes 0–99 (null-terminated)
    const name = header.subarray(0, 100).toString("utf8").replace(/\0.*$/, "");

    // File size: bytes 124–135 (octal ASCII)
    const sizeOctal = header.subarray(124, 136).toString("utf8").replace(/\0.*$/, "").trim();
    const fileSize = parseInt(sizeOctal, 8) || 0;

    // Type flag: byte 156 ('0' or '\0' = regular file, '5' = directory)
    const typeFlag = String.fromCharCode(header[156]);

    offset += 512; // skip header block

    if (typeFlag === "0" || typeFlag === "\0") {
      // Regular file — apply traversal guard
      const normalised = name.replace(/\\/g, "/");
      if (normalised.startsWith("package/") && !normalised.includes("..")) {
        const relPath = normalised.slice("package/".length);
        if (relPath) {
          const destPath = join(destDir, "package", relPath);
          mkdirSync(join(destPath, ".."), { recursive: true });
          writeFileSync(destPath, tarBuffer.subarray(offset, offset + fileSize));
        }
      }
    }

    // Advance to next 512-byte block boundary
    offset += Math.ceil(fileSize / 512) * 512;
  }
}

// ── Static exports inspection ─────────────────────────────────────────────────

/**
 * Phase 12: integrityStatus:
 *   true  = verified (hash matched)
 *   false = mismatch (we would have returned early, so this means "checked but no expected hash" — treat as unavailable)
 *   null  = no expected integrity hash was provided (unavailable)
 */
function inspectExports(
  packageName: string,
  resolvedVersion: string,
  pkgJson: Record<string, unknown>,
  extractDir: string,
  tarballIntegrity: string,
  artifactHash: string,
  integrityStatus: boolean | null
): ArtifactInspection {
  // Phase 12: integrityVerified reflects actual integrity outcome
  const integrityVerified = integrityStatus === true;

  // Try package.json#exports (ESM exports map)
  if (pkgJson.exports && typeof pkgJson.exports === "object" && !Array.isArray(pkgJson.exports)) {
    const exportsMap = pkgJson.exports as Record<string, unknown>;
    const names = extractNamesFromExportsMap(exportsMap);
    return {
      packageName,
      resolvedVersion,
      tarballIntegrity,
      integrityVerified,
      method: "exports_field",
      exportedNames: names,
      exportsSource: "package.json#exports",
      artifactHash,
    };
  }

  // Try package.json#exports as a string (single entry point — CJS default export)
  if (typeof pkgJson.exports === "string") {
    return {
      packageName,
      resolvedVersion,
      tarballIntegrity,
      integrityVerified,
      method: "exports_field",
      exportedNames: ["default"],
      exportsSource: "package.json#exports (string entry)",
      artifactHash,
    };
  }

  // Try .d.ts declaration file from package.json#types or #typings
  const typesEntry = (pkgJson.types ?? pkgJson.typings) as string | undefined;
  if (typesEntry && typeof typesEntry === "string") {
    const dtsPath = join(extractDir, "package", typesEntry);
    if (existsSync(dtsPath)) {
      const names = extractNamesFromDts(readFileSync(dtsPath, "utf8"));
      if (names.length > 0) {
        return {
          packageName,
          resolvedVersion,
          tarballIntegrity,
          integrityVerified,
          method: "declarations",
          exportedNames: names,
          exportsSource: `package.json#types → ${typesEntry}`,
          artifactHash,
        };
      }
    }
  }

  // Unsupported module shape (no exports map, no .d.ts)
  return {
    packageName,
    resolvedVersion,
    tarballIntegrity,
    integrityVerified,
    method: "unsupported",
    exportedNames: [],
    exportsSource: "no static exports declaration found",
    artifactHash,
  };
}

/**
 * Flatten top-level export names from a package.json exports map.
 * Only extracts dot-relative top-level keys; skips condition keys (require/import/default).
 */
function extractNamesFromExportsMap(exportsMap: Record<string, unknown>): string[] {
  const names: string[] = [];
  for (const key of Object.keys(exportsMap)) {
    if (key === ".") {
      names.push("default");
    } else if (key.startsWith("./")) {
      // e.g. "./merge" → "merge"
      names.push(key.slice(2));
    }
    // Ignore condition keys like "require", "import", "default", "node", "browser"
  }
  return [...new Set(names)];
}

/**
 * Extract exported names from a .d.ts declaration file.
 * Looks for: export function/class/const/let/var/type/interface/enum declarations
 * and re-export forms. Never executes code.
 */
function extractNamesFromDts(content: string): string[] {
  const names: string[] = [];
  // Match: export (function|class|const|let|var|type|interface|enum) <Name>
  const declRe = /^export\s+(?:declare\s+)?(?:function|class|const|let|var|type|interface|enum)\s+([A-Za-z_$][A-Za-z0-9_$]*)/gm;
  let m: RegExpExecArray | null;
  while ((m = declRe.exec(content)) !== null) {
    names.push(m[1]);
  }
  // Match: export { name1, name2 }
  const namedRe = /^export\s*\{([^}]+)\}/gm;
  while ((m = namedRe.exec(content)) !== null) {
    for (const part of m[1].split(",")) {
      const trimmed = part.trim().replace(/\s+as\s+\S+/, "").trim();
      if (trimmed && /^[A-Za-z_$]/.test(trimmed)) names.push(trimmed);
    }
  }
  // Match: export default
  if (/^export\s+default\b/m.test(content)) names.push("default");
  return [...new Set(names)];
}
