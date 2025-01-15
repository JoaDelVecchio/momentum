import { Task as TaskType } from "../types/tasks";
import Task from "./Task";

const Tasks = ({
  title,
  tasks,
  markAsCompleted,
  deleteTask,
  editTask,
}: {
  title: string;
  tasks: TaskType[];
  markAsCompleted: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (task: TaskType) => void;
}) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-neutral-200">{title}</h2>
      <ul className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              editTask={editTask}
              markAsCompleted={markAsCompleted}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p className="text-neutral-500">No tasks for today.</p>
        )}
      </ul>
    </section>
  );
};

export default Tasks;
