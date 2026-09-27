#!/usr/bin/env node
import { TaskStore } from "./task-store.js";
import { generateReport, formatReportText } from "./report.js";

const store = new TaskStore();
const args = process.argv.slice(2);
const command = args[0];

function printHelp(): void {
  console.log(`
TaskForge v1.0.0 — CLI Task Management Service (IBM Bob validation lane)

USAGE:
  taskforge create <title>       Create a new task
  taskforge list                 List all tasks
  taskforge complete <id>        Mark a task as completed
  taskforge import <path>        Import tasks from JSON file
  taskforge report [--json]      Display task statistics report
  taskforge --help               Show this help message
`);
}

switch (command) {
  case "create": {
    const title = args.slice(1).join(" ").trim();
    if (!title) {
      console.error("Error: task title is required.");
      process.exit(1);
    }
    const task = store.createTask(title);
    console.log(`Created task [${task.id}]: "${task.title}"`);
    process.exit(0);
  }

  case "list": {
    const tasks = store.getTasks();
    if (tasks.length === 0) {
      console.log("No tasks found.");
      process.exit(0);
    }
    console.log(`Found ${tasks.length} task(s):`);
    for (const t of tasks) {
      const mark = t.status === "completed" ? "✔" : "○";
      console.log(`  ${mark} [${t.id}] (${t.status}) ${t.title}`);
    }
    process.exit(0);
  }

  case "complete": {
    const id = args[1];
    if (!id) {
      console.error("Error: task id is required.");
      process.exit(1);
    }
    const updated = store.completeTask(id);
    if (!updated) {
      console.error(`Error: task with id '${id}' not found.`);
      process.exit(1);
    }
    console.log(`Task [${updated.id}] marked as completed.`);
    process.exit(0);
  }

  case "import": {
    const filePath = args[1];
    if (!filePath) {
      console.error("Error: path to JSON file is required.");
      process.exit(1);
    }
    const result = store.importFromFile(filePath);
    if (result.errors && result.errors.length > 0) {
      console.error(`Import failed with ${result.errors.length} error(s):`);
      for (const err of result.errors) {
        console.error(`  - ${err}`);
      }
      process.exit(1);
    }
    console.log(`Successfully imported ${result.count} task(s).`);
    process.exit(0);
  }

  case "report": {
    const isJson = args.includes("--json");
    const tasks = store.getTasks();
    const rep = generateReport(tasks);
    if (isJson) {
      console.log(JSON.stringify(rep, null, 2));
    } else {
      console.log(formatReportText(rep));
    }
    process.exit(0);
  }

  case "--help":
  case "-h":
  case undefined: {
    printHelp();
    process.exit(0);
  }

  default: {
    console.error(`Unknown command: '${command}'`);
    printHelp();
    process.exit(1);
  }
}
