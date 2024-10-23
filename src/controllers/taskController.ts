import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Task from "../database/models/task";
import { Attachment } from "../database/models/attachment";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, dueDate } = req.body;
  console.log("req.file", req.file);

  if (!dueDate || isNaN(new Date(dueDate).getTime())) {
    return res.status(400).json({ message: "Invalid dueDate format" });
  }

  const task = await Task.create({
    title,
    description,
    dueDate: new Date(dueDate),
    createdBy: req.user!.id,
    status: "incomplete",
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

// Get all tasks
const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const tasks = await Task.findAll();

  res.status(200).json({
    success: true,
    data: tasks,
  });
});

// Get task by ID
const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, dueDate, status } = req.body;

  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.dueDate = dueDate || task.dueDate;
  task.status = status || task.status;

  await task.save();

  res.status(200).json({
    success: true,
    data: task,
  });
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  await task.destroy();

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});

export { createTask, getTasks, getTaskById, updateTask, deleteTask };
