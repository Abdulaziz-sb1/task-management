import { Router } from "express";
import { createTask, getTasks, getUserTasks, updateTask } from "../controllers/taskController";

const router = Router()

router.get('/', getTasks)
router.post('/', createTask)
router.patch("/:taskId/status", updateTask) // :taskId because dynamic route
router.get("/user/:userId", getUserTasks) // :userId because dynamic route

export default router