/**
 * phantomdeps — Phase 10 hook subprocess tests
 * Invokes .bob/hooks/PreToolUse.mjs exactly as IBM Bob does:
 * JSON on stdin, check exit code and stderr.
 *
 * These tests cover:
 * - Known BLOCK fixture (is-odd) → exit 2
 * - Known ALLOW fixture (lodash) → exit 0
 * - Non-npm command → exit 0 (pass-through)
 * - npm install with no packages (bare) → exit 0
 * - Option-first: npm install --save-dev is-odd → exit 2 (BLOCK)
 * - Option-first: npm install -D lodash → exit 0 (ALLOW)
 * - Multi-package BLOCK: npm install is-odd lodash → exit 2 (one BLOCK wins)
 * - Multi-package ALL ALLOW: npm install lodash is-odd-demo → depends on fixtures
 * - URL spec (npm install https://...) → UNVERIFIED → exit 2
 * - file: spec → UNVERIFIED → exit 2
 * - git+ssh: spec → UNVERIFIED → exit 2
 * - Shell metacharacter injection → exit 0 (UNSAFE, not intercepted as install)
 * - Unknown package (no fixture, live UNVERIFIED) → exit 2
 */

import { spawnSync } from "child_process";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const HOOK = resolve(__dirname, "../.bob/hooks/PreToolUse.mjs");

const TSX_CLI = resolve(__dirname, "../node_modules/tsx/dist/cli.mjs");

function runHook(command: string): { exit: number; stderr: string } {
  const input = JSON.stringify({ tool: "execute_command", input: { command } });
  const result = spawnSync(process.execPath, [TSX_CLI, HOOK], {
    input,
    encoding: "utf8",
    timeout: 20000,
    env: { ...process.env },
  });
  return {
    exit: result.status ?? 1,
    stderr: result.stderr ?? "",
  };
}

function runHookNonInstall(tool: string, command: string): { exit: number } {
  const input = JSON.stringify({ tool, input: { command } });
  const result = spawnSync(process.execPath, [TSX_CLI, HOOK], {
    input,
    encoding: "utf8",
    timeout: 10000,
    env: { ...process.env },
  });
  return { exit: result.status ?? 1 };
}

// ── Non-npm commands — always pass through ────────────────────────────────────

describe("Hook — non-npm commands (pass-through)", () => {
  test("ls -la → exit 0", () => {
    const r = runHook("ls -la");
    expect(r.exit).toBe(0);
  });

  test("git status → exit 0", () => {
    const r = runHook("git status");
    expect(r.exit).toBe(0);
  });

  test("non execute_command tool → exit 0", () => {
    const r = runHookNonInstall("read_file", "README.md");
    expect(r.exit).toBe(0);
  });

  test("bare npm install (no specs) → exit 0", () => {
    const r = runHook("npm install");
    expect(r.exit).toBe(0);
  });

  test("npm ci → exit 0 (not install)", () => {
    const r = runHook("npm ci");
    expect(r.exit).toBe(0);
  });
});

// ── Fixture BLOCK path ────────────────────────────────────────────────────────

describe("Hook — fixture BLOCK (is-odd → isOddBatch missing)", () => {
  test("npm install is-odd → exit 2", () => {
    const r = runHook("npm install is-odd");
    expect(r.exit).toBe(2);
  });

  test("stderr mentions BLOCK or UNVERIFIED", () => {
    const r = runHook("npm install is-odd");
    expect(r.stderr).toMatch(/BLOCK|UNVERIFIED/);
  });

  test("npm add is-odd → exit 2", () => {
    const r = runHook("npm add is-odd");
    expect(r.exit).toBe(2);
  });

  test("npm i is-odd → exit 2", () => {
    const r = runHook("npm i is-odd");
    expect(r.exit).toBe(2);
  });
});

// ── Fixture ALLOW path ────────────────────────────────────────────────────────

describe("Hook — fixture ALLOW (lodash)", () => {
  test("npm install lodash → exit 0", () => {
    const r = runHook("npm install lodash");
    expect(r.exit).toBe(0);
  });

  test("stderr mentions ALLOW", () => {
    const r = runHook("npm install lodash");
    expect(r.stderr).toMatch(/ALLOW/);
  });
});

// ── Option-first commands ─────────────────────────────────────────────────────

