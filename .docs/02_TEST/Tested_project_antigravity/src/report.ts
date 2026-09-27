import { Task } from "./validation.js";

export interface StatusReport {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  completionRate: string;
}

export function generateReport(tasks: Task[]): StatusReport {
  const total = tasks.length;
  let pending = 0;
  let inProgress = 0;
  let completed = 0;

  for (const t of tasks) {
    if (t.status === "pending") pending++;
    else if (t.status === "in_progress") inProgress++;
    else if (t.status === "completed") completed++;
  }

  const completionRate = total > 0 ? ((completed / total) * 100).toFixed(1) + "%" : "0.0%";

  return {
    total,
    pending,
    inProgress,
    completed,
    completionRate
  };
}

export function formatReportText(report: StatusReport): string {
  return [
    "=== TaskForge Status Report ===",
    `Total Tasks    : ${report.total}`,
    `Pending        : ${report.pending}`,
    `In Progress    : ${report.inProgress}`,
    `Completed      : ${report.completed}`,
    `Completion Rate: ${report.completionRate}`,
    "================================"
  ].join("\n");
}
