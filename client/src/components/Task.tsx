import { useState } from "react";
import { Task as TaskType } from "../types/tasks";
import { FaCheckCircle, FaTrashAlt, FaEdit, FaSave } from "react-icons/fa"; // Icons from react-icons
import formatDate from "../utils/formatDate";

// Helper function to format date for input fields
const formatDateToInput = (date: string | Date | null) => {
  if (!date) return ""; // Return empty string for null or undefined
  const d = new Date(date);
  return d.toISOString().split("T")[0]; // Converts to yyyy-MM-dd
};

const Task = ({
  task,
  markAsCompleted,
  deleteTask,
  editTask,
}: {
  task: TaskType;
  markAsCompleted: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
  editTask: (task: TaskType) => void; // Updated to receive the modified task
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<TaskType>(task);

  const handleSave = async () => {
    try {
      console.log("Prepared Task for Saving:", editedTask);

      editTask({ ...editedTask, status: "pending" });
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving the task:", error);
    }
  };

  return (
    <li className="p-6 bg-neutral-800 rounded-lg shadow-md border border-neutral-700 transition-transform duration-200 hover:scale-105 hover:shadow-lg min-h-[200px] flex flex-col justify-between">
      {/* Title and Date */}
      <div>
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="text-lg font-semibold text-neutral-50 bg-neutral-700 p-1 rounded"
              />
              <input
                type="date"
                value={formatDateToInput(editedTask.due_date)}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, due_date: e.target.value })
                }
                className="text-sm text-neutral-400 bg-neutral-700 p-1 rounded"
              />
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-neutral-50">
                {task.title}
              </h2>
              <span className="text-sm text-neutral-400">
                {formatDate(task.due_date)}
              </span>
            </>
          )}
        </div>
        {/* Description */}
        {isEditing ? (
          <textarea
            value={editedTask.description || ""}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="text-sm text-neutral-400 bg-neutral-700 p-1 rounded w-full"
          />
        ) : (
          <p className="text-sm text-neutral-400 mb-4 flex-grow">
            {task.description || "No description provided."}
          </p>
        )}
      </div>
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          {!isEditing && task.status !== "completed" && (
            <button
              onClick={() => markAsCompleted(task.id)}
              className="text-green-500 hover:text-green-400 transition"
              aria-label="Mark as Done"
              title="Mark as Done"
            >
              <FaCheckCircle size={20} />
            </button>
          )}
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="text-blue-400 hover:text-blue-300 transition"
            aria-label={isEditing ? "Save Task" : "Edit Task"}
            title={isEditing ? "Save Task" : "Edit Task"}
          >
            {isEditing ? <FaSave size={20} /> : <FaEdit size={20} />}
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:text-red-400 transition"
            aria-label="Delete Task"
            title="Delete Task"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
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
