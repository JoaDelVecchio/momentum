import { useEffect, useState } from "react";
import { Task as TaskType } from "../types/tasks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import AddTaskForm from "../components/AddTaskForm";
import Tasks from "../components/Tasks";
import { fetchTasks } from "../api/api";
import appError from "../utils/appError";

export const API_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks({ setError, setTasks, setLoading });
  }, []);

  const markAsCompleted = async (taskId: number) => {
    try {
      // Make API request to update the task's status
      const response = await fetch(`${API_URL}/api/task/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "completed" }), // Pass the updated status
      });

      if (!response.ok) {
        throw new appError(
          `Failed to update task. Status code: ${response.status}`,
          response.status
        );
      }

      const updatedTask = await response.json();

      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
    } catch (error) {
      if (error instanceof appError) {
        console.error(error.message);
        setError(error.message);
      } else {
        console.error("An unknown error occurred", error);
        setError("An unknown error occurred. Please try again.");
      }
    }
  };

  const editTask = async (task: TaskType) => {
    try {
      console.log("TASK", task);
      const response = await fetch(`${API_URL}/api/task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task), // Convert the task object to JSON
      });

      if (!response.ok) {
        // If response is not okay, throw a new appError
        throw new appError(
          `Failed to update the task. Error: ${response.statusText}`,
          response.status
        );
      }

      const updatedTask = await response.json(); // Assuming the API returns the updated task
      setTasks((prevTasks) =>
        prevTasks.map((currentTask) =>
          currentTask.id === updatedTask.id ? updatedTask : currentTask
        )
      );

      console.log("Task updated successfully:", updatedTask);
    } catch (error) {
      if (error instanceof appError) {
        console.error("Error updating the task:", error.message);
        setError(error.message); // Handle application-level errors
      } else {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred."); // Handle unexpected errors
      }
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      // Make API request to delete the task
      const response = await fetch(`${API_URL}/api/task/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new appError(
          `Failed to delete task. Status code: ${response.status}`,
          response.status
        );
      }

      // Update local state after successful deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      if (error instanceof appError) {
        console.error(`AppError: ${error.message}`);
        setError(`Error deleting task: ${error.message}`);
      } else {
        console.error("Unexpected error occurred:", error);
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];
  const normalizeDate = (dateString: string | null): string | null => {
    if (!dateString) return null; // Return null if dateString is null
    return dateString.split("T")[0]; // Extract the `yyyy-MM-dd` part
  };

  const dailyDiscipline = tasks.filter(
    (task) =>
      normalizeDate(task.due_date) === today && task.status === "in-progress"
  );

  const dailyWins = tasks.filter(
    (task) =>
      task.status === "completed" && normalizeDate(task.due_date) === today
  );

  tasks.forEach((task) => {});
  const whatsNext = tasks.filter((task) => {
    if (!task.status || !task.due_date) return false; // Ensure both fields exist
    const normalizedDueDate = normalizeDate(task.due_date);
    return normalizedDueDate && normalizedDueDate > today;
  });

  if (error) return <ErrorMessage error={error} />;
  if (loading) return <Loading />;

  return (
    <main className="flex-grow bg-neutral-950 text-white px-6 pt-12 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Tasks
            title="Daily Discipline"
            tasks={dailyDiscipline}
            editTask={editTask}
            deleteTask={deleteTask}
            markAsCompleted={markAsCompleted}
          />
          <Tasks
            title="Daily Wins"
            tasks={dailyWins}
            editTask={editTask}
            deleteTask={deleteTask}
            markAsCompleted={markAsCompleted}
          />
          <Tasks
            title="What's Next"
            tasks={whatsNext}
            editTask={editTask}
            deleteTask={deleteTask}
            markAsCompleted={markAsCompleted}
          />
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 text-lg font-medium bg-neutral-800 text-neutral-200 rounded-md shadow-lg hover:shadow-xl hover:bg-neutral-700 transition"
          >
            Add New Task
          </button>
        </div>

        {isOpen && (
          <AddTaskForm
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            setTasks={setTasks}
            closeForm={() => setIsOpen(false)}
          />
        )}
      </div>
    </main>
  );
};

export default Home;
