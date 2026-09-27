import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";

const CLI_PATH = resolve(process.cwd(), "dist/src/cli.js");
const DB_PATH = resolve(process.cwd(), ".tasks.json");

describe("TaskForge E2E: CLI Executions", () => {
  before(() => {
    if (existsSync(DB_PATH)) unlinkSync(DB_PATH);
  });

  after(() => {
    if (existsSync(DB_PATH)) unlinkSync(DB_PATH);
  });

  it("should show help when run with --help", () => {
    const out = execSync(`node "${CLI_PATH}" --help`, { encoding: "utf8" });
    assert.ok(out.includes("TaskForge v1.0.0"));
    assert.ok(out.includes("USAGE:"));
  });

  it("should create a task via CLI", () => {
    const out = execSync(`node "${CLI_PATH}" create "E2E Integration Test Task"`, { encoding: "utf8" });
    assert.ok(out.includes("Created task"));
    assert.ok(out.includes("E2E Integration Test Task"));
  });

  it("should list created tasks", () => {
    const out = execSync(`node "${CLI_PATH}" list`, { encoding: "utf8" });
    assert.ok(out.includes("Found 1 task(s)"));
    assert.ok(out.includes("E2E Integration Test Task"));
  });

  it("should produce valid JSON report", () => {
    const out = execSync(`node "${CLI_PATH}" report --json`, { encoding: "utf8" });
    const parsed = JSON.parse(out);
    assert.strictEqual(parsed.total, 1);
    assert.strictEqual(parsed.pending, 1);
    assert.strictEqual(parsed.completed, 0);
  });

  it("should import tasks from valid fixture", () => {
    const fixturePath = resolve(process.cwd(), "fixtures/valid-tasks.json");
    const out = execSync(`node "${CLI_PATH}" import "${fixturePath}"`, { encoding: "utf8" });
    assert.ok(out.includes("Successfully imported 3 task(s)"));
  });

  it("should fail gracefully on invalid fixture import", () => {
    const fixturePath = resolve(process.cwd(), "fixtures/invalid-tasks.json");
    assert.throws(() => {
      execSync(`node "${CLI_PATH}" import "${fixturePath}"`, { encoding: "utf8", stdio: "pipe" });
    });
  });
});
