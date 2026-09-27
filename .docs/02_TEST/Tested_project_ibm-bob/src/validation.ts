import Ajv, { JSONSchemaType } from "ajv";

export interface Task {
  id: string;
  title: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  updatedAt?: string;
  metadata?: Record<string, unknown>;
}

const ajv = new (Ajv as any)();

const taskSchema: JSONSchemaType<Task> = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string", minLength: 1 },
    status: { type: "string", enum: ["pending", "in_progress", "completed"] },
    createdAt: { type: "string" },
    updatedAt: { type: "string", nullable: true },
    metadata: { type: "object", nullable: true, required: [] }
  },
  required: ["id", "title", "status", "createdAt"],
  additionalProperties: true
};

const validateTaskSchema = ajv.compile(taskSchema);

export function validateTask(data: unknown): { valid: boolean; errors?: string[] } {
  const valid = validateTaskSchema(data);
  if (!valid) {
    const errors = validateTaskSchema.errors?.map(
      (e: { instancePath?: string; message?: string }) =>
        `${e.instancePath || "/"} ${e.message}`
    ) || ["Invalid task format"];
    return { valid: false, errors };
  }
  return { valid: true };
}

export function validateTasksArray(
  data: unknown
): { valid: boolean; tasks?: Task[]; errors?: string[] } {
  if (!Array.isArray(data)) {
    return { valid: false, errors: ["Input data must be an array of tasks"] };
  }
  const allErrors: string[] = [];
  for (let i = 0; i < data.length; i++) {
    const res = validateTask(data[i]);
    if (!res.valid) {
      allErrors.push(`Item [${i}]: ${res.errors?.join(", ")}`);
    }
  }
  if (allErrors.length > 0) {
    return { valid: false, errors: allErrors };
  }
  return { valid: true, tasks: data as Task[] };
}
