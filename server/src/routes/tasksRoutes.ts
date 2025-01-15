import express from "express";
import { createTask, getTasks } from "../controllers/tasksController";

const router = express.Router();

router.get("/:userId", getTasks);
router.post("/:userId", createTask);

export default router;
