import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { execSync } from "child_process";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { tmpdir, homedir } from "os";
import { join, resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "../../..");
const CLI_JS = join(PROJECT_ROOT, "dist", "src", "cli.js");

function run(args: string, cwd?: string): { stdout: string; stderr: string; code: number } {
  try {
    const stdout = execSync(`node "${CLI_JS}" ${args}`, {
      cwd: cwd || tmpdir(),
      encoding: "utf8",
      env: { ...process.env, TASKS_FILE: join(tmpdir(), `taskforge-e2e-${Date.now()}.json`) }
    });
    return { stdout, stderr: "", code: 0 };
  } catch (e: any) {
    return {
      stdout: e.stdout || "",
      stderr: e.stderr || "",
      code: e.status ?? 1
    };
  }
}

describe("TaskForge E2E: CLI Executions", () => {
  let tmpDir: string;
  let tasksFile: string;

  before(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "taskforge-e2e-"));
    tasksFile = join(tmpDir, ".tasks.json");
  });

  after(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  function runInDir(args: string): { stdout: string; stderr: string; code: number } {
    try {
      const stdout = execSync(`node "${CLI_JS}" ${args}`, {
        cwd: tmpDir,
        encoding: "utf8"
      });
      return { stdout, stderr: "", code: 0 };
    } catch (e: any) {
      return {
        stdout: e.stdout || "",
        stderr: e.stderr || "",
        code: e.status ?? 1
      };
    }
  }

  test("should show help when run with --help", () => {
    const r = runInDir("--help");
    assert.strictEqual(r.code, 0);
    assert.ok(r.stdout.toLowerCase().includes("taskforge"));
  });

  test("should create a task via CLI", () => {
    const r = runInDir('create "E2E Integration Test Task"');
    assert.strictEqual(r.code, 0);
    assert.ok(r.stdout.includes("Created task"));
  });

  test("should list created tasks", () => {
    runInDir('create "Listable Task"');
    const r = runInDir("list");
    assert.strictEqual(r.code, 0);
    assert.ok(r.stdout.includes("task"));
  });

  test("should produce valid JSON report", () => {
    const r = runInDir("report --json");
    assert.strictEqual(r.code, 0);
    const data = JSON.parse(r.stdout);
    assert.ok(typeof data.total === "number");
    assert.ok(typeof data.pending === "number");
    assert.ok(typeof data.completed === "number");
    assert.ok(typeof data.completionRate === "string");
  });

  test("should import tasks from valid fixture", () => {
    const validFixture = join(PROJECT_ROOT, "fixtures", "valid-tasks.json");
    const r = runInDir(`import "${validFixture}"`);
    assert.strictEqual(r.code, 0);
    assert.ok(r.stdout.includes("Successfully imported"));
  });

  test("should fail gracefully on invalid fixture import", () => {
    const invalidFixture = join(PROJECT_ROOT, "fixtures", "invalid-tasks.json");
    const r = runInDir(`import "${invalidFixture}"`);
    assert.strictEqual(r.code, 1);
    assert.ok(r.stderr.includes("Import failed") || r.stderr.includes("error"));
  });
});
