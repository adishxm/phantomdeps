import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import { existsSync, unlinkSync } from "fs";
import { resolve } from "path";
import { TaskStore } from "../../src/task-store.js";

const TEST_DB = "test-tasks-unit.json";

describe("TaskForge Unit: TaskStore", () => {
  const store = new TaskStore(TEST_DB);
  const dbPath = resolve(process.cwd(), TEST_DB);

  after(() => {
    if (existsSync(dbPath)) {
      unlinkSync(dbPath);
    }
  });

  it("should create and retrieve tasks", () => {
    const t = store.createTask("Learn PhantomDeps", { stage: 1 });
    assert.ok(t.id);
    assert.strictEqual(t.title, "Learn PhantomDeps");
    assert.strictEqual(t.status, "pending");

    const all = store.getTasks();
    assert.strictEqual(all.length, 1);
    assert.strictEqual(all[0].id, t.id);
  });

  it("should mark task as completed", () => {
    const all = store.getTasks();
    const target = all[0];
    const completed = store.completeTask(target.id);
    assert.ok(completed);
    assert.strictEqual(completed.status, "completed");
    assert.ok(completed.updatedAt);
  });

  it("should deep merge metadata using lodash.merge", () => {
    const all = store.getTasks();
    const target = all[0];
    const updated = store.updateTaskMetadata(target.id, { extra: { tag: "verified" }, stage: 2 });
    assert.ok(updated);
    assert.strictEqual((updated.metadata as any)?.stage, 2);
    assert.strictEqual((updated.metadata as any)?.extra?.tag, "verified");
  });
});
