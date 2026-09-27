import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { validateTask, validateTasksArray } from "../../src/validation.js";

describe("validateTask", () => {
  test("valid task passes", () => {
    const result = validateTask({
      id: "123",
      title: "Test task",
      status: "pending",
      createdAt: "2026-09-27T00:00:00.000Z"
    });
    assert.strictEqual(result.valid, true);
  });

  test("missing title fails", () => {
    const result = validateTask({
      id: "123",
      status: "pending",
      createdAt: "2026-09-27T00:00:00.000Z"
    });
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors && result.errors.length > 0);
  });

  test("wrong status value fails", () => {
    const result = validateTask({
      id: "123",
      title: "Test",
      status: "unknown",
      createdAt: "2026-09-27T00:00:00.000Z"
    });
    assert.strictEqual(result.valid, false);
  });

  test("empty title fails", () => {
    const result = validateTask({
      id: "123",
      title: "",
      status: "pending",
      createdAt: "2026-09-27T00:00:00.000Z"
    });
    assert.strictEqual(result.valid, false);
  });
});

describe("validateTasksArray", () => {
  test("non-array fails", () => {
    const result = validateTasksArray({ id: "123", title: "T", status: "pending", createdAt: "2026-09-27T00:00:00.000Z" });
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors?.[0]?.includes("array"));
  });

  test("empty array is valid", () => {
    const result = validateTasksArray([]);
    assert.strictEqual(result.valid, true);
    assert.deepStrictEqual(result.tasks, []);
  });

  test("array with one valid task", () => {
    const result = validateTasksArray([
      { id: "a1", title: "Task A", status: "completed", createdAt: "2026-09-27T00:00:00.000Z" }
    ]);
    assert.strictEqual(result.valid, true);
    assert.strictEqual(result.tasks?.length, 1);
  });

  test("array with invalid item reports which item failed", () => {
    const result = validateTasksArray([
      { id: "a1", title: "Valid", status: "pending", createdAt: "2026-09-27T00:00:00.000Z" },
      { id: "a2", title: "", status: "pending", createdAt: "2026-09-27T00:00:00.000Z" }
    ]);
    assert.strictEqual(result.valid, false);
    assert.ok(result.errors?.[0]?.includes("Item [1]"));
  });
});
