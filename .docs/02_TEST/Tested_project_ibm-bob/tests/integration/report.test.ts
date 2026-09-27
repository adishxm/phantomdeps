import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { generateReport, formatReportText } from "../../src/report.js";
import type { Task } from "../../src/validation.js";

const makeTask = (status: Task["status"]): Task => ({
  id: Math.random().toString(36).slice(2),
  title: `Task (${status})`,
  status,
  createdAt: new Date().toISOString()
});

describe("generateReport", () => {
  test("empty task list gives zero counts", () => {
    const r = generateReport([]);
    assert.strictEqual(r.total, 0);
    assert.strictEqual(r.pending, 0);
    assert.strictEqual(r.inProgress, 0);
    assert.strictEqual(r.completed, 0);
    assert.strictEqual(r.completionRate, "0.0%");
  });

  test("counts by status are correct", () => {
    const tasks = [
      makeTask("pending"),
      makeTask("pending"),
      makeTask("in_progress"),
      makeTask("completed"),
      makeTask("completed"),
      makeTask("completed")
    ];
    const r = generateReport(tasks);
    assert.strictEqual(r.total, 6);
    assert.strictEqual(r.pending, 2);
    assert.strictEqual(r.inProgress, 1);
    assert.strictEqual(r.completed, 3);
    assert.strictEqual(r.completionRate, "50.0%");
  });

  test("all pending gives 0.0% completion", () => {
    const r = generateReport([makeTask("pending"), makeTask("pending")]);
    assert.strictEqual(r.completionRate, "0.0%");
  });

  test("all completed gives 100.0% completion", () => {
    const r = generateReport([makeTask("completed"), makeTask("completed")]);
    assert.strictEqual(r.completionRate, "100.0%");
  });
});

describe("formatReportText", () => {
  test("contains header and footer", () => {
    const text = formatReportText(generateReport([]));
    assert.ok(text.includes("=== TaskForge Status Report ==="));
    assert.ok(text.includes("================================"));
  });

  test("contains numeric counts", () => {
    const tasks = [makeTask("pending"), makeTask("completed")];
    const text = formatReportText(generateReport(tasks));
    assert.ok(text.includes("Total Tasks    : 2"));
    assert.ok(text.includes("Pending        : 1"));
    assert.ok(text.includes("Completed      : 1"));
  });
});
