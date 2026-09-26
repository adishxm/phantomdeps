/**
 * phantomdeps — fixture loader
 * Loads offline fixture data for demo and test modes.
 * Fixtures are deterministic, version-pinned, and never install anything.
 */

import { readFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(__dirname, "../../fixtures");

export interface Fixture {
  /** Unique fixture ID */
  id: string;
  /** Package name on npm */
  packageName: string;
  /** Exact version captured */
  resolvedVersion: string;
  /** sha512 integrity from npm registry */
  integrity: string;
  /** ISO timestamp when this fixture was captured */
  capturedAt: string;
  /** Whether the package has install lifecycle scripts */
  hasInstallScript: boolean;
  /** List of symbols actually exported by the package at this version */
  exportedSymbols: string[];
  /** Where the exports list was sourced from */
  exportsSource: string;
  /** The symbol(s) a generated AI import claimed to use */
  claimedSymbols: string[];
  /** Expected gate verdict for this fixture */
  expectedVerdict: "ALLOW" | "WARN" | "BLOCK" | "UNVERIFIED";
  /** Human description of the scenario */
  scenario: string;
}

/** Load a fixture by ID from the fixtures directory. */
export function loadFixture(id: string): Fixture {
  const path = join(FIXTURES_DIR, `${id}.json`);
  try {
    const raw = readFileSync(path, "utf8");
    return JSON.parse(raw) as Fixture;
  } catch (e) {
    throw new Error(`Fixture '${id}' not found at ${path}: ${String(e)}`);
  }
}

/** Load all fixture IDs available in the fixtures directory. */
export function listFixtures(): string[] {
  return readdirSync(FIXTURES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}
