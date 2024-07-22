import { getTasks, createTask, updateTask, deleteAllTasks, deleteTask } from "../services/taskService.js";

export const createTaskController = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user._id;

        if (!title || !description) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const task = await createTask(userId, title, description);

        return res.status(200).json({
            task: task,
            message: "Task created successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getTasksController = async (req, res) => {
    try {
        const userId = req.user._id;
        const tasks = await getTasks(userId);

        return res.status(200).json({
            tasks: tasks,
            message: "Tasks fetched successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateTaskController = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const taskId = req.params.id;
        const user = req.user;

        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!title || !description || !status) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        const task = await updateTask(taskId, title, description, status);

        return res.status(200).json({
            task: task,
            message: "Task updated successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteTaskController = async (req, res) => {
    try {
        const taskId = req.params.id;
        const user = req.user;

        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const task = await deleteTask(taskId);

        return res.status(200).json({
            task: task,
            message: "Task deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const deleteAllTasksController = async (req, res) => {
    try {
        const user = req.user;

        if(!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tasks = await deleteAllTasks(user._id);

        return res.status(200).json({
            tasks: tasks,
            message: "Tasks deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}