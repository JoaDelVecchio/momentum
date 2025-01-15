export type Task = {
  id: number; // Unique identifier for the task
  user_id: number; // ID of the user who owns the task
  title: string; // Title of the task
  description: string; // Description of the task
  status: "pending" | "in-progress" | "completed"; // Status of the task (use a union type for predefined statuses)
  priority: number; // Priority of the task (e.g., 1 = high, 2 = medium, 3 = low)
  due_date: string; // Due date as an ISO string
  created_at: string; // Timestamp of when the task was created as an ISO string
};
