import express from 'express';
import authMiddleware from "../middleware/auth.js";
import { createTaskController, getTasksController, updateTaskController, deleteAllTasksController, deleteTaskController } from "../controllers/taskController.js";

const router = express.Router();

router.get('/', authMiddleware, getTasksController);
router.post('/create', authMiddleware, createTaskController);
router.put('/update/:id', authMiddleware, updateTaskController);
router.delete('/delete/:id', authMiddleware, deleteTaskController);
router.delete('/delete', authMiddleware, deleteAllTasksController);

export default router;
