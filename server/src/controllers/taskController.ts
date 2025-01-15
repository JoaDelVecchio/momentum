import { NextFunction, Request, Response, application } from "express";
import { supabase } from "../config/supabase";
import AppError from "../utils/appError";

export const getTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = Number(req.params.taskId);

    if (!taskId) throw new AppError(`Invalid or missing taskid`, 400);

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", taskId);

    if (error) throw new AppError(error.message, 500);

    if (data.length === 0) throw new AppError("No task found", 404);

    console.log("Fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = Number(req.params.taskId);
    if (!taskId) throw new AppError("Invalid or missing task ID", 400);

    const { title, description, status, due_date } = req.body;

    const { data, error } = await supabase
      .from("tasks")
      .update({ title, description, status, due_date })
      .eq("id", taskId)
      .select("*"); // Ensure all columns are returned

    if (error) throw new AppError(error.message, 500);

    if (!data || data.length === 0) {
      throw new AppError("No task found to update", 404);
    }

    res.status(200).json(data[0]); // Return the updated task
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = Number(req.params.taskId);

    // Validate taskId
    if (!taskId || isNaN(taskId)) {
      throw new AppError("Invalid or missing task ID.", 400);
    }

    // Delete the task
    const { data, error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", taskId)
      .select("*"); // Fetch and return the deleted row(s)

    // Handle Supabase error
    if (error) {
      throw new AppError(error.message, 500);
    }

    // Handle case where no task was found to delete
    if (!data || data.length === 0) {
      throw new AppError("No task found with the given ID to delete.", 404);
    }

    // Return the deleted task
    res.status(200).json({
      message: "Task deleted successfully.",
      deletedTask: data[0], // Return the deleted task (first element)
    });
  } catch (error) {
    next(error);
  }
};
