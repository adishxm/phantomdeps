import { describe, it } from "node:test";
import assert from "node:assert";
import { generateReport, formatReportText } from "../../src/report.js";
import { Task } from "../../src/validation.js";

describe("TaskForge Integration: Reporting Pipeline", () => {
  const tasks: Task[] = [
    { id: "1", title: "Task 1", status: "completed", createdAt: "2026-09-27T10:00:00Z" },
    { id: "2", title: "Task 2", status: "completed", createdAt: "2026-09-27T11:00:00Z" },
    { id: "3", title: "Task 3", status: "in_progress", createdAt: "2026-09-27T12:00:00Z" },
    { id: "4", title: "Task 4", status: "pending", createdAt: "2026-09-27T13:00:00Z" }
  ];

  it("should calculate correct task counts and completion rate", () => {
    const rep = generateReport(tasks);
    assert.strictEqual(rep.total, 4);
    assert.strictEqual(rep.completed, 2);
    assert.strictEqual(rep.inProgress, 1);
    assert.strictEqual(rep.pending, 1);
    assert.strictEqual(rep.completionRate, "50.0%");
  });

  it("should handle empty task list cleanly", () => {
    const rep = generateReport([]);
    assert.strictEqual(rep.total, 0);
    assert.strictEqual(rep.completed, 0);
    assert.strictEqual(rep.completionRate, "0.0%");
  });

  it("should format readable text report", () => {
    const rep = generateReport(tasks);
    const text = formatReportText(rep);
    assert.ok(text.includes("=== TaskForge Status Report ==="));
    assert.ok(text.includes("Total Tasks    : 4"));
    assert.ok(text.includes("Completion Rate: 50.0%"));
  });
});