describe("Hook — option-first installs", () => {
  test("npm install --save-dev is-odd → exit 2 (BLOCK after options stripped)", () => {
    const r = runHook("npm install --save-dev is-odd");
    expect(r.exit).toBe(2);
  });

  test("npm install -D is-odd → exit 2", () => {
    const r = runHook("npm install -D is-odd");
    expect(r.exit).toBe(2);
  });

  test("npm install --save is-odd → exit 2", () => {
    const r = runHook("npm install --save is-odd");
    expect(r.exit).toBe(2);
  });

  test("npm install -D lodash → exit 0 (ALLOW after options stripped)", () => {
    const r = runHook("npm install -D lodash");
    expect(r.exit).toBe(0);
  });

  test("npm install --save-exact lodash → exit 0", () => {
    const r = runHook("npm install --save-exact lodash");
    expect(r.exit).toBe(0);
  });
});

// ── Multi-package commands ────────────────────────────────────────────────────

describe("Hook — multi-package (fail-closed aggregation)", () => {
  test("npm install is-odd lodash → exit 2 (BLOCK propagates)", () => {
    const r = runHook("npm install is-odd lodash");
    expect(r.exit).toBe(2);
  });

  test("npm install lodash is-odd → exit 2 (order independent)", () => {
    const r = runHook("npm install lodash is-odd");
    expect(r.exit).toBe(2);
  });

  test("npm install lodash lodash → exit 0 (both ALLOW)", () => {
    const r = runHook("npm install lodash lodash");
    expect(r.exit).toBe(0);
  });
});

// ── Unsupported spec forms → UNVERIFIED → exit 2 ─────────────────────────────

describe("Hook — unsupported spec forms (strict-agent: UNVERIFIED → exit 2)", () => {
  test("URL spec https:// → exit 2", () => {
    const r = runHook("npm install https://example.com/pkg.tgz");
    expect(r.exit).toBe(2);
  });

  test("file: spec → exit 2", () => {
    const r = runHook("npm install file:../local-pkg");
    expect(r.exit).toBe(2);
  });

  test("git+ssh: spec → exit 2", () => {
    const r = runHook("npm install git+ssh://github.com/user/repo");
    expect(r.exit).toBe(2);
  });

  test("npm: alias spec → exit 2", () => {
    const r = runHook("npm install npm:some-alias");
    expect(r.exit).toBe(2);
  });

  test("github: spec → exit 2", () => {
    const r = runHook("npm install github:user/repo");
    expect(r.exit).toBe(2);
  });
});

// ── Shell metacharacter injection ─────────────────────────────────────────────

describe("Hook — shell metacharacter injection (UNSAFE, pass-through)", () => {
  test("command with semicolon → exit 0 (not intercepted as install)", () => {
    // The entire command string has metacharacters — parseHookCommand returns
    // UNSAFE which writes a warning but exits 0 (we don't block on parse failure)
    const r = runHook("npm install pkg; rm -rf /");
    expect(r.exit).toBe(0);
  });

  test("command with pipe → exit 0", () => {
    const r = runHook("npm install pkg | cat");
    expect(r.exit).toBe(0);
  });
});

// ── Unknown package (no fixture) ──────────────────────────────────────────────

describe("Hook — unknown package (no fixture; live UNVERIFIED)", () => {
  test("npm install nonexistent-phantomdeps-test-xyz → exit 2 (UNVERIFIED strict-agent)", () => {
    // This package does not exist in the registry → NOT_FOUND → BLOCK
    // or registry unavailable → UNVERIFIED → exit 2
    const r = runHook("npm install nonexistent-phantomdeps-test-xyz");
    // In offline/CI environment registry may be unavailable → UNVERIFIED → 2
    // In online environment → NOT_FOUND → BLOCK → 2
    // Either way exit must be 2 (fail-closed)
    expect(r.exit).toBe(2);
  }, 20000);
});

// ── Structured decision record written ───────────────────────────────────────

describe("Hook — decision record evidence written", () => {
  test("BLOCK decision writes to .phantomdeps/decisions.ndjson", async () => {
    const { existsSync, readFileSync } = await import("fs");
    runHook("npm install is-odd");
    const logPath = resolve(__dirname, "../.phantomdeps/decisions.ndjson");
    expect(existsSync(logPath)).toBe(true);
    const lines = readFileSync(logPath, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean);
    const last = JSON.parse(lines[lines.length - 1]);
    expect(last).toHaveProperty("decisionId");
    expect(last).toHaveProperty("recordHash");
    expect(last).toHaveProperty("action");
  });
});
