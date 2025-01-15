import { SetStateAction } from "react";
import appError from "../utils/appError";
import { Task } from "../types/tasks";

export const fetchTasks = async ({
  setLoading,
  setError,
  setTasks,
}: {
  setError: React.Dispatch<SetStateAction<string | null>>;
  setTasks: React.Dispatch<SetStateAction<Task[]>>;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  setError(null);
  setLoading(true);
  try {
    const response = await fetch("http://localhost:8000/api/tasks/1");

    if (!response.ok) {
      throw new appError(response.statusText, response.status);
    }

    const data = await response.json();
    setTasks(data);
  } catch (error) {
    if (error instanceof appError) {
      console.error(`There was an error fetching data, error: ${error}`);
      setError(error.message);
    }
  } finally {
    setLoading(false);
  }
};
