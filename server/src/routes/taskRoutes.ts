import express from "express";
import { getTask, updateTask, deleteTask } from "../controllers/taskController";

const router = express.Router();

router.get("/:taskId", getTask);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
