import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve } from "path";
import { randomUUID } from "crypto";
import lodash from "lodash";
import { Task, validateTasksArray } from "./validation.js";

// Stage D verification: lodash@4.17.21 `merge` — PhantomDeps ALLOW
const { merge } = lodash;

export class TaskStore {
  private filePath: string;

  constructor(filePath = ".tasks.json") {
    this.filePath = resolve(process.cwd(), filePath);
  }

  public getTasks(): Task[] {
    if (!existsSync(this.filePath)) {
      return [];
    }
    try {
      const content = readFileSync(this.filePath, "utf8");
      return JSON.parse(content) as Task[];
    } catch {
      return [];
    }
  }

  public saveTasks(tasks: Task[]): void {
    writeFileSync(this.filePath, JSON.stringify(tasks, null, 2), "utf8");
  }

  public createTask(title: string, metadata?: Record<string, unknown>): Task {
    const task: Task = {
      id: randomUUID(),
      title,
      status: "pending",
      createdAt: new Date().toISOString(),
      metadata: metadata || {}
    };
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
    return task;
  }

  public completeTask(id: string): Task | null {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    task.status = "completed";
    task.updatedAt = new Date().toISOString();
    this.saveTasks(tasks);
    return task;
  }

  /**
   * Deep-merge new metadata into an existing task using lodash.merge.
   * This is the Stage C/D enhancement — the one that legitimately uses lodash.
   */
  public updateTaskMetadata(id: string, newMeta: Record<string, unknown>): Task | null {
    const tasks = this.getTasks();
    const task = tasks.find(t => t.id === id);
    if (!task) return null;
    task.metadata = merge({}, task.metadata || {}, newMeta);
    task.updatedAt = new Date().toISOString();
    this.saveTasks(tasks);
    return task;
  }

  public importFromFile(jsonPath: string): { count: number; errors?: string[] } {
    const absPath = resolve(process.cwd(), jsonPath);
    if (!existsSync(absPath)) {
      return { count: 0, errors: [`File not found: ${jsonPath}`] };
    }
    const raw = readFileSync(absPath, "utf8");
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch (e: any) {
      return { count: 0, errors: [`JSON Parse error: ${e.message}`] };
    }
    const valResult = validateTasksArray(parsed);
    if (!valResult.valid || !valResult.tasks) {
      return { count: 0, errors: valResult.errors };
    }
    const current = this.getTasks();
    const combined = [...current, ...valResult.tasks];
    this.saveTasks(combined);
    return { count: valResult.tasks.length };
  }
}
