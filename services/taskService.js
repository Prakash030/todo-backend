import { Task } from "../modals/Tasks.js";

export const createTask = async (userId, title, description) => {
    try {
        const task = await Task.create({
            userId,
            title,
            description
        });
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getTasks = async (userId) => {
    try {
        const tasks = await Task.find({ userId });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const updateTask = async (taskId, title, description, status) => {
    console.log(taskId, title, description, status);
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            throw new Error("Task not found");
        }

        task.title = title;
        task.description = description;
        if(status){
        task.status = status;
    }
    console.log(task);

        await task.save();
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteTask = async (taskId) => {
    try {
        const task = await Task.findByIdAndDelete(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        return true
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteAllTasks = async (userId) => {
    try {
        const tasks = await Task.find({ userId });
        if (!tasks) {
            throw new Error("Tasks not found");
        }

        await Task.deleteMany({ userId });
        return tasks;
    } catch (error) {
        throw new Error(error.message);
    }
}