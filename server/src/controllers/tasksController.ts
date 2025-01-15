import { Request, Response, NextFunction } from "express";
import { supabase } from "../config/supabase";
import AppError from "../utils/appError";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = Number(req.params.userId);

    if (!userId || isNaN(userId)) {
      throw new AppError("Invalid or missing userId.", 400);
    }

    // Extract query parameters
    const page = Number(req.query.page) || 1; // Default to page 1
    const limit = Number(req.query.limit) || 10; // Default to 10 items per page
    const offset = (page - 1) * limit;

    const status = req.query.status as string | undefined; // Optional status filter
    const sort = (req.query.sort as string) || "due_date"; // Default sort field
    const order = (req.query.order as string) === "desc" ? "desc" : "asc"; // Default ascending order

    // Build the query
    let query = supabase
      .from("tasks")
      .select("*")
      .eq("user_id", userId) // Filter by user ID
      .range(offset, offset + limit - 1); // Pagination

    // Apply filters if provided
    if (status) {
      query = query.eq("status", status); // Filter by status (e.g., pending, completed)
    }

    // Apply sorting
    query = query.order(sort, { ascending: order === "asc" });

    // Execute the query
    const { data, error } = await query;

    if (error) {
      throw new AppError(`Failed to fetch tasks: ${error.message}`, 500);
    }

    res.status(200).json(data); // Return the paginated, filtered, and sorted tasks
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user_id = Number(req.params.userId);
    const { title, description, status, priority, due_date } = req.body;

    if (!user_id || !title)
      throw new AppError(`Make sure all fields are filled`, 400);

    // Insert task into the database
    const { data, error } = await supabase
      .from("tasks")
      .insert([
        {
          user_id, // Use the userId from params
          title,
          description,
          status: status || "pending", // Default status to "pending"
          priority: priority || 0, // Default priority to 0
          due_date,
        },
      ])
      .select("*");

    if (error) {
      throw new AppError(`Failed to create task: ${error.message}`, 500);
    }

    // Respond with the created task
    res.status(201).json(data[0]);
  } catch (error) {
    next(error);
  }
};
