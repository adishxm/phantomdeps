/**
 * phantomdeps — diff/file import parser (Phase 13)
 * Parses newly added import statements for a specific package from:
 *   - A unified diff string (+lines only)
 *   - A plain source file
 *
 * Only newly added lines ("+") are considered; removed or context lines are ignored.
 * Never executes any code. Returns the distinct imported symbols for the given package name.
 *
 * Phase 13 claim-context contract:
 *   - If --symbols is provided, it takes precedence.
 *   - If --diff <path> or --file <path> is provided, extract added imports for the package.
 *   - If none of the above are present, claim context is MISSING — caller returns UNVERIFIED.
 */

/** Result of parsing import context */
export type ClaimContextResult =
  | { kind: "symbols"; symbols: string[] }       // explicit --symbols provided
  | { kind: "diff"; symbols: string[] }           // extracted from diff
  | { kind: "file"; symbols: string[] }           // extracted from source file
  | { kind: "missing" };                          // no context → UNVERIFIED

/**
 * Extract imported symbols for `packageName` from added lines in a unified diff.
 * Only processes lines that begin with "+".
 * Handles:
 *   - named imports:   import { foo, bar } from 'pkg'
 *   - default imports: import foo from 'pkg'
 *   - namespace:       import * as foo from 'pkg'
 *   - side-effect:     import 'pkg'  → returns []
 */
export function extractAddedImports(diffContent: string, packageName: string): string[] {
  const symbols = new Set<string>();

  for (const rawLine of diffContent.split("\n")) {
    // Only newly added lines
    if (!rawLine.startsWith("+")) continue;
    // Strip leading "+" (could be "++" for diff headers — skip those)
    if (rawLine.startsWith("+++")) continue;
    const line = rawLine.slice(1).trimStart();

    const found = extractImportsFromLine(line, packageName);
    for (const s of found) symbols.add(s);
  }

  return [...symbols];
}

/**
 * Extract imported symbols for `packageName` from all import lines in a source file.
 * Used when --file is supplied (the whole file is the context, not just added lines).
 */
export function extractFileImports(fileContent: string, packageName: string): string[] {
  const symbols = new Set<string>();

  for (const line of fileContent.split("\n")) {
    const trimmed = line.trimStart();
    const found = extractImportsFromLine(trimmed, packageName);
    for (const s of found) symbols.add(s);
  }

  return [...symbols];
}

/**
 * Parse a single line for import statements targeting packageName.
 * Returns the list of imported symbol names, or [] if no match.
 */
function extractImportsFromLine(line: string, packageName: string): string[] {
  // Must be an import statement
  if (!line.startsWith("import ") && !line.startsWith("import{")) return [];

  // Must reference our package — escape special regex chars in name
  const escapedPkg = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Match: from 'pkg' or from "pkg"
  const fromRe = new RegExp(`from\\s+['"]${escapedPkg}['"]`);
  if (!fromRe.test(line)) return [];

  // Named imports: import { foo, bar as baz } from 'pkg'
  const namedRe = /import\s*\{([^}]+)\}/;
  const namedMatch = namedRe.exec(line);
  if (namedMatch) {
    return namedMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/\s+as\s+\S+/, "").trim())
      .filter((s) => s.length > 0 && /^[A-Za-z_$]/.test(s));
  }

  // Namespace import: import * as foo from 'pkg'
  if (/import\s*\*\s*as\s+\w+/.test(line)) {
    return ["*"];
  }

  // Default import: import foo from 'pkg'
  const defaultRe = /import\s+([A-Za-z_$][A-Za-z0-9_$]*)\s+from/;
  const defaultMatch = defaultRe.exec(line);
  if (defaultMatch) {
    return ["default"];
  }

  // Side-effect import: import 'pkg'
  return [];
}
