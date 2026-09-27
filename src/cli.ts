/**
 * phantomdeps CLI entry point
 * Usage:
 *   phantomdeps check <package>[@version] [--symbols <sym,...>]
 *   phantomdeps demo [--fixture] [--offline]
 *   phantomdeps audit-log verify [<path>]
 */

import { parseCheckArgs, parseIntent } from "./parser.js";
import { runDemo } from "./demo/runner.js";
import { runCheck } from "./gate.js";
import { verifyAuditLog } from "./evidence/writer.js";
import { join } from "path";

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command === "demo") {
  const offline = args.includes("--offline");
  const fixture = args.includes("--fixture");
  const scenarioIdx = args.indexOf("--scenario");
  const scenario = scenarioIdx !== -1 ? args[scenarioIdx + 1] : undefined;
  await runDemo({ offline, fixture, scenario });
  process.exit(0);
}

// audit-log verify subcommand (Phase 12.3)
if (command === "audit-log") {
  const sub = args[1];
  if (sub === "verify") {
    const logPath = args[2] ?? join(process.cwd(), ".phantomdeps", "decisions.ndjson");
    const result = verifyAuditLog(logPath);
    if (result.ok) {
      console.log(`\x1b[32m✔ ${result.message}\x1b[0m`);
      process.exit(0);
    } else {
      console.error(`\x1b[31m✖ ${result.message}\x1b[0m`);
      for (const v of result.violations) {
        console.error(`  [${v.kind}] ${v.detail}`);
      }
      process.exit(2);
    }
  }
  console.error(`phantomdeps audit-log: unknown subcommand '${sub ?? ""}'. Use: verify`);
  process.exit(1);
}

if (command === "check" || command === "verify" || command === "install" || command === "add") {
  const opts = parseCheckArgs(args.slice(1));
  if (!opts.packageSpec) {
    console.error("phantomdeps: missing package spec. Usage: phantomdeps check <name>[@version]");
    process.exit(1);
  }
  let intent;
  try {
    intent = parseIntent(opts.packageSpec);
  } catch (e: any) {
    const msg = e?.message || String(e);
    if (msg.startsWith("UNSUPPORTED")) {
      console.error(`phantomdeps: UNVERIFIED — ${msg}`);
      process.exit(3);
    }
    console.error(`phantomdeps: ${msg}`);
    process.exit(1);
  }
  const result = await runCheck(intent, opts);
  // Exit codes: 0=ALLOW, 1=WARN, 2=BLOCK, 3=UNVERIFIED
  const exitMap: Record<string, number> = { ALLOW: 0, WARN: 1, BLOCK: 2, UNVERIFIED: 3 };
  process.exit(exitMap[result.action] ?? 3);
}

console.error(`phantomdeps: unknown command '${command}'`);
printHelp();
process.exit(1);

function printHelp() {
  console.log(`
phantomdeps v0.1.0 — pre-install AI dependency claim gate

USAGE
  phantomdeps demo [--fixture] [--offline]
      Run the offline fixture demo. Shows a BLOCK for a real package
      whose generated import references a statically absent symbol.

  phantomdeps check <name>[@version] [--symbols <sym1,sym2>] [--offline]
      Check a single package. Exit codes:
        0 = ALLOW   1 = WARN   2 = BLOCK   3 = UNVERIFIED

  phantomdeps verify <name>[@version] [options]
      Verification-only alias for check. Does NOT install packages.
      This is the preferred command name; 'install' and 'add' are aliases.

  phantomdeps audit-log verify [<path>]
      Verify the tamper-evident NDJSON decision log at <path>.
      Defaults to .phantomdeps/decisions.ndjson.
      Checks: JSON schema, record hashes, chain links, ordering, redaction.
      Exit 0 = clean. Exit 2 = violations detected.

EXIT CODES
  0  ALLOW      — required checks passed; no hard finding
  1  WARN       — weak signal or bounded ambiguity
  2  BLOCK      — high-confidence claim/integrity failure
  3  UNVERIFIED — network/cache/parser prevented a reliable decision
`);
}
