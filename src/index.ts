import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import { notFound, errorHandler } from "./middleware/errorHandler";
import sequelize from "./config/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(notFound);
app.use(errorHandler);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

sequelize.sync().then(() => {
  console.log("Database connected");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
