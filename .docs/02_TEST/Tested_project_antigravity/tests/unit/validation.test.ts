import { describe, it } from "node:test";
import assert from "node:assert";
import { validateTask, validateTasksArray } from "../../src/validation.js";

describe("TaskForge Unit: Validation", () => {
  it("should validate a correct task structure", () => {
    const valid = {
      id: "abc-123",
      title: "Write documentation",
      status: "pending",
      createdAt: new Date().toISOString()
    };
    const res = validateTask(valid);
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.errors, undefined);
  });

  it("should reject task with empty title or missing status", () => {
    const invalid = {
      id: "abc-123",
      title: "",
      status: "wrong_status",
      createdAt: new Date().toISOString()
    };
    const res = validateTask(invalid);
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors && res.errors.length > 0);
  });

  it("should validate an array of valid tasks", () => {
    const tasks = [
      { id: "1", title: "Task 1", status: "pending", createdAt: new Date().toISOString() },
      { id: "2", title: "Task 2", status: "completed", createdAt: new Date().toISOString() }
    ];
    const res = validateTasksArray(tasks);
    assert.strictEqual(res.valid, true);
    assert.strictEqual(res.tasks?.length, 2);
  });

  it("should reject non-array data for task list import", () => {
    const res = validateTasksArray({ not: "an array" });
    assert.strictEqual(res.valid, false);
    assert.ok(res.errors?.[0].includes("must be an array"));
  });
});
