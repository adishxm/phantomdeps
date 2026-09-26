/**
 * phantomdeps — npm registry adapter (L1)
 * Resolves package metadata from the npm registry or from a fixture.
 * Never installs or executes any package code.
 */

import { createHash } from "crypto";
import type { PackageEvidence } from "../types.js";
import type { Fixture } from "../fixtures/loader.js";

const NPM_REGISTRY = "https://registry.npmjs.org";

interface NpmPackument {
  name: string;
  "dist-tags": Record<string, string>;
  versions: Record<string, NpmVersionMeta>;
}

interface NpmVersionMeta {
  version: string;
  dist: {
    tarball: string;
    integrity?: string;
    shasum?: string;
  };
  scripts?: Record<string, string>;
  deprecated?: string;
  time?: string;
}

/**
 * Resolve a package from the npm registry.
 * Returns PackageEvidence. Never throws on 404 — returns null for NOT_FOUND.
 */
export async function resolveFromRegistry(
  name: string,
  version: string
): Promise<PackageEvidence | null | "UNAVAILABLE"> {
  const url = `${NPM_REGISTRY}/${encodeURIComponent(name)}`;
  let raw: string;

  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (res.status === 404) return null; // NOT_FOUND
    if (!res.ok) return "UNAVAILABLE";

    raw = await res.text();
  } catch {
    return "UNAVAILABLE";
  }

  const responseHash = sha256(raw);
  let packument: NpmPackument;
  try {
    packument = JSON.parse(raw) as NpmPackument;
  } catch {
    return "UNAVAILABLE";
  }

  // Resolve version
  const resolvedVersion =
    version === "latest"
      ? (packument["dist-tags"]?.["latest"] ?? "")
      : version;

  const meta = packument.versions?.[resolvedVersion];
  if (!meta) return null;

  const hasInstallScript = Boolean(
    meta.scripts &&
      (meta.scripts["preinstall"] ||
        meta.scripts["install"] ||
        meta.scripts["postinstall"])
  );

  return {
    name: packument.name,
    resolvedVersion,
    ecosystem: "npm",
    registryUrl: url,
    integrity: meta.dist.integrity ?? null,
    tarballUrl: meta.dist.tarball ?? null,
    deprecated: Boolean(meta.deprecated),
    deprecationMessage: meta.deprecated ?? null,
    hasInstallScript,
    publishedAt: null,
    retrievedAt: new Date().toISOString(),
    source: "live",
    fixtureId: null,
    responseHash,
  };
}

/** Build PackageEvidence from a loaded fixture (offline mode). */
export function evidenceFromFixture(fixture: Fixture): PackageEvidence {
  return {
    name: fixture.packageName,
    resolvedVersion: fixture.resolvedVersion,
    ecosystem: "npm",
    registryUrl: `fixture://${fixture.id}`,
    integrity: fixture.integrity,
    tarballUrl: null,
    deprecated: false,
    deprecationMessage: null,
    hasInstallScript: fixture.hasInstallScript ?? false,
    publishedAt: fixture.capturedAt,
    retrievedAt: new Date().toISOString(),
    source: "fixture",
    fixtureId: fixture.id,
    responseHash: sha256(JSON.stringify(fixture)),
  };
}

function sha256(data: string): string {
  return "sha256:" + createHash("sha256").update(data).digest("hex");
}
