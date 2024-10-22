import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import Task from "../models/task";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  // if (!req.user) {
  //   return res.status(401).json({ message: "User not found" });
  // }

  const { title, description, dueDate } = req.body;

  //   const task = await Task.create({
  //     title,
  //     description,
  //     dueDate,
  //     userId: req.user.id, // Now `req.user.id` is recognized by TypeScript
  //   });

  //   res.status(201).json(task);
  // });

  // const getTasks = asyncHandler(async (req: Request, res: Response) => {
  //   if (!req.user) {
  //     return res.status(401).json({ message: "User not found" });
  //   }

  //   const tasks = await Task.findAll({ where: { userId: req.user.id } });
  //   res.json(tasks);
});

export { createTask };
