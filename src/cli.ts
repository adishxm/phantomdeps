/**
 * phantomdeps CLI entry point
 * Usage:
 *   phantomdeps check <package>[@version] [--symbols <sym,...>]
 *   phantomdeps demo [--fixture] [--offline]
 */

import { parseCheckArgs, parseIntent } from "./parser.js";
import { runDemo } from "./demo/runner.js";
import { runCheck } from "./gate.js";

const args = process.argv.slice(2);
const command = args[0];

if (!command || command === "--help" || command === "-h") {
  printHelp();
  process.exit(0);
}

if (command === "demo") {
  const offline = args.includes("--offline");
  const fixture = args.includes("--fixture");
  await runDemo({ offline, fixture });
  process.exit(0);
}

if (command === "check" || command === "install" || command === "add") {
  const opts = parseCheckArgs(args.slice(1));
  if (!opts.packageSpec) {
    console.error("phantomdeps: missing package spec. Usage: phantomdeps check <name>[@version]");
    process.exit(1);
  }
  const intent = parseIntent(opts.packageSpec);
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

  phantomdeps install <name>[@version] [options]
      Alias for check. Use as a drop-in wrapper around npm install.

EXIT CODES
  0  ALLOW      — required checks passed; no hard finding
  1  WARN       — weak signal or bounded ambiguity
  2  BLOCK      — high-confidence claim/integrity failure
  3  UNVERIFIED — network/cache/parser prevented a reliable decision
`);
}
