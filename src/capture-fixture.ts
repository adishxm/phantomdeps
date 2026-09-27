#!/usr/bin/env node
/**
 * phantomdeps — live fixture capture (Phase 11, Step 11.7)
 *
 * Records package metadata and tarball artifact hash from the npm registry
 * into a fixture JSON file WITHOUT committing arbitrary package contents.
 *
 * Usage:
 *   npx tsx src/capture-fixture.ts <package>[@version] --output fixtures/<name>.json
 *
 * What it captures (safe):
 * - Package metadata from npm registry packument
 * - Tarball integrity (sha512) from registry metadata
 * - Artifact hash (sha256 of tarball bytes) — downloaded, hashed, NOT stored
 * - Exports from package.json#exports or .d.ts in the tarball — text only
 * - Claimed symbols: empty list (to be filled in manually)
 *
 * What it does NOT commit:
 * - The tarball itself
 * - Any extracted package source code
 * - Any node_modules or executable content
 *
 * The captured fixture is safe to commit — it contains only metadata and
 * the static exports list required for deterministic symbol verification.
 */

import { writeFileSync } from "fs";
import { resolveFromRegistryTyped } from "./adapters/registry.js";
import { inspectTarball } from "./adapters/artifact.js";
import { parseIntent, parseCheckArgs } from "./parser.js";

const args = process.argv.slice(2);
const opts = parseCheckArgs(args);

if (!opts.packageSpec) {
  console.error("Usage: npx tsx src/capture-fixture.ts <package>[@version] --output fixtures/<name>.json");
  process.exit(1);
}

const outputFlag = args.indexOf("--output");
if (outputFlag === -1 || !args[outputFlag + 1]) {
  console.error("Error: --output <path> is required");
  process.exit(1);
}
const outputPath = args[outputFlag + 1];

const intent = parseIntent(opts.packageSpec);

console.log(`\nphantom\x1b[35mdeps\x1b[0m — fixture capture`);
console.log(`Resolving: ${intent.name}@${intent.version}...`);

const regResult = await resolveFromRegistryTyped(intent.name, intent.version);
if (!regResult.ok) {
  console.error(`Registry error: ${regResult.failure}`);
  process.exit(1);
}

const evidence = regResult.evidence;
console.log(`Resolved: ${evidence.name}@${evidence.resolvedVersion}`);
console.log(`Tarball: ${evidence.tarballUrl}`);
console.log(`Integrity: ${evidence.integrity ?? "(none)"}`);

let exportedSymbols: string[] = [];
let exportsSource = "unknown";
let artifactHash = "";

if (evidence.tarballUrl) {
  console.log(`\nDownloading tarball for static inspection (not stored)...`);
  const artifactResult = await inspectTarball(
    intent.name,
    evidence.resolvedVersion,
    evidence.tarballUrl,
    evidence.integrity
  );

  if (artifactResult.ok) {
    exportedSymbols = artifactResult.inspection.exportedNames;
    exportsSource = artifactResult.inspection.exportsSource;
    artifactHash = artifactResult.inspection.artifactHash;
    console.log(`Inspection method: ${artifactResult.inspection.method}`);
    console.log(`Exports source: ${exportsSource}`);
    console.log(`Exported symbols (${exportedSymbols.length}): [${exportedSymbols.join(", ")}]`);
    console.log(`Artifact hash: ${artifactHash}`);
    console.log(`Tarball NOT stored — only metadata recorded.`);
  } else {
    console.warn(`Artifact inspection failed: ${artifactResult.reason}`);
    console.warn(`Fixture will have empty exportedSymbols — fill in manually.`);
    exportsSource = `inspection failed: ${artifactResult.reason}`;
  }
}

const fixtureId = outputPath
  .replace(/^.*[/\\]/, "")
  .replace(/\.json$/, "");

const fixture = {
  id: fixtureId,
  packageName: evidence.name,
  resolvedVersion: evidence.resolvedVersion,
  integrity: evidence.integrity ?? "",
  capturedAt: new Date().toISOString(),
  hasInstallScript: evidence.hasInstallScript,
  exportedSymbols,
  exportsSource: exportsSource + (artifactHash ? ` | artifact: ${artifactHash}` : ""),
  claimedSymbols: [],
  expectedVerdict: "UNVERIFIED",
  scenario: `Captured from npm registry — ${evidence.name}@${evidence.resolvedVersion}. Fill in claimedSymbols and expectedVerdict before use.`,
};

writeFileSync(outputPath, JSON.stringify(fixture, null, 2) + "\n");
console.log(`\n✔ Fixture written to: ${outputPath}`);
console.log(`  Fill in "claimedSymbols" and "expectedVerdict" before committing.`);
