import { test, describe, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { TaskStore } from "../../src/task-store.js";

describe("TaskStore", () => {
  let tmpDir: string;
  let store: TaskStore;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), "taskforge-test-"));
    store = new TaskStore(join(tmpDir, "tasks.json"));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  test("getTasks returns empty array when file does not exist", () => {
    const tasks = store.getTasks();
    assert.deepStrictEqual(tasks, []);
  });

  test("createTask creates a task with correct fields", () => {
    const task = store.createTask("Write tests");
    assert.strictEqual(task.title, "Write tests");
    assert.strictEqual(task.status, "pending");
    assert.ok(task.id);
    assert.ok(task.createdAt);
    assert.deepStrictEqual(task.metadata, {});
  });

  test("createTask persists task to file", () => {
    store.createTask("Persist me");
    const tasks = store.getTasks();
    assert.strictEqual(tasks.length, 1);
    assert.strictEqual(tasks[0].title, "Persist me");
  });

  test("completeTask marks task as completed", () => {
    const created = store.createTask("Complete me");
    const completed = store.completeTask(created.id);
    assert.ok(completed);
    assert.strictEqual(completed.status, "completed");
    assert.ok(completed.updatedAt);
  });

  test("completeTask returns null for unknown id", () => {
    const result = store.completeTask("nonexistent-id");
    assert.strictEqual(result, null);
  });

  test("updateTaskMetadata deep-merges metadata using lodash.merge", () => {
    const created = store.createTask("Meta task", { a: 1, b: { c: 2 } });
    const updated = store.updateTaskMetadata(created.id, { b: { d: 3 }, e: 4 });
    assert.ok(updated);
    assert.deepStrictEqual(updated.metadata, { a: 1, b: { c: 2, d: 3 }, e: 4 });
  });
});
