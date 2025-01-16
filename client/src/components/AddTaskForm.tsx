import { SetStateAction, useState } from "react";
import appError from "../utils/appError";
import { Task } from "../types/tasks";
import Loading from "./Loading";
import { API_URL } from "../pages/Home";

type FormData = {
  user_id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
};

const AddTaskForm = ({
  loading,
  setLoading,
  setError,
  setTasks,
  closeForm,
}: {
  loading: boolean;
  setError: React.Dispatch<SetStateAction<string | null>>;
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  closeForm: () => void;
}) => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormData>({
    user_id: 1,
    title: "",
    description: "",
    status: "pending",
    due_date: today,
  });

  const handleChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFormData = (data: FormData): string | null => {
    if (!data.title) return "Title is required.";
    if (!data.due_date) return "Due date is required.";
    return null;
  };

  const createTask = async (
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData
  ) => {
    e.preventDefault();

    if (formData.due_date === today) {
      formData.status = "in-progress";
    }

    const validationError = validateFormData(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/tasks/1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new appError(errorMessage || "Failed to create task.", 500);
      }

      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      closeForm();
    } catch (error) {
      setError(
        error instanceof appError ? error.message : "Unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animation-fade-in">
      <form
        onSubmit={(e) => createTask(e, formData)}
        className="bg-neutral-900 p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-6 relative animation-slide-in"
      >
        {/* Close Button */}
        <button
          onClick={closeForm}
          type="button"
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-200 text-xl transition"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Add New Task
        </h2>

        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-neutral-400 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            className="w-full px-4 py-2 bg-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700"
            onChange={(e) => handleChanges(e)}
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-neutral-400 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Task description"
            className="w-full px-4 py-2 bg-neutral-800 rounded-md text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-700 resize-none"
            rows={4}
            onChange={(e) => handleChanges(e)}
          />
        </div>

        {/* Due Date Field */}
        <div>
          <label htmlFor="due_date" className="block text-neutral-400 mb-2">
            Due Date
          </label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            className="w-full px-4 py-2 bg-neutral-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-neutral-700"
            onChange={(e) => handleChanges(e)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gray-700 text-white font-medium rounded-md  transform duration-300 hover:bg-gray-800 transition-all"
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
