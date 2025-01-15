import { Task as TaskType } from "../types/tasks";
import { FaCheckCircle, FaTrashAlt, FaEdit } from "react-icons/fa"; // Icons from react-icons
import formatDate from "../utils/formatDate";

const Task = ({
  task,
  markAsCompleted,
  deleteTask,
  editTask,
}: {
  task: TaskType;
  markAsCompleted: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (taskId: number) => void;
}) => {
  return (
    <li className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700 transition-transform duration-200 hover:scale-105 hover:shadow-lg min-h-[200px] flex flex-col justify-between">
      {/* Title and Date */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-neutral-50">
            {task.title}
          </h2>
          <span className="text-sm text-neutral-400">
            {formatDate(task.due_date)}
          </span>
        </div>
        {/* Description */}
        <p className="text-sm text-neutral-400 mb-4 flex-grow">
          {task.description || "No description provided."}
        </p>
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          {/* Mark as Done Icon */}
          {task.status !== "completed" && (
            <button
              onClick={() => markAsCompleted(task.id)}
              className="text-green-500 hover:text-green-400 transition"
              aria-label="Mark as Done"
              title="Mark as Done"
            >
              <FaCheckCircle size={20} />
            </button>
          )}
          {/* Edit Icon */}
          <button
            onClick={() => editTask(task.id)}
            className="text-blue-400 hover:text-blue-300 transition"
            aria-label="Edit Task"
            title="Edit Task"
          >
            <FaEdit size={20} />
          </button>
          {/* Delete Icon */}
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-400 transition"
            aria-label="Delete Task"
            title="Delete Task"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            task.status === "completed"
              ? "bg-green-600 text-green-100"
              : task.status === "in-progress"
              ? "bg-red-500 text-yellow-100"
              : "bg-neutral-700 text-neutral-300"
          }`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>
    </li>
  );
};

export default Task;
