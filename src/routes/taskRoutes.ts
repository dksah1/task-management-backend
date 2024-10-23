import express, { NextFunction, Request, Response } from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../controllers/taskController";
import { auth } from "../middleware/authMiddleware";
import { upload } from "../config/fileUpload";

const router = express.Router();

router.route("/").post(auth, upload.array("attachments"), createTask);

router.route("/getall").get(getTasks);
router.route("/getsingle/:id").get(getTaskById);
router.route("/update/:id").put(auth, upload.array("attachments"), updateTask);
router.route("/delete/:id").delete(deleteTask);

export default router;
